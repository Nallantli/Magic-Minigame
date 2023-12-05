function drawBattleIdle(battleState, iterator) { // battleData, selectedCards, selectedVictims, playerIndex) {
	let inputData = {};
	const { battleData, selectedCards, selectedVictims, playerIndex } = battleState;
	const selectedPlayerSpell = selectedCards[playerIndex] === undefined ? undefined : getSpell(battleData[playerIndex].hand[selectedCards[playerIndex]]);

	for (let i = 0; i < 4; i++) {
		const battleEntity = battleData[i];
		if (!battleEntity) {
			continue;
		}
		const selectedEntitySpell = selectedCards[i] === undefined ? undefined : getSpell(battleData[i].hand[selectedCards[i]]);

		if (selectedPlayerSpell === undefined || canUseSpellOn(selectedPlayerSpell, playerIndex, i)) {
			ctx.globalAlpha = 1;
			makeInteractable(scale(2), i * scale(67) + scale(2), scale(160), scale(65),
				() => { },
				({ x, y, sizeX, sizeY }) => selectedPlayerSpell !== undefined && sprites.PLACARD_160x65.draw(ctx, x, y, sizeX, sizeY),
				() => {
					if (selectedPlayerSpell !== undefined && canUseSpellOn(selectedPlayerSpell, playerIndex, i)) {
						inputData.selectedVictims = [i];
					}
				});
		} else {
			ctx.globalAlpha = 0.25;
		}

		const { shields, blades, vril, superVril, entity } = battleEntity;

		shields.forEach(({ value, id, element }, j) => {
			makeInteractable(scale(57) + j * scale(12), i * scale(67) + scale(28), scale(10), scale(12),
				({ x, y, sizeX, sizeY }) => spellSpriteDirectory[id].draw(ctx, x, y, sizeX, sizeY),
				({ x, y, renderCallback }) => {
					renderCallback();
					const str = `${value > 0 ? '+' : ''}${value}%`;
					numberText.draw(ctx, x + scale(5 - str.length * 2), y + scale(14), scale(4), scale(6), ELEMENT_COLORS[element], str);
				});
		});

		blades.forEach(({ value, id, element }, j) => {
			makeInteractable(scale(57) + j * scale(12), i * scale(67) + scale(50), scale(10), scale(12),
				({ x, y, sizeX, sizeY }) => spellSpriteDirectory[id].draw(ctx, x, y, sizeX, sizeY),
				({ x, y, renderCallback }) => {
					renderCallback();
					const str = `${value > 0 ? '+' : ''}${value}%`;
					numberText.draw(ctx, x + scale(5 - str.length * 2), y - scale(8), scale(4), scale(6), ELEMENT_COLORS[element], str);
				});
		});

		font.draw(ctx, scale(57), i * scale(67) + scale(5), scale(6), scale(8), 0, entity.name);
		const healthString = String(entity.health);
		numberText.draw(ctx, scale(161 - healthString.length * 4), i * scale(67) + scale(21), scale(4), scale(6), 0, healthString);
		const healthBarWidth = Math.round(106 * entity.health / entity.maxHealth);
		ctx.fillStyle = 'white';
		ctx.fillRect(scale(161 - healthBarWidth), i * scale(67) + scale(15), scale(healthBarWidth), scale(4));

		entity.idleSprite.draw(ctx, 0, i * scale(67) + 10, scale(64), scale(64), { iIndex: iterator % entity.idleSprite.indices });
		for (let j = 0; j < superVril; j++) {
			sprites.SUPER_VRIL_4x4.draw(ctx, scale(6), (i + 1) * scale(67) - j * scale(6) - scale(10), scale(4), scale(4), { iIndex: ELEMENT_COLORS[entity.element] });
		}
		for (let j = 0; j < vril; j++) {
			sprites.VRIL_4x4.draw(ctx, scale(6), (i + 1) * scale(67) - (j + superVril) * scale(6) - scale(10), scale(4), scale(4), { iIndex: ELEMENT_COLORS[entity.element] });
		}

		if (selectedEntitySpell) {
			getCardSprite(selectedEntitySpell).draw(ctx, scale(168), i * scale(67) + scale(10), scale(24), scale(32));
			if (selectedVictims[i].length > 0) {
				const index = selectedVictims[i];
				selectedVictims[i].forEach(index => {
					if (index < 4) {
						numberText.draw(ctx, scale(170), i * scale(67) + scale(49), scale(8), scale(12), 0, String(index + 1));
						sprites.VICTIM_ARROW_8x16.draw(ctx, scale(182), i * scale(67) + scale(46), scale(8), scale(16), { iIndex: 1 });
					} else {
						numberText.draw(ctx, scale(182), i * scale(67) + scale(49), scale(8), scale(12), 0, String(index - 3));
						sprites.VICTIM_ARROW_8x16.draw(ctx, scale(170), i * scale(67) + scale(46), scale(8), scale(16), { iIndex: 0 });
					}
				});
			}
		}

		if (selectedCards[i] === 'PASS') {
			sprites.PASS_24x32.draw(ctx, scale(168), i * scale(67) + scale(10), scale(24), scale(32));
		}
	}

	for (let i = 4; i < 8; i++) {
		const battleEntity = battleData[i];
		const i_offset = i - 4;

		if (!battleEntity) {
			continue;
		}

		if (selectedPlayerSpell === undefined || canUseSpellOn(selectedPlayerSpell, playerIndex, i)) {
			ctx.globalAlpha = 1;
			makeInteractable(scale(480 - 162), i_offset * scale(67) + scale(2), scale(160), scale(65),
				() => { },
				({ x, y, sizeX, sizeY }) => selectedPlayerSpell !== undefined && sprites.PLACARD_RIGHT_160x65.draw(ctx, x, y, sizeX, sizeY),
				() => {
					if (selectedPlayerSpell !== undefined && canUseSpellOn(selectedPlayerSpell, playerIndex, i)) {
						inputData.selectedVictims = [i];
					}
				});
		} else {
			ctx.globalAlpha = 0.25;
		}

		const { shields, blades, vril, superVril, entity } = battleEntity;

		shields.forEach(({ value, id, element }, j) => {
			makeInteractable(scale(480 - 67) - j * scale(12), i_offset * scale(67) + scale(28), scale(10), scale(12),
				({ x, y, sizeX, sizeY }) => spellSpriteDirectory[id].draw(ctx, x, y, sizeX, sizeY),
				({ x, y, renderCallback }) => {
					renderCallback();
					const str = `${value > 0 ? '+' : ''}${value}%`;
					numberText.draw(ctx, x + scale(5 - str.length * 2), y + scale(14), scale(4), scale(6), ELEMENT_COLORS[element], str);
				});
		});

		blades.forEach(({ value, id, element }, j) => {
			makeInteractable(scale(480 - 67) - j * scale(12), i_offset * scale(67) + scale(50), scale(10), scale(12),
				({ x, y, sizeX, sizeY }) => spellSpriteDirectory[id].draw(ctx, x, y, sizeX, sizeY),
				({ x, y, renderCallback }) => {
					renderCallback();
					const str = `${value > 0 ? '+' : ''}${value}%`;
					numberText.draw(ctx, x + scale(5 - str.length * 2), y - scale(8), scale(4), scale(6), ELEMENT_COLORS[element], str);
				});
		});

		font.draw(ctx, scale(480 - 57 - entity.name.length * 6), i_offset * scale(67) + scale(5), scale(6), scale(8), 0, entity.name);
		const healthString = String(entity.health);
		numberText.draw(ctx, scale(480 - 160), i_offset * scale(67) + scale(21), scale(4), scale(6), 0, healthString);
		const healthBarWidth = Math.round(106 * entity.health / entity.maxHealth);
		ctx.fillStyle = 'white';
		ctx.fillRect(scale(480 - 161), i_offset * scale(67) + scale(15), scale(healthBarWidth), scale(4));

		entity.idleSprite.draw(ctx, scale(480 - 64), i_offset * scale(67) + 10, scale(64), scale(64), { iIndex: iterator % entity.idleSprite.indices, mirror: true });
		for (let j = 0; j < superVril; j++) {
			sprites.SUPER_VRIL_4x4.draw(ctx, scale(480 - 10), (i_offset + 1) * scale(67) - j * scale(6) - scale(10), scale(4), scale(4), { iIndex: ELEMENT_COLORS[entity.element] });
		}
		for (let j = 0; j < vril; j++) {
			sprites.VRIL_4x4.draw(ctx, scale(480 - 10), (i_offset + 1) * scale(67) - (j + superVril) * scale(6) - scale(10), scale(4), scale(4), { iIndex: ELEMENT_COLORS[entity.element] });
		}
	}

	return inputData;
}

