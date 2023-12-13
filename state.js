let state = {
	level: 1,
	iterator: 0,
	path: 'START',
	deckState: {
		currentIndex: -1,
		currentElement: 'air',
		returnPath: 'MENU'
	},
	menuState: {
		errorMessage: undefined
	},
	entitySelectionState: {
		selected: undefined,
		onReturn: undefined
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