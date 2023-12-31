function levelGameLoop(timeMs) {
	const levelText = `LEVEL ${state.level}`
	font.draw(ctx, scale(240 - levelText.length * 12), scale(128), scale(24), scale(32), 0, levelText);

	makeInteractable(scale(240 - 5 * 3), scale(192), scale(6 * 5), scale(12),
		({ x, y, sizeX, sizeY }) => {
			font.draw(ctx, x, y, scale(6), scale(8), 0, 'Start');
		},
		({ x, y, sizeX, renderCallback }) => {
			renderCallback();
			ctx.fillStyle = WHITE_COLOR;
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
