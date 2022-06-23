export const Moves: {[k: string]: ModdedMoveData} = {
	direclaw: {
		num: 850,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Dire Claw",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Poison",
		desc: "100% chance to lower target's defense",
	},
	psyshieldbash: {
		num: 851,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Psyshield Bash",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onModifyMove(move, pokemon) {
			move.secondaries = [];
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
			if (pokemon.getStat('def', false, true) > pokemon.getStat('spd', false, true)) {
				move.secondaries.push({
					chance: 30,
					self: {
						boosts: {
							def: 1,
						},
					},
				});
			} else {
				move.secondaries.push({
					chance: 30,
					self: {
						boosts: {
							spd: 1,
						},
					},
				});
			}
		},
		target: "normal",
		type: "Psychic",
		desc: "Uses the higher attacking stat and has a 30% chance to boost the higher defense stat",
	},
	stoneaxe: {
		num: 852,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Stone Axe",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onBasePower(basePower, source, target, move) {
			if (['sandstorm'].includes(this.field.effectiveWeather())) {
				return this.chainModify(1.2);
			}
		},
		secondary: {
			chance: 10,
			volatileStatus: "flinch",
		},
		target: "normal",
		type: "Rock",
		desc: "10% chance of causing the foe to flinch. Also boosted by 1.2x under a Sandstorm.",
	},
	ragingfury: {
		num: 853,
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		name: "Raging Fury",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Fire",
		desc: "Inflicts damage on the first turn then traps the opponent, causing them to lose 1/8 of their maximum HP after each turn, for 4-5 turns.",
	},
	wavecrash: {
		num: 853,
		accuracy: 90,
		basePower: 75,
		category: "Physical",
		name: "Wave Crash",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		self: {
			boosts: {
				spe: 1,
			},
		},
		target: "normal",
		type: "Water",
		desc: "Raises user's speed by one stage.",
	},
	chloroblast: {
		num: 854,
		accuracy: 90,
		basePower: 145,
		category: "Special",
		pp: 5,
		name: "Chloroblast",
		flags: {protect: 1, mirror: 1},
		priority: 0,
		type: "Grass",
		target: "normal",
		self: {
			boosts: {spe: -2},
		},
		onModifyMove(move, pokemon, target) {
			if (['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
				move.secondaries = [];
				move.secondaries.push({
					chance: 100,
					status: 'brn',
				});
			}
		},
		desc: "Decreases users speed by two stages. 100% Chance to burn the opponent under Bright Sunshine.",
	},
	mountaingale: {
		num: 855,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Mountain Gale",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ice",
		desc: "No additional effects",
	},
	victorydance: {
		num: 856,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Victory Dance",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			atk: 1,
			def: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Grass",
		desc: "Raises Attack, Defense and Speed by one stage",
	},
	headlongrush: {
		num: 857,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Headlong Rush",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		desc: "Lowers user's Defense and Special Defense by one stage.",
	},
	barbbarrage: {
		num: 858,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		name: "Barb Barrage",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		secondary: {
			chance: 30,
			status: "psn",
		},
		target: "normal",
		type: "Poison",
		ignoreImmunity: true,
		desc: "30% Chance to Poison, Doubles in BP if Opponent has a Status Condition. Can also Hit Steel Types for Neutral Damage.",
	},
	esperwing: {
		num: 859,
		accuracy: 95,
		basePower: 75,
		category: "Special",
		name: "Esper Wing",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [3, 4],
		secondary: {
			status: "flinch",
			chance: 10,
		},
		target: "any",
		type: "Psychic",
		desc: "Deals damage with a 10% chance to Flinch and the user will recover 75% of the HP drained.",
	},
	bittermalice: {
		num: 860,
		accuracy: 100,
		basePower: 30,
		category: "Special",
		name: "Bitter Malice",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "normal",
		type: "Ghost",
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		desc: "Deals damage and will strike twice. 20% chance of poisoning the target. If the opponent is Statused, it will do double damage.",
	},
	shelter: {
		num: 861,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shelter",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: 2,
			accuracy: 2,
		},
		secondary: null,
		target: "self",
		type: "Steel",
		desc: "Raises the user's Defense and Accuracy by two stages each.",
	},
	triplearrows: {
		num: 862,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Triple Arrows",
		pp: 10,
		priority: 1,
		multihit: 3,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fighting",
		desc: "Deals damage, will strike three times, and has increased priority of +1.",

	},
	infernalparade: {
		num: 863,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		overrideDefensiveStat: 'def',
		name: "Infernal Parade",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		desc: "Inflicts damage based on the target's Defense, not Special Defense.",
	},
	ceaselessedge: {
		num: 864,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Ceaseless Edge",
		pp: 10,
		priority: 0,
		critRatio: 2,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		desc: "High critical hit chance",
	},
	springtidestorm: {
		num: 865,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Springtide Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry(source) {
			if (source.species.baseSpecies === 'Enamorus') {
				return;
			}
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: Springtide Storm');
			this.hint("Only Enamorus can use this move.");
			return null;
		},
		onModifyMove(move, source) {
			move.secondaries = [];
			if (source && source.species.name === 'Enamorus-Therian') {
				move.secondaries.push({
					chance: 50,
					self: {
						boosts: {
							spa: 1,
						},
					},
				});
			} else {
				move.secondaries.push({
					chance: 50,
					self: {
						boosts: {
							def: -1,
						},
					},
				});
			}
		},
		target: "normal",
		type: "Fairy",
		desc: "If used by Enamorus-Incarnate, deals damage and has a 50% chance to decrease defense by one stage. If used by Enamorus-Therian, deals damage and has a 50% chance to increase special attack by one stage.",
	},
	bleakwingstorm: {
		num: 866,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		name: "Bleakwing Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			volatileStatus: "confusion",
		},
		target: "normal",
		type: "Flying",
		desc: "20% chance of confusion.",
	},
	wildboltstorm: {
		num: 867,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		name: "Wildbolt Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: "par",
		},
		target: "normal",
		type: "Electric",
		desc: "20% chance of paralysis",
	},
	sandsearstorm: {
		num: 868,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		name: "Sandsear Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: "brn",
		},
		target: "normal",
		type: "Ground",
		desc: "20% chance of burn.",
	},
	lunarblessing: {
		num: 869,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Lunar Blessing",
		pp: 10,
		priority: 0,
		flags: {heal: 1, bypasssub: 1, allyanim: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "allies",
		type: "Psychic",
		desc: "Restores target's health by 25% of their HP and cures allies' status conditions.",
	},
	takeheart: {
		num: 870,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Take Heart",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onTryMove(pokemon, target, move) {
			if (pokemon.side.faintedLastTurn) {
				this.field.setWeather("raindance");
				move.secondaries = [];
				move.secondaries.push({
					chance: 100,
					self: {
						boosts: {
							spa: 1,
							spd: 1,
						},
					},
				});
			} else {
				return false;
			}
		},
		secondary: null,
		target: "self",
		type: "Water",
		desc: "If this move is used right after an ally faints, the move sets up rain and also increases your Special Attack and Special Defense by one stage. This move will fail if not used under the right circumstances.",
	},
	mysticalpower: {
		num: 871,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		name: "Mystical Power",
		pp: 15,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onModifyMove(move, pokemon) {
			move.secondaries = [];
			const offense = pokemon.getStat("atk", true, false) + pokemon.getStat("spa", true, false);
			const defense = pokemon.getStat("def", true, false) + pokemon.getStat("spd", true, false);
			if (defense > offense) {
				move.secondaries.push({
					chance: 50,
					self: {
						boosts: {
							def: 1,
							spd: 1,
						},
					},
				});
			} else {
				move.secondaries.push({
					chance: 50,
					self: {
						boosts: {
							atk: 1,
							spa: 1,
						},
					},
				});
			}
		},
		type: "Psychic",
		target: "normal",
		desc: "50% Chance to Raise It's Attack & Special Attack if excels in Offense, 50% Chance to Raise It's Defense & Special Defense if excels in Defense",
	},
	powershift: {
		num: 872,
		accuracy: true,
		basePower: 0,
		category: "Status",
		type: "Normal",
		name: "Power Shift",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'powershift',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Power Shift');
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onCopy(pokemon) {
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Power Shift');
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onRestart(pokemon) {
				pokemon.removeVolatile('Power Shift');
			},
		},
		secondary: null,
		target: "self",
	},
	toxicthread: {
		inherit: true,
		isNonstandard: null,
	},
	sketch: {
		inherit: true,
		isNonstandard: null,
	},
	chatter: {
		inherit: true,
		isNonstandard: null,
	},
	darkvoid: {
		inherit: true,
		isNonstandard: null,
	},
	seedflare: {
		inherit: true,
		isNonstandard: null,
	},
	judgment: {
		inherit: true,
		isNonstandard: null,
	},
	relicsong: {
		inherit: true,
		isNonstandard: null,
	},
	powder: {
		inherit: true,
		isNonstandard: null,
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
	hyperspacehole: {
		inherit: true,
		isNonstandard: null,
	},
	hyperspacefury: {
		inherit: true,
		isNonstandard: null,
	},
	beakblast: {
		inherit: true,
		isNonstandard: null,
	},
	icehammer: {
		inherit: true,
		isNonstandard: null,
	},
	revelationdance: {
		inherit: true,
		isNonstandard: null,
	},
};
