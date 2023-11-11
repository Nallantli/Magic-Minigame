const FPS = 75;
let TICK_TIME = 15;

const canvas = document.getElementById('main');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

canvas.addEventListener("mousemove", function (evt) {
	mousePos = getMousePos(canvas, evt);
}, false);

canvas.addEventListener("click", function (evt) {
	clickPos = getMousePos(canvas, evt);
}, false);

canvas.addEventListener("contextmenu", function (evt) {
	evt.preventDefault();
	rightClickPos = getMousePos(canvas, evt);
}, false);

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect(), // abs. size of element
		scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
		scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

	return {
		x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
		y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
	}
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

	return {
		shields: [],
		blades: [],
		vril: 1,
		superVril: 0,
		entity,
		deck,
		hand,
		AI
	}
}

function getEntityFromStateById(sId) {
	return state.entities.find(({ id }) => id === sId);
}

function generateBattleState() {
	const leftEntityIds = [
		'fire_wizard',
		'air_wizard',
		'water_wizard',
		'earth_wizard'
	];
	const rightEntityIds = [
		'skeleton',
		'ghost',
		'phoenix'
	];
	const battleData = [
		...leftEntityIds.map(id => generateBattleEntity(getEntityFromStateById(id), randomAI)),
		...rightEntityIds.map(id => generateBattleEntity(getEntityFromStateById(id), randomAI))
	];

	return {
		iterator: 0,
		startTime: undefined,
		battleData,
		selectedCards: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
		selectedVictims: [[], [], [], [], [], [], [], []],
		playerIndex: 0,
		animationQueue: [new AnimationEngine(getReturnSequence(battleData), TICK_TIME, FPS, canvas, ctx, reduceAnimationQueue)],
		battleIndex: -1
	};
}

let mousePos = { x: 0, y: 0 };
let clickPos = undefined;
let rightClickPos = undefined;

let mainTrack = new Audio(randomFromList([
	'./audio/track1.wav',
	'./audio/track2.wav',
	'./audio/track3.wav',
	'./audio/track4.wav'
]));
mainTrack.loop = true;

function menuGameLoop(timeMs) {
	sprites.START_128x48.draw(ctx, scale(240 - 64), scale(187 - 24), scale(128), scale(48), 0, false);

	makeInteractable(scale(240 - 64), scale(187 - 24), scale(128), scale(48),
		({ x, y, sizeX, sizeY }) => {
			sprites.START_128x48.draw(ctx, x, y, sizeX, sizeY, 0, false);
		},
		({ x, y, sizeX, renderCallback }) => {
			renderCallback();
			ctx.fillStyle = 'white';
			ctx.fillRect(x, y + scale(52), sizeX, scale(4));
		},
		() => {
			state = {
				...state,
				path: 'BATTLE',
				battleState: generateBattleState()
			};
			mainTrack.play();
		});

	makeInteractable(scale(240 - 32), scale(232), scale(64), scale(12),
		({ x, y, sizeX, sizeY }) => {
			sprites.EDIT_DECKS_64x12.draw(ctx, x, y, sizeX, sizeY);
		},
		({ x, y, sizeX, renderCallback }) => {
			renderCallback();
			ctx.fillStyle = 'white';
			ctx.fillRect(x, y + scale(14), sizeX, scale(4))
		},
		() => state.path = 'DECK');

}

function sortDeck(deck) {
	deck.sort((a, b) => {
		if (a.element === b.element) {
			return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
		}
		return a.element < b.element ? -1 : (a.element > b.element ? 1 : 0)
	});
}

