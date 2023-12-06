
function createMiddleCastingSequence(enterLeft, spellCastingStartTick, spell, casterId, casterData, castingCircleId, calculateDamages) {
	const elementSparksId = crypto.randomUUID();
	const spellTypeId = crypto.randomUUID();

	let actions = [
		{
			tick: spellCastingStartTick,
			type: ATYPES.INITIALIZE_ENTITY,
			id: spellTypeId,
			sprite: ELEMENT_ICONS[spell.element],
			alpha: 0,
			posX: scale(240 - 32),
			posY: scale(160),
			sizeX: scale(64),
			sizeY: scale(64),
			rot: -360,
			zIndex: 1
		},
		{
			tick: spellCastingStartTick + 2,
			type: ATYPES.SET_SPRITE,
			id: casterId,
			sprite: getCastSprite(casterData.entity),
			play: getCastSprite(casterData.entity).indices > 1,
			mirror: !enterLeft
		},
		{
			tick: spellCastingStartTick,
			type: ATYPES.INITIALIZE_ENTITY,
			id: castingCircleId,
			sprite: sprites.CASTING_CIRCLE_START_48x24,
			alpha: 0,
			posX: scale(240 - 48),
			posY: scale(218),
			sizeX: scale(96),
			sizeY: scale(48),
			rot: 0,
			zIndex: 3,
			iIndex: 0,
			play: true
		},
		{
			startTick: spellCastingStartTick,
			endTick: spellCastingStartTick + 9,
			type: ATYPES.CHANGE_POSITION_Y,
			id: castingCircleId,
			posY: scale(210),
			ease: EASE_TYPES.EASE_OUT
		},
		{
			tick: spellCastingStartTick + 8,
			type: ATYPES.SET_SPRITE,
			id: castingCircleId,
			sprite: sprites.CASTING_CIRCLE_48x24
		},
		{
			startTick: spellCastingStartTick,
			endTick: spellCastingStartTick + 9,
			type: ATYPES.CHANGE_OPACITY,
			id: castingCircleId,
			alpha: 1,
			ease: EASE_TYPES.EASE_IN
		},
		{
			startTick: spellCastingStartTick + 4,
			endTick: spellCastingStartTick + 12,
			type: ATYPES.CHANGE_OPACITY,
			id: spellTypeId,
			alpha: 1,
			ease: EASE_TYPES.EASE_IN
		},
		{
			startTick: spellCastingStartTick + 4,
			endTick: spellCastingStartTick + 12,
			type: ATYPES.CHANGE_POSITION_Y,
			id: spellTypeId,
			posY: scale(56),
			ease: EASE_TYPES.EASE_OUT
		},
		{
			startTick: spellCastingStartTick + 4,
			endTick: spellCastingStartTick + 12,
			type: ATYPES.CHANGE_ROTATION,
			id: spellTypeId,
			rot: 0,
			ease: EASE_TYPES.EASE_OUT
		},
		{
			tick: spellCastingStartTick + 14,
			type: ATYPES.PLAY_SOUND,
			audio: new Audio('./audio/cast.wav'),
			volume: 0.1
		},
		{
			tick: spellCastingStartTick + 14,
			type: ATYPES.INITIALIZE_ENTITY,
			id: elementSparksId,
			sprite: sprites.ELEMENT_SPARKS_32x16,
			alpha: 1,
			posX: scale(240 - 32),
			posY: scale(22),
			sizeX: scale(64),
			sizeY: scale(32),
			rot: 0,
			zIndex: 2
		},
		{
			startTick: spellCastingStartTick + 14,
			endTick: spellCastingStartTick + 19,
			type: ATYPES.CHANGE_OPACITY,
			id: elementSparksId,
			alpha: 0,
			ease: EASE_TYPES.EASE_IN
		},
		{
			startTick: spellCastingStartTick + 14,
			endTick: spellCastingStartTick + 19,
			type: ATYPES.CHANGE_POSITION_Y,
			id: elementSparksId,
			posY: scale(18),
			ease: EASE_TYPES.EASE_IN
		},
		{
			startTick: spellCastingStartTick + 14,
			endTick: spellCastingStartTick + 19,
			type: ATYPES.CHANGE_SIZE_X,
			id: elementSparksId,
			sizeX: scale(72),
			ease: EASE_TYPES.EASE_IN
		},
		{
			startTick: spellCastingStartTick + 14,
			endTick: spellCastingStartTick + 19,
			type: ATYPES.CHANGE_POSITION_X,
			id: elementSparksId,
			posX: scale(240 - 36),
			ease: EASE_TYPES.EASE_IN
		},
		{
			startTick: spellCastingStartTick + 14,
			endTick: spellCastingStartTick + 24,
			type: ATYPES.CHANGE_SIZE_X,
			id: spellTypeId,
			sizeX: scale(72),
			ease: EASE_TYPES.EASE_OUT
		},
		{
			startTick: spellCastingStartTick + 14,
			endTick: spellCastingStartTick + 24,
			type: ATYPES.CHANGE_SIZE_Y,
			id: spellTypeId,
			sizeY: scale(72),
			ease: EASE_TYPES.EASE_OUT
		},
		{
			startTick: spellCastingStartTick + 14,
			endTick: spellCastingStartTick + 24,
			type: ATYPES.CHANGE_POSITION_X,
			id: spellTypeId,
			posX: scale(240 - 36),
			ease: EASE_TYPES.EASE_OUT
		},
		{
			startTick: spellCastingStartTick + 14,
			endTick: spellCastingStartTick + 24,
			type: ATYPES.CHANGE_POSITION_Y,
			id: spellTypeId,
			posY: scale(52),
			ease: EASE_TYPES.EASE_OUT
		},
		{
			startTick: spellCastingStartTick + 14,
			endTick: spellCastingStartTick + 24,
			type: ATYPES.CHANGE_OPACITY,
			id: spellTypeId,
			alpha: 0,
			ease: EASE_TYPES.EASE_OUT
		}
	];

	if (calculateDamages.length > 0 && calculateDamages[0].isCritical) {
		const criticalTextId = crypto.randomUUID();
		actions = [
			...actions,
			{
				tick: spellCastingStartTick + 14,
				type: ATYPES.INITIALIZE_ENTITY,
				id: criticalTextId,
				sprite: font,
				text: 'CRITICAL',
				alpha: 1,
				posX: scale(240 - 6 * 8),
				posY: scale(64),
				sizeX: scale(12),
				sizeY: scale(16),
				rot: 0,
				zIndex: 2
			},
			{
				startTick: spellCastingStartTick + 14,
				endTick: spellCastingStartTick + 24,
				type: ATYPES.CHANGE_OPACITY,
				id: criticalTextId,
				alpha: 0,
				ease: EASE_TYPES.EASE_OUT
			},
			{
				startTick: spellCastingStartTick + 14,
				endTick: spellCastingStartTick + 24,
				type: ATYPES.CHANGE_POSITION_Y,
				id: criticalTextId,
				posY: scale(48),
				ease: EASE_TYPES.EASE_OUT
			}
		]
	}

	if (getCastSprite(casterData.entity).indices > 1) {
		actions = [
			...actions,
			{
				tick: spellCastingStartTick + getCastSprite(casterData.entity).indices + 2,
				type: ATYPES.PAUSE_ANIMATION,
				id: casterId
			}
		];
	}

	return actions;
}

