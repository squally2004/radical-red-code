export const Moves: { [k: string]: ModdedMoveData } = {
	acupressure: {
		inherit: true,
		onHit() { },
		boosts: {
			atk: 1,
		},
		desc: "Raises the user's Attack by 1 stage.",
		shortDesc: "Raises the user's Attack by 1.",
	},
	aquafang: {
		num: 850,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Aqua Fang",
		pp: 15,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},
	armthrust: {
		inherit: true,
		basePower: 25,
	},
	attackorder: {
		inherit: true,
		basePower: 120,
	},
	batonpass: {
		inherit: true,
		basePower: 40,
		self: {},
		selfSwitch: false,
		desc: "Does 40 damage to yourself.",
		shortDesc: "Does 40 damage to yourself.",
	},
	beatup: {
		num: 251,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Beat Up",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
	},
	blazekick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
	},
	boneclub: {
		inherit: true,
		flags: { protect: 1, mirror: 1, bone: 1 },
		isNonstandard: null,
	},
	bonemerang: {
		inherit: true,
		flags: { protect: 1, mirror: 1, bone: 1 },
	},
	bonerush: {
		inherit: true,
		flags: { protect: 1, mirror: 1, bone: 1 },
	},
	bouncybubble: {
		inherit: true,
		basePower: 90,
		pp: 5,
		flags: { protect: 1, mirror: 1 },
		isNonstandard: null,
	},
	chargebeam: {
		inherit: true,
		accuracy: 100,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		desc: "Has a 100% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk by 1.",
	},
	chatter: {
		inherit: true,
		basePower: 80,
		secondary: {
			chance: 50,
			volatileStatus: 'confusion',
		},
		isNonstandard: null,
	},
	covet: {
		inherit: true,
		noTutor: true,
		type: "Fairy",
		isNonstandard: null,
	},
	cut: {
		inherit: true,
		accuracy: 100,
		basePower: 75,
		flags: { contact: 1, protect: 1, mirror: 1, blade: 1 },
		type: "Steel",
	},
	darkhole: {
		num: 851,
		name: "Dark Hole",
		category: "Special",
		pp: 5,
		accuracy: 75,
		basePower: 120,
		type: "Dark",
		priority: 0,
		flags: { protect: 1, mirror: 1, authentic: 1 },
		target: "normal",
		secondary: {
			chance: 50,
			status: 'slp',
		},
		shortDesc: "40% chance to inflict sleep, bypasses substitute.",
	},
	diamondstorm: {
		inherit: true,
		category: "Special",
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.random(2) === 0)) {
				move.category = 'Physical';
				move.flags.contact = 1;
			}
		},
	},
	doublekick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
	},
	doubleteam: {
		inherit: true,
		boosts: {
			atk: 1,
		},
		desc: "Raises the user's Attack by 1 stage.",
		shortDesc: "Raises the user's Attack by 1.",
	},
	dracometeor: {
		inherit: true,
		accuracy: 100,
	},
	dragonhammer: {
		inherit: true,
		basePower: 100,
	},
	drillpeck: {
		inherit: true,
		critRatio: 2,
		shortDesc: "High critical hit ratio.",
	},
	drumbeating: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, sound: 1 },
		basePower: 100,
	},
	dualwingbeat: {
		inherit: true,
		zMove: { basePower: 160 },
	},
	explosion: {
		inherit: true,
		basePower: 150,
		desc: "The user faints after using this move, even if this move fails for having no target. The target's Defense is halved during damage calculation. This move is prevented from executing if any active Pokemon has the Damp Ability.",
		shortDesc: "Target's Def halved during damage. User faints.",
	},
	falseswipe: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, blade: 1 },
	},
	fishiousrend: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1 },
	},
	fissure: {
		inherit: true,
		basePower: 1,
		ohko: false,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	flash: {
		num: 148,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		isNonstandard: null,
		name: "Flash",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 50,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
		desc: "Has a 50% chance to lower the target's Attack by 1 stage.",
		shortDesc: "50% chance to lower the target's Attack by 1.",
	},
	flashcannon: {
		inherit: true,
		flags: { bullet: 1, protect: 1, pulse: 1, mirror: 1 },
	},
	fleurcannon: {
		inherit: true,
		accuracy: 100,
	},
	fly: {
		inherit: true,
		accuracy: 100,
	},
	forbiddenspell: {
		num: 853,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Forbidden Spell",
		secondary: null,
		target: "self",
		type: "Psychic",
		flags: {},
		pp: 5,
		priority: 0,
		onHit(target, effect) {
			const spellMove = this.random(8);
			let chosen = '';
			switch (spellMove) {
				case 0:
					chosen = 'Shell Smash';
					break;
				case 1:
					chosen = 'Healing Wish';
					break;
				case 2:
					chosen = 'Dark Hole';
					break;
				case 3:
					chosen = 'Tail Glow';
					break;
				case 4:
					chosen = 'Roar of Time';
					break;
				case 5:
					chosen = 'Quiver Dance';
					break;
				case 6:
					chosen = 'No Retreat';
					break;
				case 7:
					chosen = 'Soul Robbery';
					break;
			}
			this.actions.useMove(chosen, target);
		},
		desc: "Uses of one of these 8 moves: Shell Smash, Healing Wish, Dark Hole, Tail Glow, Roar of Time, Quiver Dance, No Retreat, or Soul Robbery",
		shortDesc: "Isn't RNG fun?",
	},
	freezyfrost: {
		inherit: true,
		accuracy: 100,
		basePower: 95,
		pp: 5,
		flags: { protect: 1, mirror: 1 },
		isNonstandard: null,
	},
	furycutter: {
		inherit: true,
		flags: { blade: 1, contact: 1, protect: 1, mirror: 1 },
	},
	geargrind: {
		inherit: true,
		accuracy: 100,
	},
	guillotine: {
		inherit: true,
		basePower: 1,
		ohko: false,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	headcharge: {
		inherit: true,
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		desc: "Has a 10% chance to lower the target's Defense by 1 stage. If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 1/4 recoil. 10% chance to lower the target's Defense by 1.",
	},
	headsmash: {
		inherit: true,
		accuracy: 85,
	},
	highhorsepower: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
	},
	highjumpkick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, gravity: 1, kick: 1 },
	},
	horndrill: {
		inherit: true,
		basePower: 1,
		ohko: false,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	icehammer: {
		inherit: true,
		accuracy: 100,
		isNonstandard: null,
		self: null,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	inferno: {
		inherit: true,
		basePower: 120,
	},
	jawlock: {
		inherit: true,
		basePower: 90,
		onHit(target, source, move) {
			target.addVolatile('trapped', source, move, 'trapper');
		},
		type: "Fighting",
		desc: "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field.",
		shortDesc: "Prevents the target from switching out.",
	},
	jumpkick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, gravity: 1, kick: 1 },
		isNonstandard: null,
	},
	kingsshield: {
		inherit: true,
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		desc: "The user is protected from most attacks made by other Pokemon during this turn. Non-damaging moves go through this protection. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Obstruct, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects from damaging attacks.",
	},
	leafblade: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, blade: 1 },
	},
	leafstorm: {
		inherit: true,
		noTutor: true,
		accuracy: 100,
	},
	leaftornado: {
		inherit: true,
		accuracy: 100,
		secondary: null,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	lovelykiss: {
		inherit: true,
		accuracy: 85,
	},
	lowkick: {
		inherit: true,
		noTutor: true,
		flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
	},
	lowsweep: {
		inherit: true,
		basePower: 60,
		flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
	},
	lusterpurge: {
		inherit: true,
		basePower: 85,
		pp: 10,
	},
	megakick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
	},
	megadrain: {
		inherit: true,
		basePower: 60,
	},
	minimize: {
		inherit: true,
		volatileStatus: "",
		condition: {},
		boosts: {
			atk: 1,
		},
		desc: "Raises the user's Attack by 1 stage.",
		shortDesc: "Raises the user's Attack by 1.",
	},
	mirrorshot: {
		inherit: true,
		accuracy: 100,
		secondary: null,
		isNonstandard: null,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	mistball: {
		inherit: true,
		basePower: 85,
		pp: 10,
	},
	mistyexplosion: {
		inherit: true,
		noTM: true,
		desc: "If the current terrain is Misty Terrain and the user is grounded, this move's power is multiplied by 1.5. The user faints after using this move, even if this move fails for having no target. The target's Defense is halved during damage calculation. This move is prevented from executing if any active Pokemon has the Damp Ability.",
		shortDesc: "Sp. Def halved; Misty Terrain: 1.5x power.",
	},
	mudbomb: {
		inherit: true,
		accuracy: 100,
		secondary: null,
		isNonstandard: null,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	muddywater: {
		inherit: true,
		noTutor: true,
		secondary: {
			chance: 40,
			boosts: {
				atk: -1,
			},
		},
		desc: "Has a 40% chance to lower the target's Attack by 1 stage.",
		shortDesc: "40% chance to lower the foe(s) Attack by 1.",
	},
	mudslap: {
		inherit: true,
		basePower: 40,
		secondary: null,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	multiattack: {
		inherit: true,
		onModifyType(move, pokemon) {
			let type = pokemon.getTypes()[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		desc: "This move's type depends on the user's primary type. If the user's primary type is typeless, this move's type is the user's secondary type if it has one, otherwise the added type from Forest's Curse or Trick-or-Treat. This move is typeless if the user's type is typeless alone.",
		shortDesc: "Type varies based on the user's primary type.",
	},
	needlearm: {
		inherit: true,
		basePower: 95,
		isNonstandard: null,
	},
	nightdaze: {
		inherit: true,
		basePower: 95,
		accuracy: 100,
		secondary: null,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	nightslash: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, blade: 1 },
	},
	octazooka: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		flags: { bullet: 1, protect: 1, pulse: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's speed by 1 stage.",
		shortDesc: "100% chance to lower the target's speed by 1.",
	},
	overheat: {
		inherit: true,
		accuracy: 100,
	},
	paraboliccharge: {
		inherit: true,
		basePower: 75,
	},
	poisonfang: {
		inherit: true,
		basePower: 75,
	},
	psychoboost: {
		inherit: true,
		accuracy: 100,
		isNonstandard: null,
	},
	psychocut: {
		inherit: true,
		noTutor: true,
		flags: { protect: 1, mirror: 1, blade: 1 },
	},
	pyroball: {
		inherit: true,
		flags: { protect: 1, mirror: 1, defrost: 1, bullet: 1, kick: 1 },
	},
	razorshell: {
		inherit: true,
		accuracy: 100,
		flags: { contact: 1, protect: 1, mirror: 1, blade: 1 },
		critRatio: 2,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		noTutor: true,
	},
	revelationdance: {
		inherit: true,
		basePower: 100,
		isNonstandard: null,
	},
	roaroftime: {
		num: 459,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Roar of Time",
		pp: 10,
		priority: -6,
		flags: { protect: 1, mirror: 1 },
		forceSwitch: true,
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
		desc: "If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target used Ingrain previously, has the Suction Cups Ability, or this move hit a substitute.",
		shortDesc: "Forces the target to switch to a random ally.",
	},
	rocksmash: {
		inherit: true,
		basePower: 60,
	},
	rollingkick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
		isNonstandard: null,
	},
	sacredsword: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, blade: 1 },
	},
	sandattack: {
		inherit: true,
		secondary: {
			boosts: {
				atk: -1,
			},
		},
		desc: "Lowers the target's Attack by 1 stage.",
		shortDesc: "Lowers the target's Attack by 1.",
	},
	sappyseed: {
		inherit: true,
		accuracy: 100,
		basePower: 95,
		pp: 5,
		flags: { protect: 1, mirror: 1 },
		isNonstandard: null,
	},
	secretsword: {
		inherit: true,
		flags: { protect: 1, mirror: 1, blade: 1 },
	},
	selfdestruct: {
		inherit: true,
		basePower: 100,
		desc: "The user faints after using this move, even if this move fails for having no target. The target's Defense is halved during damage calculation. This move is prevented from executing if any active Pokemon has the Damp Ability.",
		shortDesc: "Target's Def halved during damage. User faints.",
	},
	shadowbone: {
		inherit: true,
		flags: { protect: 1, mirror: 1, bone: 1 },
	},
	shadowclaw: {
		inherit: true,
		basePower: 80,
		flags: { contact: 1, protect: 1, mirror: 1, blade: 1 },
	},
	shadowpunch: {
		inherit: true,
		basePower: 80,
	},
	sheercold: {
		inherit: true,
		basePower: 1,
		ohko: false,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	shellsidearm: {
		num: 801,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Shell Side Arm",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		ignoreAbility: true,
		secondary: {
			chance: 10,
			status: 'psn',
		},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.random(2) === 0)) {
				move.category = 'Physical';
				move.flags.contact = 1;
			}
		},
		target: "normal",
		type: "Poison",
		desc: "Has a 10% chance to poison the target. This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "10% psn; ignores the Abilities of other Pokemon.",
	},
	skullbash: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({ atk: 1, def: 1 }, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		desc: "This attack charges on the first turn and executes on the second. Raises the user's Attack and Defense by 1 stage on the first turn. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Raises user's Attack and Defense by 1 on turn 1. Hits turn 2.",
	},
	slam: {
		inherit: true,
		accuracy: 90,
	},
	slash: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, blade: 1 },
	},
	smokescreen: {
		inherit: true,
		secondary: {
			boosts: {
				atk: -1,
			},
		},
		desc: "Lowers the target's Attack by 1 stage.",
		shortDesc: "Lowers the target's Attack by 1.",
	},
	snaptrap: {
		inherit: true,
		accuracy: 85,
		basePower: 100,
		pp: 5,
		type: "Steel",
	},
	snipeshot: {
		inherit: true,
		basePower: 70,
		flags: { bullet: 1, protect: 1, pulse: 1, mirror: 1 },
		critRatio: 3,
	},
	solarblade: {
		inherit: true,
		noTutor: true,
		flags: { contact: 1, charge: 1, protect: 1, mirror: 1, blade: 1 },
	},
	sonicslash: {
		num: 854,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let ratio = Math.floor(pokemon.getStat('spe') / target.getStat('spe'));
			if (!isFinite(ratio)) ratio = 0;
			let bp = 80;
			if (ratio >= 3) {
				bp = 140;
			} else if (ratio >= 2) {
				bp = 120;
			}
			this.debug(`${bp} bp`);
			return bp;
		},
		category: "Physical",
		name: "Sonic Slash",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Flying",
		zMove: { basePower: 160 },
		maxMove: { basePower: 140 },
		desc: "The power of this move depends on (user's current Speed / target's current Speed), rounded down. Power is equal to 140 if the result is 3 or more, 120 if 2, 80 if less than 2. If the target's current Speed is 0, this move's power is 80.",
		shortDesc: "140 BP if 3x target's speed; 120 BP if 2x; else 80 BP.",
	},
	soulrobbery: {
		num: 852,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Soul Robbery",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, authentic: 1 },
		stealsBoosts: true,
		// Boost stealing implemented in scripts.js
		secondary: null,
		target: "normal",
		type: "Psychic",
		desc: "The target's stat stages greater than 0 are stolen from it and applied to the user before dealing damage.",
		shortDesc: "Steals target's boosts before dealing damage.",
	},
	sparklyswirl: {
		inherit: true,
		accuracy: 100,
		basePower: 95,
		pp: 5,
		flags: { protect: 1, mirror: 1 },
		self: {
			onHit(pokemon, source, move) {
				this.add('-activate', source, 'move: Aromatherapy');
				for (const ally of source.side.pokemon) {
					ally.cureStatus();
				}
			},
		},
		isNonstandard: null,
	},
	spikecannon: {
		inherit: true,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		isNonstandard: null,
	},
	spikes: {
		inherit: true,
		noTM: true,
		noTutor: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('Shield Dust')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
	},
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('Shield Dust')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	steameruption: {
		inherit: true,
		basePower: 120,
	},
	stickyweb: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('Shield Dust')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({ spe: -1 }, pokemon, this.effectState.source, this.dex.getActiveMove('stickyweb'));
			},
		},
	},
	stomp: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1, kick: 1 },
	},
	strengthsap: {
		inherit: true,
		pp: 5,
	},
	suckerpunch: {
		inherit: true,
		flags: { contact: 1, protect: 1, punch: 1, mirror: 1 },
	},
	tailslap: {
		inherit: true,
		accuracy: 100,
	},
	toxicspikes: {
		noTutor: true,
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('Shield Dust')) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	tripleaxel: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
	},
	triplekick: {
		inherit: true,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
		desc: "Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
	},
	tropkick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
	},
	volttackle: {
		inherit: true,
		recoil: [1, 4],
		desc: "Has a 10% chance to paralyze the target. If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 1/4 recoil. 10% chance to paralyze target.",
	},
	wickedblow: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1 },
	},
	wideguard: {
		inherit: true,
		stallingMove: true,
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onTry() { },
		desc: "The user and its party members are protected from moves made by other Pokemon, including allies, during this turn that target all adjacent foes or all adjacent Pokemon. This attack has a 1/X chance of being successful, where X starts at 1 and doubles each time this move is successfully used. X resets to 1 if this attack fails or if the user's last used move is not Baneful Bunker, Detect, Endure, King's Shield, Obstruct, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. If X is 256 or more, this move has a 1/(2^32) chance of being successful. Fails if the user moves last this turn or if this move is already in effect for the user's side.",
		shortDesc: "Protects allies from multi-target moves this turn.",
	},
	xscissor: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, blade: 1 },
	},

	// set tm/tutor flags for moves that don't already change
	// tms
	hyperbeam: {
		inherit: true,
		noTM: true,
	},
	honeclaws: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (['Darkness'].includes(pokemon.effectiveWeather())) move.boosts = { atk: 2, accuracy: 2 };
		},
		noTM: true,
	},
	payback: {
		inherit: true,
		noTM: true,
	},
	gigaimpact: {
		inherit: true,
		noTM: true,
	},
	avalanche: {
		inherit: true,
		noTM: true,
	},
	swagger: {
		inherit: true,
		noTM: true,
	},
	pluck: {
		inherit: true,
		noTM: true,
	},
	scaleshot: {
		inherit: true,
		noTM: true,
	},
	strugglebug: {
		inherit: true,
		noTM: true,
	},
	frostbreath: {
		inherit: true,
		noTM: true,
	},
	sludgewave: {
		inherit: true,
		noTM: true,
	},
	psyshock: {
		inherit: true,
		noTM: true,
	},
	brutalswing: {
		inherit: true,
		noTM: true,
	},
	smartstrike: {
		inherit: true,
		noTM: true,
	},
	snarl: {
		inherit: true,
		noTM: true,
	},
	smackdown: {
		inherit: true,
		noTM: true,
	},
	auroraveil: {
		inherit: true,
		noTM: true,
	},
	naturepower: {
		inherit: true,
		noTM: true,
	},

	// tutors
	snore: {
		inherit: true,
		noTutor: true,
	},
	healbell: {
		inherit: true,
		noTutor: true,
	},
	electroweb: {
		inherit: true,
		noTutor: true,
	},
	uproar: {
		inherit: true,
		noTutor: true,
	},
	bind: {
		inherit: true,
		noTutor: true,
	},
	helpinghand: {
		inherit: true,
		noTutor: true,
	},
	block: {
		inherit: true,
		noTutor: true,
	},
	worryseed: {
		inherit: true,
		noTutor: true,
	},
	snatch: {
		inherit: true,
		noTutor: true,
	},
	spite: {
		inherit: true,
		noTutor: true,
	},
	afteryou: {
		inherit: true,
		noTutor: true,
	},
	synthesis: {
		inherit: true,
		noTutor: true,
	},
	signalbeam: {
		inherit: true,
		noTutor: true,
		isNonstandard: null,
	},
	gravity: {
		inherit: true,
		noTutor: true,
	},
	irondefense: {
		inherit: true,
		noTutor: true,
	},
	celebrate: {
		inherit: true,
		noTutor: true,
	},
	magnetrise: {
		inherit: true,
		noTutor: true,
	},
	roleplay: {
		inherit: true,
		noTutor: true,
	},
	aquatail: {
		inherit: true,
		noTutor: true,
	},
	endeavor: {
		inherit: true,
		noTutor: true,
	},
	icywind: {
		inherit: true,
		noTutor: true,
	},
	laserfocus: {
		inherit: true,
		noTutor: true,
	},
	trick: {
		inherit: true,
		noTutor: true,
	},
	magiccoat: {
		inherit: true,
		noTutor: true,
	},
	magicroom: {
		inherit: true,
		noTutor: true,
	},
	wonderroom: {
		inherit: true,
		noTutor: true,
	},
	gastroacid: {
		inherit: true,
		noTutor: true,
	},
	superfang: {
		inherit: true,
		noTutor: true,
	},
	outrage: {
		inherit: true,
		noTutor: true,
	},
	skyattack: {
		inherit: true,
		noTutor: true,
	},
	throatchop: {
		inherit: true,
		noTutor: true,
	},
	dualchop: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, fist: 1 },
		noTutor: true,
	},
	hypervoice: {
		inherit: true,
		noTutor: true,
	},
	superpower: {
		inherit: true,
		noTutor: true,
	},
	psychup: {
		inherit: true,
		noTutor: true,
	},
	vacuumwave: {
		inherit: true,
		noTutor: true,
	},
	lastresort: {
		inherit: true,
		noTutor: true,
	},
	confide: {
		inherit: true,
		noTutor: true,
	},
	grasspledge: {
		inherit: true,
		noTutor: true,
	},
	firepledge: {
		inherit: true,
		noTutor: true,
	},
	waterpledge: {
		inherit: true,
		noTutor: true,
	},
	frenzyplant: {
		inherit: true,
		noTutor: true,
	},
	blastburn: {
		inherit: true,
		noTutor: true,
	},
	hydrocannon: {
		inherit: true,
		noTutor: true,
	},
	focusenergy: {
		inherit: true,
		noTutor: true,
	},
	cosmicpower: {
		inherit: true,
		noTutor: true,
	},
	encore: {
		inherit: true,
		noTutor: true,
	},
	screech: {
		inherit: true,
		noTutor: true,
	},
	faketears: {
		inherit: true,
		noTutor: true,
	},
	scaryface: {
		inherit: true,
		noTutor: true,
	},
	venomdrench: {
		inherit: true,
		noTutor: true,
	},
	dragondance: {
		inherit: true,
		noTutor: true,
	},
	agility: {
		inherit: true,
		noTutor: true,
	},
	grassyterrain: {
		inherit: true,
		noTutor: true,
	},
	mistyterrain: {
		inherit: true,
		noTutor: true,
	},
	electricterrain: {
		inherit: true,
		noTutor: true,
	},
	psychicterrain: {
		inherit: true,
		noTutor: true,
	},
	whirlpool: {
		inherit: true,
		noTutor: true,
	},
	firespin: {
		inherit: true,
		noTutor: true,
	},
	sandtomb: {
		inherit: true,
		noTutor: true,
	},
	bodypress: {
		inherit: true,
		noTutor: true,
	},
	heatcrash: {
		inherit: true,
		noTutor: true,
	},
	heavyslam: {
		inherit: true,
		noTutor: true,
	},
	reversal: {
		inherit: true,
		noTutor: true,
	},
	electroball: {
		inherit: true,
		noTutor: true,
	},
	breakingswipe: {
		inherit: true,
		noTutor: true,
	},
	crosspoison: {
		inherit: true,
		noTutor: true,
	},
	crunch: {
		inherit: true,
		noTutor: true,
	},
	darkestlariat: {
		inherit: true,
		noTutor: true,
	},
	pollenpuff: {
		inherit: true,
		noTutor: true,
	},

	bravebird: {
		inherit: true,
		noTutor: true,
	},


	// allow all past moves
	"10000000voltthunderbolt": {
		inherit: true,
		isNonstandard: null,
	},
	aciddownpour: {
		inherit: true,
		isNonstandard: null,
	},
	alloutpummeling: {
		inherit: true,
		isNonstandard: null,
	},
	assist: {
		inherit: true,
		isNonstandard: null,
	},
	barrage: {
		inherit: true,
		isNonstandard: null,
	},
	barrier: {
		inherit: true,
		isNonstandard: null,
	},
	beakblast: {
		inherit: true,
		isNonstandard: null,
	},
	bestow: {
		inherit: true,
		isNonstandard: null,
	},
	bide: {
		inherit: true,
		isNonstandard: null,
	},
	blackholeeclipse: {
		inherit: true,
		isNonstandard: null,
	},
	bloomdoom: {
		inherit: true,
		isNonstandard: null,
	},
	breakneckblitz: {
		inherit: true,
		isNonstandard: null,
	},
	bubble: {
		inherit: true,
		isNonstandard: null,
	},
	camouflage: {
		inherit: true,
		isNonstandard: null,
	},
	captivate: {
		inherit: true,
		isNonstandard: null,
	},
	catastropika: {
		inherit: true,
		isNonstandard: null,
	},
	chipaway: {
		inherit: true,
		isNonstandard: null,
	},
	clamp: {
		inherit: true,
		isNonstandard: null,
	},
	clangoroussoulblaze: {
		inherit: true,
		isNonstandard: null,
	},
	cometpunch: {
		inherit: true,
		isNonstandard: null,
	},
	constrict: {
		inherit: true,
		isNonstandard: null,
	},
	continentalcrush: {
		inherit: true,
		isNonstandard: null,
	},
	corkscrewcrash: {
		inherit: true,
		isNonstandard: null,
	},
	darkvoid: {
		inherit: true,
		isNonstandard: null,
	},
	devastatingdrake: {
		inherit: true,
		isNonstandard: null,
	},
	dizzypunch: {
		inherit: true,
		isNonstandard: null,
	},
	doubleslap: {
		inherit: true,
		isNonstandard: null,
	},
	dragonrage: {
		inherit: true,
		isNonstandard: null,
	},
	eggbomb: {
		inherit: true,
		isNonstandard: null,
	},
	embargo: {
		inherit: true,
		isNonstandard: null,
	},
	extremeevoboost: {
		inherit: true,
		isNonstandard: null,
	},
	feintattack: {
		inherit: true,
		isNonstandard: null,
	},
	flameburst: {
		inherit: true,
		isNonstandard: null,
	},
	foresight: {
		inherit: true,
		isNonstandard: null,
	},
	frustration: {
		inherit: true,
		isNonstandard: null,
	},
	genesissupernova: {
		inherit: true,
		isNonstandard: null,
	},
	gigavolthavoc: {
		inherit: true,
		isNonstandard: null,
	},
	grasswhistle: {
		inherit: true,
		isNonstandard: null,
	},
	guardianofalola: {
		inherit: true,
		isNonstandard: null,
	},
	healblock: {
		inherit: true,
		isNonstandard: null,
	},
	healorder: {
		inherit: true,
		isNonstandard: null,
	},
	heartstamp: {
		inherit: true,
		isNonstandard: null,
	},
	heartswap: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpower: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerbug: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerdark: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerdragon: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerelectric: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerfighting: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerfire: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerflying: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerghost: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowergrass: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerground: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerice: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerpoison: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerpsychic: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerrock: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowersteel: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerwater: {
		inherit: true,
		isNonstandard: null,
	},
	hydrovortex: {
		inherit: true,
		isNonstandard: null,
	},
	hyperfang: {
		inherit: true,
		isNonstandard: null,
	},
	hyperspacefury: {
		inherit: true,
		isNonstandard: null,
	},
	hyperspacehole: {
		inherit: true,
		isNonstandard: null,
	},
	iceball: {
		inherit: true,
		isNonstandard: null,
	},
	infernooverdrive: {
		inherit: true,
		isNonstandard: null,
	},
	iondeluge: {
		inherit: true,
		isNonstandard: null,
	},
	judgment: {
		inherit: true,
		isNonstandard: null,
	},
	karatechop: {
		inherit: true,
		isNonstandard: null,
	},
	letssnuggleforever: {
		inherit: true,
		isNonstandard: null,
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
	lightthatburnsthesky: {
		inherit: true,
		isNonstandard: null,
	},
	luckychant: {
		inherit: true,
		isNonstandard: null,
	},
	magnetbomb: {
		inherit: true,
		isNonstandard: null,
	},
	magnitude: {
		inherit: true,
		isNonstandard: null,
	},
	maliciousmoonsault: {
		inherit: true,
		isNonstandard: null,
	},
	meditate: {
		inherit: true,
		isNonstandard: null,
	},
	mefirst: {
		inherit: true,
		isNonstandard: null,
	},
	menacingmoonrazemaelstrom: {
		inherit: true,
		isNonstandard: null,
	},
	miracleeye: {
		inherit: true,
		isNonstandard: null,
	},
	mirrormove: {
		inherit: true,
		isNonstandard: null,
	},
	mudsport: {
		inherit: true,
		isNonstandard: null,
	},
	naturalgift: {
		inherit: true,
		isNonstandard: null,
	},
	neverendingnightmare: {
		inherit: true,
		isNonstandard: null,
	},
	nightmare: {
		inherit: true,
		isNonstandard: null,
	},
	oceanicoperetta: {
		inherit: true,
		isNonstandard: null,
	},
	odorsleuth: {
		inherit: true,
		isNonstandard: null,
	},
	ominouswind: {
		inherit: true,
		isNonstandard: null,
	},
	powder: {
		inherit: true,
		isNonstandard: null,
	},
	precipiceblades: {
		inherit: true,
		isNonstandard: null,
	},
	psywave: {
		inherit: true,
		isNonstandard: null,
	},
	pulverizingpancake: {
		inherit: true,
		isNonstandard: null,
	},
	punishment: {
		inherit: true,
		isNonstandard: null,
	},
	pursuit: {
		inherit: true,
		isNonstandard: null,
	},
	rage: {
		inherit: true,
		isNonstandard: null,
	},
	razorwind: {
		inherit: true,
		isNonstandard: null,
	},
	refresh: {
		inherit: true,
		isNonstandard: null,
	},
	relicsong: {
		inherit: true,
		isNonstandard: null,
	},
	return: {
		inherit: true,
		isNonstandard: null,
	},
	rockclimb: {
		inherit: true,
		isNonstandard: null,
	},
	rototiller: {
		inherit: true,
		isNonstandard: null,
	},
	savagespinout: {
		inherit: true,
		isNonstandard: null,
	},
	searingsunrazesmash: {
		inherit: true,
		isNonstandard: null,
	},
	secretpower: {
		inherit: true,
		isNonstandard: null,
	},
	seedflare: {
		inherit: true,
		isNonstandard: null,
	},
	sharpen: {
		inherit: true,
		isNonstandard: null,
	},
	shatteredpsyche: {
		inherit: true,
		isNonstandard: null,
	},
	silverwind: {
		inherit: true,
		isNonstandard: null,
	},
	sinisterarrowraid: {
		inherit: true,
		isNonstandard: null,
	},
	sketch: {
		inherit: true,
		isNonstandard: null,
	},
	skydrop: {
		noTM: true,
		inherit: true,
		isNonstandard: null,
	},
	skyuppercut: {
		inherit: true,
		isNonstandard: null,
	},
	smellingsalts: {
		inherit: true,
		isNonstandard: null,
	},
	sonicboom: {
		inherit: true,
		isNonstandard: null,
	},
	soulstealing7starstrike: {
		inherit: true,
		isNonstandard: null,
	},
	spiderweb: {
		inherit: true,
		isNonstandard: null,
	},
	splinteredstormshards: {
		inherit: true,
		isNonstandard: null,
	},
	spotlight: {
		inherit: true,
		isNonstandard: null,
	},
	steamroller: {
		inherit: true,
		isNonstandard: null,
	},
	stokedsparksurfer: {
		inherit: true,
		isNonstandard: null,
	},
	subzeroslammer: {
		inherit: true,
		isNonstandard: null,
	},
	supersonicskystrike: {
		inherit: true,
		isNonstandard: null,
	},
	synchronoise: {
		inherit: true,
		isNonstandard: null,
	},
	tailglow: {
		inherit: true,
		isNonstandard: null,
	},
	tectonicrage: {
		inherit: true,
		isNonstandard: null,
	},
	telekinesis: {
		inherit: true,
		isNonstandard: null,
	},
	toxicthread: {
		inherit: true,
		isNonstandard: null,
	},
	trumpcard: {
		inherit: true,
		isNonstandard: null,
	},
	twineedle: {
		inherit: true,
		isNonstandard: null,
	},
	twinkletackle: {
		inherit: true,
		isNonstandard: null,
	},
	wakeupslap: {
		inherit: true,
		isNonstandard: null,
	},
	watersport: {
		inherit: true,
		isNonstandard: null,
	},
	wringout: {
		inherit: true,
		isNonstandard: null,
	},
	zippyzap: {
		inherit: true,
		basePower: 50,
		pp: 5,
		priority: 1,
		willCrit: true,
		secondary: null,
		isNonstandard: null,
		desc: "Will always result in a critical hit.",
		shortDesc: "Usually goes first. Always crits.",
	},
	// moves im adding 
	steelspike: {
		num: 446,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Steel Spike",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1 },
		sideCondition: 'steelspike',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Steel Spike');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('steelspike')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Steel",
		zMove: { boost: { def: 1 } },
		contestType: "Cool",
	},
	risingvoltage: {
		inherit: true,
		flags: { protect: 1, mirror: 1, pulse: 1, special: 1 },
	},
	megapunch: {
		inherit: true,
		accuracy: 90,
	},
	powerwhip: {
		inherit: true,
		secondary: {
			chance: 15,
			volatileStatus: 'flinch',
		},
	},
	zapcannon: {
		inherit: true,
		num: 192,
		accuracy: 80,
		basePower: 140,
		flags: { bullet: 1, protect: 1, mirror: 1, special: 1 },
		recoil: [1, 2],
		secondary: {
			chance: 10,
			status: 'par',
		},
	},
	strength: {
		inherit: true,
		type: "Rock"
	},
	bounce: {
		inherit: true,
		noTutor: true,
		flags: { contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1, Kick: 1 },
	},
	sizzlyslide: {
		inherit: true,
		accuracy: 80,
	},
	// insurgence moves
	achillesheel: {
		num: 573,
		accuracy: 100,
		basePower: 46,
		category: "Special",
		name: "Achilles Heel",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, special: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === target?.types[0]) return 1;
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	ancientroar: {
		num: 586,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Ancient Roar",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, special: 1 },
		secondary: null,
		target: "allAdjacent",
		type: "Rock",
		contestType: "Tough",
	},
	crystalrush: {
		num: 418,
		accuracy: 100,
		basePower: 45,
		category: "Physical",
		name: "Crystal Rush",
		pp: 30,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Crystal",
		contestType: "Tough",
	},
	dracojet: {
		num: 418,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Draco Jet",
		pp: 30,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	darknova: {
		num: 801,
		accuracy: 100,
		basePower: 135,
		category: "Special",
		name: "Dark Nova",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onPrepareHit(target, source, move) {
			if (!source.isAlly(target)) {
				this.attrLastMove('[anim] Shell Side Arm ' + move.category);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.random(2) === 0)) {
				move.category = 'Physical';
				move.flags.contact = 1;
			}
		},
		onHit(target, source, move) {
			// Shell Side Arm normally reveals its category via animation on cart, but doesn't play either custom animation against allies
			if (!source.isAlly(target)) this.hint(move.category + " Shell Side Arm");
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " Shell Side Arm");
		},
		target: "normal",
		type: "Dark",
	},
	darkmatter: {
		num: 63,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		name: "Dark Matter",
		pp: 5,
		priority: 0,
		flags: { recharge: 1, protect: 1, mirror: 1, special: 1 },
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	drakonvoice: {
		num: 586,
		accuracy: 85,
		basePower: 105,
		category: "Special",
		name: "Drakon Voice",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, special: 1 },
		secondary: null,
		target: "allAdjacent",
		type: "Dragon",
		contestType: "Tough",
	},
	lunarcannon: {
		num: 76,
		accuracy: 100,
		basePower: 105,
		category: "Special",
		name: "Lunar Cannon",
		pp: 10,
		priority: 0,
		flags: { charge: 1, protect: 1, mirror: 1, special: 1 },
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['Newmoon'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	medusaray: {
		num: 750,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Medusa Ray",
		pp: 20,
		priority: 0,
		flags: { powder: 1, protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		onHit(target) {
			if (target.getTypes().join() === 'Rock' || !target.setType('Rock')) return false;
			this.add('-start', target, 'typechange', 'Rock');
		},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	nanorepair: {
		num: 105,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Nanorepair",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		boosts: {
			def: 1,
		},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Clever",
	},
	newmoon: {
		num: 240,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "New Moon",
		pp: 5,
		priority: 0,
		flags: {},
		weather: 'Darkness',
		secondary: null,
		target: "all",
		type: "Dark",
		zMove: { boost: { spe: 1 } },
		contestType: "Beautiful",
	},
	spiritaway: {
		num: 566,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Spirit Away",
		pp: 5,
		priority: 0,
		flags: { contact: 1, charge: 1, mirror: 1 },
		breaksProtect: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onInvulnerability: false,
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},
	Wormhole: {
		num: 410,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Wormhole",
		pp: 10,
		priority: 1,
		flags: { protect: 1, mirror: 1, special: 1 },
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	corrode: {
		num: 573,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Corrode",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, special: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
	wildcharge: {
		inherit: true,
		accuracy: 95,
		basePower: 110,
		category: "Physical",
		name: "Wild Charge",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		recoil: [1, 3],
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
	pelagocmagic: {
		num: 552,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		name: "Pelagic Magic",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, special: 1 },
		secondary: {
			chance: 50,
			self: {
				boosts: {
					def: 1,
					spd: 1,
				},
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	snowballflurry: {
		num: 818,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		name: "Snowball Flurry",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, balistic: 1, },
		willCrit: true,
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
	},
	scorchearth: {
		num: 552,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Scorch Earth",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, special: 1 },
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
			}
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Ground') return 1;
		},
		//make sure to add a flying immunity
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	redwood: {
		num: 334,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Red Wood",
		pp: 15,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: 2,
		},
		condition: {
			duration: 5,
			onStart(target) {
				this.add('-start', target, 'Red Wood');
			},
			onImmunity(type) {
				if (type === 'Fire') return false;
			},
			onResidualOrder: 18,
			onEnd(target) {
				this.add('-end', target, 'Red Wood');
			},
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Tough",
	},
	stormsquall: {
		num: 432,
		accuracy: 50,
		basePower: 100,
		category: "Special",
		name: "Storm Squall",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({ evasion: -1 });
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cool",
	},
	deltastorm: {
		num: 577,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Delta Storm",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, heal: 1, special: 1 },
		drain: [1, 4],
		onEffectiveness(typeMod, target, type) {
			if (type === 'Ghost') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	kingstrident: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack by 1 stage and Speed by 2 stages.",
		shortDesc: "Gives user +1 SpA and +2 Spe.",
		name: "King's Trident",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target) {
			this.add('-anim', target, 'Dragon Dance', target);
		},
		self: {
			boosts: {
				spa: 1,
				spe: 2,
			},
		},
		secondary: null,
		target: "self",
		type: "Water",
	},
};
