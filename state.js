let state = {
	knownSpells: level1Spells,
	level: 1,
	iterator: 0,
	path: 'MENU',
	deckState: {
		currentIndex: -1,
		currentElement: 'air'
	},
	battleState: undefined,
	animationQueue: [],
	overlayAnimationQueue: []
};

const reduceAnimationQueue = () => state.animationQueue.splice(0, 1);
const reduceOverlayAnimationQueue = () => state.overlayAnimationQueue.splice(0, 1);