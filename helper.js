function scale(x) {
	return x * SCALE_FACTOR;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function makeInteractable(x, y, sizeX, sizeY, render, hoverRender, onPress, options) {
	if (options?.forceHoverOn({ x, y, sizeX, sizeY }) || (mousePos.x >= x && mousePos.x < x + sizeX && mousePos.y >= y && mousePos.y < y + sizeY)) {
		if (hoverRender) {
			hoverRender({ x, y, sizeX, sizeY, renderRaw: render, renderCallback: () => render({ x, y, sizeX, sizeY }) });
		}
		if (onPress && clickPos?.x >= x && clickPos?.x < x + sizeX && clickPos?.y >= y && clickPos?.y < y + sizeY) {
			onPress({ x, y, sizeX, sizeY });
		}
		if (options?.onRightPress && rightClickPos?.x >= x && rightClickPos?.x < x + sizeX && rightClickPos?.y >= y && rightClickPos?.y < y + sizeY) {
			options.onRightPress({ x, y, sizeX, sizeY });
		}
	} else {
		render({ x, y, sizeX, sizeY });
	}
}

function makeToolTip(sizeX, sizeY, render) {
	const { x, y } = mousePos;
	return (ctx) => {
		sprites.TOOLTIP_CORNER_3x3.draw(ctx, x, y, scale(3), scale(3));
		sprites.TOOLTIP_CORNER_3x3.draw(ctx, x + sizeX - scale(3), y, scale(3), scale(3), { iIndex: 1 });
		sprites.TOOLTIP_CORNER_3x3.draw(ctx, x + sizeX - scale(3), y + sizeY - scale(3), scale(3), scale(3), { iIndex: 2 });
		sprites.TOOLTIP_CORNER_3x3.draw(ctx, x, y + sizeY - scale(3), scale(3), scale(3), { iIndex: 3 });

		ctx.fillStyle = "black";
		ctx.fillRect(x + scale(3), y, sizeX - scale(6), scale(3));
		ctx.fillRect(x + scale(3), y + sizeY - scale(3), sizeX - scale(6), scale(3));
		ctx.fillRect(x, y + scale(3), scale(3), sizeY - scale(6));
		ctx.fillRect(x + sizeX - scale(3), y + scale(3), scale(3), sizeY - scale(6));
		ctx.fillRect(x + scale(3), y + scale(3), sizeX - scale(6), sizeY - scale(6));
		ctx.fillStyle = "white";
		ctx.fillRect(x + scale(3), y, sizeX - scale(6), scale(1));
		ctx.fillRect(x + scale(3), y + sizeY - scale(1), sizeX - scale(6), scale(1));
		ctx.fillRect(x, y + scale(3), scale(1), sizeY - scale(6));
		ctx.fillRect(x + sizeX - scale(1), y + scale(3), scale(1), sizeY - scale(6));

		render({ x, y, sizeX, sizeY });
	};
}

function criticalChance(cra, crb) {
	const diff = cra - crb;
	return ((diff - 32) / (2 * (16 + Math.abs(diff - 32))) + 0.5) * (Math.min(cra, 100) / 100);
}

function calculateDamages(spell, caster, victim) {
	if (spell.type !== SPELL_TYPES.ATTACK_ALL && spell.type !== SPELL_TYPES.ATTACK_BASIC) {
		return {};
	}

	const isCritical = Math.random() <= criticalChance(caster.entity.criticalRating, victim.entity.criticalRating);

	const shields = victim.shields;
	const blades = caster.blades;
	let usedBladeIds = [];
	let totalUsedBladeIds = [];
	let baseTilt = 1;
	blades.forEach(({ id, value, element }, i) => {
		if ((spell.element === element || element === 'all') && !totalUsedBladeIds.includes(id)) {
			baseTilt *= (value + 100) / 100;
			totalUsedBladeIds.push(id);
			usedBladeIds.push({ index: i, id });
		}
	});
	let totalUsedShieldIds = [];
	return {
		isCritical,
		usedBladeIds,
		damages: spell.damages.map(d => {
			let base = d.damage !== undefined ? d.damage : (Math.random() * (d.maxDamage - d.minDamage) + d.minDamage);
			let usedShieldIds = [];
			let augment = victim.entity?.augments?.[d.element];
			shields.forEach(({ id, value, element }, i) => {
				if ((d.element === element || element === 'all') && !totalUsedShieldIds.includes(id)) {
					base += base * (value / 100);
					usedShieldIds.push({ index: i, id });
					totalUsedShieldIds.push(id);
				}
			});
			if (isCritical) {
				base *= 2;
			}
			return {
				...d,
				damage: Math.round(base * baseTilt * (augment !== undefined ? augment : 1)),
				augmented: augment !== undefined ? (augment > 1 ? ' ++' : ' --') : undefined,
				usedShieldIds
			};
		})
	};
}

function randomFromList(l) {
	return l[Math.floor(Math.random() * l.length)];
}

function getTotalVril(data, element) {
	const { vril, superVril } = data;
	if (element === data.entity.element) {
		return superVril * 2 + vril;
	}
	return superVril + vril;
}

function iterateSpell(casterIndex, victimIndices, spellIndex, battleData, calculatedDamages) {
	const spell = battleData[casterIndex].hand[spellIndex];
	switch (spell.type) {
		case SPELL_TYPES.HEALING_BASIC:
			spell.heals.forEach(({ heal }) => battleData[victimIndices[0]].entity.health += heal);
			break;
		case SPELL_TYPES.ATTACK_BASIC:
		case SPELL_TYPES.ATTACK_ALL:
			{
				victimIndices.forEach((victimIndex, i) => {
					let newShields = [];
					const { usedBladeIds, damages } = calculatedDamages[i];
					damages.forEach(({ damage, usedShieldIds, steal }) => {
						for (let j = 0; j < battleData[victimIndex].shields.length; j++) {
							if (!usedShieldIds.map(({ index }) => index).includes(j)) {
								newShields.push(battleData[victimIndex].shields[j]);
							}
						}
						battleData[victimIndex].entity.health += damage;
						if (steal) {
							battleData[casterIndex].entity.health -= damage * steal;
						}
					});
					battleData[casterIndex].blades = battleData[casterIndex].blades.filter((_, j) => !usedBladeIds.map(({ index }) => index).includes(j));
					battleData[victimIndex].shields = newShields;
				});
			}
			break;
	}
	if (spell.victimShields) {
		victimIndices.forEach(i => {
			battleData[i].shields = [
				...battleData[i].shields,
				...spell.victimShields
			];
		});
	}
	if (spell.casterShields) {
		battleData[casterIndex].shields = [
			...battleData[casterIndex].shields,
			...spell.casterShields
		];
	}
	if (spell.victimBlades) {
		victimIndices.forEach(i => {
			battleData[i].blades = [
				...battleData[i].blades,
				...spell.victimBlades
			];
		});
	}
	if (spell.casterBlades) {
		battleData[casterIndex].blades = [
			...battleData[casterIndex].blades,
			...spell.casterBlades
		];
	}

	let vrilLeft = spell.vrilRequired;
	while (vrilLeft > 1 && battleData[casterIndex].superVril > 0) {
		battleData[casterIndex].superVril--;
		vrilLeft -= 2;
	}
	if (battleData[casterIndex].vril === 0) {
		battleData[casterIndex].superVril -= Math.ceil(vrilLeft / 2);
	} else {
		battleData[casterIndex].vril -= vrilLeft;
	}
	battleData[casterIndex].hand.splice(spellIndex, 1);

	for (let i = 0; i < battleData.length; i++) {
		if (battleData[i] === undefined) {
			continue;
		}
		battleData[i].entity.health = Math.round(battleData[i].entity.health);
		if (battleData[i].entity.health > battleData[i].entity.maxHealth) {
			battleData[i].entity.health = battleData[i].entity.maxHealth;
		}
	}
	return battleData;
}