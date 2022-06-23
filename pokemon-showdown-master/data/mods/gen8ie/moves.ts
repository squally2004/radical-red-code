export const Moves: {[k: string]: ModdedMoveData} = {
	solarbeam: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (attacker.hasAbility('Chloroplast') || ['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
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
		onBasePower(basePower, pokemon, target) {
			if (!pokemon.hasAbility('Chloroplast') &&
				['raindance', 'primordialsea', 'sandstorm', 'hail'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	solarblade: {
		inherit: true,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, blade: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (attacker.hasAbility('Chloroplast') || ['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
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
		onBasePower(basePower, pokemon, target) {
			if (!pokemon.hasAbility('Chloroplast') &&
				['raindance', 'primordialsea', 'sandstorm', 'hail'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	growth: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.hasAbility('Chloroplast') || ['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				move.boosts = {atk: 2, spa: 2};
			}
		},
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.hasAbility('Chloroplast')) {
				factor = 0.667;
			} else {
				switch (pokemon.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					factor = 0.667;
					break;
				case 'raindance':
				case 'primordialsea':
				case 'sandstorm':
				case 'hail':
					factor = 0.25;
					break;
				}
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	moonlight: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.hasAbility('Chloroplast')) {
				factor = 0.667;
			} else {
				switch (pokemon.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					factor = 0.667;
					break;
				case 'raindance':
				case 'primordialsea':
				case 'sandstorm':
				case 'hail':
					factor = 0.25;
					break;
				}
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.hasAbility('Chloroplast')) {
				factor = 0.667;
			} else {
				switch (pokemon.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					factor = 0.667;
					break;
				case 'raindance':
				case 'primordialsea':
				case 'sandstorm':
				case 'hail':
					factor = 0.25;
					break;
				}
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	fly: {
		inherit: true,
		accuracy: 100,
	},
	cut: {
		inherit: true,
		type: 'Steel',
		basePower: 60,
		critRatio: 2,
		accuracy: 100,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
	},
	rocksmash: {
		inherit: true,
		basePower: 50,
		secondary: {
			chance: 100,
		},
	},
	strength: {
		inherit: true,
		type: 'Rock',
		basePower: 100,
		self: {
			boosts: {
				spd: -1,
				def: -1,
			},
		},
	},
	wingattack: {
		inherit: true,
		basePower: 80,
		pp: 20,
	},
	submission: {
		inherit: true,
		basePower: 90,
		accuracy: 100,
		pp: 15,
	},
	chatter: {
		inherit: true,
		basePower: 90,
		pp: 15,
	},
	tailslap: {
		inherit: true,
		accuracy: 100,
	},
	shadowpunch: {
		inherit: true,
		basePower: 80,
	},
	waterpulse: {
		inherit: true,
		basePower: 80,
	},
	armthrust: {
		inherit: true,
		basePower: 25,
	},
	spikecannon: {
		inherit: true,
		basePower: 25,
		type: 'Water',
		accuracy: 90,
		isNonstandard: null,
	},
	absorb: {
		inherit: true,
		basePower: 35,
	},
	megadrain: {
		inherit: true,
		basePower: 60,
	},
	forcepalm: {
		inherit: true,
		pp: 15,
	},
	mudbomb: {
		inherit: true,
		pp: 15,
		isNonstandard: null,
		accuracy: 90,
	},
	mysticalfire: {
		inherit: true,
		basePower: 85,
	},
	paraboliccharge: {
		inherit: true,
		basePower: 90,
		pp: 10,
		drain: [1, 4],
	},
	drainingkiss: {
		inherit: true,
		basePower: 75,
		drain: [1, 2],
	},
	drillpeck: {
		inherit: true,
		critRatio: 2,
	},
	spiritshackle: {
		inherit: true,
		basePower: 90,
	},
	darkestlariat: {
		inherit: true,
		basePower: 95,
	},
	sparklingaria: {
		inherit: true,
		basePower: 100,
	},
	freezedry: {
		inherit: true,
		basePower: 95,
		pp: 15,
	},
	toxicthread: {
		inherit: true,
		boosts: {
			spe: -3,
		},
	},
	twineedle: {
		inherit: true,
		basePower: 45,
		secondary: {
			chance: 30,
		},
		isNonstandard: null,
	},
	geargrind: {
		inherit: true,
		accuracy: 100,
	},
	triplekick: {
		inherit: true,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
	},
	steelwing: {
		inherit: true,
		basePower: 90,
		pp: 15,
		secondary: {
			chance: 20,
		},
	},
	powergem: {
		inherit: true,
		basePower: 90,
		pp: 15,
	},
	needlearm: {
		inherit: true,
		basePower: 90,
		isNonstandard: null,
	},
	crosspoison: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
		basePower: 90,
		pp: 15,
	},
	rockclimb: {
		inherit: true,
		type: 'Rock',
		isNonstandard: null,
	},
	disarmingvoice: {
		inherit: true,
		basePower: 60,
	},
	octazooka: {
		inherit: true,
		basePower: 85,
	},
	shelltrap: {
		inherit: true,
		pp: 10,
	},
	darkvoid: {
		inherit: true,
		accuracy: 80,
	},
	cometpunch: {
		inherit: true,
		accuracy: 100,
		basePower: 25,
		isNonstandard: null,
	},
	xscissor: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
		critRatio: 2,
	},
	glaciate: {
		inherit: true,
		basePower: 80,
	},
	boneclub: {
		inherit: true,
		accuracy: 90,
		secondary: {
			chance: 30,
		},
		pp: 15,
		isNonstandard: null,
	},
	bonerush: {
		inherit: true,
		basePower: 15,
		priority: 1,
	},
	bonemerang: {
		inherit: true,
		ignoreImmunity: {'Ground': true},
	},
	lusterpurge: {
		inherit: true,
		basePower: 95,
	},
	mistball: {
		inherit: true,
		basePower: 95,
	},
	relicsong: {
		inherit: true,
		basePower: 85,
	},
	// flag changes
	slash: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
	},
	falseswipe: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
	},
	furycutter: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
	},
	leafblade: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
	},
	nightslash: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
	},
	airslash: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
	},
	sacredsword: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
	},
	razorshell: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
	},
	breakingswipe: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
	},
	behemothblade: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, blade: 1},
	},
	aerialace: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1, blade: 1},
	},
	psychocut: {
		inherit: true,
		flags: {protect: 1, mirror: 1, blade: 1},
	},
	secretsword: {
		inherit: true,
		flags: {protect: 1, mirror: 1, blade: 1},
	},
	meteorassault: {
		inherit: true,
		flags: {protect: 1, recharge: 1, mirror: 1, blade: 1},
	},
	karatechop: {
		inherit: true,
		isNonstandard: null,
	},
	doubleslap: {
		inherit: true,
		isNonstandard: null,
	},
	razorwind: {
		inherit: true,
		isNonstandard: null,
	},
	jumpkick: {
		inherit: true,
		isNonstandard: null,
	},
	rollingkick: {
		inherit: true,
		isNonstandard: null,
	},

	sonicboom: {
		inherit: true,
		isNonstandard: null,
	},
	dragonrage: {
		inherit: true,
		isNonstandard: null,
	},
	meditate: {
		inherit: true,
		isNonstandard: null,
	},
	rage: {
		inherit: true,
		isNonstandard: null,
	},
	barrier: {
		inherit: true,
		isNonstandard: null,
	},
	bide: {
		inherit: true,
		isNonstandard: null,
	},
	mirrormove: {
		inherit: true,
		isNonstandard: null,
	},
	eggbomb: {
		inherit: true,
		isNonstandard: null,
	},
	clamp: {
		inherit: true,
		isNonstandard: null,
	},
	constrict: {
		inherit: true,
		isNonstandard: null,
	},
	kinesis: {
		inherit: true,
		isNonstandard: null,
	},
	barrage: {
		inherit: true,
		isNonstandard: null,
	},
	bubble: {
		inherit: true,
		isNonstandard: null,
	},
	dizzypunch: {
		inherit: true,
		isNonstandard: null,
	},
	flash: {
		inherit: true,
		isNonstandard: null,
	},
	psywave: {
		inherit: true,
		isNonstandard: null,
	},
	sharpen: {
		inherit: true,
		isNonstandard: null,
	},
	spiderweb: {
		inherit: true,
		isNonstandard: null,
	},
	nightmare: {
		inherit: true,
		isNonstandard: null,
	},
	feintattack: {
		inherit: true,
		isNonstandard: null,
	},
	foresight: {
		inherit: true,
		isNonstandard: null,
	},
	return: {
		inherit: true,
		isNonstandard: null,
	},
	frustration: {
		inherit: true,
		isNonstandard: null,
	},
	magnitude: {
		inherit: true,
		isNonstandard: null,
	},
	pursuit: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpower: {
		inherit: true,
		isNonstandard: null,
	},
	smellingsalts: {
		inherit: true,
		isNonstandard: null,
	},
	assist: {
		inherit: true,
		isNonstandard: null,
	},
	refresh: {
		inherit: true,
		isNonstandard: null,
	},
	snatch: {
		inherit: true,
		isNonstandard: null,
	},
	secretpower: {
		inherit: true,
		isNonstandard: null,
	},
	camouflage: {
		inherit: true,
		isNonstandard: null,
	},
	mudsport: {
		inherit: true,
		isNonstandard: null,
	},
	iceball: {
		inherit: true,
		isNonstandard: null,
	},
	odorsleuth: {
		inherit: true,
		isNonstandard: null,
	},
	silverwind: {
		inherit: true,
		isNonstandard: null,
	},
	grasswhistle: {
		inherit: true,
		isNonstandard: null,
	},
	signalbeam: {
		inherit: true,
		isNonstandard: null,
	},
	skyuppercut: {
		inherit: true,
		isNonstandard: null,
	},
	watersport: {
		inherit: true,
		isNonstandard: null,
	},
	miracleeye: {
		inherit: true,
		isNonstandard: null,
	},
	wakeupslap: {
		inherit: true,
		isNonstandard: null,
	},
	naturalgift: {
		inherit: true,
		isNonstandard: null,
	},
	embargo: {
		inherit: true,
		isNonstandard: null,
	},
	trumpcard: {
		inherit: true,
		isNonstandard: null,
	},
	healblock: {
		inherit: true,
		isNonstandard: null,
	},
	wringout: {
		inherit: true,
		isNonstandard: null,
	},
	luckychant: {
		inherit: true,
		isNonstandard: null,
	},
	mefirst: {
		inherit: true,
		isNonstandard: null,
	},
	punishment: {
		inherit: true,
		isNonstandard: null,
	},
	mirrorshot: {
		inherit: true,
		isNonstandard: null,
	},
	magnetbomb: {
		inherit: true,
		isNonstandard: null,
	},
	captivate: {
		inherit: true,
		isNonstandard: null,
	},
	healorder: {
		inherit: true,
		isNonstandard: null,
	},
	ominouswind: {
		inherit: true,
		isNonstandard: null,
	},
	telekinesis: {
		inherit: true,
		isNonstandard: null,
	},
	flameburst: {
		inherit: true,
		isNonstandard: null,
	},
	synchronoise: {
		inherit: true,
		isNonstandard: null,
	},
	chipaway: {
		inherit: true,
		isNonstandard: null,
	},
	skydrop: {
		inherit: true,
		isNonstandard: null,
	},
	bestow: {
		inherit: true,
		isNonstandard: null,
	},
	heartstamp: {
		inherit: true,
		isNonstandard: null,
	},
	tailglow: {
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
	beakblast: {
		inherit: true,
		isNonstandard: null,
	},
	curse: {
		inherit: true,
		target: "normal",
	},
	doubleironbash: {
		inherit: true,
		isNonstandard: null,
	},
	heartswap: {
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
	icehammer: {
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
	lightofruin: {
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
	psychoboost: {
		inherit: true,
		isNonstandard: null,
	},
	revelationdance: {
		inherit: true,
		isNonstandard: null,
	},
	rototiller: {
		inherit: true,
		isNonstandard: null,
	},
	seedflare: {
		inherit: true,
		isNonstandard: null,
	},
	sketch: {
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
};
