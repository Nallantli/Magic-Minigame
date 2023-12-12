function drawBattleField(battleState, iterator) { // battleData, selectedCards, selectedVictims, playerIndex) {
	let inputData = {};
	const { turnState: { battleData, selectedCards, selectedVictims }, playerIndex } = battleState;
	const selectedPlayerSpell = (selectedCards[playerIndex] === null || selectedCards[playerIndex] === 'PASS' || battleData[playerIndex].hand?.[selectedCards[playerIndex]]?.id === undefined)
		? null
		: getSpell(battleData[playerIndex].hand?.[selectedCards[playerIndex]]?.id);

	let tooltips = [];

	for (let i = 0; i < 4; i++) {
		const battleEntity = battleData[i];
		if (!battleEntity) {
			continue;
		}

		if (selectedPlayerSpell === null || selectedVictims[playerIndex].length > 0 || selectedPlayerSpell.type === SPELL_TYPES.ENCHANTMENT) {
			ctx.globalAlpha = 1;
		} else if (selectedVictims[playerIndex].length === 0 && canUseSpellOn(selectedPlayerSpell, playerIndex, i)) {
			ctx.globalAlpha = 1;
			makeInteractable(scale(2), i * scale(67) + scale(2), scale(160), scale(65),
				() => { },
				({ x, y, sizeX, sizeY }) => selectedPlayerSpell !== null && sprites.PLACARD_160x65.draw(ctx, x, y, sizeX, sizeY),
				() => {
					if (selectedPlayerSpell !== null && canUseSpellOn(selectedPlayerSpell, playerIndex, i)) {
						inputData.selectedVictims = [i];
					}
				});
		} else {
			ctx.globalAlpha = 0.25;
		}

		const { shields, blades, vril, superVril, entity } = battleEntity;

		shields.forEach(({ value, id, element, elementTo }, j) => {
			makeInteractable(scale(57) + j * scale(12), i * scale(67) + scale(28), scale(10), scale(12),
				({ x, y, sizeX, sizeY }) => spellSpriteDirectory[id].draw(ctx, x, y, sizeX, sizeY),
				({ x, y, renderCallback }) => {
					renderCallback();
					const str = elementTo === undefined ? `${value > 0 ? '+' : ''}${value}% Incoming` : `${element.toUpperCase()} to ${elementTo.toUpperCase()}`;
					tooltips.push(makeTextToolTip(str, scale(6), scale(8), ELEMENT_COLORS[element]));
				});
		});

		blades.forEach(({ value, id, element }, j) => {
			makeInteractable(scale(57) + j * scale(12), i * scale(67) + scale(44), scale(10), scale(12),
				({ x, y, sizeX, sizeY }) => spellSpriteDirectory[id].draw(ctx, x, y, sizeX, sizeY),
				({ x, y, renderCallback }) => {
					renderCallback();
					const str = `${value > 0 ? '+' : ''}${value}% Outgoing`;
					tooltips.push(makeTextToolTip(str, scale(6), scale(8), ELEMENT_COLORS[element]));
				});
		});

		font.draw(ctx, scale(57), i * scale(67) + scale(5), scale(6), scale(8), ELEMENT_COLORS[entity.element], entity.name);
		const healthString = String(entity.health);
		numberText.draw(ctx, scale(161 - healthString.length * 4), i * scale(67) + scale(21), scale(4), scale(6), 0, healthString);
		const healthBarWidth = Math.round(106 * entity.health / entity.maxHealth);
		ctx.fillStyle = 'white';
		ctx.fillRect(scale(161 - healthBarWidth), i * scale(67) + scale(15), scale(healthBarWidth), scale(4));

		getIdleSprite(entity).draw(ctx, 0, i * scale(67) + 10, scale(64), scale(64), { iIndex: iterator % getIdleSprite(entity).indices });
		for (let j = 0; j < superVril; j++) {
			sprites.SUPER_VRIL_4x4.draw(ctx, scale(6), (i + 1) * scale(67) - j * scale(6) - scale(10), scale(4), scale(4), { iIndex: ELEMENT_COLORS[entity.element] });
		}
		for (let j = 0; j < vril; j++) {
			sprites.VRIL_4x4.draw(ctx, scale(6), (i + 1) * scale(67) - (j + superVril) * scale(6) - scale(10), scale(4), scale(4), { iIndex: ELEMENT_COLORS[entity.element] });
		}

		if (playerIndex < 4) {
			const selectedEntitySpell = (selectedCards[i] === null || selectedCards[i] === 'PASS' || battleData[i].hand?.[selectedCards[i]]?.id === undefined)
				? null
				: getSpell(battleData[i].hand?.[selectedCards[i]]?.id);
			if (selectedEntitySpell) {
				getCardSprite(selectedEntitySpell).draw(ctx, scale(168), i * scale(67) + scale(10), scale(24), scale(32));
				if (battleData[i].hand[selectedCards[i]].enchantments) {
					sprites.ENCHANTMENT_BORDER_48x64.draw(ctx, scale(168), i * scale(67) + scale(10), scale(24), scale(32), { iIndex: iterator % 31 });
				}
				if (selectedVictims[i].length > 0) {
					const index = selectedVictims[i][0];
					if (index < 4) {
						numberText.draw(ctx, scale(170), i * scale(67) + scale(49), scale(8), scale(12), 0, selectedVictims[i].length === 1 ? String(index + 1) : 'X');
						sprites.VICTIM_ARROW_8x16.draw(ctx, scale(182), i * scale(67) + scale(46), scale(8), scale(16), { iIndex: 1 });
					} else {
						numberText.draw(ctx, scale(182), i * scale(67) + scale(49), scale(8), scale(12), 0, selectedVictims[i].length === 1 ? String(index - 3) : 'X');
						sprites.VICTIM_ARROW_8x16.draw(ctx, scale(170), i * scale(67) + scale(46), scale(8), scale(16), { iIndex: 0 });
					}
				}
			}

			if (selectedCards[i] === 'PASS') {
				sprites.PASS_24x32.draw(ctx, scale(168), i * scale(67) + scale(10), scale(24), scale(32));
			}
		}
	}

	for (let i = 4; i < 8; i++) {
		const battleEntity = battleData[i];
		const i_offset = i - 4;

		if (!battleEntity) {
			continue;
		}

		if (selectedPlayerSpell === null || selectedVictims[playerIndex].length > 0 || selectedPlayerSpell.type === SPELL_TYPES.ENCHANTMENT) {
			ctx.globalAlpha = 1;
		} else if (selectedVictims[playerIndex].length === 0 && canUseSpellOn(selectedPlayerSpell, playerIndex, i)) {
			ctx.globalAlpha = 1;
			makeInteractable(scale(480 - 162), i_offset * scale(67) + scale(2), scale(160), scale(65),
				() => { },
				({ x, y, sizeX, sizeY }) => selectedPlayerSpell !== null && sprites.PLACARD_RIGHT_160x65.draw(ctx, x, y, sizeX, sizeY),
				() => {
					if (selectedPlayerSpell !== null && canUseSpellOn(selectedPlayerSpell, playerIndex, i)) {
						inputData.selectedVictims = [i];
					}
				});
		} else {
			ctx.globalAlpha = 0.25;
		}

		const { shields, blades, vril, superVril, entity } = battleEntity;

		shields.forEach(({ value, id, element, elementTo }, j) => {
			makeInteractable(scale(480 - 67) - j * scale(12), i_offset * scale(67) + scale(28), scale(10), scale(12),
				({ x, y, sizeX, sizeY }) => spellSpriteDirectory[id].draw(ctx, x, y, sizeX, sizeY),
				({ x, y, renderCallback }) => {
					renderCallback();
					const str = elementTo === undefined ? `${value > 0 ? '+' : ''}${value}% Incoming` : `${element.toUpperCase()} to ${elementTo.toUpperCase()}`;
					tooltips.push(makeTextToolTip(str, scale(6), scale(8), ELEMENT_COLORS[element]));
				});
		});

		blades.forEach(({ value, id, element }, j) => {
			makeInteractable(scale(480 - 67) - j * scale(12), i_offset * scale(67) + scale(44), scale(10), scale(12),
				({ x, y, sizeX, sizeY }) => spellSpriteDirectory[id].draw(ctx, x, y, sizeX, sizeY),
				({ x, y, renderCallback }) => {
					renderCallback();
					const str = `${value > 0 ? '+' : ''}${value}% Outgoing`;
					tooltips.push(makeTextToolTip(str, scale(6), scale(8), ELEMENT_COLORS[element]));
				});
		});

		font.draw(ctx, scale(480 - 57 - entity.name.length * 6), i_offset * scale(67) + scale(5), scale(6), scale(8), ELEMENT_COLORS[entity.element], entity.name);
		const healthString = String(entity.health);
		numberText.draw(ctx, scale(480 - 160), i_offset * scale(67) + scale(21), scale(4), scale(6), 0, healthString);
		const healthBarWidth = Math.round(106 * entity.health / entity.maxHealth);
		ctx.fillStyle = 'white';
		ctx.fillRect(scale(480 - 161), i_offset * scale(67) + scale(15), scale(healthBarWidth), scale(4));

		getIdleSprite(entity).draw(ctx, scale(480 - 64), i_offset * scale(67) + 10, scale(64), scale(64), { iIndex: iterator % getIdleSprite(entity).indices, mirror: true });
		for (let j = 0; j < superVril; j++) {
			sprites.SUPER_VRIL_4x4.draw(ctx, scale(480 - 10), (i_offset + 1) * scale(67) - j * scale(6) - scale(10), scale(4), scale(4), { iIndex: ELEMENT_COLORS[entity.element] });
		}
		for (let j = 0; j < vril; j++) {
			sprites.VRIL_4x4.draw(ctx, scale(480 - 10), (i_offset + 1) * scale(67) - (j + superVril) * scale(6) - scale(10), scale(4), scale(4), { iIndex: ELEMENT_COLORS[entity.element] });
		}

		if (playerIndex >= 4) {
			const selectedEntitySpell = (selectedCards[i] === null || selectedCards[i] === 'PASS' || battleData[i].hand?.[selectedCards[i]]?.id === undefined)
				? null
				: getSpell(battleData[i].hand?.[selectedCards[i]]?.id);
			if (selectedEntitySpell) {
				getCardSprite(selectedEntitySpell).draw(ctx, scale(480 - 168 - 24), i_offset * scale(67) + scale(10), scale(24), scale(32));
				if (battleData[i].hand[selectedCards[i]].enchantments) {
					sprites.ENCHANTMENT_BORDER_48x64.draw(ctx, scale(480 - 168 - 24), i_offset * scale(67) + scale(10), scale(24), scale(32), { iIndex: iterator % 31 });
				}
				if (selectedVictims[i].length > 0) {
					const index = selectedVictims[i][0];
					if (index < 4) {
						numberText.draw(ctx, scale(480 - 182 - 8), i_offset * scale(67) + scale(49), scale(8), scale(12), 0, selectedVictims[i].length === 1 ? String(index + 1) : 'X');
						sprites.VICTIM_ARROW_8x16.draw(ctx, scale(480 - 170 - 8), i_offset * scale(67) + scale(46), scale(8), scale(16), { iIndex: 1 });
					} else {
						numberText.draw(ctx, scale(480 - 170 - 8), i_offset * scale(67) + scale(49), scale(8), scale(12), 0, selectedVictims[i].length === 1 ? String(index - 3) : 'X');
						sprites.VICTIM_ARROW_8x16.draw(ctx, scale(480 - 182 - 8), i_offset * scale(67) + scale(46), scale(8), scale(16), { iIndex: 0 });
					}
				}
			}

			if (selectedCards[i] === 'PASS') {
				sprites.PASS_24x32.draw(ctx, scale(480 - 168 - 24), i_offset * scale(67) + scale(10), scale(24), scale(32));
			}
		}
	}

	ctx.globalAlpha = 1;
	tooltips.forEach(f => f(ctx));

	return inputData;
}

