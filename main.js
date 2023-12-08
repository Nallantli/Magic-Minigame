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

function levelGameLoop(timeMs) {
	const levelText = `LEVEL ${state.level}`
	font.draw(ctx, scale(240 - levelText.length * 12), scale(128), scale(24), scale(32), 0, levelText);

	makeInteractable(scale(240 - 5 * 3), scale(192), scale(6 * 5), scale(12),
		({ x, y, sizeX, sizeY }) => {
			font.draw(ctx, x, y, scale(6), scale(8), 0, 'Start');
		},
		({ x, y, sizeX, renderCallback }) => {
			renderCallback();
			ctx.fillStyle = 'white';
			ctx.fillRect(x, y + scale(14), sizeX, scale(4))
		},
		() => {
			walkingTrack.play();
			switch (state.level) {
				case 1:
					generateLevel1(timeMs);
					break;
				case 2:
					generateLevel2(timeMs);
					break;
				case 3:
					generateLevel3(timeMs);
					break;
				case 4:
					generateBossRoom(timeMs);
					break;
			}
			printMap(state.mapState.map);
			state = {
				...state,
				path: 'MAP'
			};
		});
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