function drawLobby(battleState, iterator, isReady) {
	const { turnState: { battleData }, playerIndex, socket, players } = battleState;

	for (let i = 0; i < 4; i++) {
		const battleEntity = battleData[i];
		if (!battleEntity) {
			ctx.globalAlpha = 0.25;
			sprites.PLACARD_EMPTY_160x65.draw(ctx, scale(2), i * scale(67) + scale(2), scale(160), scale(65));
			continue;
		} else {
			ctx.globalAlpha = 1;
			sprites.PLACARD_160x65.draw(ctx, scale(2), i * scale(67) + scale(2), scale(160), scale(65));
		}

		const { shields, blades, vril, superVril, entity } = battleEntity;

		const isReady = players.find(({ pos }) => pos === i).isReady;
		if (isReady) {
			const text = '[READY]'
			font.draw(ctx, scale(160 - text.length * 6), i * scale(67) + scale(54), scale(6), scale(8), 0, text);
		} else {
			const text = '[NOT READY]'
			font.draw(ctx, scale(160 - text.length * 6), i * scale(67) + scale(54), scale(6), scale(8), 0, text);
		}

		font.draw(ctx, scale(57), i * scale(67) + scale(5), scale(6), scale(8), ELEMENT_COLORS[entity.element], entity.name);
		const healthString = String(entity.health);
		numberText.draw(ctx, scale(161 - healthString.length * 4), i * scale(67) + scale(21), scale(4), scale(6), 0, healthString);
		const healthBarWidth = Math.round(106 * entity.health / entity.maxHealth);
		ctx.fillStyle = 'white';
		ctx.fillRect(scale(161 - healthBarWidth), i * scale(67) + scale(15), scale(healthBarWidth), scale(4));

		getIdleSprite(entity).draw(ctx, 0, i * scale(67) + 10, scale(64), scale(64), { iIndex: iterator % getIdleSprite(entity).indices });

		if (i === playerIndex && !isReady) {
			makeInteractable(scale(164), i * scale(67) + scale(2), scale(32), scale(64),
				({ x, y, sizeX, sizeY }) => {
					ctx.globalAlpha = 0.25;
					sprites.VICTIM_ARROW_8x16.draw(ctx, x, y, sizeX, sizeY)
				},
				({ x, y, sizeX, sizeY, renderCallback }) => {
					ctx.globalAlpha = 1;
					sprites.VICTIM_ARROW_8x16.draw(ctx, x, y, sizeX, sizeY)
				},
				() => {
					let nextAvailablePos = 4;
					while (battleData[nextAvailablePos] !== null && nextAvailablePos < 8) {
						nextAvailablePos++;
					}
					console.log(nextAvailablePos);
					if (nextAvailablePos < 8) {
						socket.send(JSON.stringify({
							action: "MOVE_SELF",
							id: battleState.id,
							pos: nextAvailablePos
						}));
					}
				});
		}
	}

	for (let i = 4; i < 8; i++) {
		const battleEntity = battleData[i];
		const i_offset = i - 4;
		if (!battleEntity) {
			ctx.globalAlpha = 0.25;
			sprites.PLACARD_EMPTY_160x65.draw(ctx, scale(480 - 162), i_offset * scale(67) + scale(2), scale(160), scale(65));
			continue;
		} else {
			ctx.globalAlpha = 1;
			sprites.PLACARD_RIGHT_160x65.draw(ctx, scale(480 - 162), i_offset * scale(67) + scale(2), scale(160), scale(65));
		}

		const { shields, blades, vril, superVril, entity } = battleEntity;

		const isReady = players.find(({ pos }) => pos === i).isReady;
		if (isReady) {
			const text = '[READY]'
			font.draw(ctx, scale(480 - 160), i_offset * scale(67) + scale(54), scale(6), scale(8), 0, text);
		} else {
			const text = '[NOT READY]'
			font.draw(ctx, scale(480 - 160), i_offset * scale(67) + scale(54), scale(6), scale(8), 0, text);
		}

		font.draw(ctx, scale(480 - 57 - entity.name.length * 6), i_offset * scale(67) + scale(5), scale(6), scale(8), ELEMENT_COLORS[entity.element], entity.name);
		const healthString = String(entity.health);
		numberText.draw(ctx, scale(480 - 160), i_offset * scale(67) + scale(21), scale(4), scale(6), 0, healthString);
		const healthBarWidth = Math.round(106 * entity.health / entity.maxHealth);
		ctx.fillStyle = 'white';
		ctx.fillRect(scale(480 - 161), i_offset * scale(67) + scale(15), scale(healthBarWidth), scale(4));

		getIdleSprite(entity).draw(ctx, scale(480 - 64), i_offset * scale(67) + 10, scale(64), scale(64), { iIndex: iterator % getIdleSprite(entity).indices, mirror: true });

		if (i === playerIndex && !isReady) {
			makeInteractable(scale(480 - 196), i_offset * scale(67) + scale(2), scale(32), scale(64),
				({ x, y, sizeX, sizeY }) => {
					ctx.globalAlpha = 0.25;
					sprites.VICTIM_ARROW_8x16.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 })
				},
				({ x, y, sizeX, sizeY, renderCallback }) => {
					ctx.globalAlpha = 1;
					sprites.VICTIM_ARROW_8x16.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 })
				},
				() => {
					let nextAvailablePos = 0;
					while (battleData[nextAvailablePos] !== null && nextAvailablePos < 4) {
						nextAvailablePos++;
					}
					console.log(nextAvailablePos);
					if (nextAvailablePos < 4) {
						socket.send(JSON.stringify({
							action: "MOVE_SELF",
							id: battleState.id,
							pos: nextAvailablePos
						}));
					}
				});
		}
	}
}

