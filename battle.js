function drawBattleIdle(state) { // battleData, selectedCards, selectedVictims, playerIndex) {
	let inputData = {};
	const { battleData, selectedCards, selectedVictims, playerIndex, iterator } = state;
	const selectedPlayerSpell = selectedCards[playerIndex] === undefined ? undefined : battleData[playerIndex].hand[selectedCards[playerIndex]];

	for (let i = 0; i < 4; i++) {
		const battleEntity = battleData[i];
		if (!battleEntity) {
			continue;
		}
		const selectedEntitySpell = selectedCards[i] === undefined ? undefined : battleData[i].hand[selectedCards[i]];

		if (selectedPlayerSpell === undefined || selectedPlayerSpell.canUseSpellOn(playerIndex, i)) {
			ctx.globalAlpha = 1;
			if (selectedPlayerSpell !== undefined && mousePos.x < scale(162) && mousePos.x > scale(2) && mousePos.y < i * scale(67) + scale(67) && mousePos.y > i * scale(67) + scale(2)) {
				sprites.PLACARD_160x65.draw(ctx, scale(2), i * scale(67) + scale(2), scale(160), scale(65), 0);
				if (clickPos?.x < scale(162) && clickPos?.x > scale(2) && clickPos?.y < i * scale(67) + scale(67) && clickPos?.y > i * scale(67) + scale(2)) {
					inputData.selectedVictims = [i];
				}
			}
		} else {
			ctx.globalAlpha = 0.25;
		}

		const { shields, blades, vril, superVril, entity } = battleEntity;

		shields.forEach(({ value, sprite, element }, j) => {
			const shieldPosX = scale(57) + j * scale(12);
			const shieldPosY = i * scale(67) + scale(28);
			sprite.draw(ctx, shieldPosX, shieldPosY, scale(10), scale(12), 0);
			if (mousePos.x > shieldPosX && mousePos.x < shieldPosX + scale(10) && mousePos.y > shieldPosY && mousePos.y < shieldPosY + scale(12)) {
				const str = `${value > 0 ? '+' : ''}${value}%`;
				numberText.draw(ctx, shieldPosX + scale(5 - str.length * 2), shieldPosY + scale(14), scale(4), scale(6), ELEMENT_COLORS[element], str);
			}
		});

		blades.forEach(({ value, sprite, element }, j) => {
			const bladePosX = scale(57) + j * scale(12);
			const bladePosY = i * scale(67) + scale(50);
			sprite.draw(ctx, bladePosX, bladePosY, scale(10), scale(12), 0);
			if (mousePos.x > bladePosX && mousePos.x < bladePosX + scale(10) && mousePos.y > bladePosY && mousePos.y < bladePosY + scale(12)) {
				const str = `${value > 0 ? '+' : ''}${value}%`;
				numberText.draw(ctx, bladePosX + scale(5 - str.length * 2), bladePosY - scale(8), scale(4), scale(6), ELEMENT_COLORS[element], str);
			}
		});

		font.draw(ctx, scale(57), i * scale(67) + scale(5), scale(6), scale(8), 0, entity.name);
		const healthString = String(entity.health);
		numberText.draw(ctx, scale(161 - healthString.length * 4), i * scale(67) + scale(21), scale(4), scale(6), 0, healthString);
		const healthBarWidth = Math.round(106 * entity.health / entity.maxHealth);
		ctx.fillStyle = 'white';
		ctx.fillRect(scale(161 - healthBarWidth), i * scale(67) + scale(15), scale(healthBarWidth), scale(4));

		entity.idleSprite.draw(ctx, 0, i * scale(67) + 10, scale(64), scale(64), iterator % entity.idleSprite.indices);
		for (let j = 0; j < superVril; j++) {
			sprites.SUPER_VRIL_4x4.draw(ctx, scale(6), (i + 1) * scale(67) - j * scale(6) - scale(10), scale(4), scale(4), ELEMENT_COLORS[entity.element]);
		}
		for (let j = 0; j < vril; j++) {
			sprites.VRIL_4x4.draw(ctx, scale(6), (i + 1) * scale(67) - (j + superVril) * scale(6) - scale(10), scale(4), scale(4), ELEMENT_COLORS[entity.element]);
		}

		if (selectedEntitySpell) {
			selectedEntitySpell.cardSprite.draw(ctx, scale(168), i * scale(67) + scale(10), scale(24), scale(32), 0);
			if (selectedVictims[i].length > 0) {
				const index = selectedVictims[i];
				selectedVictims[i].forEach(index => {
					if (index < 4) {
						numberText.draw(ctx, scale(170), i * scale(67) + scale(49), scale(8), scale(12), 0, String(index + 1));
						sprites.VICTIM_ARROW_8x16.draw(ctx, scale(182), i * scale(67) + scale(46), scale(8), scale(16), 1);
					} else {
						numberText.draw(ctx, scale(182), i * scale(67) + scale(49), scale(8), scale(12), 0, String(index - 3));
						sprites.VICTIM_ARROW_8x16.draw(ctx, scale(170), i * scale(67) + scale(46), scale(8), scale(16), 0);
					}
				});
			}
		}

		if (selectedCards[i] === 'PASS') {
			sprites.PASS_24x32.draw(ctx, scale(168), i * scale(67) + scale(10), scale(24), scale(32), 0);
		}
	}

	for (let i = 4; i < 8; i++) {
		const battleEntity = battleData[i];
		const i_offset = i - 4;

		if (!battleEntity) {
			continue;
		}

		if (selectedPlayerSpell === undefined || selectedPlayerSpell.canUseSpellOn(playerIndex, i)) {
			ctx.globalAlpha = 1;
			if (selectedPlayerSpell !== undefined && mousePos.x < scale(480 - 2) && mousePos.x > scale(480 - 162) && mousePos.y < i_offset * scale(67) + scale(67) && mousePos.y > i_offset * scale(67) + scale(2)) {
				sprites.PLACARD_RIGHT_160x65.draw(ctx, scale(480 - 162), i_offset * scale(67) + scale(2), scale(160), scale(65), 0);
				if (clickPos?.x < scale(480 - 2) && clickPos?.x > scale(480 - 162) && clickPos?.y < i_offset * scale(67) + scale(67) && clickPos?.y > i_offset * scale(67) + scale(2)) {
					inputData.selectedVictims = [i];
				}
			}
		} else {
			ctx.globalAlpha = 0.25;
		}

		const { shields, blades, vril, superVril, entity } = battleEntity;

		shields.forEach(({ value, sprite, element }, j) => {
			const shieldPosX = scale(480 - 67) - j * scale(12);
			const shieldPosY = i_offset * scale(67) + scale(28);
			sprite.draw(ctx, shieldPosX, shieldPosY, scale(10), scale(12), 0);
			if (mousePos.x > shieldPosX && mousePos.x < shieldPosX + scale(10) && mousePos.y > shieldPosY && mousePos.y < shieldPosY + scale(12)) {
				const str = `${value > 0 ? '+' : ''}${value}%`;
				numberText.draw(ctx, shieldPosX + scale(5 - str.length * 2), shieldPosY + scale(14), scale(4), scale(6), ELEMENT_COLORS[element], str);
			}
		});

		blades.forEach(({ value, sprite, element }, j) => {
			const bladePosX = scale(480 - 67) - j * scale(12);
			const bladePosY = i_offset * scale(67) + scale(50);
			sprite.draw(ctx, bladePosX, bladePosY, scale(10), scale(12), 0);
			if (mousePos.x > bladePosX && mousePos.x < bladePosX + scale(10) && mousePos.y > bladePosY && mousePos.y < bladePosY + scale(12)) {
				const str = `${value > 0 ? '+' : ''}${value}%`;
				numberText.draw(ctx, bladePosX + scale(5 - str.length * 2), bladePosY - scale(8), scale(4), scale(6), ELEMENT_COLORS[element], str);
			}
		});

		font.draw(ctx, scale(480 - 57 - entity.name.length * 6), i_offset * scale(67) + scale(5), scale(6), scale(8), 0, entity.name);
		const healthString = String(entity.health);
		numberText.draw(ctx, scale(480 - 160), i_offset * scale(67) + scale(21), scale(4), scale(6), 0, healthString);
		const healthBarWidth = Math.round(106 * entity.health / entity.maxHealth);
		ctx.fillStyle = 'white';
		ctx.fillRect(scale(480 - 161), i_offset * scale(67) + scale(15), scale(healthBarWidth), scale(4));

		entity.idleSprite.draw(ctx, scale(480 - 64), i_offset * scale(67) + 10, scale(64), scale(64), iterator % entity.idleSprite.indices, true);
		for (let j = 0; j < superVril; j++) {
			sprites.SUPER_VRIL_4x4.draw(ctx, scale(480 - 10), (i_offset + 1) * scale(67) - j * scale(6) - scale(10), scale(4), scale(4), ELEMENT_COLORS[entity.element]);
		}
		for (let j = 0; j < vril; j++) {
			sprites.VRIL_4x4.draw(ctx, scale(480 - 10), (i_offset + 1) * scale(67) - (j + superVril) * scale(6) - scale(10), scale(4), scale(4), ELEMENT_COLORS[entity.element]);
		}
	}

	return inputData;
}

