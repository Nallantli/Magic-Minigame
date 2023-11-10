const wizard = {
	id: crypto.randomUUID(),
	name: 'Wizard Wizard',
	element: 'fire',
	maxHealth: 500,
	health: 500,
	idleSprite: new Sprite('./img/characters/wiz/idle_64x64.png', 64, 64, 1),
	castSprite: new Sprite('./img/characters/wiz/cast_64x64.png', 64, 64, 1),
	deathSprite: new Sprite('./img/characters/wiz/death_64x64.png', 64, 64, 8)
};

const wizard2 = {
	id: crypto.randomUUID(),
	name: 'Top Hat Wizard',
	element: 'air',
	maxHealth: 700,
	health: 700,
	idleSprite: new Sprite('./img/characters/wiz_top_hat/idle_64x64.png', 64, 64, 1),
	castSprite: new Sprite('./img/characters/wiz_top_hat/cast_64x64.png', 64, 64, 1),
	deathSprite: new Sprite('./img/characters/wiz_top_hat/death_64x64.png', 64, 64, 19)
};

const wizard3 = {
	id: crypto.randomUUID(),
	name: 'Baseball Wizard',
	element: 'water',
	maxHealth: 600,
	health: 1,
	idleSprite: new Sprite('./img/characters/wiz_baseball/idle_64x64.png', 64, 64, 1),
	castSprite: new Sprite('./img/characters/wiz_baseball/cast_64x64.png', 64, 64, 1),
	deathSprite: new Sprite('./img/characters/wiz_baseball/death_64x64.png', 64, 64, 7)
};

const wizard4 = {
	id: crypto.randomUUID(),
	name: 'Hatless Wizard',
	element: 'earth',
	maxHealth: 800,
	health: 800,
	idleSprite: new Sprite('./img/characters/wiz_no_hat/idle_64x64.png', 64, 64, 1),
	castSprite: new Sprite('./img/characters/wiz_no_hat/cast_64x64.png', 64, 64, 1),
	deathSprite: new Sprite('./img/characters/wiz_no_hat/death_64x64.png', 64, 64, 12)
};

const earth_skeleton = {
	id: crypto.randomUUID(),
	name: 'Earth Skeleton',
	element: 'earth',
	maxHealth: 550,
	health: 550,
	idleSprite: new Sprite('./img/characters/skeleton/idle_64x64.png', 64, 64, 16),
	castSprite: new Sprite('./img/characters/skeleton/cast_64x64.png', 64, 64, 5),
	deathSprite: new Sprite('./img/characters/skeleton/death_64x64.png', 64, 64, 7)
}

const water_skeleton = {
	id: crypto.randomUUID(),
	name: 'Water Skeleton',
	element: 'water',
	maxHealth: 400,
	health: 400,
	idleSprite: new Sprite('./img/characters/skeleton/idle_64x64.png', 64, 64, 16),
	castSprite: new Sprite('./img/characters/skeleton/cast_64x64.png', 64, 64, 5),
	deathSprite: new Sprite('./img/characters/skeleton/death_64x64.png', 64, 64, 7)
}

const fire_skeleton = {	
	id: crypto.randomUUID(),
	name: 'Fire Skeleton',
	element: 'fire',
	maxHealth: 300,
	health: 300,
	idleSprite: new Sprite('./img/characters/skeleton/idle_64x64.png', 64, 64, 16),
	castSprite: new Sprite('./img/characters/skeleton/cast_64x64.png', 64, 64, 5),
	deathSprite: new Sprite('./img/characters/skeleton/death_64x64.png', 64, 64, 7)
}

const air_skeleton = {
	id: crypto.randomUUID(),
	name: 'Air Skeleton',
	element: 'air',
	maxHealth: 450,
	health: 450,
	idleSprite: new Sprite('./img/characters/skeleton/idle_64x64.png', 64, 64, 16),
	castSprite: new Sprite('./img/characters/skeleton/cast_64x64.png', 64, 64, 5),
	deathSprite: new Sprite('./img/characters/skeleton/death_64x64.png', 64, 64, 7)
}

const randomAI = (index, battleData) => {
	const entityData = battleData[index];
	const options = entityData.hand
		.filter(({ vrilRequired, element }) => getTotalVril(entityData, element) >= vrilRequired)
		.map(card => battleData
			.map((e, i) => ({ e, selectedVictim: i }))
			.filter(({ e }) => e !== undefined)
			.filter(({ selectedVictim }) => card.canUseSpellOn(index, selectedVictim)))
		.map((d, i) => ({ selectedCard: i, options: d.map(({ selectedVictim }) => selectedVictim) }))
		.filter(({ options }) => options.length > 0);
	if (options.length === 0) {
		return {
			selectedCard: 'PASS'
		}
	}
	if (Math.random() < 0.1) {
		return {
			selectedCard: 'PASS'
		};
	}
	const selectedCardOptions = randomFromList(options);
	let selectedVictims = [];
	if (entityData.hand[selectedCardOptions.selectedCard].type === SPELL_TYPES.ATTACK_ALL) {
		selectedVictims = battleData.map((e, i) => ({ e, i })).filter(({ e, i }) => e !== undefined && entityData.hand[selectedCardOptions.selectedCard].canUseSpellOn(index, i)).map(({ i }) => i);
	} else {
		selectedVictims = [randomFromList(selectedCardOptions.options)];
	}
	return {
		selectedCard: selectedCardOptions.selectedCard,
		selectedVictims
	};
};