function createLeftBladeCastingSequence(blades, baseId, iteratorOffset, startTick, useTick) {
	let actions = [];

	blades.forEach(({ id, tick, isBonus }, i) => {
		const i_offset = i + iteratorOffset;
		actions = [
			...actions,
			{
				tick: startTick + (useTick ? tick : 0),
				type: ATYPES.INITIALIZE_ENTITY,
				id: `${baseId}.${i_offset}.${id}`,
				sprite: spellSpriteDirectory[id],
				alpha: 0,
				posX: scale(6) + scale(24 * i_offset),
				posY: scale(318),
				sizeX: scale(20),
				sizeY: scale(24),
				rot: 0,
				zIndex: 100
			},
			{
				startTick: startTick + (useTick ? tick : 0),
				endTick: startTick + 5 + (useTick ? tick : 0),
				type: ATYPES.CHANGE_POSITION_Y,
				id: `${baseId}.${i_offset}.${id}`,
				posY: scale(310),
				ease: EASE_TYPES.EASE_OUT
			},
			{
				startTick: startTick + (useTick ? tick : 0),
				endTick: startTick + 5 + (useTick ? tick : 0),
				type: ATYPES.CHANGE_OPACITY,
				id: `${baseId}.${i_offset}.${id}`,
				alpha: 1,
				ease: EASE_TYPES.EASE_OUT
			}
		];

		if (useTick) {
			actions = [
				...actions,
				{
					tick: startTick + tick + 2,
					type: ATYPES.PLAY_SOUND,
					audio: new Audio(isBonus ? './audio/bonus.wav' : './audio/malus.wav'),
					volume: 0.1
				}
			];
		}
	});

	return actions;
}

function createLeftShieldCastingSequence(shields, baseId, iteratorOffset, startTick, useTick, posX, posY) {
	let actions = [];

	shields.forEach(({ id, tick, isBonus }, i) => {
		const i_offset = i + iteratorOffset;
		actions = [
			...actions,
			{
				tick: startTick + (useTick ? tick : 0),
				type: ATYPES.INITIALIZE_ENTITY,
				id: `${baseId}.${i_offset}.${id}`,
				sprite: spellSpriteDirectory[id],
				alpha: 0,
				posX: posX + scale(24 * i_offset),
				posY: posY + scale(8),
				sizeX: scale(20),
				sizeY: scale(24),
				rot: 0,
				zIndex: 100
			},
			{
				startTick: startTick + (useTick ? tick : 0),
				endTick: startTick + 5 + (useTick ? tick : 0),
				type: ATYPES.CHANGE_POSITION_Y,
				id: `${baseId}.${i_offset}.${id}`,
				posY: posY,
				ease: EASE_TYPES.EASE_OUT
			},
			{
				startTick: startTick + (useTick ? tick : 0),
				endTick: startTick + 5 + (useTick ? tick : 0),
				type: ATYPES.CHANGE_OPACITY,
				id: `${baseId}.${i_offset}.${id}`,
				alpha: 1,
				ease: EASE_TYPES.EASE_OUT
			}
		];

		if (useTick) {
			actions = [
				...actions,
				{
					tick: startTick + tick + 2,
					type: ATYPES.PLAY_SOUND,
					audio: new Audio(isBonus ? './audio/bonus.wav' : './audio/malus.wav'),
					volume: 0.1
				}
			];
		}
	});
	return actions;
}

function createRightShieldCastingSequence(shields, baseId, iteratorOffset, startTick, useTick, posX, posY) {
	let actions = [];

	shields.map((s, j) => ({ s, j })).toReversed().forEach(({ s: { id, tick, isBonus }, j }, i) => {
		const i_offset = i + iteratorOffset;
		const j_offset = j + iteratorOffset;
		actions = [
			...actions,
			{
				tick: startTick + (useTick ? tick : 0),
				type: ATYPES.INITIALIZE_ENTITY,
				id: `${baseId}.${j_offset}.${id}`,
				sprite: spellSpriteDirectory[id],
				alpha: 0,
				posX: posX - scale(24 * i_offset),
				posY: posY + scale(8),
				sizeX: scale(20),
				sizeY: scale(24),
				rot: 0,
				zIndex: 100
			},
			{
				startTick: startTick + (useTick ? tick : 0),
				endTick: startTick + 5 + (useTick ? tick : 0),
				type: ATYPES.CHANGE_POSITION_Y,
				id: `${baseId}.${j_offset}.${id}`,
				posY: posY,
				ease: EASE_TYPES.EASE_OUT
			},
			{
				startTick: startTick + (useTick ? tick : 0),
				endTick: startTick + 5 + (useTick ? tick : 0),
				type: ATYPES.CHANGE_OPACITY,
				id: `${baseId}.${j_offset}.${id}`,
				alpha: 1,
				ease: EASE_TYPES.EASE_OUT
			}
		];

		if (useTick) {
			actions = [
				...actions,
				{
					tick: startTick + tick + 2,
					type: ATYPES.PLAY_SOUND,
					audio: new Audio(isBonus ? './audio/bonus.wav' : './audio/malus.wav'),
					volume: 0.1
				}
			];
		}
	});

	return actions;
}

