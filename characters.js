const HATS = {
	TOP_HAT: {
		name: 'Top Hat',
		idle: new Sprite('./img/outfits/hats/top_hat/idle_64x64.png', 64, 64, 1),
		cast: new Sprite('./img/outfits/hats/top_hat/idle_64x64.png', 64, 64, 1),
		death: new Sprite('./img/outfits/hats/top_hat/death_64x64.png', 64, 64, 10)
	},
	BASEBALL_CAP: {
		name: 'Baseball Cap',
		idle: new Sprite('./img/outfits/hats/baseball_cap/idle_64x64.png', 64, 64, 1),
		cast: new Sprite('./img/outfits/hats/baseball_cap/idle_64x64.png', 64, 64, 1),
		death: new Sprite('./img/outfits/hats/baseball_cap/death_64x64.png', 64, 64, 10)
	},
	WIZARD_HAT: {
		name: 'Wizard Hat',
		idle: new Sprite('./img/outfits/hats/wizard_hat/idle_64x64.png', 64, 64, 1),
		cast: new Sprite('./img/outfits/hats/wizard_hat/idle_64x64.png', 64, 64, 1),
		death: new Sprite('./img/outfits/hats/wizard_hat/death_64x64.png', 64, 64, 10)
	}
};

const CLOTHES = {
	ARMOR: {
		name: 'Armor',
		idle: new Sprite('./img/outfits/clothes/armor/idle_64x64.png', 64, 64, 1),
		cast: new Sprite('./img/outfits/clothes/armor/cast_64x64.png', 64, 64, 1),
		death: new Sprite('./img/outfits/clothes/armor/idle_64x64.png', 64, 64, 1)
	},
	PLAIN_CLOTHES: {
		name: 'Plain Clothes',
		idle: new Sprite('./img/outfits/clothes/plain_clothes/idle_64x64.png', 64, 64, 1),
		cast: new Sprite('./img/outfits/clothes/plain_clothes/cast_64x64.png', 64, 64, 1),
		death: new Sprite('./img/outfits/clothes/plain_clothes/idle_64x64.png', 64, 64, 1)
	},
	ROBE: {
		name: 'Wizard Robe',
		idle: new Sprite('./img/outfits/clothes/robe/idle_64x64.png', 64, 64, 1),
		cast: new Sprite('./img/outfits/clothes/robe/cast_64x64.png', 64, 64, 1),
		death: new Sprite('./img/outfits/clothes/robe/idle_64x64.png', 64, 64, 1)
	}
};

const WANDS = {
	CANE: {
		name: 'Cane',
		cast: new Sprite('./img/outfits/wands/cane_64x64.png', 64, 64, 1)
	},
	BAT: {
		name: 'Baseball Bat',
		cast: new Sprite('./img/outfits/wands/bat_64x64.png', 64, 64, 1)
	},
	GEM_WAND: {
		name: 'Gem Wand',
		cast: new Sprite('./img/outfits/wands/gem_wand_64x64.png', 64, 64, 1)
	},
	BASIC_WAND: {
		name: 'Basic Wand',
		cast: new Sprite('./img/outfits/wands/basic_wand_64x64.png', 64, 64, 1)
	}
};

const HEADS = {
	SHORT_HAIR: {
		name: 'Short Hair',
		idle: new Sprite('./img/outfits/heads/short_hair/idle_64x64.png', 64, 64, 1),
		cast: new Sprite('./img/outfits/heads/short_hair/idle_64x64.png', 64, 64, 1),
		death: new Sprite('./img/outfits/heads/short_hair/death_64x64.png', 64, 64, 10)
	}
};


