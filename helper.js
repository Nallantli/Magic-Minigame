function scale(x) {
	return x * SCALE_FACTOR;
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect(), // abs. size of element
		scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
		scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

	return {
		x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
		y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
	}
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function makeInteractable(x, y, sizeX, sizeY, render, hoverRender, onPress, options) {
	if (options?.disableOn && options?.disableOn({ x, y, sizeX, sizeY })) {
		options?.disabledRender({ x, y, sizeX, sizeY, renderRaw: render, renderCallback: () => render({ x, y, sizeX, sizeY }) });
		return;
	}
	if (options?.forceHoverOn && options?.forceHoverOn({ x, y, sizeX, sizeY }) || (mousePos.x >= x && mousePos.x < x + sizeX && mousePos.y >= y && mousePos.y < y + sizeY)) {
		if (hoverRender) {
			hoverRender({ x, y, sizeX, sizeY, renderRaw: render, renderCallback: () => render({ x, y, sizeX, sizeY }) });
		}
		if (onPress && clickPos?.x >= x && clickPos?.x < x + sizeX && clickPos?.y >= y && clickPos?.y < y + sizeY) {
			onPress({ x, y, sizeX, sizeY });
		}
		if (options?.onRightPress && rightClickPos?.x >= x && rightClickPos?.x < x + sizeX && rightClickPos?.y >= y && rightClickPos?.y < y + sizeY) {
			options.onRightPress({ x, y, sizeX, sizeY });
		}
	} else {
		render({ x, y, sizeX, sizeY });
	}
}

function makeTextBox(id, x, y, sizeX, sizeY, render, validator, onUnfocus) {
	if (clickPos !== undefined) {
		if (!state.textboxes[id].isFocused && clickPos?.x >= x && clickPos?.x < x + sizeX && clickPos?.y >= y && clickPos?.y < y + sizeY) {
			state.textboxes[id].isFocused = true;
		}
		if (state.textboxes[id].isFocused && (clickPos?.x < x || clickPos?.x >= x + sizeX || clickPos?.y < y || clickPos?.y >= y + sizeY)) {
			state.textboxes[id].isFocused = false;
			if (onUnfocus) {
				onUnfocus({ value: state.textboxes[id].value });
			}
		}
	}
	if (state.textboxes[id].isFocused) {
		keysPressed.forEach(key => {
			state.textboxes[id].value = validator(state.textboxes[id].value, key);
		});
	}
	const { value, isFocused } = state.textboxes[id];
	render({ x, y, sizeX, sizeY, value, isFocused });
}

function drawBox(ctx, x, y, sizeX, sizeY) {
	sprites.TOOLTIP_CORNER_3x3.draw(ctx, x, y, scale(3), scale(3));
	sprites.TOOLTIP_CORNER_3x3.draw(ctx, x + sizeX - scale(3), y, scale(3), scale(3), { iIndex: 1 });
	sprites.TOOLTIP_CORNER_3x3.draw(ctx, x + sizeX - scale(3), y + sizeY - scale(3), scale(3), scale(3), { iIndex: 2 });
	sprites.TOOLTIP_CORNER_3x3.draw(ctx, x, y + sizeY - scale(3), scale(3), scale(3), { iIndex: 3 });

	ctx.fillStyle = "black";
	ctx.fillRect(x + scale(3), y, sizeX - scale(6), scale(3));
	ctx.fillRect(x + scale(3), y + sizeY - scale(3), sizeX - scale(6), scale(3));
	ctx.fillRect(x, y + scale(3), scale(3), sizeY - scale(6));
	ctx.fillRect(x + sizeX - scale(3), y + scale(3), scale(3), sizeY - scale(6));
	ctx.fillRect(x + scale(3), y + scale(3), sizeX - scale(6), sizeY - scale(6));
	ctx.fillStyle = "white";
	ctx.fillRect(x + scale(3), y, sizeX - scale(6), scale(1));
	ctx.fillRect(x + scale(3), y + sizeY - scale(1), sizeX - scale(6), scale(1));
	ctx.fillRect(x, y + scale(3), scale(1), sizeY - scale(6));
	ctx.fillRect(x + sizeX - scale(1), y + scale(3), scale(1), sizeY - scale(6));
}

function makeToolTip(sizeX, sizeY, render) {
	const { x, y } = mousePos;
	return (ctx) => {
		drawBox(ctx, x, y, sizeX, sizeY);
		render({ x, y, sizeX, sizeY });
	};
}

function makeTextToolTip(text, fontSizeX, fontSizeY, iIndex) {
	const { x, y } = mousePos;
	const sizeX = fontSizeX * text.length + scale(6);
	const leftToRight = sizeX + x > scale(480);
	const startX = leftToRight ? x - sizeX : x;
	return (ctx) => {
		drawBox(ctx, startX, y, sizeX, fontSizeY + scale(6));
		font.draw(ctx, startX + scale(3), y + scale(3), fontSizeX, fontSizeY, iIndex, text);
	}
}

function criticalChance(cra, crb) {
	const diff = cra - crb;
	return ((diff - 32) / (2 * (16 + Math.abs(diff - 32))) + 0.5) * (Math.min(cra, 100) / 100);
}

function calculateDamages(spell, enchantments, caster, victim, aura) {
	if (spell.type !== SPELL_TYPES.ATTACK_ALL && spell.type !== SPELL_TYPES.ATTACK_BASIC) {
		return {};
	}

	const isCritical = spell.element === caster.entity.element && Math.random() <= criticalChance(caster.entity.criticalRating, victim.entity.criticalRating);

	const shields = victim.shields;
	const blades = caster.blades;
	let usedBladeIds = [];
	let totalUsedBladeIds = [];
	let baseTilt = 1 * (aura !== null && aura.element === spell.element ? aura.value : 1);
	blades.forEach(({ id, value, element }, i) => {
		if ((spell.element === element || element === 'all') && !totalUsedBladeIds.includes(id)) {
			baseTilt *= (value + 100) / 100;
			totalUsedBladeIds.push(id);
			usedBladeIds.push({ index: i, id });
		}
	});
	let totalUsedShieldIds = [];
	return {
		isCritical,
		usedBladeIds,
		damages: spell.damages.map(d => {
			let base = (d.damage !== undefined ? d.damage : (Math.random() * (d.maxDamage - d.minDamage) + d.minDamage)) - (enchantments?.damage ? enchantments.damage / spell.damages.length : 0);
			let usedShieldIds = [];
			let currentElement = d.element;
			for (let i = shields.length - 1; i >= 0; i--) {
				const { id, value, element, elementTo } = shields[i];
				if ((currentElement === element || element === 'all') && !totalUsedShieldIds.includes(id)) {
					if (value) {
						base += base * (value / 100);
					}
					if (elementTo) {
						currentElement = elementTo;
					}
					usedShieldIds.push({ index: i, id });
					totalUsedShieldIds.push(id);
				}
			}
			if (isCritical) {
				base *= 2;
			}
			let augment = victim.entity?.augments?.[currentElement];
			return {
				...d,
				damage: Math.round(base * baseTilt * (augment !== undefined ? augment : 1)),
				augmented: augment !== undefined ? (augment > 1 ? ' ++' : ' --') : undefined,
				usedShieldIds
			};
		})
	};
}

function sortDeck(deck) {
	deck.sort((a, b) => {
		const spellA = getSpell(a);
		const spellB = getSpell(b);
		if (spellA.element === spellB.element) {
			return spellA.name < spellB.name ? -1 : (spellA.name > spellB.name ? 1 : 0);
		}
		return spellA.element < spellB.element ? -1 : (spellA.element > spellB.element ? 1 : 0)
	});
}

function randomFromList(l) {
	return l[Math.floor(Math.random() * l.length)];
}

function getTotalVril(data, element) {
	const { vril, superVril } = data;
	if (element === data.entity.element) {
		return superVril * 2 + vril;
	}
	return superVril + vril;
}

function getEnchantmentTooltips(enchantments) {
	let tooltips = [];
	if (enchantments.damage) {
		tooltips.push(`+${enchantments.damage}AB`);
	}
	if (enchantments.accuracy) {
		tooltips.push(`+${enchantments.accuracy * 100}%CD`);
	}
	return tooltips
}

function iterateSpell(victimIndices, spellIndex, turnState, calculatedDamages) {
	let { battleData, aura } = turnState;
	const casterIndex = turnState.battleIndex;
	if (calculatedDamages.length === 1 && calculatedDamages[0] === 'FAILED') {
		const handSpell = battleData[casterIndex].hand[spellIndex];
		battleData[casterIndex].battleDeck = [
			handSpell,
			...battleData[casterIndex].battleDeck
		];
		battleData[casterIndex].hand.splice(spellIndex, 1);
		return { aura, battleData };
	}
	const spell = getSpell(battleData[casterIndex].hand[spellIndex].id);
	switch (spell.type) {
		case SPELL_TYPES.AURA:
			aura = {
				element: spell.auraElement,
				value: spell.auraValue,
				id: spell.id
			};
			break;
		case SPELL_TYPES.HEALING_BASIC:
			spell.heals.forEach(({ heal }) => battleData[victimIndices[0]].entity.health += heal);
			break;
		case SPELL_TYPES.ATTACK_BASIC:
		case SPELL_TYPES.ATTACK_ALL:
			{
				victimIndices.forEach((victimIndex, i) => {
					let newShields = [];
					const { usedBladeIds, damages } = calculatedDamages[i];
					damages.forEach(({ damage, usedShieldIds, steal }) => {
						for (let j = 0; j < battleData[victimIndex].shields.length; j++) {
							if (!usedShieldIds.map(({ index }) => index).includes(j)) {
								newShields.push(battleData[victimIndex].shields[j]);
							}
						}
						battleData[victimIndex].entity.health += damage;
						if (steal) {
							battleData[casterIndex].entity.health -= damage * steal;
						}
					});
					battleData[casterIndex].blades = battleData[casterIndex].blades.filter((_, j) => !usedBladeIds.map(({ index }) => index).includes(j));
					battleData[victimIndex].shields = newShields;
				});
			}
			break;
	}
	if (spell.victimShields) {
		victimIndices.forEach(i => {
			battleData[i].shields = [
				...battleData[i].shields,
				...spell.victimShields
			];
		});
	}
	if (spell.casterShields) {
		battleData[casterIndex].shields = [
			...battleData[casterIndex].shields,
			...spell.casterShields
		];
	}
	if (spell.victimBlades) {
		victimIndices.forEach(i => {
			battleData[i].blades = [
				...battleData[i].blades,
				...spell.victimBlades
			];
		});
	}
	if (spell.casterBlades) {
		battleData[casterIndex].blades = [
			...battleData[casterIndex].blades,
			...spell.casterBlades
		];
	}

	let vrilLeft = spell.vrilRequired;
	while (vrilLeft > 1 && battleData[casterIndex].superVril > 0) {
		battleData[casterIndex].superVril--;
		vrilLeft -= 2;
	}
	if (battleData[casterIndex].vril === 0) {
		battleData[casterIndex].superVril -= Math.ceil(vrilLeft / 2);
	} else {
		battleData[casterIndex].vril -= vrilLeft;
	}
	battleData[casterIndex].hand.splice(spellIndex, 1);

	for (let i = 0; i < battleData.length; i++) {
		if (battleData[i] === null) {
			continue;
		}
		battleData[i].entity.health = Math.round(battleData[i].entity.health);
		if (battleData[i].entity.health > battleData[i].entity.maxHealth) {
			battleData[i].entity.health = battleData[i].entity.maxHealth;
		}
	}
	return {
		aura,
		battleData
	};
}

function generateBattleEntity(entity, AI) {
	const battleDeck = entity.deck.map(id => ({ id }));

	shuffleArray(battleDeck);

	let hand = [];
	for (let i = 0; i < 7; i++) {
		const card = battleDeck.pop();
		if (!card) {
			break;
		}
		hand.push(card);
	}

	const hasSuperVril = Math.random() <= entity.superVrilChance;

	return {
		shields: [],
		blades: [],
		vril: hasSuperVril ? 0 : 1,
		superVril: hasSuperVril ? 1 : 0,
		entity,
		battleDeck,
		hand,
		AI
	}
}

function generateBattleState(leftEntities, rightEntities, onWin, onLose) {
	let leftBattleEntities = [
		...leftEntities.map(entity => generateBattleEntity(entity, randomAI))
	];
	shuffleArray(leftBattleEntities);

	let rightBattleEntities = [
		...rightEntities.map(entity => generateBattleEntity(entity, randomAI))
	];
	shuffleArray(rightBattleEntities);

	let battleData = [];
	for (let i = 0; i < 4; i++) {
		if (i < leftBattleEntities.length) {
			battleData.push(leftBattleEntities[i]);
		} else {
			battleData.push(null);
		}
	}
	for (let i = 0; i < 4; i++) {
		if (i < rightBattleEntities.length) {
			battleData.push(rightBattleEntities[i]);
		} else {
			battleData.push(null);
		}
	}


	const turnState = {
		battleData,
		selectedCards: [null, null, null, null, null, null, null, null],
		selectedVictims: [[], [], [], [], [], [], [], []],
		battleIndex: -1,
		aura: null
	};

	state.animationQueue.push(new AnimationEngine(getReturnSequence(turnState), TICK_TIME, FPS, canvas, ctx, reduceAnimationQueue));

	const battleState = {
		turnState,
		playerIndex: battleData.findIndex(battleEntity => battleEntity !== null && battleEntity.entity.id === state.player.id),
		onWin,
		onLose
	};
	selectCardsForAI(battleState);
	return battleState;
}

function selectCardsForAI(battleState) {
	const { turnState, playerIndex } = battleState;
	turnState.battleData.forEach((battleEntity, i) => {
		if (!battleEntity) {
			return;
		}
		if (playerIndex !== i && battleEntity.AI) {
			const { selectedCard, selectedVictims } = battleEntity.AI(i, turnState.battleData);
			turnState.selectedCards[i] = selectedCard;
			turnState.selectedVictims[i] = selectedVictims;
		}
	});
}