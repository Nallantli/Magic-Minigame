const serverUrl = 'wss://wmgs.nallant.li:8080';

const SCALE_FACTOR = 4;
const FPS = 75;
let TICK_TIME = 15;

const canvas = document.getElementById('main');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

let mousePos = { x: 0, y: 0 };
let clickPos = undefined;
let rightClickPos = undefined;
let keys = {};
let keysUp = [];
let keysPressed = [];

canvas.addEventListener("mousemove", function (evt) {
	mousePos = getMousePos(canvas, evt);
}, false);

canvas.addEventListener("click", function (evt) {
	clickPos = getMousePos(canvas, evt);
}, false);

canvas.addEventListener("contextmenu", function (evt) {
	evt.preventDefault();
	rightClickPos = getMousePos(canvas, evt);
}, false);

canvas.addEventListener("keydown", function (evt) {
	keys[evt.key.toLowerCase()] = true;
	keysPressed.push(evt.key.toLocaleLowerCase());
}, false);

canvas.addEventListener("keyup", function (evt) {
	keys[evt.key.toLowerCase()] = false;
	keysUp.push(evt.key.toLowerCase());
}, false);

let battleTrack = undefined;

const defaultBattleTrack = new Audio('./audio/battle_track.wav');

const walkingTrack = new Audio('./audio/cave.wav');
walkingTrack.loop = true;
walkingTrack.volume = 0.5;

const levelUpSound = new Audio('./audio/level_up.wav');
levelUpSound.volume = 0.1;

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
	PLACARD_EMPTY_160x65: new Sprite('./img/placard_empty_160x65.png', 160, 65, 1),
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
	DECK_CARDS_204x268: new Sprite('./img/deck_cards_204x268.png', 204, 268, 1),
	DECK_CIRCLE_48x64: new Sprite('./img/deck_circle_48x64.png', 48, 64, 1),
	BACK_32x32: new Sprite('./img/back_32x32.png', 32, 32, 1),
	EDIT_DECKS_64x12: new Sprite('./img/edit_decks_64x12.png', 64, 12, 1),
	CUSTOMIZE_64x12: new Sprite('./img/customize_64x12.png', 64, 12, 1),
	TOOLTIP_CORNER_3x3: new Sprite('./img/tooltip_corner_3x3.png', 3, 3, 4),
	CUSTOMIZE_ICONS_16x16: new Sprite('./img/customize_icons_16x16.png', 16, 16, 4),
	CUSTOMIZE_LIST_136x300: new Sprite('./img/customize_list_136x300.png', 136, 300, 1),
	FF_BUTTON_16x16: new Sprite('./img/ff_button_16x16.png', 16, 16, 2),
	YOU_DIED_160x64: new Sprite('./img/you_died_160x64.png', 160, 64, 1),
	GROUND_32x32: new Sprite('./img/maps/tiles/ground.png', 32, 32, 1),
	PLANKS_32x32: new Sprite('./img/maps/tiles/planks.png', 32, 32, 1),
	LOCKED_DOOR_32x32: new Sprite('./img/maps/tiles/locked_door.png', 32, 32, 1),
	UNLOCKED_DOOR_32x32: new Sprite('./img/maps/tiles/unlocked_door.png', 32, 32, 1),
	STAIRS_32x32: new Sprite('./img/maps/tiles/stairs.png', 32, 32, 1),
	HEAL_COIN_16x16: new Sprite('./img/heal_count_16x16.png', 16, 16, 8),
	READY_UP_62x11: new Sprite('./img/ready_up_62x11.png', 62, 11, 2),
	CREATE_GAME_69x11: new Sprite('./img/create_game_69x11.png', 69, 11, 2),
	JOIN_GAME_69x11: new Sprite('./img/join_game_69x11.png', 69, 11, 2),
	EDIT_DECK_67x11: new Sprite('./img/edit_deck_67x11.png', 67, 11, 2),
	RETURN_TO_MENU_87x11: new Sprite('./img/return_to_menu_87x11.png', 93, 11, 2),
	DECK_REMAIN_48x64: new Sprite('./img/deck_remain_48x64.png', 48, 64, 1),
	ENCHANTMENT_BORDER_48x64: new Sprite('./img/enchantment_border_48x64.png', 48, 64, 31),
	// MEME
	FAZBEAR_32x64: new Sprite('./img/fazbear_32x64.png', 32, 64, 1)
};

const tiles = {
	BRICK: new Tile('./img/maps/tiles/brick.png', 32, 32),
	SINITIC: new Tile('./img/maps/tiles/sinitic.png', 32, 32)
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
	JINX_BASIC: 'JINX_BASIC',

	ENCHANTMENT: 'ENCHANTMENT'
};

const ELEMENT_ICONS = {
	all: new Sprite('./img/aether_32x32.png', 32, 32, 2),
	fire: new Sprite('./img/fire_32x32.png', 32, 32, 2),
	air: new Sprite('./img/air_32x32.png', 32, 32, 2),
	water: new Sprite('./img/water_32x32.png', 32, 32, 2),
	earth: new Sprite('./img/earth_32x32.png', 32, 32, 2),
	solar: new Sprite('./img/solar_32x32.png', 32, 32, 2)
};

const ELEMENT_COLORS = {
	all: 0,
	air: 1,
	fire: 2,
	water: 3,
	earth: 4,
	solar: 5
};

const ELEMENT_ID_LIST = [
	'all',
	'air',
	'fire',
	'water',
	'earth',
	'solar'
];

const ELEMENT_CARD_ITEMS = {
	'all': new Sprite('./img/aether_card_item_16x16.png', 16, 16, 18),
	'air': new Sprite('./img/air_card_item_16x16.png', 16, 16, 18),
	'fire': new Sprite('./img/fire_card_item_16x16.png', 16, 16, 18),
	'water': new Sprite('./img/water_card_item_16x16.png', 16, 16, 18),
	'earth': new Sprite('./img/earth_card_item_16x16.png', 16, 16, 18),
	'solar': new Sprite('./img/solar_card_item_16x16.png', 16, 16, 18)
};