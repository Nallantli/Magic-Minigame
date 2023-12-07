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

let entityDirectory = {};
let entitySpriteDirectory = {};
let entityTrackDirectory = {};

function registerEntity(entity) {
	entityDirectory[entity.id] = entity;
	entitySpriteDirectory[`${entity.spritePath}.idle`] = new Sprite(`./img/characters/${entity.spritePath}/idle_64x64.png`, 64, 64, entity.idleFrames);
	entitySpriteDirectory[`${entity.spritePath}.cast`] = new Sprite(`./img/characters/${entity.spritePath}/cast_64x64.png`, 64, 64, entity.castFrames);
	entitySpriteDirectory[`${entity.spritePath}.death`] = new Sprite(`./img/characters/${entity.spritePath}/death_64x64.png`, 64, 64, entity.deathFrames);
	if (entity.track) {
		entityDirectory[entity.id].track = new Audio(entity.track);
	}
}

function getEntity(id) {
	return entityDirectory[id];
}

function getIdleSprite(entity) {
	return entitySpriteDirectory[`${entity.spritePath}.idle`];
}

function getCastSprite(entity) {
	return entitySpriteDirectory[`${entity.spritePath}.cast`];
}

function getDeathSprite(entity) {
	return entitySpriteDirectory[`${entity.spritePath}.death`];
}

fetch('./entities.json')
	.then(response => response.json())
	.then(data => {
		Object.values(data).forEach(registerEntity)

		state.player = {
			...randomFromList(wizardIds.map(getEntity)),
			id: crypto.randomUUID(),
			name: 'Player'
		};
	})
	.catch(error => console.log(error));

const wizardIds = [
	'air_wizard',
	'fire_wizard',
	'water_wizard',
	'earth_wizard'
];

const level1CreatureIds = [
	'earth_skeleton_lv1',
	'fire_skeleton_lv1',
	'air_skeleton_lv1',
	'water_skeleton_lv1'
];

const level2CreatureIds = [
	'earth_skeleton_lv2',
	'water_ghost_lv2',
	'air_ghost_lv2',
];

const level3CreatureIds = [
	'earth_goomborb_lv3',
	'fire_phoenix_lv3',
];

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
				.filter(({ e }) => e !== null)
				.filter(({ selectedVictim }) => canUseSpellOn(card, index, selectedVictim))
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
			selectedCard: 'PASS',
			selectedVictims: []
		};
	}
	const selectedCardOptions = randomFromList(options);
	let selectedVictims = [];
	if (entityData.hand[selectedCardOptions.selectedCard].type === SPELL_TYPES.ATTACK_ALL) {
		selectedVictims = battleData.map((e, i) => ({ e, i })).filter(({ e, i }) => e !== null && canUseSpellOn(entityData.hand[selectedCardOptions.selectedCard], index, i)).map(({ i }) => i);
	} else {
		selectedVictims = [randomFromList(selectedCardOptions.options)];
	}
	return {
		selectedCard: selectedCardOptions.selectedCard,
		selectedVictims
	};
};