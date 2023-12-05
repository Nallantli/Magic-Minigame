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
	if (options?.forceHoverOn({ x, y, sizeX, sizeY }) || (mousePos.x >= x && mousePos.x < x + sizeX && mousePos.y >= y && mousePos.y < y + sizeY)) {
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

function criticalChance(cra, crb) {
	const diff = cra - crb;
	return ((diff - 32) / (2 * (16 + Math.abs(diff - 32))) + 0.5) * (Math.min(cra, 100) / 100);
}

function calculateDamages(spell, caster, victim) {
	if (spell.type !== SPELL_TYPES.ATTACK_ALL && spell.type !== SPELL_TYPES.ATTACK_BASIC) {
		return {};
	}

	const isCritical = Math.random() <= criticalChance(caster.entity.criticalRating, victim.entity.criticalRating);

	const shields = victim.shields;
	const blades = caster.blades;
	let usedBladeIds = [];
	let totalUsedBladeIds = [];
	let baseTilt = 1;
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
			let base = d.damage !== undefined ? d.damage : (Math.random() * (d.maxDamage - d.minDamage) + d.minDamage);
			let usedShieldIds = [];
			let currentElement = d.element;
			shields.forEach(({ id, value, element, elementTo }, i) => {
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
			});
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
		if (a.element === b.element) {
			return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
		}
		return a.element < b.element ? -1 : (a.element > b.element ? 1 : 0)
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

function iterateSpell(casterIndex, victimIndices, spellIndex, battleData, calculatedDamages) {
	const spell = getSpell(battleData[casterIndex].hand[spellIndex]);
	switch (spell.type) {
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
		if (battleData[i] === undefined) {
			continue;
		}
		battleData[i].entity.health = Math.round(battleData[i].entity.health);
		if (battleData[i].entity.health > battleData[i].entity.maxHealth) {
			battleData[i].entity.health = battleData[i].entity.maxHealth;
		}
	}
	return battleData;
}

function generateBattleEntity(entity, AI) {
	const deck = [
		...entity.deck
	];

	shuffleArray(deck);

	let hand = [];
	for (let i = 0; i < 7; i++) {
		const card = deck.pop();
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
		deck,
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
			battleData.push(undefined);
		}
	}
	for (let i = 0; i < 4; i++) {
		if (i < rightBattleEntities.length) {
			battleData.push(rightBattleEntities[i]);
		} else {
			battleData.push(undefined);
		}
	}

	state.animationQueue.push(new AnimationEngine(getReturnSequence(battleData), TICK_TIME, FPS, canvas, ctx, reduceAnimationQueue));

	const battleState = {
		iterator: 0,
		startTime: undefined,
		battleData,
		selectedCards: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
		selectedVictims: [[], [], [], [], [], [], [], []],
		playerIndex: battleData.findIndex(battleEntity => battleEntity !== undefined && battleEntity.entity.id === 'player_character'),
		battleIndex: -1,
		onWin,
		onLose
	};

	selectCardsForAI(battleState);
	return battleState;
}

function selectCardsForAI(battleState) {
	battleState.battleData.forEach((battleEntity, i) => {
		if (!battleEntity) {
			return;
		}
		if (battleState.playerIndex !== i && battleEntity.AI) {
			const { selectedCard, selectedVictims } = battleEntity.AI(i, battleState.battleData);
			battleState.selectedCards[i] = selectedCard;
			battleState.selectedVictims[i] = selectedVictims;
		}
	});
}