function mpBattleGameLoop(timeMs) {
	const { battleState, battleState: { turnState, onWin, onLose, playerIndex, id, socket, players, win, entities }, iterator } = state;
	if (turnState === undefined) {
		let loadingMessage = 'LOADING.';
		const dia = Math.floor(iterator / 10) % 3;
		for (let i = 0; i < dia; i++) {
			loadingMessage += '.';
		}
		font.draw(ctx, scale(240 - loadingMessage.length * 15), scale(160), scale(30), scale(40), 0, loadingMessage);
		return;
	}

	let inputData = {};

	if (win) {
		const winMessage = `${win} SIDE WINS!`;
		if (Math.floor(iterator / 5) % 2 == 0) {
			font.draw(ctx, scale(240 - 12 * winMessage.length), scale(24), scale(24), scale(32), 0, winMessage);
		}
		for (let i = 0; i < entities.length; i++) {
			getIdleSprite(entities[i]).draw(ctx, scale(240 - entities.length * 70 + i * 128), scale(64), scale(128), scale(128));
			font.draw(ctx, scale(240 - entities.length * 70 + i * 128 + 64 - entities[i].name.length * 3), scale(200), scale(6), scale(8), ELEMENT_COLORS[entities[i].element], entities[i].name);
		}

		makeInteractable(scale(240 - 87), scale(300), scale(174), scale(22),
			({ x, y, sizeX, sizeY }) => sprites.RETURN_TO_MENU_87x11.draw(ctx, x, y, sizeX, sizeY),
			({ x, y, sizeX, sizeY }) => sprites.RETURN_TO_MENU_87x11.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 }),
			() => {
				battleTrack.pause();
				battleTrack.currentTime = 0;
				state.battleState = undefined;
				state.path = 'MENU';
			})
	} else {
		switch (turnState.battleIndex) {
			case -2:
				const playerIsReady = players.find(({ pos }) => pos === playerIndex).isReady;
				drawLobby(battleState, iterator, playerIsReady);
				ctx.globalAlpha = 1;
				font.draw(ctx, scale(240 - 60), scale(300), scale(30), scale(40), 0, id);
				makeInteractable(scale(6), scale(346), scale(174), scale(22),
					({ x, y, sizeX, sizeY }) => sprites.RETURN_TO_MENU_87x11.draw(ctx, x, y, sizeX, sizeY),
					({ x, y, sizeX, sizeY }) => sprites.RETURN_TO_MENU_87x11.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 }),
					() => {
						state.battleState = undefined;
						socket.close();
						state.path = 'MENU';
					})
				makeInteractable(scale(350), scale(346), scale(124), scale(22),
					({ x, y, sizeX, sizeY }) => sprites.READY_UP_62x11.draw(ctx, x, y, sizeX, sizeY),
					({ x, y, sizeX, sizeY }) => sprites.READY_UP_62x11.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 }),
					() => {
						if (playerIsReady) {
							socket.send(JSON.stringify({
								action: "READY_DOWN",
								id: battleState.id
							}));
						} else {
							socket.send(JSON.stringify({
								action: "READY_UP",
								id: battleState.id,
								deck: state.player.deck
							}));
						}
					},
					{
						forceHoverOn: () => playerIsReady
					});
				makeInteractable(scale(6), scale(320), scale(124), scale(22),
					({ x, y, sizeX, sizeY }) => {
						if (playerIsReady) {
							ctx.globalAlpha = 0.25;
						} else {
							ctx.globalAlpha = 1;
						}
						sprites.EDIT_DECK_67x11.draw(ctx, x, y, sizeX, sizeY)
					},
					({ x, y, sizeX, sizeY, renderCallback }) => {
						if (playerIsReady) {
							renderCallback();
						} else {
							sprites.EDIT_DECK_67x11.draw(ctx, x, y, sizeX, sizeY, { iIndex: 1 })
						}
					},
					() => {
						if (!playerIsReady) {
							state = {
								...state,
								deckState: {
									...state.deckState,
									returnPath: 'MP_BATTLE'
								},
								path: 'DECK'
							};
						}
					});
				break;
			case -1:
				ctx.globalAlpha = 1;
				inputData = { ...inputData, ...drawBattleIdle(state) };
				if (turnState.battleData[playerIndex] !== null) {
					if (inputData.selectedCard !== undefined) {
						socket.send(JSON.stringify({
							action: "SELECT_CARD",
							id: battleState.id,
							card: inputData.selectedCard
						}));
					}
					if (inputData.selectedVictims !== undefined) {
						socket.send(JSON.stringify({
							action: "SELECT_VICTIMS",
							id: battleState.id,
							victims: inputData.selectedVictims
						}));
					}
					if (inputData.discardCard !== undefined) {
						socket.send(JSON.stringify({
							action: "DISCARD_CARD",
							id: battleState.id,
							hand: turnState.battleData[playerIndex].hand.toSpliced(inputData.discardCard, 1)
						}));
					}
					if (rightClickPos) {
						if (turnState.selectedCards[playerIndex] !== null && turnState.selectedVictims[playerIndex].length === 0) {
							socket.send(JSON.stringify({
								action: "SELECT_CARD",
								id: battleState.id,
								card: null
							}));
						} else if (turnState.selectedVictims[playerIndex].length > 0) {
							socket.send(JSON.stringify({
								action: "SELECT_VICTIMS",
								id: battleState.id,
								victims: []
							}));
						}
					}
				}
				break;
		}
	}
}