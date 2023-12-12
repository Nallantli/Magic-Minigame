const MP_ELEMENTS = [
	'air',
	'fire',
	'water',
	'earth'
];

function setUpSocket(socket) {
	socket.addEventListener('message', event => {
		const data = JSON.parse(event.data);
		switch (data.action) {
			case 'JOIN_FAILURE': {
				const { message } = data;
				state.path = 'MENU';
				state.menuState.errorMessage = message;
				socket.close();
				break;
			}
			case 'START_BATTLE': {
				if (Math.random() <= 0.5) {
					battleTrack = new Audio('./audio/boss_track.wav');
				} else {
					battleTrack = new Audio('./audio/battle_track.wav');
				}
				battleTrack.loop = true;
				battleTrack.play();
				break;
			}
			case 'WIN': {
				const { side, entities } = data;
				socket.close();
				state = {
					...state,
					battleState: {
						...state.battleState,
						win: side,
						entities
					}
				};
				break;
			}
			case 'BATTLE_ANIMATION_DATA': {
				state.animationQueue.push(new AnimationEngine(createWithdrawAnimation(state.battleState.turnState), TICK_TIME, FPS, canvas, ctx, () => {
					reduceAnimationQueue();
					const { animationData, finalTurnState } = data;
					const finalAnimation = () => {
						if (state.battleState.win) {
							battleTrack.pause();
							battleTrack.currentTime = 0;
							battleTrack = new Audio('./audio/win_music.wav');
							battleTrack.loop = true;
							battleTrack.play();
						} else {
							state.animationQueue.push(new AnimationEngine(getReturnSequence(finalTurnState.battleData), TICK_TIME, FPS, canvas, ctx, reduceAnimationQueue));
						}
						state = {
							...state,
							battleState: {
								...state.battleState,
								turnState: finalTurnState
							}
						};
					}
					animationData.forEach(({ turnState, victimIndices, spell, calculatedDamages }, i) => {
						const sequence = turnState.battleIndex < 4
							? createLeftAttackSequence(turnState.battleData, turnState.battleIndex, victimIndices, spell, calculatedDamages, 0)
							: createRightAttackSequence(turnState.battleData, turnState.battleIndex, victimIndices, spell, calculatedDamages, 0);
						const animation = new AnimationEngine({
							ticks: sequence.length,
							actions: sequence.actions
						}, TICK_TIME, FPS, canvas, ctx, () => {
							reduceAnimationQueue();
							if (i === animationData.length - 1) {
								finalAnimation();
							}
						});
						state.animationQueue.push(animation);
					});
					if (animationData.length === 0) {
						finalAnimation();
					}
				}));
				break;
			}
			case 'STATE_UPDATE': {
				state = {
					...state,
					battleState: {
						...state.battleState,
						...data
					}
				}
				break;
			}
		}
	});
}

