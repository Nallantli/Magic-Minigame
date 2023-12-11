let state = {
	knownSpells: [
		...level1Spells,
		...level2Spells,
		...level3Spells,
		...level4Spells,
		'solar.force',
		'solar.advantage'
	],
	player: {
		...randomFromList(Object.values(defaultMPStats)),
		...randomFromList(MP_SPRITES),
		id: crypto.randomUUID(),
		name: 'Player'
	},
	level: 1,
	iterator: 0,
	path: 'MENU',
	deckState: {
		currentIndex: -1,
		currentElement: 'air',
		returnPath: 'MENU'
	},
	menuState: {
		errorMessage: undefined
	},
	battleState: undefined,
	animationQueue: [],
	overlayAnimationQueue: [],
	textboxes: {
		usernameTextbox: {
			value: 'Player',
			isFocused: false
		},
		joinTextbox: {
			value: '',
			isFocused: false
		}
	}
};

const reduceAnimationQueue = () => state.animationQueue.splice(0, 1);
const reduceOverlayAnimationQueue = () => state.overlayAnimationQueue.splice(0, 1);