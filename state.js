let state = {
	path: 'MENU',
	entities: [
		{
			id: 'fire_wizard',
			name: 'Wizard Wizard',
			element: 'fire',
			maxHealth: 300,
			health: 300,
			deck: [
				...Object.values(SPELLS.fire),
				...Object.values(SPELLS.fire),
				...Object.values(SPELLS.fire),
				...Object.values(SPELLS.fire),
			],
			idleSprite: new Sprite('./img/characters/wiz/idle_64x64.png', 64, 64, 1),
			castSprite: new Sprite('./img/characters/wiz/cast_64x64.png', 64, 64, 1),
			deathSprite: new Sprite('./img/characters/wiz/death_64x64.png', 64, 64, 8)
		},
		{
			id: 'air_wizard',
			name: 'Top Hat Wizard',
			element: 'air',
			maxHealth: 450,
			health: 450,
			deck: [
				...Object.values(SPELLS.air),
				...Object.values(SPELLS.air),
				...Object.values(SPELLS.air),
				...Object.values(SPELLS.air),
			],
			idleSprite: new Sprite('./img/characters/wiz_top_hat/idle_64x64.png', 64, 64, 1),
			castSprite: new Sprite('./img/characters/wiz_top_hat/cast_64x64.png', 64, 64, 1),
			deathSprite: new Sprite('./img/characters/wiz_top_hat/death_64x64.png', 64, 64, 19)
		},
		{
			id: 'water_wizard',
			name: 'Baseball Wizard',
			element: 'water',
			maxHealth: 400,
			health: 400,
			deck: [
				...Object.values(SPELLS.water),
				...Object.values(SPELLS.water),
				...Object.values(SPELLS.water),
				...Object.values(SPELLS.water),
			],
			idleSprite: new Sprite('./img/characters/wiz_baseball/idle_64x64.png', 64, 64, 1),
			castSprite: new Sprite('./img/characters/wiz_baseball/cast_64x64.png', 64, 64, 1),
			deathSprite: new Sprite('./img/characters/wiz_baseball/death_64x64.png', 64, 64, 7)
		},
		{
			id: 'earth_wizard',
			name: 'Hatless Wizard',
			element: 'earth',
			maxHealth: 550,
			health: 550,
			deck: [
				...Object.values(SPELLS.earth),
				...Object.values(SPELLS.earth),
				...Object.values(SPELLS.earth),
				...Object.values(SPELLS.earth),
			],
			idleSprite: new Sprite('./img/characters/wiz_no_hat/idle_64x64.png', 64, 64, 1),
			castSprite: new Sprite('./img/characters/wiz_no_hat/cast_64x64.png', 64, 64, 1),
			deathSprite: new Sprite('./img/characters/wiz_no_hat/death_64x64.png', 64, 64, 12)
		},
		{
			id: 'skeleton',
			name: 'Skeleton',
			element: 'earth',
			maxHealth: 550,
			health: 550,
			deck: [
				...Object.values(SPELLS.earth),
				...Object.values(SPELLS.earth),
				...Object.values(SPELLS.earth),
				...Object.values(SPELLS.earth),
			],
			idleSprite: new Sprite('./img/characters/skeleton/idle_64x64.png', 64, 64, 16),
			castSprite: new Sprite('./img/characters/skeleton/cast_64x64.png', 64, 64, 5),
			deathSprite: new Sprite('./img/characters/skeleton/death_64x64.png', 64, 64, 7)
		},
		{
			id: 'ghost',
			name: 'Ghost',
			element: 'water',
			maxHealth: 400,
			health: 400,
			deck: [
				...Object.values(SPELLS.water),
				...Object.values(SPELLS.water),
				...Object.values(SPELLS.water),
				...Object.values(SPELLS.water),
			],
			idleSprite: new Sprite('./img/characters/ghost/idle_64x64.png', 64, 64, 21),
			castSprite: new Sprite('./img/characters/ghost/cast_64x64.png', 64, 64, 3),
			deathSprite: new Sprite('./img/characters/ghost/death_64x64.png', 64, 64, 12)
		},
		{
			id: 'phoenix',
			name: 'Phoenix',
			element: 'fire',
			maxHealth: 300,
			health: 300,
			deck: [
				...Object.values(SPELLS.fire),
				...Object.values(SPELLS.fire),
				...Object.values(SPELLS.fire),
				...Object.values(SPELLS.fire),
			],
			idleSprite: new Sprite('./img/characters/phoenix/idle_64x64.png', 64, 64, 8),
			castSprite: new Sprite('./img/characters/phoenix/idle_64x64.png', 64, 64, 8),
			deathSprite: new Sprite('./img/characters/phoenix/death_64x64.png', 64, 64, 10)
		}
	],
	deckState: {
		currentIndex: 0,
		currentElement: 'air'
	},
	battleState: undefined
};