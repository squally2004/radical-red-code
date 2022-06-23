export const Abilities: { [k: string]: ModdedAbilityData } = {
	badcompany: {
		onBoost(boost, target, source, effect) {
			if (source && target !== source) return;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
				}
			}
		},
		onModifyMove(move) {
			move.mindBlownRecoil = false;
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		name: "Bad Company",
		rating: 4,
		gen: 8,
		shortDesc: "Prevents self-lowering stat drops and recoil.",
	},
	blademaster: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['blade']) {
				this.debug('Blademaster boost');
				return this.chainModify([4915, 4096]);
			}
		},
		onModifyCritRatio(critRatio, source, target, move: ActiveMove) {
			if (move.flags['blade']) {
				return (critRatio + 1);
			}
		},
		name: "Blademaster",
		rating: 3.5,
		gen: 8,
		desc: "This Pokemon's blade-based attacks have their power multiplied by 1.2 and get a +1 critical hit ratio.",
		shortDesc: "Blade attacks have 1.2x power and +1 crit ratio.",
	},
	blazingsoul: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Fire' && pokemon.hp === pokemon.maxhp) return priority + 1;
		},
		name: "Blazing Soul",
		rating: 3,
		gen: 8,
		shortDesc: "If this Pokemon is at full HP, its Fire-type moves have their priority increased by 1.",
	},
	bonezone: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (move.flags['bone']) {
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity[move.type] = true;
				}
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (move.flags['bone'] && target.getMoveHitData(move).typeMod < 0) {
				this.debug('Welcome to the Bone Zone');
				return this.chainModify(2);
			}
		},
		name: "Bone Zone",
		rating: 4,
		gen: 8,
		shortDesc: "Bone moves ignore immunities and deal double damage on not very effective.",
	},
	bullrush: {
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.activeMoveActions > 1) return;
			this.debug('Bull Rush attack boost');
			return this.chainModify([4915, 4096]);
		},
		onModifySpe(spe, pokemon) {
			// probably not > 1 because speed is determined before the move action is run
			if (pokemon.activeMoveActions > 0) return;
			return this.chainModify(1.5);
		},
		name: "Bull Rush",
		rating: 3.5,
		gen: 8,
		desc: "On the first turn this Pokemon is out on the field for, it gets a 1.5x Speed boost and a 1.2x Attack boost.",
		shortDesc: "On first turn out, 1.5x Speed and 1.2x Attack.",
	},
	corrosion: {
		inherit: true,
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
		rating: 3,
		shortDesc: "This Pokemon can hit Steel types with Poison-type moves.",
	},
	defeatist: {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 3) {
				return this.chainModify(0.5);
			}
		},
		onModifySpA(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 3) {
				return this.chainModify(0.5);
			}
		},
		desc: "While this Pokemon has 1/3 or less of its maximum HP, its Attack and Special Attack are halved.",
		shortDesc: "While this Pokemon has 1/3 or less of its max HP, its Attack and Sp. Atk are halved.",
	},
	emergencyexit: {
		onBeforeTurn(pokemon) {
			pokemon.abilityState.originalHP = pokemon.hp;
		},
		onStart(pokemon) {
			pokemon.abilityState.originalHP = pokemon.hp;
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.abilityState.originalHP > pokemon.maxhp / 2) {
				if (!this.canSwitch(pokemon.side) || pokemon.forceSwitchFlag || pokemon.switchFlag) return;
				for (const side of this.sides) {
					for (const active of side.active) {
						active.switchFlag = false;
					}
				}
				pokemon.switchFlag = true;
				this.add('-activate', pokemon, 'ability: Emergency Exit');
			}
		},
		name: "Emergency Exit",
		rating: 1,
		num: 194,
		desc: "At the end of the turn, if this Pokemon has less than 1/2 of its maximum HP, it switches out to a chosen ally.",
		shortDesc: "If this Pokemon is below 1/2 HP at the end of the turn, it switches out.",
	},
	fatalprecision: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (defender.runEffectiveness(move) > 0) {
				this.debug('Fatal Precision boost');
				return this.chainModify([4915, 4096]);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (target && target.runEffectiveness(move) > 0) {
				move.accuracy = true;
			}
		},
		name: "Fatal Precision",
		rating: 3,
		gen: 8,
		shortDesc: "Super Effective Moves from this Pokemon can’t miss and receive a 20% damage boost.",
	},
	felineprowess: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		name: "Feline Prowess",
		rating: 5,
		gen: 8,
		shortDesc: "This Pokemon's Sp. Atk is doubled.",
	},
	flareboost: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'brn') {
				return false;
			}
		},
		rating: 3,
		desc: "While this Pokemon is burned, the power of its special attacks is multiplied by 1.5. Immune to burn damage.",
		shortDesc: "When burned, special attacks have 1.5x power; Immune to burn damage.",
	},
	flowergift: {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpe(spe, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifyAtk() { },
		onAllyModifySpD() { },
		desc: "If this Pokemon is a Cherrim and Sunny Day is active, it changes to Sunshine Form and its Attack and Speed are multiplied by 1.5. If this Pokemon is a Cherrim and it is holding Utility Umbrella, it remains in its regular form and its Attack and Speed stats are not boosted. If this Pokemon is a Cherrim in its Sunshine form and is given Utility Umbrella, it will immediately switch back to its regular form. If this Pokemon is a Cherrim holding Utility Umbrella and its item is removed while Sunny Day is active, it will transform into its Sunshine Form.",
		shortDesc: "If user is Cherrim and Sunny Day is active, its Attack and Speed are 1.5x.",
	},
	forecast: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.hasItem('damprock')) {
				this.field.setWeather('raindance');
			} else if (pokemon.hasItem('heatrock')) {
				this.field.setWeather('sunnyday');
			} else if (pokemon.hasItem('smoothrock')) {
				this.field.setWeather('sandstorm');
			} else if (pokemon.hasItem('icyrock')) {
				this.field.setWeather('hail');
			}
		},
		desc: "If this Pokemon is a Castform, its type changes to the current weather condition's type, except Sandstorm. If this Pokemon is holding Utility Umbrella and the weather condition is Sunny Day, Desolate Land, Rain Dance, or Primordial Sea, it will not change types. If this pokemon is holding a weather rock, it will set the weather corrosponding to the rock it is holding.",
		shortDesc: "Summons weather based on held weather rock, then changes type to match the weather.",
	},
	gulpmissile: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (['cramorantgulping', 'cramorantgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'cramorantgulping') {
					this.boost({ spe: -1 }, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.formeChange('cramorant', move);
			}
		},
		desc: "If this Pokemon is a Cramorant, it changes forme when it hits a target with Surf or uses the first turn of Dive successfully. It becomes Gulping Form with an Arrokuda in its mouth if it has more than 1/2 of its maximum HP remaining, or Gorging Form with a Pikachu in its mouth if it has 1/2 or less of its maximum HP remaining. If Cramorant gets hit in Gulping or Gorging Form, it spits the Arrokuda or Pikachu at its attacker, even if it has no HP remaining. The projectile deals damage equal to 1/4 of the target's maximum HP, rounded down; this damage is blocked by the Magic Guard Ability but not by a substitute. An Arrokuda also lowers the target's Speed by 1 stage, and a Pikachu paralyzes the target. Cramorant will return to normal if it spits out a projectile, switches out, or Dynamaxes.",
		shortDesc: "When hit after Surf/Dive, attacker takes 1/4 max HP and -1 Speed or paralysis.",
	},
	illuminate: {
		inherit: true,
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('illuminate - enhancing accuracy');
			return this.chainModify([4915, 4096]);
		},
		rating: 2.5,
		shortDesc: "This Pokemon's moves have their accuracy multiplied by 1.2.",
	},
	illusion: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.illusion) {
				this.debug('Illusion boost');
				return this.chainModify([5325, 4096]);
			}
		},
		desc: "When this Pokemon switches in, it appears as the last unfainted Pokemon in its party until it takes direct damage from another Pokemon's attack. This Pokemon's actual level and HP are displayed instead of those of the mimicked Pokemon. This Pokemon's moves are given a 1.3x boost when disguised.",
		shortDesc: "Appears as last Pokemon in party until damaged; 1.3x power when disguised.",
	},
	innerfocus: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate' || effect.id === 'surprise') {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Focus', '[of] ' + target);
			}
		},
	},
	ironfist: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([5325, 4096]);
			}
		},
		desc: "This Pokemon's punch-based attacks have their power multiplied by 1.3.",
		shortDesc: "This Pokemon's punch-based attacks have 1.3x power.",
	},
	liquidvoice: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound'] && !attacker.volatiles['dynamax']) {
				return this.chainModify([4915, 4096]);
			}
		},
		desc: "This Pokemon's sound-based moves become Water-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's sound-based moves become Water type and have 1.2x power.",
	},
	mountaineer: {
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Rock') {
				this.add('-immune', target, '[from] ability: Mountaineer');
				return null;
			}
		},
		isBreakable: true,
		name: "Mountaineer",
		rating: 3.5,
		gen: 8,
		shortDesc: "This Pokemon is immune to Rock; Avoids Stealth Rock.",
	},
	oblivious: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate' || effect.id === 'surprise') {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Oblivious', '[of] ' + target);
			}
		},
	},
	oraoraoraora: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (move.flags['punch'] && !move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 2;
				move.multihitType = 'oraoraoraora';
			}
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'oraoraoraora' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		name: "ORAORAORAORA",
		rating: 5,
		gen: 8,
		shortDesc: "This Pokemon's punch moves hit twice. The second hit has its damage halved.",
	},
	owntempo: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate' || effect.id === 'surprise') {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Tempo', '[of] ' + target);
			}
		},
	},
	parasiticwaste: {
		onModifyMove(move) {
			if (!move.secondaries) move.secondaries = [];
			for (const secondary of move.secondaries) {
				if ((move.category !== 'Status') && (secondary.status === 'psn' || secondary.status === 'tox')) {
					move.drain = [1, 2];
				}
			}
		},
		name: "Parasitic Waste",
		gen: 8,
		rating: 2.5,
		shortDesc: "Attacks that can poison also heal for 50% of the damage dealt.",
	},
	pressure: {
		inherit: true,
		onStart(pokemon) {
			for (const action of this.queue) {
				if (
					action.choice === 'runPrimal' && action.pokemon === pokemon &&
					(pokemon.species.id === 'dialga' || pokemon.species.id === 'eternatus')
				) {
					return;
				}
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.add('-ability', pokemon, 'Pressure');
		},
	},
	primalarmor: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Primal Armor neutralize');
				return this.chainModify(0.5);
			}
		},
		name: "Primal Armor",
		rating: 4,
		gen: 8,
		shortDesc: "This Pokemon receives 1/2 damage from supereffective attacks.",
	},
	quickfeet: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(2);
			}
		},
		rating: 3,
		desc: "If this Pokemon has a non-volatile status condition, its Speed is multiplied by 2; the Speed drop from paralysis is ignored.",
		shortDesc: "If this Pokemon is statused, its Speed is 2x; ignores Speed drop from paralysis.",
	},
	rivalry: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender) {
				if (attacker.gender === defender.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25);
				}
			}
		},
		rating: 1,
		desc: "This Pokemon's attacks have their power multiplied by 1.25 against targets of the same gender. There is no modifier if either this Pokemon or the target is genderless, or if they have different genders.",
		shortDesc: "This Pokemon's attacks do 1.25x on same gender targets.",
	},
	sagepower: {
		onStart(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityState.choiceLock && pokemon.abilityState.choiceLock !== move.id) {
				// Fails unless ability is being ignored (these events will not run), no PP lost.
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Sage Power");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityState.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityState.choiceLock = move.id;
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			// PLACEHOLDER
			this.debug('Sage Power SpA Boost');
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityState.choiceLock) return;
			if (pokemon.volatiles['dynamax']) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityState.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		name: "Sage Power",
		rating: 4.5,
		gen: 8,
		shortDesc: "This Pokemon's Sp. Atk is 1.5x, but it can only select the first move it executes.",
	},
	scrappy: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate' || effect.id === 'surprise') {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Scrappy', '[of] ' + target);
			}
		},
	},
	selfsufficient: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
		name: "Self Sufficient",
		rating: 3,
		gen: 8,
		shortDesc: "At the end of every turn, this Pokemon restores 1/16 of its max HP.",
	},
	shielddust: {
		inherit: true,
		rating: 3.5,
		desc: "This Pokemon is not affected by the secondary effect of another Pokemon's attack, and is not affected by entry hazards.",
		shortDesc: "This Pokemon is unaffected by entry hazards and secondary effects of moves.",
	},
	solarpower: {
		inherit: true,
		onWeather() { },
		rating: 2.5,
		desc: "If Sunny Day is active, this Pokemon's Special Attack is multiplied by 1.5. If this Pokemon is holding Utility Umbrella, its Special Attack remains the same.",
		shortDesc: "If Sunny Day is active, this Pokemon's Sp. Atk is 1.5x.",
	},
	striker: {
		onBasePowerPriority: 43,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['kick']) {
				this.debug('Striker Boost');
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Striker",
		rating: 3,
		gen: 8,
		desc: "This Pokemon's kick-based attacks have their power multiplied by 1.3.",
		shortDesc: "This Pokemon's kick-based attacks have 1.3x power.",
	},
	surprise: {
		onStart(pokemon) {
			const effectNum = this.random(5);
			switch (effectNum) {
				case 0:
					this.boost({ spe: 1 }, pokemon);
					break;
				case 1:
					this.boost({ atk: 1 }, pokemon);
					break;
				case 2:
					this.boost({ spa: 1 }, pokemon);
					break;
				case 3:
					this.field.setWeather('hail');
					break;
				case 4:
					let activated = false;
					for (const target of pokemon.adjacentFoes()) {
						if (!activated) {
							this.add('-ability', pokemon, 'Surprise!', 'boost');
							activated = true;
						}
						if (target.volatiles['substitute']) {
							this.add('-immune', target);
						} else {
							this.boost({ atk: -1 }, target, pokemon, null, true);
						}
					}
					break;
				case 5:
					this.add('-ability', pokemon, 'Surprise!');
					pokemon.addVolatile('slowstart');
					break;
			}
		},
		name: "Surprise!",
		rating: 2,
		gen: 8,
		desc: "When this Pokemon enters the field, it activates one of the following effects: +1 Attack, +1 Speed, Hail, Intimidate, or Slow Start.",
		shortDesc: "Random effect on switch-in.",
	},
	toxicboost: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'tox' || effect.id === 'psn') {
				return false;
			}
		},
		rating: 3,
		desc: "While this Pokemon is poisoned, the power of its physical attacks is multiplied by 1.5. Immune to poison damage.",
		shortDesc: "When poisoned, physical attacks have 1.5x power; Immune to poison damage.",
	},
	truant: {
		inherit: true,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.removeVolatile('truant')) {
				if (!move.heal) {
					this.add('cant', pokemon, 'ability: Truant');
					return false;
				}
				return true;
			}
			pokemon.addVolatile('truant');
		},
		shortDesc: "This Pokemon can only use healing moves every other turn.",
	},
	watercompaction: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		desc: "This Pokemon takes 50% less damage from Water-type moves, and its Defense is raised 2 stages after it is hit by one.",
		shortDesc: "Reduces water damage by 50%; +2 def when hit by water move.",
	},
	zenmode: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
			if (!pokemon.species.name.includes('Galar')) {
				if (pokemon.species.id !== 'darmanitanzen') {
					this.add('-activate', pokemon, 'ability: Zen Mode');
					pokemon.formeChange('Darmanitan-Zen', this.effect, true);
				}
			} else {
				if (pokemon.species.id !== 'darmanitangalarzen') {
					this.add('-activate', pokemon, 'ability: Zen Mode');
					pokemon.formeChange('Darmanitan-Galar-Zen', this.effect, true);
				}
			}
		},
		isPermanent: true,
		name: "Zen Mode",
		rating: 0,
		num: 161,
		desc: "If this Pokemon is a Darmanitan or Darmanitan-Galar, it changes to Zen Mode on switch-in. This Ability cannot be removed or suppressed.",
		shortDesc: "If Darmanitan, changes to Zen Mode on switch-in.",
	},
	// suff i moved
	superarmor: {
		desc: "Reduces damage taken from physical moves by 25% if the user has not yet attacked.",
		onSourceModifyDamage(damage, source, target, move) {
			if (this.queue.willMove(target) && move.category === 'Physical') {
				return this.chainModify(0.75);
			}
		},
		name: "Super Armor",
		gen: 8,
	},
	overprotective: {
		desc: "If this Pokemon is the last unfainted team member, its Speed is raised by 4 stage.",
		shortDesc: "+4 Speed on switch-in if all other team members have fainted.",
		onSwitchIn(pokemon) {
			if (pokemon.side.pokemonLeft === 1) this.boost({ spe: 4 });
		},
		name: "Overprotective",
		gen: 8,
	},
	oldmanpa: {
		desc: "This Pokemon's sound-based moves have their power multiplied by 1.3. This Pokemon takes halved damage from sound-based moves. This Pokemon ignores other Pokemon's Attack, Special Attack, and accuracy stat stages when taking damage, and ignores other Pokemon's Defense, Special Defense, and evasiveness stat stages when dealing damage. Upon switching in, this Pokemon's Defense and Special Defense are raised by 1 stage.",
		shortDesc: "Effects of Punk Rock + Unaware. On switch-in, boosts Def and Sp. Def by 1.",
		name: "Old Manpa",
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Old Manpa boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['sound']) {
				this.debug('Old Manpa weaken');
				return this.chainModify(0.5);
			}
		},
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['spd'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onStart(pokemon) {
			this.boost({ def: 1, spd: 1 });
		},
		gen: 8,
	},
	dragonheart: {
		desc: "Once per battle, when this Pokemon's HP is at or below 25% of its max HP, this Pokemon heals 50% of its max HP.",
		shortDesc: "Once per battle, heals 50% when 25% or lower.",
		name: "Dragon Heart",
		onUpdate(pokemon) {
			if (pokemon.hp > 0 && pokemon.hp < pokemon.maxhp / 4 && !this.effectState.dragonheart) {
				this.effectState.dragonheart = true;
				this.heal(pokemon.maxhp / 2);
			}
		},
		gen: 8,
	},
	aluminumalloy: {
		desc: "This Pokemon restores 1/3 of its maximum HP, rounded down, when it switches out, and other Pokemon cannot lower this Pokemon's stat stages. -1 Speed, +1 Def/Sp.Def when hit with a Water-type attacking move, switching into rain or starting rain while this Pokemon is on the field.",
		shortDesc: "Regenerator+Clear Body.+1 def/spd,-1 spe in rain/hit by water",
		name: "Aluminum Alloy",
		onSwitchIn(pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				this.boost({ def: 1, spd: 1, spe: -1 }, pokemon, pokemon);
				this.add('-message', `${pokemon.name} is rusting...`);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				this.boost({ def: 1, spd: 1, spe: -1 }, target, target);
				this.add('-message', `${target.name} is rusting...`);
			}
		},
		onAnyWeatherStart() {
			const pokemon = this.effectState.target;
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				this.boost({ def: 1, spd: 1, spe: -1 }, pokemon, pokemon);
				this.add('-message', `${pokemon.name} is rusting...`);
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Aluminum Alloy", "[of] " + target);
			}
		},
		gen: 8,
	},
	dragonsfury: {
		desc: "If this Pokemon has a non-volatile status condition, its Defense is multiplied by 1.5x and its HP is restored by 25% of damage it deals.",
		shortDesc: "If this Pokemon is statused, its Def is 1.5x and it heals for 25% of dmg dealt.",
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move, attacker) {
			if (attacker.status) move.drain = [1, 4];
		},
		name: "Dragon's Fury",
		gen: 8,
	},
	deceiver: {
		desc: "This Pokemon's moves that match one of its types have a same-type attack bonus of 2 instead of 1.5. If this Pokemon is at full HP, it survives one hit with at least 1 HP.",
		shortDesc: "Adaptability + Sturdy.",
		onModifyMove(move) {
			move.stab = 2;
		},
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Deceiver');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Deceiver');
				return target.hp - 1;
			}
		},
		name: "Deceiver",
		gen: 8,
	},
	falsenine: {
		desc: "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type. This Pokemon's critical hit ratio is raised by 1 stage.",
		shortDesc: "Protean + Super Luck.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: False Nine');
			}
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		name: "False Nine",
		gen: 8,
	},
	bambookingdom: {
		desc: "On switch-in, this Pokemon's Defense and Special Defense are raised by 1 stage. Attacking moves used by this Pokemon have their priority set to -7.",
		shortDesc: "+1 Def/SpD. -7 priority on attacks.",
		name: "Bamboo Kingdom",
		onStart(pokemon) {
			this.boost({ def: 1, spd: 1 }, pokemon);
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category !== 'Status') return -7;
		},
		gen: 8,
	},
	darkroyalty: {
		desc: "While this Pokemon is active, priority moves from opposing Pokemon targeted at allies are prevented from having an effect. Dark-type attacks used by this Pokemon have their power multiplied by 1.2.",
		shortDesc: "Immune to priority. Dark-type attacks have 1.3x power.",
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('-ability', dazzlingHolder, 'Dark Royalty');
				this.add('cant', target, move, '[of] ' + dazzlingHolder);
				return false;
			}
		},
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Dark Royalty boost');
				return this.chainModify(1.3);
			}
		},
		name: "Dark Royalty",
	},
	magichat: {
		desc: "This Pokemon can only be damaged by direct attacks. This Pokemon blocks certain status moves and instead uses the move against the original user.",
		shortDesc: "Magic Guard + Magic Bounce.",
		onDamage(damage, target, source, effect) {
			if (effect.id === 'heavyhailstorm') return;
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.add('-ability', target, 'Magic Hat');
			this.actions.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.isAlly(source) || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.add('-ability', target, 'Magic Hat');
			this.actions.useMove(newMove, this.effectState.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		name: "Magic Hat",
		gen: 8,
	},
	Supercell: {
		desc: "On switch-in, this Pokemon summons Rain Dance. If Rain Dance or Heavy Rain is active, this Pokemon's Electric-type moves have 1.2x power.",
		shortDesc: "Summons rain. Electric-type moves have 1.3x power in rain.",
		name: "Supercell",
		onStart(source) {
			this.field.setWeather('raindance');
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.type === 'Electric' && this.field.getWeather().id === 'raindance') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	greedymagician: {
		desc: "This Pokemon steals the item off a Pokemon it hits with an attack. If this Pokemon already has an item, it is replaced with the stolen item. This ability does not affect Doom Desire and Future Sight.",
		shortDesc: "Steals item from foe on attack; replace current item with stolen item.",
		name: "Greedy Magician",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id;
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Greedy Magician', '[of] ' + source);
			}
		},
		gen: 8,
	},
	lastminutelag: {
		desc: "This Pokemon applies the Recharge status to the opposing Pokemon if this Pokemon needs to recharge. If this Pokemon KOs an opposing Pokemon with a recharge move, then the user does not need to recharge.",
		shortDesc: "Gives Recharge to the target if this Pokemon has it. KO: No recharge.",
		onModifyMove(move, pokemon, target) {
			if (move.self?.volatileStatus === 'mustrecharge') {
				if (!move.volatileStatus) {
					move.volatileStatus = 'mustrecharge';
				} else {
					if (!move.secondaries) move.secondaries = [];
					move.secondaries.push({ chance: 100, volatileStatus: 'mustrecharge' });
				}
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				if (pokemon.volatiles['mustrecharge']) {
					this.add('-ability', pokemon, 'Last Minute Lag');
					this.add('-end', pokemon, 'mustrecharge');
					delete pokemon.volatiles['mustrecharge'];
					this.hint('It may look like this Pokemon is going to recharge next turn, but it will not recharge.');
				}
			}
		},
		name: "Last-Minute Lag",
		gen: 8,
	},
	ghostspores: {
		desc: "This Pokemon ignores the foe's stat boosts. On switch-out, this Pokemon regenerates 1/3 HP, rounded down. If this Pokemon is hit by an attack, Leech Seed is applied to the foe. If this Pokemon is KOed, Curse is applied to the foe.",
		shortDesc: " Regenerator. If hit, foe is Leech Seeded. If KOed, foe is Cursed.",
		name: 'Ghost Spores',
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				source.addVolatile('curse', target);
			} else {
				source.addVolatile('leechseed', target);
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
	},
	wildmagicsurge: {
		desc: "Randomly changes this Pokemon's type at the end of every turn to the type of one of its moves; same-type attack bonus (STAB) is 2 instead of 1.5.",
		shortDesc: "Adaptability + Randomly changes to the type of one of its moves every turn.",
		name: "Wild Magic Surge",
		onModifyMove(move) {
			move.stab = 2;
		},
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			const types = pokemon.moveSlots.map(slot => this.dex.moves.get(slot.id).type);
			const type = types.length ? this.sample(types) : '???';
			if (this.dex.types.isName(type) && pokemon.setType(type)) {
				this.add('-ability', pokemon, 'Wild Magic Surge');
				this.add('-start', pokemon, 'typechange', type);
			}
		},
		gen: 8,
	},
	burnitdown: {
		desc: "On switch-in, this Pokemon lowers the foe's higher offensive stat.",
		shortDesc: "Lower the foe's higher offensive stat.",
		onStart(pokemon) {
			let totalatk = 0;
			let totalspa = 0;
			for (const target of pokemon.foes()) {
				totalatk += target.getStat('atk', false, true);
				totalspa += target.getStat('spa', false, true);
			}
			for (const target of pokemon.foes()) {
				this.add('-ability', pokemon, 'BURN IT DOWN!');
				if (totalatk && totalatk >= totalspa) {
					this.boost({ atk: -1 }, target, pokemon, null, true);
				} else if (totalspa) {
					this.boost({ spa: -1 }, target, pokemon, null, true);
				}
			}
		},
		name: "BURN IT DOWN!",
		gen: 8,
	},
	royalcoat: {
		desc: "If Sandstorm is active, this Pokemon's Speed is doubled and its Special Defense is multiplied by 1.5. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "If Sandstorm, Speed x2 and SpD x1.5; immunity to Sandstorm.",
		name: "Royal Coat",
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(2);
			}
		},
		onModifySpD(spd, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		gen: 8,
	},
	skilldrain: {
		desc: "While this Pokemon is active, no moves will trigger their secondary effects, and moves that cause the user to switch out will no longer do so.",
		shortDesc: "While active: no secondary effects, moves can't switch out.",
		name: "Skill Drain",
		onAnyModifyMove(move) {
			delete move.secondaries;
		},
		// afterSecondarySelf and switch nullifying handled in ssb/scripts.ts
		gen: 8,
	},
	qigong: {
		desc: "This Pokemon's Defense is doubled, and it receives 1/2 damage from special attacks.",
		onModifyDefPriority: 6,
		onModifyDef(def) {
			return this.chainModify(2);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') {
				return this.chainModify(0.5);
			}
		},
		name: "Qi-Gong",
		gen: 8,
	},
	rainyseason: {
		desc: "On switch-in, this Pokemon summons Rain Dance. If Rain Dance or Heavy Rain is active, this Pokemon has doubled Speed, collects a raindrop, and restores 1/8 of its maximum HP, rounded down, at the end of each turn. If this Pokemon is holding Big Root, it will restore 1/6 of its maximum HP, rounded down, at the end of the turn. If this Pokemon is holding Utility Umbrella, its HP does not get restored and it does not collect raindrops. Each raindrop raises this Pokemon's Defense and Special Defense by 1 stage while it is collected.",
		shortDesc: "Drizzle + Swift Swim. Restore HP if raining. Collect raindrops.",
		name: "Rainy Season",
		isPermanent: true,
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'kyogre') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('raindance');
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (['raindance', 'primordialsea'].includes(effect.id)) {
				this.heal(target.baseMaxhp / (target.hasItem('bigroot') ? 6 : 8));
				target.addVolatile('raindrop');
			}
		},
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		gen: 8,
	},
	capsulearmor: {
		desc: "While in Minior-Meteor forme, this Pokemon cannot be affected by major status conditions and is immune to critical hits. This ability cannot be ignored by Moongeist Beam, Sunsteel Strike, Mold Breaker, Teravolt, or Turboblaze.",
		shortDesc: "Minior-Meteor: Immune to crits and status",
		name: "Capsule Armor",
		isPermanent: true,
		isBreakable: false,
		onCriticalHit: false,
		onSetStatus(status, target, source, effect) {
			if (target.species.id !== 'miniormeteor' || target.transformed) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Capsule Armor');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (target.species.id !== 'miniormeteor' || target.transformed) return;
			if (status.id !== 'yawn') return;
			this.add('-immune', target, '[from] ability: Capsule Armor');
			return null;
		},
	},
	rooted: {
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap', 'floralhealing', 'healpulse', 'junglehealing', 'lifedew', 'pollenpuff', 'wish'];
			if (heals.includes(effect.id)) {
				return this.chainModify([5324, 4096]);
			}
		},
		name: "Rooted",
		rating: 4,
		num: 260,
		shortDesc: "Pokemon gains 1/3rd hp extra from healing moves.",
	},
	hammerfist: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Hammer Fist boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onModifyMove(move) {
			if (move.flags['contact']) delete move.flags['protect'];
		},
		name: "Hammer Fist",
		rating: 4,
		num: 260,
		desc: "This Pokemon's punch-based attacks have their power multiplied by 1.3. Moves go though protect.",
		shortDesc: "This Pokemon's punch-based attacks have 1.3x power, and moves go though protect.",
	},
	stubborn: {
		onModifyDef(def, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(2);
			}
		},
		onModifySpD(SpD, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(2);
			}
		},
		name: "Stubborn",
		rating: 4,
		gen: 8,
		shortDesc: "When pokemon is below half hp defence is doubled.",
	},
	boomtechnician: {
		onModifyMove(bullet) {
			bullet.basePower = 2;
		},
		name: "Boom Technician",
		rating: 4,
		num: 91,
	},
	berserkerrage: {
		onHit(target, source, move) {
			if (!target.hp) return;
			if (move.id === 'recoil') {
				target.setBoost({ atk: 1 });
				this.add('-setboost', target, 'atk', 1, '[from] ability: Beserker Rage');
			}
		},
		name: "Berserker Rage",
		rating: 4,
		gen: 8,
		shortDesc: "Raises attack by one stage after taking recoil damage.",
	},
	weightedfield: {
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (target.volatiles['ingrain'] || target.volatiles['smackdown'] || this.field.getPseudoWeather('gravity')) return;
			if (move.type === 'Ground' && target.hasType('Flying')) return 0;
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		name: "Weighted Field",
		rating: 3,
		gen: 8,
		shortDesc: "User is abile to hit flying type pokemon with ground type moves.  Speed is halved.",
	},
	Topsy: {
		onStart(pokemon) {
			//make sure that this confuses you lol
			this.boost({ def: 1, atk: 1, spd: 1, spa: 1, spe: 1, }, pokemon);
		},
		name: "Topsy",
		rating: 5,
		gen: 8,
		shortDesc: "Raises all stats by 1 but confuses user on entry",
	},
	bottlebreak: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(5, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		name: "Bottle Break",
		rating: 2,
		num: 9,
	},
	bigbang: {
		name: "Big Bang",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp && this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 2, source, target);
			}
		},
		rating: 2.5,
		num: 106,
	},
	_____: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ghost') {
				move.accuracy = true;
				if (!target.addVolatile('_____')) {
					this.add('-immune', target, '[from] ability: _____');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('_____');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: _____');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Ghost' && attacker.hasAbility('_____')) {
					this.debug('_____ boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Ghost' && attacker.hasAbility('_____')) {
					this.debug('_____ boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: _____', '[silent]');
			},
		},
		isBreakable: true,
		name: "_____",
		rating: 3.5,
		num: 18,
	},
	psychocall: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Psychic' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Psycho Call boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Psychic' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Psycho Call boost');
				return this.chainModify(1.5);
			}
		},
		name: "Psycho Call",
		rating: 2,
		num: 66,
	},
	spiritcall: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Spirit Call boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Spirit Call boost');
				return this.chainModify(1.5);
			}
		},
		name: "Spirit Call",
		rating: 2,
		num: 66,
	},
	shadowcall: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Shadow Call boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Shadow Call boost');
				return this.chainModify(1.5);
			}
		},
		name: "Shadow Call",
		rating: 2,
		num: 66,
	},
	hubris: {
		onAnyFaintPriority: 1,
		onAnyFaint() {
			this.boost({ spa: 1 }, this.effectState.target);
		},
		name: "Hubris",
		rating: 3.5,
		num: 220,
	},
	noctem: {
		onStart(source) {
			this.field.setWeather('Darkness');
		},
		name: "Noctem",
		rating: 4,
		num: 2,
	},
	shadowdance: {
		onModifySpe(spe, pokemon) {
			if (['Darkness'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		name: "Shadow Dance",
		rating: 3,
		num: 33,
	},
	windforce: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Flying') {
				this.boost({ spd: 1 });
			}
		},
		name: "Wind Force",
		rating: 2.5,
		num: 154,
	},
	heliophobia: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'Darkness') {
				this.heal(target.baseMaxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		isBreakable: true,
		name: "Heliophobia ",
		rating: 3,
		num: 87,
	},
	carefree: {
		desc: "This Pokemon blocks certain status moves and instead uses the move against the original user. This Pokemon ignores other Pokemon's Attack, Special Attack, and accuracy stat stages when taking damage, and ignores other Pokemon's Defense, Special Defense, and evasiveness stat stages when dealing damage.",
		shortDesc: "Magic Bounce + Unaware.",
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['spd'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.add('-ability', target, 'Carefree');
			this.actions.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.isAlly(source) || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.add('-ability', target, 'Carefree');
			this.actions.useMove(newMove, this.effectState.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		name: "Carefree",
		gen: 8,
	},
	athenian: {
		onModifyAtkPriority: 5,
		onModifyAtk(spa) {
			return this.chainModify(2);
		},
		name: "	Athenian",
		rating: 5,
		num: 37,
	},
	absolution: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (['Darkness'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'Darkness') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		name: "Absolution ",
		rating: 2,
		num: 94,
	},
	firedup: {
		onBeforeMovePriority: 0.5,
		name: "Fired Up",
		onPrepareHit(user, source, move) {
			if ([move.type === 'Fire']) {
				this.boost({ spe: 1, atk: 1, spa: 1 });
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(1, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		gen: 6,
		rating: 4,
		num: 12,
		desc: "Before this Pokemon uses a Fire-type attack its Attack, Special Attack, and Speed are all increased by 1 stage each. 10% chance to burn upon contact.",
		shortDesc: "Raises Attack, Sp. Atk and Speed before using a Fire-type attack. Can burn on contact."
	},
	intoxicate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Poison';
				move.intoxicateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.intoxicateBoosted) return this.chainModify([4915, 4096]);
		},
		name: "Intoxicate",
		rating: 4,
		num: 206,
	},
	shadowsynergy: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Shadow Synergy boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Shadow Synergy boost');
				return this.chainModify(1.5);
			}
		},
		name: "Shadow Synergy",
		rating: 3.5,
		num: 200,
	},
	foundry: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Rock' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fire';
				move.galvanizeBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.galvanizeBoosted) return this.chainModify([4915, 4096]);
		},
		name: "Foundry",
		rating: 4,
		num: 206,
	},
	spectraljaws: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) {
				return this.chainModify(1.5);

			}
		},
		onModifyMove(move) {
			if (move.flags['bite']) {
				move.category = 'Special'
			}
		},
		name: "Spectral Jaw",
		rating: 3,
		num: 173,
	},
	pinegrass: {
		onModifyMove(move) {
			move.infiltrates = true;
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		name: "Pine Grass",
		rating: 4,
		num: 151,
	},
	proteanmaxima: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onModifyMove(move) {
			move.stab = 2;
		},
		name: "Protean Maxima",
		rating: 4,
		num: 91,
	},
	unleafed: {
		desc: "If this Pokemon is the last unfainted team member, its Speed is raised by 4 stage.",
		shortDesc: "+4 Speed on switch-in if all other team members have fainted.",
		onSwitchIn(pokemon) {
			if (pokemon.side.pokemonLeft === 1) this.boost({ spe: 3, atk: 3, spa: 3, def: 3, spd: 3, });
		},
		name: "Unleafed",
		gen: 8,
	},
	pendulum: {
		onStart(pokemon) {
			pokemon.addVolatile('metronome');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('metronome')) {
					pokemon.removeVolatile('metronome');
					return;
				}
				if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectState.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1;
					} else {
						this.effectState.numConsecutive++;
					}
				} else {
					this.effectState.numConsecutive = 0;
				}
				this.effectState.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
				const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		name: "Pendulum",
		rating: 4,
		num: 151,
	},
	irrelephant: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Flying'] = true;
				move.ignoreImmunity['Normal'] = true;
				move.ignoreImmunity['Ground'] = true;
				move.ignoreImmunity['Ghost'] = true;
				move.ignoreImmunity['Dragon'] = true;
				move.ignoreImmunity['Steel'] = true;
				move.ignoreImmunity['Psychic'] = true;
				move.ignoreImmunity['Poison'] = true;
				move.ignoreImmunity['Electric'] = true;
			}
		},
		name: "Irrelephant",
		rating: 3,
		num: 113,
	},
	radiation: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				this.damage(target.baseMaxhp / 8, target, pokemon);
			}
		},
		name: "Radiation",
		rating: 1.5,
		num: 123,
	},
	etherealshroud: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Ethereal Shroud boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Ethereal Shroud boost');
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		name: "Ethereal Shroud",
		rating: 3.5,
		num: 200,
	},
	unyielding: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fighting', 'Dark', 'Ground') {
				this.boost({ atk: 1, spd: 1, spa: 1 });
			}
		},
		name: "Unyielding",
		rating: 2.5,
		num: 154,
	},
	aquatic: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Aquatic boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Aquatic boost');
				return this.chainModify(1.5);
			}
		},
		name: "Aquatic",
		rating: 3.5,
		num: 200,
	},
	toxicant: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Toxicant boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Toxicant boost');
				return this.chainModify(1.5);
			}
		},
		name: "Toxicant",
		rating: 3.5,
		num: 200,
	},
	troposphere: {
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'kyogre') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('Troposphere');
		},
		name: "Troposphere",
		rating: 4,
		num: 2,
	},
	hollowbody: {
		onModifyDefPriority: 6,
		onModifyDef(def) {
			return this.chainModify(.5);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') {
				return this.chainModify(0.5);
			}
		},
		name: "Hollow Body",
		rating: 4,
		num: 169,
	},
	miracleguard: {
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Miracle Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) > 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Miracle Guard');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Miracle Guard",
		rating: 5,
		num: 25,
	},
}