function entitySelectionGameLoop(timeMs) {
	const iterator = state.iterator;
	const selectedEntity = state.entitySelectionState.selected;
	Object.values(entityDirectory).forEach((entity, i) => {
		makeInteractable(scale(16 + (i % 4) * 66), scale(16 + Math.floor(i / 4) * 66), scale(64), scale(64),
			({ x, y, sizeX, sizeY }) => {
				sprites.SELECTOR_64x64.draw(ctx, x, y, sizeX, sizeY);
				getIdleSprite(entity).draw(ctx, x, y, sizeX, sizeY, { iIndex: iterator % getIdleSprite(entity).indices });
			},
			({ x, y, sizeX, sizeY }) => {
				sprites.SELECTOR_64x64.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 });
				getIdleSprite(entity).draw(ctx, x, y, sizeX, sizeY, { iIndex: iterator % getIdleSprite(entity).indices });
				state.entitySelectionState.selected = entity;
			},
			() => {
				if (state.entitySelectionState.onReturn) {
					state.entitySelectionState.onReturn(state.entitySelectionState.selected);
				}
			})
	});
	sprites.ENTITY_INFO_BACK_128x256.draw(ctx, scale(280), scale(16), scale(128), scale(256));
	if (selectedEntity) {
		getIdleSprite(selectedEntity).draw(ctx, scale(280), scale(16), scale(128), scale(128), { iIndex: iterator % getIdleSprite(selectedEntity).indices });
		ELEMENT_ICONS[selectedEntity.element].draw(ctx, scale(328), scale(152), scale(32), scale(32));
		font.draw(ctx, scale(344 - selectedEntity.name.length * 3), scale(186), scale(6), scale(8), 0, selectedEntity.name);
		const statStrings = [
			`Health: ${selectedEntity.maxHealth}`,
			`Critical Rating: ${selectedEntity.criticalRating}`
		]
		statStrings.forEach((str, i) => font.draw(ctx, scale(286), scale(206 + i * 8), scale(6), scale(8), 0, str));
	}

	makeInteractable(scale(480 - 32), scale(375 - 32), scale(32), scale(32),
		({ x, y, sizeX, sizeY }) => sprites.BACK_32x32.draw(ctx, scale(480 - 32), scale(375 - 32), scale(32), scale(32)),
		({ x, y, sizeX, sizeY, renderCallback }) => {
			renderCallback();

			ctx.fillStyle = 'white';
			ctx.fillRect(x - scale(6), y, scale(4), sizeY);
		},
		() => {
			if (state.entitySelectionState.onReturn) {
				state.entitySelectionState.onReturn(undefined);
			}
		});

	if (keysUp.includes('escape')) {
		if (state.entitySelectionState.onReturn) {
			state.entitySelectionState.onReturn(undefined);
		}
	}
}