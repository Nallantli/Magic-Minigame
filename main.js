const FPS = 120;
const TICK_TIME = 24;

const canvas = document.getElementById('main');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

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

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect(), // abs. size of element
		scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
		scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

	return {
		x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
		y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
	}
}

function generateState() {
	const battleData = [
		{
			shields: [],
			blades: [],
			vril: 1,
			superVril: 0,
			entity: wizard,
			hand: [
				SPELLS.FIREBALL,
				SPELLS.FIRE_SHIELD,
				SPELLS.FIRE_BLADE,
				SPELLS.MAGNIFY
			],
			AI: randomAI
		},
		{
			shields: [],
			blades: [],
			vril: 1,
			superVril: 0,
			entity: wizard2,
			hand: [
				SPELLS.AIR_BLADE,
				SPELLS.AIR_SHIELD,
				SPELLS.GENTLE_BREEZE,
				SPELLS.DUST_DEVIL
			],
			AI: randomAI
		},
		{
			shields: [],
			blades: [],
			vril: 1,
			superVril: 0,
			entity: wizard3,
			hand: [
				SPELLS.WATER_SHIELD,
				SPELLS.WATER_BLADE,
				SPELLS.WAVE,
				SPELLS.WEAKNESS
			],
			AI: randomAI
		},
		{
			shields: [],
			blades: [],
			vril: 1,
			superVril: 0,
			entity: wizard4,
			hand: [
				SPELLS.EARTH_SHIELD,
				SPELLS.EARTH_BLADE,
				SPELLS.BOULDER,
				SPELLS.EARTHQUAKE
			],
			AI: randomAI
		},
		{
			shields: [],
			blades: [],
			vril: 1,
			superVril: 0,
			entity: earth_skeleton,
			hand: [
				SPELLS.EARTH_SHIELD,
				SPELLS.EARTH_BLADE,
				SPELLS.BOULDER,
				SPELLS.EARTHQUAKE
			],
			AI: randomAI
		},
		{
			shields: [],
			blades: [],
			vril: 1,
			superVril: 0,
			entity: water_skeleton,
			hand: [
				SPELLS.WATER_SHIELD,
				SPELLS.WATER_BLADE,
				SPELLS.WAVE,
				SPELLS.WEAKNESS
			],
			AI: randomAI
		},
		{
			shields: [],
			blades: [],
			vril: 1,
			superVril: 0,
			entity: air_skeleton,
			hand: [
				SPELLS.AIR_BLADE,
				SPELLS.AIR_SHIELD,
				SPELLS.GENTLE_BREEZE,
				SPELLS.DUST_DEVIL
			],
			AI: randomAI
		},
		{
			shields: [],
			blades: [],
			vril: 1,
			superVril: 0,
			entity: fire_skeleton,
			hand: [
				SPELLS.FIREBALL,
				SPELLS.FIRE_SHIELD,
				SPELLS.FIRE_BLADE,
				SPELLS.MAGNIFY
			],
			AI: randomAI
		},
	];
	
	return {
		iterator: 0,
		startTime: undefined,
		battleData,
		selectedCards: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
		selectedVictims: [[], [], [], [], [], [], [], []],
		playerIndex: 0,
		animationQueue: [new AnimationEngine(getReturnSequence(battleData), TICK_TIME, FPS, canvas, ctx, reduceAnimationQueue)],
		battleIndex: -1
	};
}

let state = {};
let mousePos = { x: 0, y: 0 };
let clickPos = undefined;
let rightClickPos = undefined;

let mainTrack = new Audio(randomFromList([
	'./audio/track1.wav',
	'./audio/track2.wav',
	'./audio/track3.wav',
	'./audio/track4.wav'
]));
mainTrack.loop = true;

let PATH = 'MENU';

function menuGameLoop(timeMs) {
	ctx.globalAlpha = 1;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	sprites.START_128x48.draw(ctx, scale(240 - 64), scale(187 - 24), scale(128), scale(48), 0, false);

	if (mousePos.x > scale(240 - 64) && mousePos.x < scale(240 - 64 + 128) && mousePos.y > scale(187 - 24) && mousePos.y < scale(187 - 24 + 48)) {
		ctx.fillStyle = 'white';
		ctx.fillRect(scale(240 - 64), scale(187 - 24 + 52), scale(128), scale(4));
		if (clickPos?.x > scale(240 - 64) && clickPos?.x < scale(240 - 64 + 128) && clickPos?.y > scale(187 - 24) && clickPos?.y < scale(187 - 24 + 48)) {
			state = generateState();
			PATH = 'BATTLE';
			mainTrack.play();
		}
	}
}

function gameLoop(timeMs) {
	switch (PATH) {
		case 'MENU':
			menuGameLoop(timeMs);
			break;
		case 'BATTLE':
			battleGameLoop(timeMs);
			break;
	}
	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);