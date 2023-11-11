const SCALE_FACTOR = 4;

const sprites = {
	// PLACEHOLDERS
	_96x64: new Sprite('./img/_96x64.png', 96, 64, 1),
	_160x96: new Sprite('./img/_160x96.png', 160, 96, 1),
	// REAL
	ELEMENT_SPARKS_32x16: new Sprite('./img/element_sparks_32x16.png', 32, 16, 1),
	CASTING_CIRCLE_48x24: new Sprite('./img/casting_circle_48x24.png', 48, 24, 1),
	CASTING_CIRCLE_START_48x24: new Sprite('./img/casting_circle_start_48x24.png', 48, 24, 8),
	CASTING_CIRCLE_END_48x24: new Sprite('./img/casting_circle_end_48x24.png', 48, 24, 8),
	VRIL_4x4: new Sprite('./img/vril_4x4.png', 4, 4, 5),
	SUPER_VRIL_4x4: new Sprite('./img/super_vril_4x4.png', 4, 4, 5),
	ELEMENTS_MINOR_8x8: new Sprite('./img/elements_minor_8x8.png', 8, 8, 5),
	PLACARD_160x65: new Sprite('./img/placard_160x65.png', 160, 65, 1),
	PLACARD_RIGHT_160x65: new Sprite('./img/placard_right_160x65.png', 160, 65, 1),
	VICTIM_ARROW_8x16: new Sprite('./img/victim_arrow_8x16.png', 8, 16, 2),
	PASS_39x16: new Sprite('./img/pass_39x16.png', 39, 16, 1),
	PASS_24x32: new Sprite('./img/pass_24x32.png', 24, 32, 1),
	BOTTOM_COVER_480x105: new Sprite('./img/bottomcover_480x105.png', 480, 105, 1),
	START_128x48: new Sprite('./img/start_128x48.png', 128, 48, 1),
	DECK_SLOT_50x50: new Sprite('./img/deck_slot_50x50.png', 50, 50, 2),
	ENTITY_SELECT_32x32: new Sprite('./img/entity_select_32x32.png', 32, 32, 1),
	ELEMENT_SELECT_32x32: new Sprite('./img/element_select_32x32.png', 32, 32, 1),
	DECK_BACK_252x302: new Sprite('./img/deck_back_252x302.png', 252, 302, 1),
	DECK_X_48x48: new Sprite('./img/deck_x_48x48.png', 48, 48, 1),
	DECK_CARDS_164x268: new Sprite('./img/deck_cards_164x268.png', 164, 268, 1),
	DECK_CIRCLE_48x64: new Sprite('./img/deck_circle_48x64.png', 48, 64, 1),
	BACK_32x32: new Sprite('./img/back_32x32.png', 32, 32, 1),
	EDIT_DECKS_64x12: new Sprite('./img/edit_decks_64x12.png', 64, 12, 1),
	TOOLTIP_CORNER_3x3: new Sprite('./img/tooltip_corner_3x3.png', 3, 3, 4),
	// MEME
	FAZBEAR_32x64: new Sprite('./img/fazbear_32x64.png', 32, 64, 1)
};

const numberText = new NumberText('./img/numbers_4x6.png', 4, 6);
const font = new Font('./img/font_6x8.png', 6, 8);

const SPELL_TYPES = {
	ATTACK_BASIC: "ATTACK_BASIC",
	ATTACK_ALL: 'ATTACK_ALL',
	SHIELD_BASIC: 'SHIELD_BASIC',
	BLADE_BASIC: 'BLADE_BASIC',
	HEALING_BASIC: 'HEALING_BASIC',

	TRAP_BASIC: 'TRAP_BASIC',
	JINX_BASIC: 'JINX_BASIC'
};

const ELEMENT_ICONS = {
	all: new Sprite('./img/aether_32x32.png', 32, 32, 1),
	fire: new Sprite('./img/fire_32x32.png', 32, 32, 1),
	air: new Sprite('./img/air_32x32.png', 32, 32, 1),
	water: new Sprite('./img/water_32x32.png', 32, 32, 1),
	earth: new Sprite('./img/earth_32x32.png', 32, 32, 1)
};

