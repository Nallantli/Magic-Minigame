let spellDirectory = {};

let spellSpriteDirectory = {};

function registerSpell(spell) {
	spellDirectory[`${spell.id}`] = spell;
	if (spell.frames) {
		spellSpriteDirectory[`${spell.id}.spell`] = new Sprite(`./img/spells/${spell.id.replaceAll('.', '/')}/spell_240x135.png`, 240, 135, spell.frames);
	}
	spellSpriteDirectory[`${spell.id}.card`] = new Sprite(`./img/spells/${spell.id.replaceAll('.', '/')}/card_48x64.png`, 48, 64, 1);
	if (spell.victimBlades) {
		spell.victimBlades.forEach(blade => {
			spellSpriteDirectory[`${blade.id}`] = new Sprite(`./img/spells/${blade.id.replaceAll('.', '/')}.png`, 10, 12, 1);
		});
	}
	if (spell.casterBlades) {
		spell.casterBlades.forEach(blade => {
			spellSpriteDirectory[`${blade.id}`] = new Sprite(`./img/spells/${blade.id.replaceAll('.', '/')}.png`, 10, 12, 1);
		});
	}
	if (spell.victimShields) {
		spell.victimShields.forEach(shield => {
			spellSpriteDirectory[`${shield.id}`] = new Sprite(`./img/spells/${shield.id.replaceAll('.', '/')}.png`, 10, 12, 1);
		});
	}
	if (spell.casterShields) {
		spell.casterShields.forEach(shield => {
			spellSpriteDirectory[`${shield.id}`] = new Sprite(`./img/spells/${shield.id.replaceAll('.', '/')}.png`, 10, 12, 1);
		});
	}
}

function getAllSpellsForElement(directory, soughtElement) {
	return Object.values(spellDirectory).filter(({ element, id }) => directory.includes(`${id}`) && element === soughtElement);
}

function getSpell(id) {
	return spellDirectory[id];
}

function getCardSprite(spell) {
	return spellSpriteDirectory[`${spell.id}.card`];
}

function getSpellSprite(spell) {
	return spellSpriteDirectory[`${spell.id}.spell`];
}

const spellUseTypes = {
	TO_ALL: () => true,
	TO_ALLIES: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex < 4) || (casterIndex >= 4 && victimIndex >= 4),
	TO_ENEMIES: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
};

function canUseSpellOn(spell, casterIndex, victimIndex) {
	return spellUseTypes[spell.spellUseType](casterIndex, victimIndex);
}

fetch('./spells.json')
	.then(response => response.json())
	.then(data => Object.values(data).forEach(registerSpell))
	.catch(error => console.log(error));

const level1Spells = [
	'air.air_shield',
	'air.updraft',
	'fire.fire_shield',
	'fire.fireball',
	'water.water_shield',
	'water.wave',
	'earth.earth_shield',
	'earth.boulder'
];

const level2Spells = [
	'air.air_blade',
	'air.gentle_breeze',
	'fire.fire_blade',
	'fire.magnify',
	'water.water_blade',
	'water.weakness',
	'earth.earth_blade',
	'earth.burden'
];

const level3Spells = [
	'air.air_trap',
	'air.overcast',
	'fire.fire_trap',
	'fire.balefire',
	'water.water_trap',
	'water.baitfish',
	'earth.earth_trap',
	'earth.earthquake'
];

const level4Spells = [
	'air.terrifex',
	'air.dust_devil',
	'fire.aquifex',
	'fire.mortar',
	'water.ignifex',
	'water.deluge',
	'earth.caelifex',
	'earth.pound'
];

// easter egg >:)
function giveMeTheGun() {
	console.log("https://media.tenor.com/xOefCCemGU4AAAAC/kek.gif");
	const gun = {
		id: 'all.gun',
		name: "Gun",
		type: SPELL_TYPES.ATTACK_BASIC,
		element: 'all',
		damages: [
			{
				tick: 6,
				damage: -9999,
				element: 'all'
			}
		],
		vrilRequired: 1,
		chance: 1,
		frames: 12,
		spellUseType: 'TO_ALL'
	};
	if (state.battleState) {
		state.battleState.turnState.battleData[state.battleState.playerIndex].hand.push({ id: gun.id });
	}
	state.knownSpells.push(gun.id);
	registerSpell(gun);
}

function giveMeAllSpells() {
	state.knownSpells = Object.keys(spellDirectory);
}