function createRightBladeCastingSequence(blades, baseId, iteratorOffset, startTick, useTick) {
	let actions = [];

	blades.map((s, j) => ({ s, j })).toReversed().forEach(({ s: { id, tick, isBonus }, j }, i) => {
		const i_offset = i + iteratorOffset;
		const j_offset = j + iteratorOffset;
		actions = [
			...actions,
			{
				tick: startTick + (useTick ? tick : 0),
				type: ATYPES.INITIALIZE_ENTITY,
				id: `${baseId}.${j_offset}.${id}`,
				sprite: spellSpriteDirectory[id],
				alpha: 0,
				posX: scale(480 - 26) - scale(24 * i_offset),
				posY: scale(318),
				sizeX: scale(20),
				sizeY: scale(24),
				rot: 0,
				zIndex: 100
			},
			{
				startTick: startTick + (useTick ? tick : 0),
				endTick: startTick + 5 + (useTick ? tick : 0),
				type: ATYPES.CHANGE_POSITION_Y,
				id: `${baseId}.${j_offset}.${id}`,
				posY: scale(310),
				ease: EASE_TYPES.EASE_OUT
			},
			{
				startTick: startTick + (useTick ? tick : 0),
				endTick: startTick + 5 + (useTick ? tick : 0),
				type: ATYPES.CHANGE_OPACITY,
				id: `${baseId}.${j_offset}.${id}`,
				alpha: 1,
				ease: EASE_TYPES.EASE_OUT
			}
		];

		if (useTick) {
			actions = [
				...actions,
				{
					tick: startTick + tick + 2,
					type: ATYPES.PLAY_SOUND,
					audio: new Audio(isBonus ? './audio/bonus.wav' : './audio/malus.wav'),
					volume: 0.1
				}
			];
		}
	});

	return actions;
}

function createCleanUpSequence(exitLeft, spellRemovalTick, cleanUpStartTick, spellId, casterId, castingCircleId, casterData) {
	return [
		{
			tick: spellRemovalTick,
			type: ATYPES.REMOVE_ENTITY,
			id: spellId
		},
		{
			tick: cleanUpStartTick + 2,
			type: ATYPES.SET_SPRITE,
			id: casterId,
			sprite: getIdleSprite(casterData.entity),
			play: getIdleSprite(casterData.entity).indices > 1,
			mirror: !exitLeft
		},
		{
			tick: cleanUpStartTick - 6,
			type: ATYPES.SET_SPRITE,
			id: castingCircleId,
			sprite: sprites.CASTING_CIRCLE_END_48x24,
			play: true
		},
		{
			tick: cleanUpStartTick + 2,
			type: ATYPES.REMOVE_ENTITY,
			id: castingCircleId
		},
		{
			startTick: cleanUpStartTick + 2,
			endTick: cleanUpStartTick + 7,
			id: casterId,
			type: ATYPES.CHANGE_POSITION_X,
			posX: exitLeft ? scale(-128) : scale(480),
			ease: EASE_TYPES.EASE_IN
		}
	];
}

function createEntityExitSequence(exitLeft, startTick, entityId) {
	return [
		{
			startTick: startTick,
			endTick: startTick + 5,
			id: entityId,
			type: ATYPES.CHANGE_POSITION_X,
			posX: exitLeft ? scale(-128) : scale(480),
			ease: EASE_TYPES.EASE_IN
		}
	];
}

function createEntityEnterSequence(enterLeft, startTick, casterId, casterData) {
	const casterNameId = `caster_name.${crypto.randomUUID()}`;
	const casterIconId = `caster_icon.${crypto.randomUUID()}`;

	return [
		{
			tick: startTick,
			type: ATYPES.INITIALIZE_ENTITY,
			id: casterId,
			sprite: getIdleSprite(casterData.entity),
			alpha: 1,
			posX: enterLeft ? scale(-96) : scale(480),
			posY: scale(128),
			sizeX: scale(96),
			sizeY: scale(96),
			rot: 0,
			zIndex: 4,
			mirror: !enterLeft,
			play: getIdleSprite(casterData.entity).indices > 1
		},
		{
			tick: startTick,
			type: ATYPES.INITIALIZE_ENTITY,
			id: casterNameId,
			sprite: font,
			alpha: 1,
			posX: enterLeft ? scale(16) : scale(480 - 16 - casterData.entity.name.length * 6),
			posY: scale(375 - 12),
			sizeX: scale(6),
			sizeY: scale(8),
			rot: 0,
			zIndex: 4,
			text: casterData.entity.name
		},
		{
			tick: startTick,
			type: ATYPES.INITIALIZE_ENTITY,
			id: casterIconId,
			sprite: sprites.ELEMENTS_MINOR_8x8,
			alpha: 1,
			posX: enterLeft ? scale(4) : scale(480 - 12),
			posY: scale(375 - 12),
			sizeX: scale(8),
			sizeY: scale(8),
			rot: 0,
			zIndex: 4,
			iIndex: ELEMENT_COLORS[casterData.entity.element]
		},
		{
			startTick: startTick,
			endTick: startTick + 10,
			type: ATYPES.CHANGE_POSITION_X,
			id: casterId,
			posX: scale(240 - 64),
			ease: EASE_TYPES.EASE_OUT
		},
		{
			startTick: startTick,
			endTick: startTick + 10,
			type: ATYPES.CHANGE_POSITION_Y,
			id: casterId,
			posY: scale(118),
			ease: EASE_TYPES.EASE_OUT
		},
		{
			startTick: startTick,
			endTick: startTick + 10,
			type: ATYPES.CHANGE_SIZE_X,
			id: casterId,
			sizeX: scale(128),
			ease: EASE_TYPES.EASE_IN
		},
		{
			startTick: startTick,
			endTick: startTick + 10,
			type: ATYPES.CHANGE_SIZE_Y,
			id: casterId,
			sizeY: scale(128),
			ease: EASE_TYPES.EASE_IN
		}
	];
}