function drawCards(battleState) { //playerData, selectedCard) {
	const { selectedCards, playerIndex, battleData } = battleState;
	const playerData = battleData[playerIndex];
	const selectedCard = selectedCards[playerIndex];

	const startX = scale(240 - playerData.hand.length * 25);
	let inputData = {};

	playerData.hand.forEach((spellId, i) => {
		const spell = getSpell(spellId);
		const hasEnoughVril = getTotalVril(playerData, spell.element) >= spell.vrilRequired;
		if (hasEnoughVril && selectedCard === undefined || selectedCard === i) {
			ctx.globalAlpha = 1;
		} else {
			ctx.globalAlpha = 0.25;
		}

		makeInteractable(startX + scale(50 * i), scale(276), scale(48), scale(64),
			({ x, y, sizeX, sizeY }) => getCardSprite(spell).draw(ctx, x, y, sizeX, sizeY, 0),
			({ x, y, sizeX, renderCallback }) => {
				renderCallback();
				if (hasEnoughVril) {
					ctx.fillStyle = 'white';
					ctx.fillRect(x, y + scale(66), sizeX, scale(4));
				}
			},
			() => {
				if (selectedCard === undefined) {
					inputData.selectedCard = i;
					if (spell.type === SPELL_TYPES.ATTACK_ALL) {
						inputData.selectedVictims = [];
						for (let j = (playerIndex < 4 ? 4 : 0); j < (playerIndex < 4 ? 8 : 4); j++) {
							if (battleData[j] === undefined) {
								continue;
							}
							inputData.selectedVictims.push(j);
						}
					}
				}
			},
			{
				forceHoverOn: () => selectedCard === i,
				onRightPress: () => {
					if (selectedCard === undefined) {
						inputData.discardCard = i;
					}
				}
			});
	});

	if (selectedCard === undefined) {
		ctx.globalAlpha = 1;
	} else {
		ctx.globalAlpha = 0.25;
	}

	makeInteractable(scale(240 - 20), scale(348), scale(39), scale(16),
		({ x, y, sizeX, sizeY }) => sprites.PASS_39x16.draw(ctx, x, y, sizeX, sizeY, 0),
		({ x, y, sizeX, renderCallback }) => {
			renderCallback();

			ctx.fillStyle = 'white';
			ctx.fillRect(x, y + scale(18), sizeX, scale(4));
		},
		() => {
			if (selectedCard === undefined) {
				inputData.selectedCard = 'PASS';
			}
		});

	return inputData;
}

