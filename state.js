let state = {
	path: 'MENU',
	player: {
		id: 'player_character',
		name: 'Player',
		element: 'fire',
		maxHealth: 600,
		health: 600,
		deck: [
			SPELLS.fire.FIRE_SHIELD,
			SPELLS.fire.FIRE_TRAP,
			SPELLS.water.WATER_SHIELD,
			SPELLS.fire.BALEFIRE,
			SPELLS.fire.BALEFIRE,
			SPELLS.fire.BALEFIRE,
			SPELLS.fire.FIREBALL,
			SPELLS.fire.FIREBALL,
			SPELLS.fire.FIRE_BLADE,
			SPELLS.fire.FIRE_BLADE,
			SPELLS.fire.MAGNIFY,
			SPELLS.fire.AQUIFEX
		],
		criticalRating: 100,
		superVrilChance: 0.1,
		idleSprite: new CompositeSprite([
			HEADS.SHORT_HAIR.idle,
			CLOTHES.PLAIN_CLOTHES.idle,
			HATS.WIZARD_HAT.idle
		], 64, 64, 1),
		castSprite: new CompositeSprite([
			HEADS.SHORT_HAIR.cast,
			CLOTHES.PLAIN_CLOTHES.cast,
			HATS.WIZARD_HAT.cast,
			WANDS.BASIC_WAND.cast
		], 64, 64, 1),
		deathSprite: new CompositeSprite([
			HEADS.SHORT_HAIR.death,
			CLOTHES.PLAIN_CLOTHES.death,
			HATS.WIZARD_HAT.death
		], 64, 64, 10),
	},
	customizeState: {
		current: [
			HEADS.SHORT_HAIR,
			HATS.WIZARD_HAT,
			CLOTHES.PLAIN_CLOTHES,
			WANDS.BASIC_WAND
		],
		currentTab: 0
	},
	deckState: {
		currentIndex: -1,
		currentElement: 'air'
	},
	battleState: undefined
};