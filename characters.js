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

MP_SPRITES.forEach(({ spritePath, idleFrames, castFrames, deathFrames }) => {
	entitySpriteDirectory[`${spritePath}.idle`] = new Sprite(`./img/characters/${spritePath}/idle_64x64.png`, 64, 64, idleFrames);
	entitySpriteDirectory[`${spritePath}.cast`] = new Sprite(`./img/characters/${spritePath}/cast_64x64.png`, 64, 64, castFrames);
	entitySpriteDirectory[`${spritePath}.death`] = new Sprite(`./img/characters/${spritePath}/death_64x64.png`, 64, 64, deathFrames);
});

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
		Object.values(data).forEach(registerEntity);
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
		.map(({ id }, i) => ({ card: getSpell(id), i }))
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
	if (getSpell(entityData.hand[selectedCardOptions.selectedCard].id).type === SPELL_TYPES.ATTACK_ALL) {
		selectedVictims = battleData.map((e, i) => ({ e, i })).filter(({ e, i }) => e !== null && canUseSpellOn(getSpell(entityData.hand[selectedCardOptions.selectedCard].id), index, i)).map(({ i }) => i);
	} else {
		selectedVictims = [randomFromList(selectedCardOptions.options)];
	}
	return {
		selectedCard: selectedCardOptions.selectedCard,
		selectedVictims
	};
};