function deckGameLoop(timeMs) {
	let toolTips = [];

	const { entities } = state;
	entities.forEach((entity, i) => {
		makeInteractable(scale(16), scale(48) + i * scale(31), scale(32), scale(32),
			({ x, y, sizeX, sizeY }) => {
				sprites.ENTITY_SELECT_32x32.draw(ctx, x + scale(5), y, sizeX, sizeY);
				entity.idleSprite.draw(ctx, x + scale(5), y, sizeX, sizeY);
			},
			({ x, y, sizeX, sizeY }) => {
				sprites.ENTITY_SELECT_32x32.draw(ctx, x, y, sizeX, sizeY);
				entity.idleSprite.draw(ctx, x, y, sizeX, sizeY);
			},
			() => state.deckState.currentIndex = i,
			{
				forceHoverOn: () => state.deckState.currentIndex === i
			});
	});

	const currentEntity = entities[state.deckState.currentIndex];

	sprites.ELEMENTS_MINOR_8x8.draw(ctx, scale(52), scale(36), scale(8), scale(8), { iIndex: ELEMENT_COLORS[currentEntity.element] });
	font.draw(ctx, scale(62), scale(36), scale(6), scale(8), 0, currentEntity.name);
	font.draw(ctx, scale(68 + currentEntity.name.length * 6), scale(36), scale(6), scale(8), ELEMENT_COLORS[currentEntity.element], `[${currentEntity.health}/${currentEntity.maxHealth}]`);

	sprites.DECK_BACK_252x302.draw(ctx, scale(48), scale(48), scale(252), scale(302));
	let deckIndex = 0;
	const deck = currentEntity.deck;
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 5; j++) {
			if (deckIndex < deck.length) {
				const card = deck[deckIndex];
				makeInteractable(scale(50 + j * 50), scale(50 + i * 50), scale(48), scale(48),
					({ x, y, sizeX, sizeY }) => {
						card.cardSprite.draw(ctx, x, y, sizeX, sizeY, { cropY: 48 });
					},
					({ x, y, sizeX, sizeY, renderCallback }) => {
						renderCallback();
						sprites.DECK_X_48x48.draw(ctx, x, y, sizeX, sizeY);
						toolTips.push(makeToolTip(
							scale(78),
							scale(114),
							({ x, y }) => {
								card.cardSprite.draw(ctx, x + scale(3), y + scale(3), scale(72), scale(96));
								font.draw(ctx, x + scale(4), y + scale(102), scale(6), scale(8), ELEMENT_COLORS[card.element], card.name);
							}
						));
					},
					() => {
						deck.splice(deckIndex, 1);
					});
			}
			sprites.DECK_SLOT_50x50.draw(ctx, scale(49 + j * 50), scale(49 + i * 50), scale(50), scale(50), { iIndex: deckIndex < deck.length });
			deckIndex++;
		}
	}
	ELEMENT_ID_LIST.forEach((element, i) => {
		makeInteractable(scale(300) + i * scale(31), scale(16), scale(32), scale(32),
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

	sprites.DECK_CARDS_164x268.draw(ctx, scale(300), scale(48), scale(164), scale(268));
	Object.values(SPELLS[state.deckState.currentElement]).forEach((card, i) => {
		makeInteractable(scale(302 + (i % 3) * 50), scale(52 + Math.floor(i / 3) * 66), scale(48), scale(66),
			({ x, y, sizeX }) => {
				if (deck.length === 30 || deck.filter(({ id }) => id === card.id).length >= 4) {
					ctx.globalAlpha = 0.5;
				} else {
					ctx.globalAlpha = 1;
				}
				card.cardSprite.draw(ctx, x, y, sizeX, scale(64));
			},
			({ x, y, sizeX, renderCallback }) => {
				renderCallback();
				sprites.DECK_CIRCLE_48x64.draw(ctx, x, y, sizeX, scale(64));
				toolTips.push(makeToolTip(
					scale(78),
					scale(114),
					({ x, y }) => {
						card.cardSprite.draw(ctx, x + scale(3), y + scale(3), scale(72), scale(96));
						font.draw(ctx, x + scale(4), y + scale(102), scale(6), scale(8), ELEMENT_COLORS[card.element], card.name);
					}
				));
			},
			() => {
				if (deck.length < 30 && deck.filter(({ id }) => id === card.id).length < 4) {
					deck.push(card);
					sortDeck(deck);
				}
			});
	});

	ctx.globalAlpha = 1;
	makeInteractable(scale(480 - 32), scale(375 - 32), scale(32), scale(32),
		({ x, y, sizeX, sizeY }) => sprites.BACK_32x32.draw(ctx, scale(480 - 32), scale(375 - 32), scale(32), scale(32)),
		({ x, y, sizeX, sizeY, renderCallback }) => {
			renderCallback();

			ctx.fillStyle = 'white';
			ctx.fillRect(x - scale(6), y, scale(4), sizeY);
		},
		() => state.path = 'MENU');

	toolTips.forEach(toolTip => toolTip(ctx));
}

function gameLoop(timeMs) {
	ctx.globalAlpha = 1;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

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
	}

	clickPos = undefined;
	rightClickPos = undefined;
	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);