let spellDirectory = {};

function registerSpell(spell) {
	spellDirectory[spell.id] = spell;
}

function getAllSpellsForElement(directory, soughtElement) {
	return Object.values(spellDirectory).filter(({ element, id }) => directory.includes(id) && element === soughtElement);
}

function getSpell(id) {
	return spellDirectory[id];
}

registerSpell({
	id: 'air.dust_devil',
	name: "Dust Devil",
	type: SPELL_TYPES.ATTACK_ALL,
	element: 'air',
	damages: [
		{
			tick: 8,
			minDamage: -230,
			maxDamage: -290,
			element: 'air'
		}
	],
	vrilRequired: 3,
	cardSprite: new Sprite('./img/spells/dust_devil/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/dust_devil/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'air.overcast',
	name: "Overcast",
	type: SPELL_TYPES.ATTACK_BASIC,
	element: 'air',
	damages: [
		{
			tick: 9,
			minDamage: -180,
			maxDamage: -210,
			element: 'air'
		}
	],
	vrilRequired: 2,
	cardSprite: new Sprite('./img/spells/overcast/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/overcast/spell_240x135.png', 240, 135, 25),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'air.gentle_breeze',
	name: "Gentle Breeze",
	type: SPELL_TYPES.HEALING_BASIC,
	element: 'air',
	heals: [
		{
			tick: 8,
			heal: 250,
		}
	],
	vrilRequired: 2,
	cardSprite: new Sprite('./img/spells/gentle_breeze/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/gentle_breeze/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex < 4) || (casterIndex >= 4 && victimIndex >= 4)
});

registerSpell({
	id: 'air.air_shield',
	name: "Air Shield",
	type: SPELL_TYPES.SHIELD_BASIC,
	element: 'air',
	victimShields: [{
		id: 'air.air_shield.vs1',
		tick: 8,
		value: -50,
		sprite: new Sprite('./img/spells/air_shield/bonus_10x12.png', 10, 12, 1),
		element: 'air',
		isBonus: true
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/air_shield/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/air_shield/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex < 4) || (casterIndex >= 4 && victimIndex >= 4)
});

registerSpell({
	id: 'air.air_blade',
	name: "Air Blade",
	type: SPELL_TYPES.BLADE_BASIC,
	element: 'air',
	victimBlades: [{
		id: 'air.air_blade.vb1',
		tick: 8,
		value: 25,
		sprite: new Sprite('./img/spells/air_blade/bonus_10x12.png', 10, 12, 1),
		element: 'air',
		isBonus: true
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/air_blade/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/air_blade/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex < 4) || (casterIndex >= 4 && victimIndex >= 4)
});

registerSpell({
	id: 'air.air_trap',
	name: "Air Trap",
	type: SPELL_TYPES.TRAP_BASIC,
	element: 'air',
	victimShields: [{
		id: 'air.air_trap.vs1',
		tick: 8,
		value: 25,
		sprite: new Sprite('./img/spells/air_trap/bonus_10x12.png', 10, 12, 1),
		element: 'air',
		isBonus: false
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/air_trap/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/air_trap/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'air.terrifex',
	name: "Terrifex",
	type: SPELL_TYPES.TRAP_BASIC,
	element: 'air',
	victimShields: [{
		id: 'air.terrifex.vs1',
		tick: 8,
		sprite: new Sprite('./img/spells/terrifex/bonus_10x12.png', 10, 12, 1),
		element: 'air',
		elementTo: 'earth',
		isBonus: false
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/terrifex/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/terrifex/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'fire.fireball',
	name: "Fireball",
	type: SPELL_TYPES.ATTACK_BASIC,
	element: 'fire',
	damages: [
		{
			tick: 8,
			minDamage: -100,
			maxDamage: -140,
			element: 'fire'
		}
	],
	vrilRequired: 1,
	cardSprite: new Sprite('./img/spells/fireball/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/fireball/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'fire.balefire',
	name: "Balefire",
	type: SPELL_TYPES.ATTACK_BASIC,
	element: 'fire',
	damages: [
		{
			tick: 14,
			minDamage: -220,
			maxDamage: -250,
			element: 'fire'
		}
	],
	vrilRequired: 2,
	cardSprite: new Sprite('./img/spells/balefire/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/balefire/spell_240x135.png', 240, 135, 19),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'fire.fire_shield',
	name: "Fire Shield",
	type: SPELL_TYPES.SHIELD_BASIC,
	element: 'fire',
	victimShields: [{
		id: 'fire.fire_shield.vs1',
		tick: 8,
		value: -40,
		sprite: new Sprite('./img/spells/fire_shield/bonus_10x12.png', 10, 12, 1),
		element: 'fire',
		isBonus: true
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/fire_shield/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/fire_shield/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex < 4) || (casterIndex >= 4 && victimIndex >= 4)
});

registerSpell({
	id: 'fire.fire_blade',
	name: "Fire Blade",
	type: SPELL_TYPES.BLADE_BASIC,
	element: 'fire',
	victimBlades: [{
		id: 'fire.fire_blade.vb1',
		tick: 8,
		value: 35,
		sprite: new Sprite('./img/spells/fire_blade/bonus_10x12.png', 10, 12, 1),
		element: 'fire',
		isBonus: true
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/fire_blade/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/fire_blade/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex < 4) || (casterIndex >= 4 && victimIndex >= 4)
});

registerSpell({
	id: 'fire.magnify',
	name: "Magnify",
	type: SPELL_TYPES.JINX_BASIC,
	element: 'fire',
	victimBlades: [{
		id: 'fire.magnify.vb1',
		tick: 8,
		value: 30,
		sprite: new Sprite('./img/spells/magnify/bonus_10x12.png', 10, 12, 1),
		element: 'all',
		isBonus: true
	}],
	casterBlades: [{
		id: 'fire.magnify.cb1',
		tick: 10,
		value: 50,
		sprite: new Sprite('./img/spells/magnify/bonus_10x12.png', 10, 12, 1),
		element: 'all',
		isBonus: true
	}],
	vrilRequired: 1,
	cardSprite: new Sprite('./img/spells/magnify/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/magnify/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'fire.fire_trap',
	name: "Fire Trap",
	type: SPELL_TYPES.TRAP_BASIC,
	element: 'fire',
	victimShields: [{
		id: 'fire.fire_trap.vs1',
		tick: 8,
		value: 35,
		sprite: new Sprite('./img/spells/fire_trap/bonus_10x12.png', 10, 12, 1),
		element: 'fire',
		isBonus: false
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/fire_trap/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/fire_trap/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'fire.aquifex',
	name: "Aquifex",
	type: SPELL_TYPES.TRAP_BASIC,
	element: 'fire',
	victimShields: [{
		id: 'fire.aquifex.vs1',
		tick: 8,
		sprite: new Sprite('./img/spells/aquifex/bonus_10x12.png', 10, 12, 1),
		element: 'fire',
		elementTo: 'water',
		isBonus: false
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/aquifex/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/aquifex/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'water.wave',
	name: "Wave",
	type: SPELL_TYPES.ATTACK_BASIC,
	element: 'water',
	damages: [
		{
			tick: 8,
			minDamage: -110,
			maxDamage: -130,
			element: 'water'
		}
	],
	vrilRequired: 1,
	cardSprite: new Sprite('./img/spells/wave/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/wave/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'water.water_shield',
	name: "Water Shield",
	type: SPELL_TYPES.SHIELD_BASIC,
	element: 'water',
	victimShields: [{
		id: 'water.water_shield.vs1',
		tick: 8,
		value: -45,
		sprite: new Sprite('./img/spells/water_shield/bonus_10x12.png', 10, 12, 1),
		element: 'water',
		isBonus: true
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/water_shield/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/water_shield/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex < 4) || (casterIndex >= 4 && victimIndex >= 4)
});

registerSpell({
	id: 'water.weakness',
	name: "Weakness",
	type: SPELL_TYPES.JINX_BASIC,
	element: 'water',
	victimBlades: [{
		id: 'water.weakness.vb1',
		tick: 8,
		value: -20,
		sprite: new Sprite('./img/spells/weakness/bonus_10x12.png', 10, 12, 1),
		element: 'all',
		isBonus: false
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/weakness/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/weakness/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'water.water_blade',
	name: "Water Blade",
	type: SPELL_TYPES.BLADE_BASIC,
	element: 'water',
	victimBlades: [{
		id: 'water.water_blade.vb1',
		tick: 8,
		value: 30,
		sprite: new Sprite('./img/spells/water_blade/bonus_10x12.png', 10, 12, 1),
		element: 'water',
		isBonus: true
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/water_blade/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/water_blade/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex < 4) || (casterIndex >= 4 && victimIndex >= 4)
});

registerSpell({
	id: 'water.deluge',
	name: "Deluge",
	type: SPELL_TYPES.ATTACK_BASIC,
	element: 'water',
	damages: [
		{
			tick: 12,
			minDamage: -240,
			maxDamage: -280,
			element: 'water'
		}
	],
	victimShields: [{
		id: 'water.deluge.vs1',
		tick: 19,
		value: 15,
		sprite: new Sprite('./img/spells/deluge/bonus_10x12.png', 10, 12, 1),
		element: 'water',
		isBonus: false
	}],
	vrilRequired: 3,
	cardSprite: new Sprite('./img/spells/deluge/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/deluge/spell_240x135.png', 240, 135, 20),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'water.water_trap',
	name: "Water Trap",
	type: SPELL_TYPES.TRAP_BASIC,
	element: 'water',
	victimShields: [{
		id: 'water.water_trap.vs1',
		tick: 8,
		value: 30,
		sprite: new Sprite('./img/spells/water_trap/bonus_10x12.png', 10, 12, 1),
		element: 'water',
		isBonus: false
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/water_trap/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/water_trap/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'water.ignifex',
	name: "Ignifex",
	type: SPELL_TYPES.TRAP_BASIC,
	element: 'water',
	victimShields: [{
		id: 'water.ignifex.vs1',
		tick: 8,
		sprite: new Sprite('./img/spells/ignifex/bonus_10x12.png', 10, 12, 1),
		element: 'water',
		elementTo: 'fire',
		isBonus: false
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/ignifex/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/ignifex/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'earth.boulder',
	name: "Boulder",
	type: SPELL_TYPES.ATTACK_BASIC,
	element: 'earth',
	damages: [
		{
			tick: 8,
			maxDamage: -100,
			minDamage: -90,
			element: 'earth'
		}
	],
	vrilRequired: 1,
	cardSprite: new Sprite('./img/spells/boulder/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/boulder/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'earth.earthquake',
	name: "Earthquake",
	type: SPELL_TYPES.ATTACK_BASIC,
	element: 'earth',
	damages: [
		{
			tick: 10,
			maxDamage: -200,
			minDamage: -170,
			element: 'earth'
		}
	],
	vrilRequired: 2,
	cardSprite: new Sprite('./img/spells/earthquake/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/earthquake/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'earth.earth_shield',
	name: "Earth Shield",
	type: SPELL_TYPES.SHIELD_BASIC,
	element: 'earth',
	victimShields: [
		{
			id: 'earth.earth_shield.vs1',
			tick: 7,
			value: -25,
			sprite: new Sprite('./img/spells/earth_shield/bonus_air_10x12.png', 10, 12, 1),
			element: 'air',
			isBonus: true
		},
		{
			id: 'earth.earth_shield.vs2',
			tick: 9,
			value: -25,
			sprite: new Sprite('./img/spells/earth_shield/bonus_fire_10x12.png', 10, 12, 1),
			element: 'fire',
			isBonus: true
		},
		{
			id: 'earth.earth_shield.vs3',
			tick: 11,
			value: -25,
			sprite: new Sprite('./img/spells/earth_shield/bonus_water_10x12.png', 10, 12, 1),
			element: 'water',
			isBonus: true
		},
		{
			id: 'earth.earth_shield.vs4',
			tick: 12,
			value: -25,
			sprite: new Sprite('./img/spells/earth_shield/bonus_earth_10x12.png', 10, 12, 1),
			element: 'earth',
			isBonus: true
		}
	],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/earth_shield/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/earth_shield/spell_240x135.png', 240, 135, 15),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex < 4) || (casterIndex >= 4 && victimIndex >= 4)
});

registerSpell({
	id: 'earth.earth_blade',
	name: "Earth Blade",
	type: SPELL_TYPES.BLADE_BASIC,
	element: 'earth',
	victimBlades: [{
		id: 'earth.earth_blade.vb1',
		tick: 8,
		value: 20,
		sprite: new Sprite('./img/spells/earth_blade/bonus_10x12.png', 10, 12, 1),
		element: 'earth',
		isBonus: true
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/earth_blade/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/earth_blade/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex < 4) || (casterIndex >= 4 && victimIndex >= 4)
});

registerSpell({
	id: 'earth.earth_trap',
	name: "Earth Trap",
	type: SPELL_TYPES.TRAP_BASIC,
	element: 'earth',
	victimShields: [{
		id: 'earth.earth_trap.vs1',
		tick: 8,
		value: 20,
		sprite: new Sprite('./img/spells/earth_trap/bonus_10x12.png', 10, 12, 1),
		element: 'earth',
		isBonus: false
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/earth_trap/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/earth_trap/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'earth.burden',
	name: "Burden",
	type: SPELL_TYPES.TRAP_BASIC,
	element: 'earth',
	victimShields: [{
		id: 'earth.burden.vs1',
		tick: 8,
		value: 70,
		sprite: new Sprite('./img/spells/burden/bonus_10x12.png', 10, 12, 1),
		element: 'all',
		isBonus: false
	}],
	casterShields: [{
		id: 'earth.burden.cs1',
		tick: 10,
		value: 35,
		sprite: new Sprite('./img/spells/burden/bonus_10x12.png', 10, 12, 1),
		element: 'all',
		isBonus: false
	}],
	vrilRequired: 1,
	cardSprite: new Sprite('./img/spells/burden/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/burden/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'earth.caelifex',
	name: "Caelifex",
	type: SPELL_TYPES.TRAP_BASIC,
	element: 'earth',
	victimShields: [{
		id: 'earth.caelifex.vs1',
		tick: 8,
		sprite: new Sprite('./img/spells/caelifex/bonus_10x12.png', 10, 12, 1),
		element: 'earth',
		elementTo: 'air',
		isBonus: false
	}],
	vrilRequired: 0,
	cardSprite: new Sprite('./img/spells/caelifex/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/caelifex/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'air.updraft',
	name: "Updraft",
	type: SPELL_TYPES.ATTACK_BASIC,
	element: 'air',
	damages: [
		{
			tick: 8,
			minDamage: -95,
			maxDamage: -110,
			element: 'air'
		}
	],
	vrilRequired: 1,
	cardSprite: new Sprite('./img/spells/updraft/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/updraft/spell_240x135.png', 240, 135, 12),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'water.baitfish',
	name: "Baitfish",
	type: SPELL_TYPES.ATTACK_BASIC,
	element: 'water',
	damages: [
		{
			tick: 10,
			minDamage: -160,
			maxDamage: -190,
			element: 'water',
			steal: .5
		}
	],
	vrilRequired: 2,
	cardSprite: new Sprite('./img/spells/baitfish/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/baitfish/spell_240x135.png', 240, 135, 16),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

registerSpell({
	id: 'fire.mortar',
	name: "Mortar",
	type: SPELL_TYPES.ATTACK_ALL,
	element: 'fire',
	damages: [
		{
			tick: 13,
			minDamage: -300,
			maxDamage: -320,
			element: 'fire'
		}
	],
	vrilRequired: 3,
	cardSprite: new Sprite('./img/spells/mortar/card_48x64.png', 48, 64, 1),
	spellAnimation: new Sprite('./img/spells/mortar/spell_240x135.png', 240, 135, 18),
	canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
});

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
	// need earth attack
];

// easter egg >:)
function giveMeTheGun() {
	console.log("https://media.tenor.com/xOefCCemGU4AAAAC/kek.gif");
	const gun = {
		id: crypto.randomUUID(),
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
		cardSprite: new Sprite('./img/spells/gun/card_48x64.png', 48, 64, 1),
		spellAnimation: new Sprite('./img/spells/gun/spell_240x135.png', 240, 135, 12),
		canUseSpellOn: () => true
	};
	if (state.battleState) {
		state.battleState.battleData[state.battleState.playerIndex].hand.push(gun.id);
	}
	state.knownSpells.push(gun.id);
	registerSpell(gun);
}

function giveMeAllSpells() {
	state.knownSpells = Object.keys(spellDirectory);
}