function createMoveEntityToBattleSequence(moveLeft, spellCastingStartTick, casterId, castingCircleId) {
	return [
		{
			startTick: spellCastingStartTick + 15,
			endTick: spellCastingStartTick + 32,
			type: ATYPES.CHANGE_POSITION_X,
			id: casterId,
			posX: moveLeft ? scale(48 - 64) : scale(496 - 128),
			ease: EASE_TYPES.CONSTANT
		},
		{
			startTick: spellCastingStartTick + 15,
			endTick: spellCastingStartTick + 32,
			type: ATYPES.CHANGE_POSITION_X,
			id: castingCircleId,
			posX: moveLeft ? 0 : scale(480 - 96),
			ease: EASE_TYPES.CONSTANT
		}
	];
}

function createMoveVictimToBattleSequence(enterLeft, spellAnimationStartTick, victimDatas, victimIds, casterData, spell, calculatedDamages) {
	let actions = [];
	let buffer = 0;

	victimDatas.forEach((victimData, i) => {
		actions = [
			...actions,
			{
				tick: spellAnimationStartTick,
				type: ATYPES.INITIALIZE_ENTITY,
				id: victimIds[i],
				sprite: getIdleSprite(victimData.entity),
				alpha: 1,
				posX: enterLeft ? scale(-128) : scale(480),
				posY: scale(118) - scale(28 * i),
				sizeX: scale(128 - i * 16),
				sizeY: scale(128 - i * 16),
				rot: 0,
				zIndex: 8 - i,
				play: getIdleSprite(victimData.entity).indices > 1,
				mirror: !enterLeft
			},
			{
				startTick: spellAnimationStartTick,
				endTick: spellAnimationStartTick + 7 + i,
				type: ATYPES.CHANGE_POSITION_X,
				id: victimIds[i],
				posX: enterLeft ? scale(-8 - (victimDatas.length * 8) + i * 32) : scale(432 - (72 - victimDatas.length * 8) - i * 16),
				ease: EASE_TYPES.CONSTANT
			},
		];
	})

	if (victimDatas.length === 1) {
		const victimData = victimDatas[0];
		if (enterLeft) {
			actions = [
				...actions,
				...createLeftShieldCastingSequence(victimData.shields, victimData.entity.id, 0, spellAnimationStartTick, false, scale(6), scale(280)),
				...createLeftBladeCastingSequence(victimData.blades, victimData.entity.id, 0, spellAnimationStartTick, false),
				...createLeftShieldCastingSequence(spell.victimShields || [], victimData.entity.id, victimData.shields.length, spellAnimationStartTick, true, scale(6), scale(280)),
				...createLeftBladeCastingSequence(spell.victimBlades || [], victimData.entity.id, victimData.blades.length, spellAnimationStartTick, true)
			];
		} else {
			actions = [
				...actions,
				...createRightShieldCastingSequence(victimData.shields, victimData.entity.id, 0, spellAnimationStartTick, false, scale(480 - 26), scale(280)),
				...createRightBladeCastingSequence(victimData.blades, victimData.entity.id, 0, spellAnimationStartTick, false),
				...createRightShieldCastingSequence(spell.victimShields || [], victimData.entity.id, victimData.shields.length, spellAnimationStartTick, true, scale(480 - 26), scale(280)),
				...createRightBladeCastingSequence(spell.victimBlades || [], victimData.entity.id, victimData.blades.length, spellAnimationStartTick, true)
			];
		}
	} else {
		victimDatas.forEach((victimData, i) => {
			if (enterLeft) {
				actions = [
					...actions,
					...createLeftShieldCastingSequence(victimData.shields, victimData.entity.id, 0, spellAnimationStartTick, false, scale(72 - victimDatas.length * 8 + i * 26), scale(90) + scale(128 - i * 16) - scale(28 * i)),
					...createLeftShieldCastingSequence(spell.victimShields || [], victimData.entity.id, victimData.shields.length, spellAnimationStartTick, true, scale(72 - victimDatas.length * 8 + i * 26), scale(90) + scale(128 - i * 16) - scale(28 * i))
				];
			} else {
				actions = [
					...actions,
					...createRightShieldCastingSequence(victimData.shields, victimData.entity.id, 0, spellAnimationStartTick, false, scale(450 - (72 - victimDatas.length * 8) - i * 26), scale(90) + scale(128 - i * 16) - scale(28 * i)),
					...createRightShieldCastingSequence(spell.victimShields || [], victimData.entity.id, victimData.shields.length, spellAnimationStartTick, true, scale(450 - (72 - victimDatas.length * 8) - i * 26), scale(90) + scale(128 - i * 16) - scale(28 * i))
				];
			}
		});
	}

	const usedBladeIds = calculatedDamages[0].usedBladeIds;

	usedBladeIds.forEach(({ id, index }) => {
		actions = [
			...actions,
			{
				startTick: spellAnimationStartTick + 5,
				endTick: spellAnimationStartTick + 11,
				type: ATYPES.CHANGE_POSITION_Y,
				id: `${casterData.entity.id}.${index}.${id}`,
				posY: scale(270),
				ease: EASE_TYPES.EASE_OUT
			},
			{
				startTick: spellAnimationStartTick + 5,
				endTick: spellAnimationStartTick + 11,
				type: ATYPES.CHANGE_OPACITY,
				id: `${casterData.entity.id}.${index}.${id}`,
				alpha: scale(0),
				ease: EASE_TYPES.EASE_OUT
			}
		];
	});

	let victimHealths = victimDatas.map(v => v.entity.health);
	let stolenHealth = 0;
	let lastStolenHealthTick = 0;

	calculatedDamages.forEach(({ damages }, i) => {
		const victimData = victimDatas[i];
		const victimId = victimIds[i];
		damages.forEach(({ tick, damage, usedShieldIds, element, steal, augmented }) => {
			const damageTextId = crypto.randomUUID();

			victimHealths[i] += damage;

			usedShieldIds.forEach(({ id, index }) => {
				actions = [
					...actions,
					{
						startTick: spellAnimationStartTick + 5 + tick,
						endTick: spellAnimationStartTick + 5 + tick + 6,
						type: ATYPES.CHANGE_POSITION_Y,
						id: `${victimData.entity.id}.${index}.${id}`,
						posY: scale(270),
						ease: EASE_TYPES.EASE_OUT
					},
					{
						startTick: spellAnimationStartTick + 5 + tick,
						endTick: spellAnimationStartTick + 5 + tick + 6,
						type: ATYPES.CHANGE_OPACITY,
						id: `${victimData.entity.id}.${index}.${id}`,
						alpha: scale(0),
						ease: EASE_TYPES.EASE_OUT
					}
				];
			});

			const damageString = `${damage}${augmented !== undefined ? augmented : ''}`;

			const entityPosX = enterLeft ? scale(-8 - (victimDatas.length * 8) + i * 32) : scale(432 - (72 - victimDatas.length * 8) - i * 16);
			const entitySizeX = scale(128 - i * 16);

			actions = [
				...actions,
				{
					tick: spellAnimationStartTick + 5 + tick,
					type: ATYPES.PLAY_SOUND,
					audio: new Audio('./audio/hurt.wav'),
					volume: 0.1
				},
				{
					tick: spellAnimationStartTick + 5 + tick,
					type: ATYPES.INITIALIZE_ENTITY,
					id: damageTextId,
					sprite: numberText,
					alpha: 1,
					posX: entityPosX + entitySizeX / 2 - scale(damageString.length * 4),
					posY: scale(136) - scale(28 * i),
					sizeX: scale(8),
					sizeY: scale(12),
					rot: 0,
					iIndex: ELEMENT_COLORS[element],
					zIndex: 0,
					text: damageString
				},
				{
					startTick: spellAnimationStartTick + 5 + tick,
					endTick: spellAnimationStartTick + 5 + tick + 8,
					type: ATYPES.CHANGE_POSITION_Y,
					id: damageTextId,
					posY: scale(126) - scale(28 * i),
					ease: EASE_TYPES.EASE_OUT
				},
				{
					startTick: spellAnimationStartTick + 5 + tick + 2,
					endTick: spellAnimationStartTick + 5 + tick + 8,
					type: ATYPES.CHANGE_OPACITY,
					id: damageTextId,
					alpha: 0,
					ease: EASE_TYPES.EASE_OUT
				},
				...createJitterSequence(spellAnimationStartTick + 5 + tick, entityPosX, victimId, enterLeft ? scale(-8) : scale(8))
			];

			if (steal) {
				const stealTextId = crypto.randomUUID();
				stolenHealth += damage * steal;
				lastStolenHealthTick = tick;
			}
		});
	});

	if (stolenHealth < 0) {
		const stealTextId = crypto.randomUUID();

		const healString = `+${-stolenHealth}`;

		actions = [
			...actions,
			{
				tick: spellAnimationStartTick + 5 + lastStolenHealthTick,
				type: ATYPES.INITIALIZE_ENTITY,
				id: stealTextId,
				sprite: numberText,
				alpha: 1,
				posX: enterLeft ? scale(496 - 64 - healString.length * 4) : scale(48 - healString.length * 4),
				posY: scale(120),
				sizeX: scale(8),
				sizeY: scale(12),
				rot: 0,
				iIndex: 0,
				zIndex: 0,
				text: healString
			},
			{
				startTick: spellAnimationStartTick + 5 + lastStolenHealthTick,
				endTick: spellAnimationStartTick + 5 + lastStolenHealthTick + 8,
				type: ATYPES.CHANGE_POSITION_Y,
				id: stealTextId,
				posY: scale(110),
				ease: EASE_TYPES.EASE_OUT
			},
			{
				startTick: spellAnimationStartTick + 5 + lastStolenHealthTick + 2,
				endTick: spellAnimationStartTick + 5 + lastStolenHealthTick + 8,
				type: ATYPES.CHANGE_OPACITY,
				id: stealTextId,
				alpha: 0,
				ease: EASE_TYPES.EASE_OUT
			}
		];
	}

	victimHealths.forEach((victimHealth, i) => {
		const victimData = victimDatas[i];
		const victimId = victimIds[i];
		if (victimHealth <= 0) {
			buffer = Math.max(buffer, getDeathSprite(victimData.entity).indices);
			actions = [
				...actions,
				{
					tick: spellAnimationStartTick + 5 + getSpellSprite(spell).indices + 2,
					type: ATYPES.PLAY_SOUND,
					audio: new Audio('./audio/death.wav'),
					volume: 0.1
				},
				{
					tick: spellAnimationStartTick + 5 + getSpellSprite(spell).indices + 2,
					id: victimId,
					type: ATYPES.SET_SPRITE,
					sprite: getDeathSprite(victimData.entity),
					play: true,
					mirror: !enterLeft
				},
				{
					tick: spellAnimationStartTick + 5 + getSpellSprite(spell).indices + 2 + buffer,
					id: victimId,
					type: ATYPES.PAUSE_ANIMATION
				}
			];
		}
	});

	victimIds.forEach(victimId => {
		actions = [
			...actions,
			...createEntityExitSequence(enterLeft, spellAnimationStartTick + 5 + getSpellSprite(spell).indices + 2 + buffer, victimId)
		];
	});

	return { buffer, actions };
}

