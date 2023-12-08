function setUpSocket(socket) {
	socket.addEventListener('message', event => {
		const data = JSON.parse(event.data);
		console.log(data);
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
				state.animationQueue.push(new AnimationEngine(createWithdrawAnimation(state.battleState.turnState), TICK_TIME, FPS, canvas, ctx, reduceAnimationQueue));

				const { animationData, finalTurnState } = data;
				const finalAnimation = () => {
					if (state.battleState.win) {
						battleTrack.pause();
						battleTrack.currentTime = 0;
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

	const wizardSelectionIndex = mpWizards.findIndex(({ element }) => state.player.element === element);
	mpWizards.forEach((wizard, i) => {
		makeInteractable(scale(240 - mpWizards.length * 36 + i * 70), scale(64), scale(70), scale(164),
			({ x, y, sizeX, sizeY }) => {
				ctx.globalAlpha = 0.25;
				getIdleSprite(wizard).draw(ctx, x - scale(30), y, scale(128), scale(128));
				ELEMENT_ICONS[wizard.element].draw(ctx, x + scale(20), y + scale(132), scale(32), scale(32));
			},
			({ x, y, sizeX, sizeY }) => {
				ctx.globalAlpha = 1;
				getIdleSprite(wizard).draw(ctx, x - scale(30), y, scale(128), scale(128));
				ELEMENT_ICONS[wizard.element].draw(ctx, x + scale(20), y + scale(132), scale(32), scale(32));
			},
			() => {
				state.player = {
					...wizard,
					name: state.player.name,
					id: state.player.id
				}
			},
			{
				forceHoverOn: () => wizardSelectionIndex === i
			})
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
				socket.send(JSON.stringify({
					action: 'CREATE_GAME',
					entity: state.player
				}));
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
				socket.send(JSON.stringify({
					action: 'JOIN_GAME',
					entity: state.player,
					id: state.textboxes.joinTextbox.value
				}));
			});
			setUpSocket(socket);
		});
}