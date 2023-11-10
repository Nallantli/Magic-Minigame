function scale(x) {
	return x * SCALE_FACTOR;
}

function calculateDamages(spell, caster, victim) {
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
		usedBladeIds,
		damages: spell.damages.map(d => {
			let base = d.damage;
			let usedShieldIds = []
			shields.forEach(({ id, value, element }, i) => {
				if ((d.element === element || element === 'all') && !totalUsedShieldIds.includes(id)) {
					base += base * (value / 100);
					usedShieldIds.push({ index: i, id });
					totalUsedShieldIds.push(id);
				}
			});
			return {
				...d,
				damage: Math.round(base * baseTilt),
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

function iterateSpell(casterIndex, victimIndices, spell, battleData) {
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
	switch (spell.type) {
		case SPELL_TYPES.HEALING_BASIC:
			spell.heals.forEach(({ heal }) => battleData[victimIndices[0]].entity.health += heal);
			break;
		case SPELL_TYPES.ATTACK_BASIC:
		case SPELL_TYPES.ATTACK_ALL:
			{
				victimIndices.forEach(i => {
					let newShields = [];
					const { usedBladeIds, damages } = calculateDamages(spell, battleData[casterIndex], battleData[i])
					damages.forEach(({ damage, usedShieldIds, steal }) => {
						for (let j = 0; j < battleData[i].shields.length; j++) {
							if (!usedShieldIds.map(({ index }) => index).includes(j)) {
								newShields.push(battleData[i].shields[j]);
							}
						}
						battleData[i].entity.health += damage;
						if (steal) {
							battleData[casterIndex].entity.health -= damage * steal;
						}
					});
					battleData[casterIndex].blades = battleData[casterIndex].blades.filter((_, i) => !usedBladeIds.map(({ index }) => index).includes(i));
					battleData[i].shields = newShields;
				});
			}
			break;
	}
	battleData[casterIndex].vril -= spell.vrilRequired;

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