function createJitterSequence(startTick, posX, victimId, delta) {
	return [
		{
			tick: startTick,
			type: ATYPES.SET_POSITION_X,
			id: victimId,
			posX: posX + delta
		},
		{
			tick: startTick + 1,
			type: ATYPES.SET_POSITION_X,
			id: victimId,
			posX: posX
		},
		{
			tick: startTick + 2,
			type: ATYPES.SET_POSITION_X,
			id: victimId,
			posX: posX + delta
		},
		{
			tick: startTick + 3,
			type: ATYPES.SET_POSITION_X,
			id: victimId,
			posX: posX
		},
		{
			tick: startTick,
			type: ATYPES.SET_OPACITY,
			id: victimId,
			alpha: 0.5
		},
		{
			tick: startTick + 1,
			type: ATYPES.SET_OPACITY,
			id: victimId,
			alpha: 1
		},
		{
			tick: startTick + 2,
			type: ATYPES.SET_OPACITY,
			id: victimId,
			alpha: 0.5
		},
		{
			tick: startTick + 3,
			type: ATYPES.SET_OPACITY,
			id: victimId,
			alpha: 1
		}
	];
}

function createMiddleVictimSequence(mirror, spellAnimationStartTick, victimId, victimData, spell) {
	return [
		{
			tick: spellAnimationStartTick,
			type: ATYPES.INITIALIZE_ENTITY,
			id: victimId,
			sprite: getIdleSprite(victimData.entity),
			alpha: 1,
			posX: scale(240 - 64),
			posY: scale(270),
			sizeX: scale(128),
			sizeY: scale(128),
			rot: 0,
			zIndex: 2,
			play: getIdleSprite(victimData.entity).indices > 1,
			mirror: mirror
		},
		{
			startTick: spellAnimationStartTick,
			endTick: spellAnimationStartTick + 7,
			type: ATYPES.CHANGE_POSITION_Y,
			id: victimId,
			posY: scale(118),
			ease: EASE_TYPES.CONSTANT
		},
		{
			startTick: spellAnimationStartTick + 5 + getSpellSprite(spell).indices + 2,
			endTick: spellAnimationStartTick + 5 + getSpellSprite(spell).indices + 7,
			id: victimId,
			type: ATYPES.CHANGE_POSITION_Y,
			posY: scale(270),
			ease: EASE_TYPES.EASE_IN
		}
	];
}