function menuGameLoop(timeMs) {
	const { iterator } = state;
	if (state.menuState.errorMessage) {
		font.draw(ctx, scale(240 - state.menuState.errorMessage.length * 3), scale(340), scale(6), scale(8), 2, state.menuState.errorMessage);
	}

	makeTextBox('usernameTextbox', scale(240 - 120), scale(24), scale(240), scale(20),
		({ x, y, sizeX, sizeY, isFocused, value }) => {
			if (!isFocused && value === '') {
				font.draw(ctx, x + scale(12), y - scale(4), scale(3), scale(4), 0, 'Player Name:');
			}
			if (isFocused) {
				ctx.fillStyle = 'white';
				ctx.fillRect(x - scale(2), y - scale(2), sizeX + scale(4), sizeY + scale(4));
			} else {
				ctx.fillStyle = 'white';
				ctx.fillRect(x, y + scale(20), sizeX, scale(2));
			}
			ctx.fillStyle = '#333';
			ctx.fillRect(x, y, sizeX, sizeY);
			font.draw(ctx, x + scale(3), y + scale(3), scale(12), scale(16), 0, value);
		},
		(value, key) => {
			switch (key) {
				case 'backspace':
					if (value.length > 0) {
						return value.slice(0, -1);
					}
					return value;
				default:
					if (key.length === 1) {
						return value + (keys['shift'] ? key.toUpperCase() : key);
					}
					return value;
			}
		},
		({ value }) => {
			state.player.name = value;
		});

	makeTextBox('joinTextbox', scale(240 - 26), scale(258), scale(52), scale(20),
		({ x, y, sizeX, sizeY, isFocused, value }) => {
			if (!isFocused && value === '') {
				font.draw(ctx, x + scale(12), y - scale(4), scale(3), scale(4), 0, 'Room Code:');
			}
			if (isFocused) {
				ctx.fillStyle = 'white';
				ctx.fillRect(x - scale(2), y - scale(2), sizeX + scale(4), sizeY + scale(4));
			} else {
				ctx.fillStyle = 'white';
				ctx.fillRect(x, y + scale(20), sizeX, scale(2));
			}
			ctx.fillStyle = '#333';
			ctx.fillRect(x, y, sizeX, sizeY);
			font.draw(ctx, x + scale(3), y + scale(3), scale(12), scale(16), 0, value);
		},
		(value, key) => {
			switch (key) {
				case 'backspace':
					if (value.length > 0) {
						return value.slice(0, -1);
					}
					return value;
				default:
					if (value.length === 4) {
						return value;
					}
					if (key.length === 1 && ((key.charCodeAt(0) >= 'a'.charCodeAt(0) && key.charCodeAt(0) <= 'z'.charCodeAt(0)) || (key.charCodeAt(0) >= '0'.charCodeAt(0) && key.charCodeAt(0) <= '9'.charCodeAt(0)))) {
						return value + key.toUpperCase();
					}
					return value;
			}
		});

	const elementSelectionIndex = MP_ELEMENTS.findIndex(element => state.player.element === element);
	MP_ELEMENTS.forEach((element, i) => {
		makeInteractable(scale(240 - MP_ELEMENTS.length * 20 + i * 40 + 6), scale(60), scale(32), scale(32),
			({ x, y, sizeX, sizeY }) => {
				ctx.globalAlpha = 0.25;
				ELEMENT_ICONS[element].draw(ctx, x, y, sizeX, sizeY);
			},
			({ x, y, sizeX, sizeY }) => {
				ctx.globalAlpha = 1;
				ELEMENT_ICONS[element].draw(ctx, x, y, sizeX, sizeY);
			},
			() => {
				state.player = {
					...state.player,
					...defaultMPStats[element]
				}
			},
			{
				forceHoverOn: () => elementSelectionIndex === i
			})
	});
	const wizardSelectionIndex = MP_SPRITES.findIndex(({ spritePath }) => state.player.spritePath === spritePath);
	MP_SPRITES.forEach((spriteData, i) => {
		if (wizardSelectionIndex === i) {
			ctx.globalAlpha = 1;
			entitySpriteDirectory[`${spriteData.spritePath}.idle`].draw(ctx,
				scale(240 - (wizardSelectionIndex - i) * 60 - 36) - scale(30),
				scale(100),
				scale(128),
				scale(128),
				{ iIndex: iterator % spriteData.idleFrames });
		} else {
			ctx.globalAlpha = 0.25;
			entitySpriteDirectory[`${spriteData.spritePath}.idle`].draw(ctx,
				scale(240 - (wizardSelectionIndex - i) * 60 - 36) + scale(2),
				scale(100) + scale(64),
				scale(64),
				scale(64),
				{ iIndex: iterator % spriteData.idleFrames });
		}
	});
	makeInteractable(scale(240 - 96), scale(100), scale(32), scale(64),
		({ x, y, sizeX, sizeY }) => {
			ctx.globalAlpha = 0.25;
			sprites.VICTIM_ARROW_8x16.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 })
		},
		({ x, y, sizeX, sizeY, renderCallback }) => {
			ctx.globalAlpha = 1;
			sprites.VICTIM_ARROW_8x16.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 })
		},
		() => {
			const nextIndex = wizardSelectionIndex - 1;
			if (nextIndex >= 0) {
				state.player = {
					...state.player,
					...MP_SPRITES[nextIndex]
				}
			}
		});
	makeInteractable(scale(240 + 64), scale(100), scale(32), scale(64),
		({ x, y, sizeX, sizeY }) => {
			ctx.globalAlpha = 0.25;
			sprites.VICTIM_ARROW_8x16.draw(ctx, x, y, sizeX, sizeY)
		},
		({ x, y, sizeX, sizeY, renderCallback }) => {
			ctx.globalAlpha = 1;
			sprites.VICTIM_ARROW_8x16.draw(ctx, x, y, sizeX, sizeY)
		},
		() => {
			const nextIndex = wizardSelectionIndex + 1;
			if (nextIndex < MP_SPRITES.length) {
				state.player = {
					...state.player,
					...MP_SPRITES[nextIndex]
				}
			}
		});
	ctx.globalAlpha = 1;

	makeInteractable(scale(240 - 69), scale(310), scale(138), scale(22),
		({ x, y, sizeX, sizeY }) => sprites.CREATE_GAME_69x11.draw(ctx, x, y, sizeX, sizeY),
		({ x, y, sizeX, sizeY }) => sprites.CREATE_GAME_69x11.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 }),
		() => {
			const socket = new WebSocket(serverUrl);
			state = {
				...state,
				menuState: {
					...state.menuState,
					errorMessage: undefined
				},
				battleState: {
					...state.battleState,
					playerIndex: 0,
					socket
				},
				path: 'MP_BATTLE'
			};
			socket.addEventListener('open', () => {
				socket.send(JSON.stringify([{
					action: 'CREATE_GAME',
					entity: state.player
				}]));
			});
			setUpSocket(socket);
		});

	makeInteractable(scale(240 - 69), scale(284), scale(138), scale(22),
		({ x, y, sizeX, sizeY }) => sprites.JOIN_GAME_69x11.draw(ctx, x, y, sizeX, sizeY),
		({ x, y, sizeX, sizeY }) => sprites.JOIN_GAME_69x11.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 }),
		() => {
			const socket = new WebSocket(serverUrl);
			state = {
				...state,
				menuState: {
					...state.menuState,
					errorMessage: undefined
				},
				battleState: {
					...state.battleState,
					playerIndex: 0,
					socket
				},
				path: 'MP_BATTLE'
			};
			socket.addEventListener('open', () => {
				socket.send(JSON.stringify([{
					action: 'JOIN_GAME',
					entity: state.player,
					id: state.textboxes.joinTextbox.value
				}]));
			});
			setUpSocket(socket);
		});
}