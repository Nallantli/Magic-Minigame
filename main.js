function startGameLoop(timeMs) {

	sprites.BANNER_240x135.draw(ctx, 0, scale(20), scale(480), scale(270));

	makeInteractable(scale(240 - 75), scale(300), scale(150), scale(22),
		({ x, y, sizeX, sizeY }) => sprites.SINGLEPLAYER_75x11.draw(ctx, x, y, sizeX, sizeY),
		({ x, y, sizeX, sizeY }) => sprites.SINGLEPLAYER_75x11.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 }),
		() => {
			state = {
				...state,
				path: 'LEVEL',
				knownSpells: [
					...level1Spells,
				],
				player: {
					...entityDirectory[randomFromList([
						'fire_wizard',
						'air_wizard',
						'water_wizard',
						'earth_wizard',
					])],
					id: crypto.randomUUID(),
					name: 'Player'
				}
			};
		});
	makeInteractable(scale(240 - 75), scale(326), scale(150), scale(22),
		({ x, y, sizeX, sizeY }) => sprites.MULTIPLAYER_75x11.draw(ctx, x, y, sizeX, sizeY),
		({ x, y, sizeX, sizeY }) => sprites.MULTIPLAYER_75x11.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 }),
		() => {
			state = {
				...state,
				path: 'MENU',
				knownSpells: [
					...level1Spells,
					...level2Spells,
					...level3Spells,
					...level4Spells,
					...astralSpells
				],
				player: {
					...randomFromList(Object.values(defaultMPStats)),
					...randomFromList(MP_SPRITES),
					id: crypto.randomUUID(),
					name: 'Player'
				}
			};
		});
}

function loseGameLoop(timeMs) {
	sprites.YOU_DIED_160x64.draw(ctx, scale(240 - 80), scale(187 - 64), scale(160), scale(64));

	makeInteractable(scale(240 - 10 * 3), scale(192), scale(10 * 6), scale(12),
		({ x, y, sizeX, sizeY }) => {
			font.draw(ctx, x, y, scale(6), scale(8), 0, 'Try Again?');
		},
		({ x, y, sizeX, renderCallback }) => {
			renderCallback();
			ctx.fillStyle = 'white';
			ctx.fillRect(x, y + scale(14), sizeX, scale(4))
		},
		() => state.path = 'LEVEL');
}

function gameLoop(timeMs) {
	ctx.globalAlpha = 1;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if (!state.startTime || timeMs - state.startTime >= 1000 / TICK_TIME) {
		state.startTime = timeMs;
		state.iterator++;
	}

	if (state.animationQueue.length > 0) {
		state.animationQueue[0].runFrame(timeMs);
	} else {
		switch (state.path) {
			case 'START':
				startGameLoop(timeMs);
				break;
			case 'ENTITY_SELECTION':
				entitySelectionGameLoop(timeMs);
				break;
			case 'DECK':
				deckGameLoop(timeMs);
				break;
			case 'MENU':
				menuGameLoop(timeMs);
				break;
			case 'BATTLE':
				battleGameLoop(timeMs);
				break;
			case 'MP_BATTLE':
				mpBattleGameLoop(timeMs);
				break;
			case 'MAP':
				mapGameLoop(timeMs);
				break;
			case 'LOSE':
				loseGameLoop(timeMs);
				break;
			case 'LEVEL':
				levelGameLoop(timeMs);
				break;
		}
	}

	if (state.overlayAnimationQueue.length > 0) {
		state.overlayAnimationQueue[0].runFrame(timeMs);
	}

	keysUp = [];
	keysPressed = [];
	clickPos = undefined;
	rightClickPos = undefined;
	window.requestAnimationFrame(gameLoop);
}

setTimeout(() => window.requestAnimationFrame(gameLoop), 500)