function drawEntityIcon(entity, i, si) {
	makeInteractable(scale(16), scale(48) + i * scale(31), scale(32), scale(32),
		({ x, y, sizeX, sizeY }) => {
			sprites.ENTITY_SELECT_32x32.draw(ctx, x + scale(5), y, sizeX, sizeY);
			getIdleSprite(entity).draw(ctx, x + scale(5), y, sizeX, sizeY);
		},
		({ x, y, sizeX, sizeY }) => {
			sprites.ENTITY_SELECT_32x32.draw(ctx, x, y, sizeX, sizeY);
			getIdleSprite(entity).draw(ctx, x, y, sizeX, sizeY);
		},
		() => state.deckState.currentIndex = si,
		{
			forceHoverOn: () => state.deckState.currentIndex === si
		});
}

function deckGameLoop(timeMs) {
	let toolTips = [];

	const currentEntity = state.player;

	sprites.ELEMENTS_MINOR_8x8.draw(ctx, scale(17), scale(36), scale(8), scale(8), { iIndex: ELEMENT_COLORS[currentEntity.element] });
	font.draw(ctx, scale(27), scale(36), scale(6), scale(8), 0, currentEntity.name);
	font.draw(ctx, scale(33 + currentEntity.name.length * 6), scale(36), scale(6), scale(8), ELEMENT_COLORS[currentEntity.element], `[${currentEntity.health}/${currentEntity.maxHealth}]`);

	sprites.DECK_BACK_252x302.draw(ctx, scale(13), scale(48), scale(252), scale(302));
	let deckIndex = 0;
	const deck = currentEntity.deck;
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 5; j++) {
			if (deckIndex < deck.length) {
				const card = getSpell(deck[deckIndex]);
				makeInteractable(scale(15 + j * 50), scale(50 + i * 50), scale(48), scale(48),
					({ x, y, sizeX, sizeY }) => {
						getCardSprite(card).draw(ctx, x, y, sizeX, sizeY, { cropY: 48 });
					},
					({ x, y, sizeX, sizeY, renderCallback }) => {
						renderCallback();
						sprites.DECK_X_48x48.draw(ctx, x, y, sizeX, sizeY);
						toolTips.push(makeToolTip(
							scale(78),
							scale(114),
							({ x, y }) => {
								getCardSprite(card).draw(ctx, x + scale(3), y + scale(3), scale(72), scale(96));
								font.draw(ctx, x + scale(4), y + scale(102), scale(6), scale(8), ELEMENT_COLORS[card.element], card.name);
							}
						));
					},
					() => {
						deck.splice(deckIndex, 1);
					});
			}
			sprites.DECK_SLOT_50x50.draw(ctx, scale(14 + j * 50), scale(49 + i * 50), scale(50), scale(50), { iIndex: deckIndex < deck.length });
			deckIndex++;
		}
	}
	ELEMENT_ID_LIST.forEach((element, i) => {
		makeInteractable(scale(265) + i * scale(31), scale(16), scale(32), scale(32),
			({ x, y, sizeX, sizeY }) => {
				sprites.ELEMENT_SELECT_32x32.draw(ctx, x, y + scale(5), sizeX, sizeY);
				ELEMENT_ICONS[element].draw(ctx, x, y + scale(5), sizeX, sizeY);
			},
			({ x, y, sizeX, sizeY }) => {
				sprites.ELEMENT_SELECT_32x32.draw(ctx, x, y, sizeX, sizeY);
				ELEMENT_ICONS[element].draw(ctx, x, y, sizeX, sizeY);
			},
			() => state.deckState.currentElement = element,
			{
				forceHoverOn: () => state.deckState.currentElement === element
			});
	});

	sprites.DECK_CARDS_204x268.draw(ctx, scale(265), scale(48), scale(204), scale(268));
	getAllSpellsForElement(state.knownSpells, state.deckState.currentElement).forEach((card, i) => {
		makeInteractable(scale(267 + (i % 4) * 50), scale(52 + Math.floor(i / 4) * 66), scale(48), scale(66),
			({ x, y, sizeX }) => {
				if (deck.length === 30 || deck.filter(id => id === card.id).length >= 4) {
					ctx.globalAlpha = 0.5;
				} else {
					ctx.globalAlpha = 1;
				}
				getCardSprite(card).draw(ctx, x, y, sizeX, scale(64));
			},
			({ x, y, sizeX, renderCallback }) => {
				renderCallback();
				sprites.DECK_CIRCLE_48x64.draw(ctx, x, y, sizeX, scale(64));
				toolTips.push(makeToolTip(
					scale(78),
					scale(114),
					({ x, y }) => {
						getCardSprite(card).draw(ctx, x + scale(3), y + scale(3), scale(72), scale(96));
						font.draw(ctx, x + scale(4), y + scale(102), scale(6), scale(8), ELEMENT_COLORS[card.element], card.name);
					}
				));
			},
			() => {
				if (deck.length < 30 && deck.filter(id => id === card.id).length < 4) {
					deck.push(card.id);
					sortDeck(deck);
				}
			});
	});

	ctx.globalAlpha = 1;
	makeInteractable(scale(480 - 32), scale(375 - 32), scale(32), scale(32),
		({ x, y, sizeX, sizeY }) => sprites.BACK_32x32.draw(ctx, scale(480 - 32), scale(375 - 32), scale(32), scale(32)),
		({ x, y, sizeX, sizeY, renderCallback }) => {
			renderCallback();

			ctx.fillStyle = WHITE_COLOR;
			ctx.fillRect(x - scale(6), y, scale(4), sizeY);
		},
		() => state.path = state.deckState.returnPath);

	toolTips.forEach(toolTip => toolTip(ctx));

	if (keysUp.includes('escape')) {
		state.path = state.deckState.returnPath;
	}
}