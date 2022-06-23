export const Abilities: {[k: string]: ModdedAbilityData} = {
	swarm: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			this.debug('Swarm boost');
			if (move.type === 'Bug') {
				if (attacker.hp <= attacker.maxhp / 3) {
					return this.chainModify(1.5);
				} else {
					return this.chainModify(1.2);
				}
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			this.debug('Swarm boost');
			if (move.type === 'Bug') {
				if (attacker.hp <= attacker.maxhp / 3) {
					return this.chainModify(1.5);
				} else {
					return this.chainModify(1.2);
				}
			}
		},
	},
	overgrow: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			this.debug('Overgrow boost');
			if (move.type === 'Grass') {
				if (attacker.hp <= attacker.maxhp / 3) {
					return this.chainModify(1.5);
				} else {
					return this.chainModify(1.2);
				}
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			this.debug('Overgrow boost');
			if (move.type === 'Grass') {
				if (attacker.hp <= attacker.maxhp / 3) {
					return this.chainModify(1.5);
				} else {
					return this.chainModify(1.2);
				}
			}
		},
	},
	blaze: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			this.debug('Blaze boost');
			if (move.type === 'Fire') {
				if (attacker.hp <= attacker.maxhp / 3) {
					return this.chainModify(1.5);
				} else {
					return this.chainModify(1.2);
				}
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			this.debug('Blaze boost');
			if (move.type === 'Fire') {
				if (attacker.hp <= attacker.maxhp / 3) {
					return this.chainModify(1.5);
				} else {
					return this.chainModify(1.2);
				}
			}
		},
	},
	torrent: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			this.debug('Torrent boost');
			if (move.type === 'Water') {
				if (attacker.hp <= attacker.maxhp / 3) {
					return this.chainModify(1.5);
				} else {
					return this.chainModify(1.2);
				}
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			this.debug('Torrent boost');
			if (move.type === 'Water') {
				if (attacker.hp <= attacker.maxhp / 3) {
					return this.chainModify(1.5);
				} else {
					return this.chainModify(1.2);
				}
			}
		},
	},
	liquidvoice: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.flags['sound']) return this.chainModify(1.2);
		},
	},
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move.type === 'Flying') return move.priority + 1;
		},
	},
	pyromancy: {
		onModifyMove(move) {
			if (!(move.type === 'Fire')) return;
			if (!move.secondaries) move.secondaries = [];
			for (const secondary of move.secondaries) {
				if ((move.category !== 'Status') && (secondary.status === 'brn') && secondary.chance) {
					secondary.chance = secondary.chance * 5;
				}
			}
		},
		name: 'Pyromancy',
		gen: 8,
	},
	chloroplast: {
		// hardcoded all of this
		shortDesc: "behaves as if the weather is sunny, does not boost fire moves or change weather ball.",
		desc: "Behaves as if the weather is sunny. Solar Beam and Solar Blade do not need to charge, and are not weakened in other weathers. Growth always boosts Attack and Special Attack by two stages each instead of one • Synthesis, Moonlight and Morning Sun always restore up to 2/3 of the users maximum HP This does not change the type of weather ball or boost the power of Fire-type moves. Also, the ability does absolutely nothing in sunlight.",
		name: 'Chloroplast',
		gen: 8,
	},
	whiteout: {
		desc: "Ice type moves do 50% more damage in hail",
		name: "Whiteout",
		gen: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Ice' && this.field.weather === 'Hail') return this.chainModify(1.5);
		},
	},
	keenedge: {
		name: 'Keen Edge',
		gen: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['blade']) return this.chainModify(1.3);
		},
	},
	prismscales: {
		name: "Prism Scales",
		gen: 8,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') return this.chainModify(0.7);
		},
	},
	powerfists: {
		name: "Power Fists",
		gen: 8,
		onModifyMove(move, pokemon, target) {
			if (move.flags['punch']) {
				move.overrideDefensivePokemon = 'target';
				move.overrideDefensiveStat = 'spd';
			}
		},
		onBasePower(basePower, source, target, move) {
			if (move.flags['punch']) {
				return this.chainModify(1.2);
			}
		},
	},
	sandsong: {
		name: "Sand Song",
		gen: 8,
		onModifyMove(move, pokemon) {
			if (move.flags['Sound']) {
				move.type = 'Ground';
			}
		},
	},
	rampage: {
		name: 'Rampage',
		gen: 8,
		onAfterHit(source, target, move) {
			if (!target.hp && source.volatiles['mustrecharge']) {
				source.removeVolatile('mustrecharge');
			}
		},
	},
	vengeance: {
		name: 'Vengeance',
		gen: 8,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			this.debug('Vengeance boost');
			if (move.type === 'Ghost') {
				if (attacker.hp <= attacker.maxhp / 3) {
					return this.chainModify(1.5);
				} else {
					return this.chainModify(1.2);
				}
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			this.debug('Vengeance boost');
			if (move.type === 'Ghost') {
				if (attacker.hp <= attacker.maxhp / 3) {
					return this.chainModify(1.5);
				} else {
					return this.chainModify(1.2);
				}
			}
		},
	},
	blitzboxer: {
		name: "Blitz Boxer",
		gen: 8,
		onModifyPriority(priority, source, target, move) {
			if (move.flags['punch']) {
				return move.priority + 1;
			}
		},
	},
};