const ELEMENT_COLORS = {
	all: 0,
	air: 1,
	fire: 2,
	water: 3,
	earth: 4
};

const ELEMENT_ID_LIST = [
	'all',
	'air',
	'fire',
	'water',
	'earth'
];

const SPELLS = {
	all: {

	},
	air: {
		DUST_DEVIL: {
			id: crypto.randomUUID(),
			name: "Dust Devil",
			type: SPELL_TYPES.ATTACK_ALL,
			element: 'air',
			damages: [
				{
					tick: 8,
					damage: -80,
					element: 'air'
				}
			],
			vrilRequired: 2,
			cardSprite: new Sprite('./img/spells/dust_devil/card_48x64.png', 48, 64, 1),
			spellAnimation: new Sprite('./img/spells/dust_devil/spell_240x135.png', 240, 135, 12),
			canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
		},
		GENTLE_BREEZE: {
			id: crypto.randomUUID(),
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
		},
		AIR_SHIELD: {
			id: crypto.randomUUID(),
			name: "Air Shield",
			type: SPELL_TYPES.SHIELD_BASIC,
			element: 'air',
			victimShields: [{
				id: crypto.randomUUID(),
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
		},
		AIR_BLADE: {
			id: crypto.randomUUID(),
			name: "Air Blade",
			type: SPELL_TYPES.BLADE_BASIC,
			element: 'air',
			victimBlades: [{
				id: crypto.randomUUID(),
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
		}
	},
	fire: {
		FIREBALL: {
			id: crypto.randomUUID(),
			name: "Fireball",
			type: SPELL_TYPES.ATTACK_BASIC,
			element: 'fire',
			damages: [
				{
					tick: 8,
					damage: -140,
					element: 'fire'
				}
			],
			vrilRequired: 1,
			cardSprite: new Sprite('./img/spells/fireball/card_48x64.png', 48, 64, 1),
			spellAnimation: new Sprite('./img/spells/fireball/spell_240x135.png', 240, 135, 12),
			canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
		},
		FIRE_SHIELD: {
			id: crypto.randomUUID(),
			name: "Fire Shield",
			type: SPELL_TYPES.SHIELD_BASIC,
			element: 'fire',
			victimShields: [{
				id: crypto.randomUUID(),
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
		},
		FIRE_BLADE: {
			id: crypto.randomUUID(),
			name: "Fire Blade",
			type: SPELL_TYPES.BLADE_BASIC,
			element: 'fire',
			victimBlades: [{
				id: crypto.randomUUID(),
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
		},
		MAGNIFY: {
			id: crypto.randomUUID(),
			name: "Magnify",
			type: SPELL_TYPES.JINX_BASIC,
			element: 'fire',
			victimBlades: [{
				id: crypto.randomUUID(),
				tick: 8,
				value: 30,
				sprite: new Sprite('./img/spells/magnify/bonus_10x12.png', 10, 12, 1),
				element: 'all',
				isBonus: true
			}],
			casterBlades: [{
				id: crypto.randomUUID(),
				tick: 10,
				value: 60,
				sprite: new Sprite('./img/spells/magnify/bonus_10x12.png', 10, 12, 1),
				element: 'all',
				isBonus: true
			}],
			vrilRequired: 0,
			cardSprite: new Sprite('./img/spells/magnify/card_48x64.png', 48, 64, 1),
			spellAnimation: new Sprite('./img/spells/magnify/spell_240x135.png', 240, 135, 12),
			canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
		}
	},
	water: {
		WAVE: {
			id: crypto.randomUUID(),
			name: "Wave",
			type: SPELL_TYPES.ATTACK_BASIC,
			element: 'water',
			damages: [
				{
					tick: 8,
					damage: -110,
					element: 'water',
					steal: .5
				}
			],
			vrilRequired: 1,
			cardSprite: new Sprite('./img/spells/wave/card_48x64.png', 48, 64, 1),
			spellAnimation: new Sprite('./img/spells/wave/spell_240x135.png', 240, 135, 12),
			canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
		},
		WATER_SHIELD: {
			id: crypto.randomUUID(),
			name: "Water Shield",
			type: SPELL_TYPES.SHIELD_BASIC,
			element: 'water',
			victimShields: [{
				id: crypto.randomUUID(),
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
		},
		WEAKNESS: {
			id: crypto.randomUUID(),
			name: "Weakness",
			type: SPELL_TYPES.JINX_BASIC,
			element: 'water',
			victimBlades: [{
				id: crypto.randomUUID(),
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
		},
		WATER_BLADE: {
			id: crypto.randomUUID(),
			name: "Water Blade",
			type: SPELL_TYPES.BLADE_BASIC,
			element: 'water',
			victimBlades: [{
				id: crypto.randomUUID(),
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
		},
		DELUGE: {
			id: crypto.randomUUID(),
			name: "Deluge",
			type: SPELL_TYPES.ATTACK_BASIC,
			element: 'water',
			damages: [
				{
					tick: 12,
					damage: -240,
					element: 'water'
				}
			],
			victimShields: [{
				id: crypto.randomUUID(),
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
		},
	},
	earth: {
		BOULDER: {
			id: crypto.randomUUID(),
			name: "Boulder",
			type: SPELL_TYPES.ATTACK_BASIC,
			element: 'earth',
			damages: [
				{
					tick: 8,
					damage: -100,
					element: 'earth'
				}
			],
			vrilRequired: 1,
			cardSprite: new Sprite('./img/spells/boulder/card_48x64.png', 48, 64, 1),
			spellAnimation: new Sprite('./img/spells/boulder/spell_240x135.png', 240, 135, 12),
			canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
		},
		EARTHQUAKE: {
			id: crypto.randomUUID(),
			name: "Earthquake",
			type: SPELL_TYPES.ATTACK_BASIC,
			element: 'earth',
			damages: [
				{
					tick: 10,
					damage: -200,
					element: 'earth'
				}
			],
			vrilRequired: 2,
			cardSprite: new Sprite('./img/spells/earthquake/card_48x64.png', 48, 64, 1),
			spellAnimation: new Sprite('./img/spells/earthquake/spell_240x135.png', 240, 135, 12),
			canUseSpellOn: (casterIndex, victimIndex) => (casterIndex < 4 && victimIndex >= 4) || (casterIndex >= 4 && victimIndex < 4)
		},
		EARTH_SHIELD: {
			id: crypto.randomUUID(),
			name: "Earth Shield",
			type: SPELL_TYPES.SHIELD_BASIC,
			element: 'earth',
			victimShields: [
				{
					id: crypto.randomUUID(),
					tick: 7,
					value: -25,
					sprite: new Sprite('./img/spells/earth_shield/bonus_air_10x12.png', 10, 12, 1),
					element: 'air',
					isBonus: true
				},
				{
					id: crypto.randomUUID(),
					tick: 9,
					value: -25,
					sprite: new Sprite('./img/spells/earth_shield/bonus_fire_10x12.png', 10, 12, 1),
					element: 'fire',
					isBonus: true
				},
				{
					id: crypto.randomUUID(),
					tick: 11,
					value: -25,
					sprite: new Sprite('./img/spells/earth_shield/bonus_water_10x12.png', 10, 12, 1),
					element: 'water',
					isBonus: true
				},
				{
					id: crypto.randomUUID(),
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
		},
		EARTH_BLADE: {
			id: crypto.randomUUID(),
			name: "Earth Blade",
			type: SPELL_TYPES.BLADE_BASIC,
			element: 'earth',
			victimBlades: [{
				id: crypto.randomUUID(),
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
		}
	}
};