function drawCards(battleState, iterator) {
	const { turnState: { selectedCards, battleData, selectedVictims }, playerIndex } = battleState;
	const playerData = battleData[playerIndex];
	let inputData = {};
	if (playerData === null) {
		sprites.YOU_DIED_160x64.draw(ctx, scale(240 - 80), scale(280), scale(160), scale(64));
	} else {
		const selectedCard = selectedCards[playerIndex];

		const remainingDeck = playerData.battleDeck.length;

		const startX = scale(240 - (playerData.hand.length + (remainingDeck > 0 ? 1 : 0)) * 25);

		if (selectedCard !== null && selectedCard !== 'PASS' && getSpell(playerData.hand?.[selectedCard]?.id)?.type === SPELL_TYPES.ENCHANTMENT) {
			const enchantmentSpell = getSpell(playerData.hand[selectedCard].id);
			let validEnchantees = [];
			if (enchantmentSpell.damage) {
				validEnchantees = [
					...validEnchantees,
					SPELL_TYPES.ATTACK_ALL,
					SPELL_TYPES.ATTACK_BASIC
				];
			}
			if (enchantmentSpell.accuracy) {
				validEnchantees = [
					...validEnchantees,
					SPELL_TYPES.ATTACK_ALL,
					SPELL_TYPES.ATTACK_BASIC,
					SPELL_TYPES.HEALING_BASIC
				]
			}
			playerData.hand.forEach(({ id, enchantments }, i) => {
				const spell = getSpell(id);
				const canSelectCard = validEnchantees.includes(spell.type) && enchantments === undefined;
				if (canSelectCard) {
					ctx.globalAlpha = 1;
				} else {
					ctx.globalAlpha = 0.25;
				}

				makeInteractable(startX + scale(50 * i), scale(276), scale(48), scale(64),
					({ x, y, sizeX, sizeY }) => {
						getCardSprite(spell).draw(ctx, x, y, sizeX, sizeY);
						if (enchantments) {
							sprites.ENCHANTMENT_BORDER_48x64.draw(ctx, x, y, sizeX, sizeY, { iIndex: iterator % 31 });
						}
					},
					({ x, y, sizeX, renderCallback }) => {
						renderCallback();
						if (enchantments) {
							const enchantmentToolTips = getEnchantmentTooltips(enchantments);
							const startY = y - scale(8 + 6 * enchantmentToolTips.length);
							for (let j = 0; j < enchantmentToolTips.length; j++) {
								numberText.draw(ctx, x + scale(24 - enchantmentToolTips[j].length * 2), startY + scale(6 * j), scale(4), scale(6), 5, enchantmentToolTips[j]);
							}
						}
						if (canSelectCard) {
							ctx.fillStyle = 'white';
							ctx.fillRect(x, y + scale(66), sizeX, scale(4));
						}
					},
					() => {
						if (canSelectCard) {
							inputData.selectedVictims = i
						}
					});
			});
		} else {
			playerData.hand.forEach(({ id, enchantments }, i) => {
				const spell = getSpell(id);
				const canSelectCard = spell.type === SPELL_TYPES.ENCHANTMENT || getTotalVril(playerData, spell.element) >= spell.vrilRequired;
				if (selectedVictims[playerIndex].length === 0 && canSelectCard && (selectedCard === null || selectedCard === i)) {
					ctx.globalAlpha = 1;
				} else {
					ctx.globalAlpha = 0.25;
				}

				makeInteractable(startX + scale(50 * i), scale(276), scale(48), scale(64),
					({ x, y, sizeX, sizeY }) => {
						getCardSprite(spell).draw(ctx, x, y, sizeX, sizeY);
						if (enchantments) {
							sprites.ENCHANTMENT_BORDER_48x64.draw(ctx, x, y, sizeX, sizeY, { iIndex: iterator % 31 });
						}
					},
					({ x, y, sizeX, renderCallback }) => {
						renderCallback();
						if (enchantments) {
							const enchantmentToolTips = getEnchantmentTooltips(enchantments);
							const startY = y - scale(8 + 6 * enchantmentToolTips.length);
							for (let j = 0; j < enchantmentToolTips.length; j++) {
								numberText.draw(ctx, x + scale(24 - enchantmentToolTips[j].length * 2), startY + scale(6 * j), scale(4), scale(6), 5, enchantmentToolTips[j]);
							}
						}
						if (canSelectCard && selectedCard === null || selectedCard === i) {
							ctx.fillStyle = 'white';
							ctx.fillRect(x, y + scale(66), sizeX, scale(4));
						}
					},
					() => {
						if (selectedCard === null && canSelectCard) {
							inputData.selectedCard = i;
							if (spell.type === SPELL_TYPES.ATTACK_ALL) {
								inputData.selectedVictims = [];
								for (let j = (playerIndex < 4 ? 4 : 0); j < (playerIndex < 4 ? 8 : 4); j++) {
									if (battleData[j] === null) {
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
							if (selectedCard === null) {
								inputData.discardCard = i;
							}
						}
					});
			});
		}

		if (selectedCard === null) {
			ctx.globalAlpha = 1;
		} else {
			ctx.globalAlpha = 0.25;
		}

		makeInteractable(scale(240 - 20), scale(348), scale(39), scale(16),
			({ x, y, sizeX, sizeY }) => sprites.PASS_39x16.draw(ctx, x, y, sizeX, sizeY, 0),
			({ x, y, sizeX, renderCallback }) => {
				renderCallback();

				if (selectedCard === null) {
					ctx.fillStyle = 'white';
					ctx.fillRect(x, y + scale(18), sizeX, scale(4));
				}
			},
			() => {
				if (selectedCard === null) {
					inputData.selectedCard = 'PASS';
				}
			});

		if (remainingDeck > 0) {
			ctx.globalAlpha = 1;
			sprites.DECK_REMAIN_48x64.draw(ctx, scale(240 + (playerData.hand.length - 1) * 25), scale(276), scale(48), scale(64));
			const remainingText = `+${remainingDeck}`;

			numberText.draw(ctx, scale(240 + (playerData.hand.length - 1) * 25 + 24 - remainingText.length * 4), scale(292), scale(8), scale(12), 0, remainingText);
		}

	}
	return inputData;
}

function drawBattleIdle(state) {
	const { battleState, iterator } = state;

	const inputData = {
		...drawCards(battleState, iterator),
		...drawBattleField(battleState, iterator)
	};

	ctx.globalAlpha = 1;
	ctx.fillStyle = 'white';
	ctx.fillRect(0, scale(270), scale(480), scale(1));

	return inputData;
}

function areAllPlayersReady(turnState) {
	for (let i = 0; i < turnState.battleData.length; i++) {
		if (turnState.battleData[i] === null) {
			continue;
		}
		if (turnState.selectedCards[i] === null || (turnState.selectedCards[i] !== 'PASS' && turnState.selectedVictims[i].length === 0)) {
			return false;
		}
	}
	return true;
}

function handleInput(battleState, inputData) {
	const { playerIndex, turnState } = battleState;
	// handle input
	if (inputData.selectedCard !== undefined) {
		turnState.selectedCards[playerIndex] = inputData.selectedCard;
	}
	if (inputData.selectedVictims !== undefined) {
		if (typeof inputData.selectedVictims === 'number') {
			const enchantmentSpell = getSpell(turnState.battleData[playerIndex].hand[turnState.selectedCards[playerIndex]].id);
			turnState.battleData[playerIndex].hand[inputData.selectedVictims].enchantments = {
				damage: enchantmentSpell.damage,
				accuracy: enchantmentSpell.accuracy
			};
			turnState.battleData[playerIndex].hand.splice(turnState.selectedCards[playerIndex], 1);
			turnState.selectedCards[playerIndex] = null;
		} else {
			turnState.selectedVictims[playerIndex] = inputData.selectedVictims;
		}
	}
	if (inputData.discardCard !== undefined) {
		turnState.battleData[playerIndex].hand.splice(inputData.discardCard, 1);
	}
	if (rightClickPos) {
		if (turnState.selectedCards[playerIndex] !== null && turnState.selectedVictims[playerIndex].length === 0) {
			turnState.selectedCards[playerIndex] = null;
		} else if (turnState.selectedVictims[playerIndex].length > 0) {
			turnState.selectedVictims[playerIndex] = [];
		}
	}
}

function postBattle(turnState, callback) {
	turnState.battleIndex++;
	if (turnState.battleIndex === 8) {
		turnState.selectedVictims = [[], [], [], [], [], [], [], []];
		turnState.selectedCards = [null, null, null, null, null, null, null, null];
		for (let i = 0; i < turnState.battleData.length; i++) {
			if (turnState.battleData[i] && turnState.battleData[i].entity.health > 0) {
				if (Math.random() <= turnState.battleData[i].superVrilChance) {
					turnState.battleData[i].superVril++;
				} else {
					turnState.battleData[i].vril++;
				}
			} else if (turnState.battleData[i] && turnState.battleData[i].entity.health <= 0) {
				turnState.battleData[i] = null;
			}
		}
		for (let i = 0; i < turnState.battleData.length; i++) {
			if (!turnState.battleData[i]) {
				continue;
			}
			while (turnState.battleData[i].hand.length < 7) {
				const deckSpell = turnState.battleData[i].battleDeck.pop();
				if (!deckSpell) {
					break;
				}
				turnState.battleData[i].hand.push(deckSpell);
			}
		}
		callback();
	}
}

function battleGameLoop(timeMs) {
	const { battleState, battleState: { turnState, onWin, onLose, playerIndex } } = state;

	let inputData = {};

	if (turnState.battleIndex === -1) {
		inputData = { inputData, ...drawBattleIdle(state) };

		if (areAllPlayersReady(turnState)) {
			state.animationQueue.push(new AnimationEngine(createWithdrawAnimation(turnState), TICK_TIME, FPS, canvas, ctx, reduceAnimationQueue));
			turnState.battleIndex = 0;
		}

		handleInput(battleState, inputData);
	} else {
		const postBattleCallback = () => {
			turnState.battleIndex = -1;
			if (turnState.battleData[playerIndex] === null) {
				onLose();
			} else if (
				(playerIndex < 4 && turnState.battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i >= 4).filter(({ battleEntity }) => battleEntity !== null).length === 0)
				|| (playerIndex >= 4 && turnState.battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i < 4).filter(({ battleEntity }) => battleEntity !== null).length === 0)) {
				onWin();
			} else {
				state.animationQueue.push(new AnimationEngine(getReturnSequence(turnState.battleData), TICK_TIME, FPS, canvas, ctx, reduceAnimationQueue));
				selectCardsForAI(battleState);
			}
		}
		if (!turnState.battleData[turnState.battleIndex] || turnState.selectedCards[turnState.battleIndex] === 'PASS') {
			postBattle(turnState, postBattleCallback);
		} else {
			const victimIndices = turnState.selectedVictims[turnState.battleIndex]
				.filter(i => turnState.battleData[i] !== null && turnState.battleData[i].entity.health > 0);
			if (victimIndices.length > 0 && turnState.battleData[turnState.battleIndex].entity.health > 0) {
				const spellIndex = turnState.selectedCards[turnState.battleIndex];
				const spell = getSpell(turnState.battleData[turnState.battleIndex].hand[spellIndex].id);
				const enchantments = turnState.battleData[turnState.battleIndex].hand[spellIndex].enchantments;
				const doesSpellHit = Math.random() <= spell.chance + (enchantments?.accuracy || 0);
				const calculatedDamages = doesSpellHit
					? victimIndices.map(i => turnState.battleData[i])
						.map(victimData => calculateDamages(
							spell,
							enchantments,
							turnState.battleData[turnState.battleIndex],
							victimData))
					: ['FAILED'];
				const sequence = turnState.battleIndex < 4
					? createLeftAttackSequence(turnState.battleData, turnState.battleIndex, victimIndices.toReversed(), spell, calculatedDamages.toReversed(), 0)
					: createRightAttackSequence(turnState.battleData, turnState.battleIndex, victimIndices.toReversed(), spell, calculatedDamages.toReversed(), 0);
				const animation = new AnimationEngine({
					ticks: sequence.length,
					actions: sequence.actions
				}, TICK_TIME, FPS, canvas, ctx, () => {
					reduceAnimationQueue();
					turnState.battleData = iterateSpell(turnState.battleIndex, victimIndices, spellIndex, turnState.battleData, calculatedDamages);
					postBattle(turnState, postBattleCallback);
				});
				state.animationQueue.push(animation);
			} else {
				postBattle(turnState, postBattleCallback);
			}
		}
	}
}