function createLeftAttackSequence(battleData, casterIndex, victimIndices, spell, calculatedDamages, startTick) {
	// initialize caster;

	const casterData = battleData[casterIndex];

	const casterId = `caster.${crypto.randomUUID()}`;
	const spellId = `spell.${crypto.randomUUID()}`;
	const castingCircleId = `casting_circle.${crypto.randomUUID()}`;

	// deal with shields etc.

	let actions = [
		{
			tick: startTick,
			type: ATYPES.INITIALIZE_ENTITY,
			id: 'bottom_cover',
			sprite: sprites.BOTTOM_COVER_480x105,
			alpha: 1,
			posX: 0,
			posY: scale(270),
			sizeX: scale(480),
			sizeY: scale(105),
			rot: 0,
			zIndex: 3,
			play: false
		},
		...createEntityEnterSequence(true, startTick, casterId, casterData),
		...createLeftShieldCastingSequence(casterData.shields, casterData.entity.id, 0, startTick, false, scale(6), scale(280)),
		...createLeftBladeCastingSequence(casterData.blades, casterData.entity.id, 0, startTick, false)
	];

	const spellCastingStartTick = startTick + 10;

	// spell casting
	actions = [
		...actions,
		...createMiddleCastingSequence(true, spellCastingStartTick, spell, casterId, casterData, castingCircleId, calculatedDamages)
	];

	// spell animation

	let buffer = 0;
	let spellAnimationStartTick = spellCastingStartTick + 25;
	actions = [
		...actions,
		{
			tick: spellAnimationStartTick + ((battleData[victimIndices[0]].entity.id === casterData.entity.id) ? 0 : 5),
			type: ATYPES.INITIALIZE_ENTITY,
			id: spellId,
			sprite: getSpellSprite(spell),
			alpha: 1,
			posX: 0,
			posY: 0,
			sizeX: scale(480),
			sizeY: scale(270),
			rot: 0,
			zIndex: 0,
			play: true
		}
	];
	switch (spell.type) {
		case SPELL_TYPES.HEALING_BASIC: {
			const victimData = battleData[victimIndices[0]];
			const victimId = `victim.${crypto.randomUUID()}`;
			if (victimData.entity.id !== casterData.entity.id) {
				actions = [
					...actions,
					...createMoveEntityToBattleSequence(true, spellCastingStartTick, casterId, castingCircleId),
					...createMiddleVictimSequence(false, spellAnimationStartTick, victimId, victimData, spell),
					...createRightShieldCastingSequence(victimData.shields, victimData.entity.id, 0, spellAnimationStartTick, false, scale(480 - 26), scale(280)),
					...createRightBladeCastingSequence(victimData.blades, victimData.entity.id, 0, spellAnimationStartTick, false)
				];
			} else {
				spellAnimationStartTick -= 5;
			}

			spell.heals.forEach(({ tick, heal }) => {
				const healTextId = crypto.randomUUID();
				const healText = `+${heal}`;

				actions = [
					...actions,
					{
						tick: spellAnimationStartTick + 5 + tick,
						type: ATYPES.INITIALIZE_ENTITY,
						id: healTextId,
						sprite: numberText,
						alpha: 1,
						posX: scale(240 - healText.length * 4),
						posY: scale(120),
						sizeX: scale(8),
						sizeY: scale(12),
						rot: 0,
						iIndex: 0,
						zIndex: 0,
						text: healText
					},
					{
						startTick: spellAnimationStartTick + 5 + tick,
						endTick: spellAnimationStartTick + 5 + tick + 8,
						type: ATYPES.CHANGE_POSITION_Y,
						id: healTextId,
						posY: scale(110),
						ease: EASE_TYPES.EASE_OUT
					},
					{
						startTick: spellAnimationStartTick + 5 + tick + 2,
						endTick: spellAnimationStartTick + 5 + tick + 8,
						type: ATYPES.CHANGE_OPACITY,
						id: healTextId,
						alpha: 0,
						ease: EASE_TYPES.EASE_OUT
					},
					{
						tick: spellAnimationStartTick + 5 + tick,
						type: ATYPES.PLAY_SOUND,
						audio: new Audio('./audio/heal.wav'),
						volume: 0.1
					}
				];
			});

			break;
		}
		case SPELL_TYPES.TRAP_BASIC:
		case SPELL_TYPES.SHIELD_BASIC:
		case SPELL_TYPES.JINX_BASIC:
		case SPELL_TYPES.BLADE_BASIC: {
			const victimData = battleData[victimIndices[0]];
			const victimId = `victim.${crypto.randomUUID()}`;
			if (victimData.entity.id !== casterData.entity.id) {
				actions = [
					...actions,
					...createMoveEntityToBattleSequence(true, spellCastingStartTick, casterId, castingCircleId),
					...createMiddleVictimSequence(victimIndices[0] >= 4, spellAnimationStartTick, victimId, victimData, spell),
					...createRightShieldCastingSequence(victimData.shields, victimData.entity.id, 0, spellAnimationStartTick, false, scale(480 - 26), scale(280)),
					...createRightBladeCastingSequence(victimData.blades, victimData.entity.id, 0, spellAnimationStartTick, false),
					// new
					...createRightShieldCastingSequence(spell.victimShields || [], victimData.entity.id, victimData.shields.length, spellAnimationStartTick, true, scale(480 - 26), scale(280)),
					...createRightBladeCastingSequence(spell.victimBlades || [], victimData.entity.id, victimData.blades.length, spellAnimationStartTick + 5, true),
					...createLeftShieldCastingSequence(spell.casterShields || [], casterData.entity.id, casterData.shields.length, spellAnimationStartTick + 5, true, scale(6), scale(280)),
					...createLeftBladeCastingSequence(spell.casterBlades || [], casterData.entity.id, casterData.blades.length, spellAnimationStartTick + 5, true)
				];
			} else {
				spellAnimationStartTick -= 5;

				actions = [
					...actions,
					...createLeftShieldCastingSequence(spell.victimShields || [], casterData.entity.id, casterData.shields.length, spellAnimationStartTick + 5, true, scale(6), scale(280)),
					...createLeftBladeCastingSequence(spell.victimBlades || [], casterData.entity.id, casterData.blades.length, spellAnimationStartTick + 5, true)
				];
			}

			break;
		}
		case SPELL_TYPES.ATTACK_BASIC:
		case SPELL_TYPES.ATTACK_ALL: {
			const victimDatas = victimIndices.map(i => battleData[i]);
			const victimIds = victimIndices.map(_ => `victim.${crypto.randomUUID()}`);
			actions = [
				...actions,
				...createMoveEntityToBattleSequence(true, spellCastingStartTick, casterId, castingCircleId),
			];

			const victimActions = createMoveVictimToBattleSequence(false, spellAnimationStartTick, victimDatas, victimIds, casterData, spell, calculatedDamages);
			buffer = victimActions.buffer;
			actions = [
				...actions,
				...victimActions.actions
			];
			break;
		}
	}
	const cleanUpStartTick = spellAnimationStartTick + 5 + getSpellSprite(spell).indices + buffer;
	actions = [
		...actions,
		...createCleanUpSequence(true, spellAnimationStartTick + 5 + getSpellSprite(spell).indices, cleanUpStartTick, spellId, casterId, castingCircleId, casterData)
	];
	return {
		length: cleanUpStartTick + 8,
		actions
	};
}