function drawCards(state) { //playerData, selectedCard) {
	const { selectedCards, playerIndex, battleData } = state;
	const playerData = battleData[playerIndex];
	const selectedCard = selectedCards[playerIndex];

	const startX = scale(240 - playerData.hand.length * 25);
	let inputData = {};

	playerData.hand.forEach((spell, i) => {
		const hasEnoughVril = getTotalVril(playerData, spell.element) >= spell.vrilRequired;
		if (hasEnoughVril && selectedCard === undefined || selectedCard === i) {
			ctx.globalAlpha = 1;
		} else {
			ctx.globalAlpha = 0.25;
		}
		spell.cardSprite.draw(ctx, startX + scale(50 * i), scale(276), scale(48), scale(64), 0);
		if (selectedCard === i
			|| (hasEnoughVril && selectedCard === undefined && mousePos.x > startX + scale(50 * i) && mousePos.x < startX + scale(50 * i + 48) && mousePos.y > scale(276) && mousePos.y < scale(340))) {
			ctx.fillStyle = 'white';
			ctx.fillRect(startX + scale(50 * i), scale(342), scale(48), scale(4));
			if (selectedCard === undefined && clickPos?.x > startX + scale(50 * i) && clickPos?.x < startX + scale(50 * i + 48) && clickPos?.y > scale(276) && clickPos?.y < scale(340)) {
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
		}
	});

	if (selectedCard === undefined) {
		ctx.globalAlpha = 1;
	} else {
		ctx.globalAlpha = 0.25;
	}

	sprites.PASS_39x16.draw(ctx, scale(240 - 20), scale(348), scale(39), scale(16), 0);

	if (selectedCard === undefined && mousePos.x > scale(240 - 20) && mousePos.x < scale(240 - 18 + 39) && mousePos.y > scale(348) && mousePos.y < scale(348 + 16)) {
		ctx.fillStyle = 'white';
		ctx.fillRect(scale(240 - 20), scale(366), scale(40), scale(4));
		if (clickPos?.x > scale(240 - 20) && clickPos?.x < scale(240 - 18 + 39) && clickPos?.y > scale(348) && clickPos?.y < scale(348 + 16)) {
			inputData.selectedCard = 'PASS';
		}
	}

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
			...battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i < 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ battleEntity, i }) => ({
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
			...battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i >= 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ battleEntity, i }) => ({
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

const reduceAnimationQueue = () => state.animationQueue.splice(0, 1);

function battleGameLoop(timeMs) {
	if (!state.startTime || timeMs - state.startTime >= TICK_TIME * 1000 / FPS) {
		state.startTime = timeMs;
		state.iterator++;
	}

	if (!state.battleData[state.playerIndex]) {
		state.playerIndex++;
	}

	let inputData = {};

	ctx.globalAlpha = 1;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if (state.animationQueue.length > 0) {
		state.animationQueue[0].runFrame(timeMs);
	} else if (state.battleIndex === -1) {
		state.battleData.forEach((battleEntity, i) => {
			if (!battleEntity) {
				return;
			}
			if (state.selectedCards[i] !== undefined) {
				return;
			}
			if (state.playerIndex !== i && battleEntity.AI) {
				const { selectedCard, selectedVictims } = battleEntity.AI(i, state.battleData);
				state.selectedCards[i] = selectedCard;
				state.selectedVictims[i] = selectedVictims;
			}
		});

		inputData = {
			...inputData,
			...drawCards(state), // battleData.left[0], selectedCards[playerIndex])
			...drawBattleIdle(state) // battleData, selectedCards, selectedVictims, playerIndex)
		};
		// handle input
		if (inputData.selectedCard !== undefined) {
			state.selectedCards[state.playerIndex] = inputData.selectedCard;
		}
		if (inputData.selectedVictims !== undefined) {
			state.selectedVictims[state.playerIndex] = inputData.selectedVictims;
		}

		if (state.selectedCards[state.playerIndex] === 'PASS' || state.selectedVictims[state.playerIndex].length > 0) {
			const withdrawAnimationData = {
				ticks: 10,
				actions: [
					...state.battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i < 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ battleEntity, i }) => ({
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
					...state.battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i < 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ battleEntity, i }) => ({
						startTick: 0,
						endTick: 9,
						type: ATYPES.CHANGE_POSITION_X,
						id: `left.${i}`,
						posX: scale(-64),
						ease: EASE_TYPES.EASE_IN
					})),
					...state.battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i >= 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ battleEntity, i }) => ({
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
					...state.battleData.map((battleEntity, i) => ({ battleEntity, i })).filter(({ i }) => i >= 4).filter(({ battleEntity }) => battleEntity !== undefined).map(({ battleEntity, i }) => ({
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
			state.battleIndex = 0;
		}
		if (rightClickPos) {
			if (state.selectedCards[state.playerIndex] !== undefined) {
				state.selectedCards[state.playerIndex] = undefined;
			}
		}
	} else {
		const postBattle = (casterIndex, victimIndices, spell) => {
			if (casterIndex !== undefined) {
				state.battleData = iterateSpell(casterIndex, victimIndices, spell, state.battleData);
			}
			state.battleIndex++;
			if (state.battleIndex === 8) {
				state.selectedVictims = [[], [], [], [], [], [], [], []];
				state.selectedCards = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
				for (let i = 0; i < state.battleData.length; i++) {
					if (state.battleData[i] && state.battleData[i].entity.health > 0) {
						state.battleData[i].vril++;
					} else if (state.battleData[i] && state.battleData[i].entity.health <= 0) {
						state.battleData[i] = undefined;
					}
				}
				state.battleIndex = -1;
				state.animationQueue.push(new AnimationEngine(getReturnSequence(state.battleData), TICK_TIME, FPS, canvas, ctx, reduceAnimationQueue));
			}
		};

		if (!state.battleData[state.battleIndex] || state.selectedCards[state.battleIndex] === 'PASS') {
			postBattle();
		} else {
			const victimIndices = state.selectedVictims[state.battleIndex]
				.filter(i => state.battleData[i] !== undefined && state.battleData[i].entity.health > 0);
			if (victimIndices.length > 0 && state.battleData[state.battleIndex].entity.health > 0) {
				const spell = state.battleData[state.battleIndex].hand[state.selectedCards[state.battleIndex]];
				const sequence = state.battleIndex < 4
					? createLeftAttackSequence(state.battleData, state.battleIndex, victimIndices.reverse(), spell, 0)
					: createRightAttackSequence(state.battleData, state.battleIndex, victimIndices.reverse(), spell, 0);
				const animation = new AnimationEngine({
					ticks: sequence.length,
					actions: sequence.actions
				}, TICK_TIME, FPS, canvas, ctx, () => {
					reduceAnimationQueue();
					postBattle(state.battleIndex, victimIndices, spell);
				});
				state.animationQueue.push(animation);
			} else {
				postBattle();
			}
		}
	}

	ctx.globalAlpha = 1;
	ctx.fillStyle = 'white';
	ctx.fillRect(0, scale(270), scale(480), scale(1));

	clickPos = undefined;
	rightClickPos = undefined;
}

// easter egg >:)
function giveMeTheGun() {
	console.log("https://media.tenor.com/xOefCCemGU4AAAAC/kek.gif");
	state.battleData[state.playerIndex].hand.push(SPELLS.GUN);
}