const entities = {
	wizards: [
		{
			id: 'fire_wizard',
			name: 'Wizard Wizard',
			element: 'fire',
			maxHealth: 500,
			health: 500,
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
			],
			criticalRating: 100,
			superVrilChance: 0.1,
			idleSprite: new Sprite('./img/characters/wiz/idle_64x64.png', 64, 64, 1),
			castSprite: new Sprite('./img/characters/wiz/cast_64x64.png', 64, 64, 1),
			deathSprite: new Sprite('./img/characters/wiz/death_64x64.png', 64, 64, 8)
		},
		{
			id: 'air_wizard',
			name: 'Top Hat Wizard',
			element: 'air',
			maxHealth: 600,
			health: 600,
			deck: [
				SPELLS.air.AIR_SHIELD,
				SPELLS.air.AIR_TRAP,
				SPELLS.earth.EARTH_SHIELD,
				SPELLS.air.OVERCAST,
				SPELLS.air.OVERCAST,
				SPELLS.air.DUST_DEVIL,
				SPELLS.air.DUST_DEVIL,
				SPELLS.air.GENTLE_BREEZE,
				SPELLS.air.GENTLE_BREEZE,
				SPELLS.air.AIR_BLADE,
				SPELLS.air.AIR_BLADE,
			],
			criticalRating: 120,
			superVrilChance: 0.1,
			idleSprite: new Sprite('./img/characters/wiz_top_hat/idle_64x64.png', 64, 64, 1),
			castSprite: new Sprite('./img/characters/wiz_top_hat/cast_64x64.png', 64, 64, 1),
			deathSprite: new Sprite('./img/characters/wiz_top_hat/death_64x64.png', 64, 64, 19)
		},
		{
			id: 'water_wizard',
			name: 'Baseball Wizard',
			element: 'water',
			maxHealth: 550,
			health: 550,
			deck: [
				SPELLS.fire.FIRE_SHIELD,
				SPELLS.water.WATER_TRAP,
				SPELLS.water.WATER_SHIELD,
				SPELLS.water.DELUGE,
				SPELLS.water.DELUGE,
				SPELLS.water.DELUGE,
				SPELLS.water.WAVE,
				SPELLS.water.WAVE,
				SPELLS.water.WATER_BLADE,
				SPELLS.water.WEAKNESS,
				SPELLS.water.WEAKNESS
			],
			criticalRating: 110,
			superVrilChance: 0.1,
			idleSprite: new Sprite('./img/characters/wiz_baseball/idle_64x64.png', 64, 64, 1),
			castSprite: new Sprite('./img/characters/wiz_baseball/cast_64x64.png', 64, 64, 1),
			deathSprite: new Sprite('./img/characters/wiz_baseball/death_64x64.png', 64, 64, 7)
		},
		{
			id: 'earth_wizard',
			name: 'Hatless Wizard',
			element: 'earth',
			maxHealth: 650,
			health: 650,
			deck: [
				SPELLS.air.AIR_SHIELD,
				SPELLS.earth.EARTH_TRAP,
				SPELLS.earth.EARTH_SHIELD,
				SPELLS.earth.EARTH_SHIELD,
				SPELLS.earth.EARTHQUAKE,
				SPELLS.earth.EARTHQUAKE,
				SPELLS.earth.EARTHQUAKE,
				SPELLS.earth.BOULDER,
				SPELLS.earth.EARTH_BLADE,
				SPELLS.earth.EARTH_BLADE,
				SPELLS.earth.EARTH_BLADE,
				SPELLS.earth.BURDEN
			],
			criticalRating: 130,
			superVrilChance: 0.1,
			idleSprite: new Sprite('./img/characters/wiz_no_hat/idle_64x64.png', 64, 64, 1),
			castSprite: new Sprite('./img/characters/wiz_no_hat/cast_64x64.png', 64, 64, 1),
			deathSprite: new Sprite('./img/characters/wiz_no_hat/death_64x64.png', 64, 64, 12)
		},
	],
	creatures: [
		{
			id: 'skeleton',
			name: 'Skeleton',
			element: 'earth',
			maxHealth: 550,
			health: 550,
			deck: [
				SPELLS.air.AIR_SHIELD,
				SPELLS.earth.EARTH_TRAP,
				SPELLS.earth.EARTH_SHIELD,
				SPELLS.earth.EARTH_SHIELD,
				SPELLS.earth.EARTHQUAKE,
				SPELLS.earth.EARTHQUAKE,
				SPELLS.earth.EARTHQUAKE,
				SPELLS.earth.BOULDER,
				SPELLS.earth.EARTH_BLADE,
				SPELLS.earth.EARTH_BLADE,
				SPELLS.earth.EARTH_BLADE,
				SPELLS.earth.BURDEN
			],
			criticalRating: 130,
			superVrilChance: 0.1,
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
				SPELLS.fire.FIRE_SHIELD,
				SPELLS.water.WATER_TRAP,
				SPELLS.water.WATER_SHIELD,
				SPELLS.water.DELUGE,
				SPELLS.water.DELUGE,
				SPELLS.water.DELUGE,
				SPELLS.water.WAVE,
				SPELLS.water.WAVE,
				SPELLS.water.WATER_BLADE,
				SPELLS.water.WEAKNESS,
				SPELLS.water.WEAKNESS
			],
			criticalRating: 110,
			superVrilChance: 0.1,
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
			],
			criticalRating: 100,
			superVrilChance: 0.1,
			idleSprite: new Sprite('./img/characters/phoenix/idle_64x64.png', 64, 64, 8),
			castSprite: new Sprite('./img/characters/phoenix/idle_64x64.png', 64, 64, 8),
			deathSprite: new Sprite('./img/characters/phoenix/death_64x64.png', 64, 64, 10)
		}
	]
};

const randomAI = (index, battleData) => {
	const entityData = battleData[index];
	const accessibleCards = entityData.hand
		.map((card, i) => ({ card, i }))
		.filter(({ card: { vrilRequired, element } }) => getTotalVril(entityData, element) >= vrilRequired);

	const options = accessibleCards
		.map(({ card, i }) => ({
			i,
			d: battleData
				.map((e, i) => ({ e, selectedVictim: i }))
				.filter(({ e }) => e !== undefined)
				.filter(({ selectedVictim }) => card.canUseSpellOn(index, selectedVictim))
		}))
		.map(({ d, i }) => ({ selectedCard: i, options: d.map(({ selectedVictim }) => selectedVictim) }))
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