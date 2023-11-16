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


const entityDirectory = {
	wizards: [
		{
			id: 'fire_wizard',
			name: 'Wizard Wizard',
			element: 'fire',
			maxHealth: 600,
			health: 600,
			deck: [
				'fire.fire_shield',
				'fire.fire_trap',
				'water.water_shield',
				'fire.balefire',
				'fire.balefire',
				'fire.balefire',
				'fire.fireball',
				'fire.fireball',
				'fire.fire_blade',
				'fire.fire_blade',
				'fire.magnify',
				'fire.aquifex'
			],
			augments: {
				fire: 0.8,
				water: 1.1
			},
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
			maxHealth: 700,
			health: 700,
			deck: [
				'air.air_shield',
				'air.air_trap',
				'earth.earth_shield',
				'air.overcast',
				'air.overcast',
				'air.dust_devil',
				'air.dust_devil',
				'air.gentle_breeze',
				'air.gentle_breeze',
				'air.air_blade',
				'air.air_blade',
				'air.terrifex'
			],
			augments: {
				air: 0.8,
				earth: 1.1
			},
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
			maxHealth: 650,
			health: 650,
			deck: [
				'fire.fire_shield',
				'water.water_trap',
				'water.water_shield',
				'water.deluge',
				'water.deluge',
				'water.deluge',
				'water.wave',
				'water.wave',
				'water.water_blade',
				'water.weakness',
				'water.weakness',
				'water.ignifex'
			],
			augments: {
				water: 0.8,
				fire: 1.1
			},
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
			maxHealth: 750,
			health: 750,
			deck: [
				'air.air_shield',
				'earth.earth_trap',
				'earth.earth_shield',
				'earth.earth_shield',
				'earth.earthquake',
				'earth.earthquake',
				'earth.earthquake',
				'earth.boulder',
				'earth.earth_blade',
				'earth.earth_blade',
				'earth.earth_blade',
				'earth.burden',
				'earth.caelifex'
			],
			augments: {
				earth: 0.8,
				air: 1.1
			},
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
			maxHealth: 450,
			health: 450,
			deck: [
				'air.air_shield',
				'earth.earth_trap',
				'earth.earth_shield',
				'earth.earth_shield',
				'earth.earthquake',
				'earth.earthquake',
				'earth.earthquake',
				'earth.boulder',
				'earth.earth_blade',
				'earth.earth_blade',
				'earth.earth_blade',
				'earth.burden',
				'earth.caelifex'
			],
			augments: {
				earth: 0.9,
				air: 1.2
			},
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
			maxHealth: 350,
			health: 350,
			deck: [
				'fire.fire_shield',
				'water.water_trap',
				'water.water_shield',
				'water.deluge',
				'water.deluge',
				'water.deluge',
				'water.wave',
				'water.wave',
				'water.water_blade',
				'water.weakness',
				'water.weakness',
				'water.ignifex'
			],
			augments: {
				water: 0.9,
				fire: 1.2
			},
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
				'fire.fire_shield',
				'fire.fire_trap',
				'water.water_shield',
				'fire.balefire',
				'fire.balefire',
				'fire.balefire',
				'fire.fireball',
				'fire.fireball',
				'fire.fire_blade',
				'fire.fire_blade',
				'fire.magnify',
				'fire.aquifex'
			],
			augments: {
				fire: 0.9,
				water: 1.2
			},
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
		.map((cardId, i) => ({ card: getSpell(cardId), i }))
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