function createRightAttackSequence(battleData, casterIndex, victimIndices, spell, calculatedDamages, startTick) {
	// initialize caster;

	const casterData = battleData[casterIndex];

	const casterId = `caster.${crypto.randomUUID()}`;
	const spellId = `spell.${crypto.randomUUID()}`;
	const castingCircleId = `casting_circle.${crypto.randomUUID()}`;

	// deal with shields etc.

	let actions = [
		{
			tick: startTick,
			type: ATYPES.INITIALIZE_ENTITY,
			id: 'bottom_cover',
			sprite: sprites.BOTTOM_COVER_480x105,
			alpha: 1,
			posX: 0,
			posY: scale(270),
			sizeX: scale(480),
			sizeY: scale(105),
			rot: 0,
			zIndex: 3,
			play: false
		},
		...createEntityEnterSequence(false, startTick, casterId, casterData),
		...createRightShieldCastingSequence(casterData.shields, casterData.entity.id, 0, startTick, false, scale(480 - 26), scale(280)),
		...createRightBladeCastingSequence(casterData.blades, casterData.entity.id, 0, startTick, false)
	];

	const spellCastingStartTick = startTick + 10;

	// spell casting
	actions = [
		...actions,
		...createMiddleCastingSequence(false, spellCastingStartTick, spell, casterId, casterData, castingCircleId, calculatedDamages)
	];

	// spell animation

	let buffer = 0;
	let spellAnimationStartTick = spellCastingStartTick + 25;
	actions = [
		...actions,
		{
			tick: spellAnimationStartTick + ((battleData[victimIndices[0]].entity.id === casterData.entity.id) ? 0 : 5),
			type: ATYPES.INITIALIZE_ENTITY,
			id: spellId,
			sprite: getSpellSprite(spell),
			alpha: 1,
			posX: 0,
			posY: 0,
			sizeX: scale(480),
			sizeY: scale(270),
			rot: 0,
			zIndex: 0,
			play: true,
			mirror: true
		}
	];
	switch (spell.type) {
		case SPELL_TYPES.HEALING_BASIC: {
			const victimData = battleData[victimIndices[0]];
			const victimId = `victim.${crypto.randomUUID()}`;
			if (victimData.entity.id !== casterData.entity.id) {
				actions = [
					...actions,
					...createMoveEntityToBattleSequence(false, spellCastingStartTick, casterId, castingCircleId),
					...createMiddleVictimSequence(true, spellAnimationStartTick, victimId, victimData, spell),
					...createLeftShieldCastingSequence(victimData.shields, victimData.entity.id, 0, spellAnimationStartTick, false, scale(6), scale(280)),
					...createLeftBladeCastingSequence(victimData.blades, victimData.entity.id, 0, spellAnimationStartTick, false)
				];
			} else {
				spellAnimationStartTick -= 5;
			}

			spell.heals.forEach(({ tick, heal }) => {
				const healTextId = crypto.randomUUID();
				const healText = `+${heal}`;

				actions = [
					...actions,
					{
						tick: spellAnimationStartTick + 5 + tick,
						type: ATYPES.INITIALIZE_ENTITY,
						id: healTextId,
						sprite: numberText,
						alpha: 1,
						posX: scale(240 - healText.length * 4),
						posY: scale(120),
						sizeX: scale(8),
						sizeY: scale(12),
						rot: 0,
						iIndex: 0,
						zIndex: 0,
						text: healText
					},
					{
						startTick: spellAnimationStartTick + 5 + tick,
						endTick: spellAnimationStartTick + 5 + tick + 8,
						type: ATYPES.CHANGE_POSITION_Y,
						id: healTextId,
						posY: scale(110),
						ease: EASE_TYPES.EASE_OUT
					},
					{
						startTick: spellAnimationStartTick + 5 + tick + 2,
						endTick: spellAnimationStartTick + 5 + tick + 8,
						type: ATYPES.CHANGE_OPACITY,
						id: healTextId,
						alpha: 0,
						ease: EASE_TYPES.EASE_OUT
					},
					{
						tick: spellAnimationStartTick + 5 + tick,
						type: ATYPES.PLAY_SOUND,
						audio: new Audio('./audio/heal.wav'),
						volume: 0.1
					}
				];
			});

			break;
		}
		case SPELL_TYPES.TRAP_BASIC:
		case SPELL_TYPES.SHIELD_BASIC:
		case SPELL_TYPES.JINX_BASIC:
		case SPELL_TYPES.BLADE_BASIC: {
			const victimData = battleData[victimIndices[0]];
			const victimId = `victim.${crypto.randomUUID()}`;
			if (victimData.entity.id !== casterData.entity.id) {
				actions = [
					...actions,
					...createMoveEntityToBattleSequence(false, spellCastingStartTick, casterId, castingCircleId),
					...createMiddleVictimSequence(victimIndices[0] >= 4, spellAnimationStartTick, victimId, victimData, spell),
					...createLeftShieldCastingSequence(victimData.shields, victimData.entity.id, 0, spellAnimationStartTick, false, scale(6), scale(280)),
					...createLeftBladeCastingSequence(victimData.blades, victimData.entity.id, 0, spellAnimationStartTick, false),
					// new
					...createLeftShieldCastingSequence(spell.victimShields || [], victimData.entity.id, victimData.shields.length, spellAnimationStartTick + 5, true, scale(6), scale(280)),
					...createLeftBladeCastingSequence(spell.victimBlades || [], victimData.entity.id, victimData.blades.length, spellAnimationStartTick + 5, true),
					...createRightShieldCastingSequence(spell.casterShields || [], casterData.entity.id, casterData.shields.length, spellAnimationStartTick + 5, true, scale(480 - 26), scale(280)),
					...createRightBladeCastingSequence(spell.casterBlades || [], casterData.entity.id, casterData.blades.length, spellAnimationStartTick + 5, true)
				];
			} else {
				spellAnimationStartTick -= 5;

				actions = [
					...actions,
					...createRightShieldCastingSequence(spell.victimShields || [], casterData.entity.id, casterData.shields.length, spellAnimationStartTick + 5, true, scale(480 - 26), scale(280)),
					...createRightBladeCastingSequence(spell.victimBlades || [], casterData.entity.id, casterData.blades.length, spellAnimationStartTick + 5, true)
				];
			}

			break;
		}
		case SPELL_TYPES.ATTACK_BASIC:
		case SPELL_TYPES.ATTACK_ALL: {
			const victimDatas = victimIndices.map(i => battleData[i]);
			const victimIds = victimIndices.map(_ => `victim.${crypto.randomUUID()}`);
			actions = [
				...actions,
				...createMoveEntityToBattleSequence(false, spellCastingStartTick, casterId, castingCircleId),
			];

			const victimActions = createMoveVictimToBattleSequence(true, spellAnimationStartTick, victimDatas, victimIds, casterData, spell, calculatedDamages);
			buffer = victimActions.buffer;
			actions = [
				...actions,
				...victimActions.actions
			];
			break;
		}
	}
	const cleanUpStartTick = spellAnimationStartTick + 5 + getSpellSprite(spell).indices + buffer;
	actions = [
		...actions,
		...createCleanUpSequence(false, spellAnimationStartTick + 5 + getSpellSprite(spell).indices, cleanUpStartTick, spellId, casterId, castingCircleId, casterData)
	];
	return {
		length: cleanUpStartTick + 8,
		actions
	};
}

function createCardDropSequence(spell) {
	return [
		{
			tick: 0,
			type: ATYPES.INITIALIZE_ENTITY,
			id: 'spell_card',
			sprite: getCardSprite(spell),
			alpha: 1,
			posX: scale(240),
			posY: scale(187 - 96),
			sizeX: 0,
			sizeY: scale(192),
			rot: 0,
			zIndex: 0,
		},
		{
			startTick: 0,
			endTick: 7,
			type: ATYPES.CHANGE_POSITION_X,
			id: 'spell_card',
			posX: scale(240 - 77),
			ease: EASE_TYPES.CONSTANT
		},
		{
			startTick: 0,
			endTick: 7,
			type: ATYPES.CHANGE_SIZE_X,
			id: 'spell_card',
			sizeX: scale(144),
			ease: EASE_TYPES.CONSTANT
		},
		{
			startTick: 7,
			endTick: 9,
			type: ATYPES.CHANGE_POSITION_Y,
			id: 'spell_card',
			posY: scale(375),
			ease: EASE_TYPES.EASE_IN
		}
	];
}