function getReturnSequence(battleData) {
	return {
		ticks: 10,
		actions: [
			...battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i < 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ battleEntity, i }) => ({
				tick: 0,
				type: ATYPES.INITIALIZE_ENTITY,
				id: `left.${i}`,
				sprite: battleEntity.entity.idleSprite,
				alpha: 1,
				posX: scale(-64),
				posY: i * scale(67) + 10,
				sizeX: scale(64),
				sizeY: scale(64),
				rot: 0,
				zIndex: 1,
				play: battleEntity.entity.idleSprite.indices > 1
			})),
			...battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i < 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ i }) => ({
				startTick: 0,
				endTick: 9,
				type: ATYPES.CHANGE_POSITION_X,
				id: `left.${i}`,
				posX: 0,
				ease: EASE_TYPES.EASE_IN
			})),
			...battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i >= 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ battleEntity, i }) => ({
				tick: 0,
				type: ATYPES.INITIALIZE_ENTITY,
				id: `right.${i}`,
				sprite: battleEntity.entity.idleSprite,
				alpha: 1,
				posX: scale(480),
				posY: (i - 4) * scale(67) + 10,
				sizeX: scale(64),
				sizeY: scale(64),
				rot: 0,
				zIndex: 1,
				play: battleEntity.entity.idleSprite.indices > 1,
				mirror: true
			})),
			...battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i >= 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ i }) => ({
				startTick: 0,
				endTick: 9,
				type: ATYPES.CHANGE_POSITION_X,
				id: `right.${i}`,
				posX: scale(480 - 64),
				ease: EASE_TYPES.EASE_IN
			}))
		]
	};
}

