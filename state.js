const mpWizards = [
	{
		"id": "fire_wizard",
		"name": "Wizard Wizard",
		"element": "fire",
		"maxHealth": 800,
		"health": 800,
		"deck": [
			"fire.fire_shield",
			"water.water_shield",
			"fire.fireball",
			"fire.fireball",
			"fire.fireball",
			"fire.fireball",
			"fire.balefire",
			"fire.balefire",
			"fire.balefire",
			"fire.balefire",
			"fire.fire_blade",
			"fire.fire_trap"
		],
		"augments": {
			"fire": 0.8,
			"water": 1.1
		},
		"criticalRating": 110,
		"superVrilChance": 0.25,
		"spritePath": "wiz",
		"idleFrames": 1,
		"castFrames": 1,
		"deathFrames": 8
	},
	{
		"id": "air_wizard",
		"name": "Top Hat Wizard",
		"element": "air",
		"maxHealth": 960,
		"health": 960,
		"deck": [
			"air.air_shield",
			"earth.earth_shield",
			"air.updraft",
			"air.updraft",
			"air.updraft",
			"air.updraft",
			"air.overcast",
			"air.overcast",
			"air.overcast",
			"air.overcast",
			"air.air_blade",
			"air.air_trap"
		],
		"augments": {
			"air": 0.8,
			"earth": 1.1
		},
		"criticalRating": 90,
		"superVrilChance": 0.25,
		"spritePath": "wiz_top_hat",
		"idleFrames": 1,
		"castFrames": 1,
		"deathFrames": 19
	},
	{
		"id": "water_wizard",
		"name": "Baseball Wizard",
		"element": "water",
		"maxHealth": 880,
		"health": 880,
		"deck": [
			"water.water_shield",
			"fire.fire_shield",
			"water.wave",
			"water.wave",
			"water.wave",
			"water.wave",
			"water.baitfish",
			"water.baitfish",
			"water.baitfish",
			"water.baitfish",
			"water.water_blade",
			"water.water_trap"
		],
		"augments": {
			"water": 0.8,
			"fire": 1.1
		},
		"criticalRating": 100,
		"superVrilChance": 0.25,
		"spritePath": "wiz_baseball",
		"idleFrames": 1,
		"castFrames": 1,
		"deathFrames": 7
	},
	{
		"id": "earth_wizard",
		"name": "Hatless Wizard",
		"element": "earth",
		"maxHealth": 1040,
		"health": 1040,
		"deck": [
			"earth.earth_shield",
			"air.air_shield",
			"earth.boulder",
			"earth.boulder",
			"earth.boulder",
			"earth.boulder",
			"earth.earthquake",
			"earth.earthquake",
			"earth.earthquake",
			"earth.earthquake",
			"earth.earth_blade",
			"earth.earth_trap"
		],
		"augments": {
			"earth": 0.8,
			"air": 1.1
		},
		"criticalRating": 80,
		"superVrilChance": 0.25,
		"spritePath": "wiz_no_hat",
		"idleFrames": 1,
		"castFrames": 1,
		"deathFrames": 12
	}
];

let state = {
	knownSpells: [
		...level1Spells,
		...level2Spells,
		...level3Spells,
		...level4Spells,
		'solar.advantage'
	],
	player: {
		...randomFromList(mpWizards),
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