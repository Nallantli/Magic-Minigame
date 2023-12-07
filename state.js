let state = {
	knownSpells: level1Spells,
	level: 1,
	iterator: 0,
	path: 'MENU',
	deckState: {
		currentIndex: -1,
		currentElement: 'air',
		returnPath: 'MENU'
	},
	battleState: undefined,
	animationQueue: [],
	overlayAnimationQueue: [],
	textboxes: {
		joinTextbox: {
			value: '',
			isFocused: false
		}
	}
};

const reduceAnimationQueue = () => state.animationQueue.splice(0, 1);
const reduceOverlayAnimationQueue = () => state.overlayAnimationQueue.splice(0, 1);