function battleGameLoop(timeMs) {
	const { battleState, iterator } = state;
	const { onWin, onLose } = battleState;

	let inputData = {};

	if (battleState.battleIndex === -1) {
		battleState.battleData.forEach((battleEntity, i) => {
			if (!battleEntity) {
				return;
			}
			if (battleState.selectedCards[i] !== undefined) {
				return;
			}
			if (battleState.playerIndex !== i && battleEntity.AI) {
				const { selectedCard, selectedVictims } = battleEntity.AI(i, battleState.battleData);
				battleState.selectedCards[i] = selectedCard;
				battleState.selectedVictims[i] = selectedVictims;
			}
		});

		inputData = {
			...inputData,
			...drawCards(battleState), // battleData.left[0], selectedCards[playerIndex])
			...drawBattleIdle(battleState, iterator) // battleData, selectedCards, selectedVictims, playerIndex)
		};

		ctx.globalAlpha = 1;
		ctx.fillStyle = 'white';
		ctx.fillRect(0, scale(270), scale(480), scale(1));

		// handle input
		if (inputData.selectedCard !== undefined) {
			battleState.selectedCards[battleState.playerIndex] = inputData.selectedCard;
		}
		if (inputData.selectedVictims !== undefined) {
			battleState.selectedVictims[battleState.playerIndex] = inputData.selectedVictims;
		}
		if (inputData.discardCard !== undefined) {
			battleState.battleData[battleState.playerIndex].hand.splice(inputData.discardCard, 1);
		}
		if (rightClickPos && battleState.selectedCards[battleState.playerIndex] !== undefined) {
			battleState.selectedCards[battleState.playerIndex] = undefined;
		}
		if (battleState.selectedCards[battleState.playerIndex] === 'PASS' || battleState.selectedVictims[battleState.playerIndex].length > 0) {
			const withdrawAnimationData = {
				ticks: 10,
				actions: [
					...battleState.battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i < 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ battleEntity, i }) => ({
						tick: 0,
						type: ATYPES.INITIALIZE_ENTITY,
						id: `left.${i}`,
						sprite: battleEntity.entity.idleSprite,
						alpha: 1,
						posX: 0,
						posY: i * scale(67) + 10,
						sizeX: scale(64),
						sizeY: scale(64),
						rot: 0,
						zIndex: 1,
						play: battleEntity.entity.idleSprite.indices > 1
					})),
					...battleState.battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i < 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ battleEntity, i }) => ({
						startTick: 0,
						endTick: 9,
						type: ATYPES.CHANGE_POSITION_X,
						id: `left.${i}`,
						posX: scale(-64),
						ease: EASE_TYPES.EASE_IN
					})),
					...battleState.battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i >= 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ battleEntity, i }) => ({
						tick: 0,
						type: ATYPES.INITIALIZE_ENTITY,
						id: `right.${i}`,
						sprite: battleEntity.entity.idleSprite,
						alpha: 1,
						posX: scale(480 - 64),
						posY: (i - 4) * scale(67) + 10,
						sizeX: scale(64),
						sizeY: scale(64),
						rot: 0,
						zIndex: 1,
						play: battleEntity.entity.idleSprite.indices > 1,
						mirror: true
					})),
					...battleState.battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i >= 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ battleEntity, i }) => ({
						startTick: 0,
						endTick: 9,
						type: ATYPES.CHANGE_POSITION_X,
						id: `right.${i}`,
						posX: scale(480),
						ease: EASE_TYPES.EASE_IN
					}))
				]
			};

			state.animationQueue.push(new AnimationEngine(withdrawAnimationData, TICK_TIME, FPS, canvas, ctx, reduceAnimationQueue));
			battleState.battleIndex = 0;
		}
	} else {
		const postBattle = () => {
			battleState.battleIndex++;
			if (battleState.battleIndex === 8) {
				battleState.selectedVictims = [[], [], [], [], [], [], [], []];
				battleState.selectedCards = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
				for (let i = 0; i < battleState.battleData.length; i++) {
					if (battleState.battleData[i] && battleState.battleData[i].entity.health > 0) {
						if (Math.random() <= battleState.battleData[i].superVrilChance) {
							battleState.battleData[i].superVril++;
						} else {
							battleState.battleData[i].vril++;
						}
					} else if (battleState.battleData[i] && battleState.battleData[i].entity.health <= 0) {
						battleState.battleData[i] = undefined;
					}
				}
				for (let i = 0; i < battleState.battleData.length; i++) {
					if (!battleState.battleData[i]) {
						continue;
					}
					while (battleState.battleData[i].hand.length < 7) {
						const cardId = battleState.battleData[i].deck.pop();
						if (!cardId) {
							break;
						}
						battleState.battleData[i].hand.push(cardId);
					}
				}
				battleState.battleIndex = -1;
				if (battleState.battleData[battleState.playerIndex] === undefined) {
					onLose();
				} else if (
					(battleState.playerIndex < 4 && battleState.battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i >= 4).filter(({ battleEntity }) => battleEntity !== undefined).length === 0)
					|| (battleState.playerIndex >= 4 && battleState.battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i < 4).filter(({ battleEntity }) => battleEntity !== undefined).length === 0)) {
					onWin();
				} else {
					state.animationQueue.push(new AnimationEngine(getReturnSequence(battleState.battleData), TICK_TIME, FPS, canvas, ctx, reduceAnimationQueue));
				}
			}
		};

		if (!battleState.battleData[battleState.battleIndex] || battleState.selectedCards[battleState.battleIndex] === 'PASS') {
			postBattle();
		} else {
			const victimIndices = battleState.selectedVictims[battleState.battleIndex]
				.filter(i => battleState.battleData[i] !== undefined && battleState.battleData[i].entity.health > 0);
			if (victimIndices.length > 0 && battleState.battleData[battleState.battleIndex].entity.health > 0) {
				const spellIndex = battleState.selectedCards[battleState.battleIndex];
				const spell = getSpell(battleState.battleData[battleState.battleIndex].hand[spellIndex]);
				const calculatedDamages = victimIndices
					.map(i => battleState.battleData[i])
					.map(victimData => calculateDamages(
						spell,
						battleState.battleData[battleState.battleIndex],
						victimData));
				const sequence = battleState.battleIndex < 4
					? createLeftAttackSequence(battleState.battleData, battleState.battleIndex, victimIndices.toReversed(), spell, calculatedDamages.toReversed(), 0)
					: createRightAttackSequence(battleState.battleData, battleState.battleIndex, victimIndices.toReversed(), spell, calculatedDamages.toReversed(), 0);
				const animation = new AnimationEngine({
					ticks: sequence.length,
					actions: sequence.actions
				}, TICK_TIME, FPS, canvas, ctx, () => {
					reduceAnimationQueue();
					battleState.battleData = iterateSpell(battleState.battleIndex, victimIndices, spellIndex, battleState.battleData, calculatedDamages);
					postBattle();
				});
				state.animationQueue.push(animation);
			} else {
				postBattle();
			}
		}
	}
}