// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"
Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
export const Formats: FormatList = [
];
--------------------------------------------------------------------------------
If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Utils} from '../lib';

export const Formats: FormatList = [
	// Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "Singles",
	},
	{
		name: "[Gen 8] Random Battle",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable.`,

		mod: 'gen8rr',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Dynamax Clause'],
	},
	{
		name: "[Gen 8] Free-For-All Random Battle",

		mod: 'gen8rr',
		team: 'random',
		gameType: 'freeforall',
		tournamentShow: false,
		rated: false,
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Dynamax Clause'],
	},
	{
		name: "[Gen 8] Random Battle (Blitz)",

		mod: 'gen8rr',
		team: 'random',
		ruleset: ['[Gen 8] Random Battle', 'Blitz'],
	},
	{
		name: "[Gen 8] Multi Random Battle",

		mod: 'gen8rr',
		team: 'random',
		gameType: 'multi',
		searchShow: false,
		tournamentShow: false,
		rated: false,
		ruleset: [
			'Max Team Size = 3',
			'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Dynamax Clause',
		],
	},
	{
		name: "[Gen 8] OU",
		mod: 'gen8rr',
		ruleset: ['Standard', 'Dynamax Clause', 'Z-Move Clause'],
		banlist: ['Uber', 'AG', 'Moody', 'Power Construct', 'Shadow Tag', 'Arena Trap', 'Swagger', 'Misty Explosion'],
	},
	{
		name: "[Gen 8] Ubers",
		mod: 'gen8rr',
		ruleset: ['Standard', 'Dynamax Clause', 'Z-Move Clause', 'Mega Rayquaza Clause'],
		banlist: ['AG', 'Moody'],
	},
	{
		name: "[Gen 8] UU",
		mod: 'gen8rr',
		ruleset: ['[Gen 8] OU'],
		banlist: ['OU', 'UUBL', 'Drought', 'Drizzle', 'Forecast'],
	},
	{
		name: "[Gen 8] LC",
		mod: 'gen8rr',
		ruleset: ['Little Cup', 'Standard', 'Dynamax Clause', 'Z-Move Clause'],
		banlist: [
			'Aipom', 'Corsola-Galar', 'Cutiefly', 'Drifloon', 'Gligar', 'Goldeen', 'Gothita',
			'Kubfu', 'Meditite', 'Meowth-Alola', 'Misdreavus', 'Murkrow', 'Rotom', 'Rufflet',
			'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Type: Null', 'Yanma',
			// moves
			'Baton Pass', 'Dragon Rage', 'Sonic Boom',
			// items
			'Leek Stick',
		],
	},
	{
		name: "[Gen 8] Monotype",
		mod: 'gen8rr',
		ruleset: ['Standard', 'Same Type Clause', 'Dynamax Clause', 'Z-Move Clause'],
		banlist: [
			'AG', 'Uber', 'Kartana', 'Medicham-Mega', 'Mawile-Mega', 'Hoopa-Unbound', 'Blaziken',
			'Battle Bond', 'Moody', 'Power Construct', 'Shadow Tag',
			'Damp Rock', 'Heat Rock', 'Icy Rock', 'Smooth Rock', 'Terrain Extender',
			'Misty Explosion',
		],
		unbanlist: ['Landorus-Base', 'Darmanitan-Galar + Gorilla Tactics', 'Deoxys-Speed', 'Cinderace'],
	},
	{
		name: "[Gen 8] Anything Goes",
		mod: 'gen8rr',
		ruleset: ['Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 8] Random Pool",
		mod: 'gen8rr',
		ruleset: ['[Gen 8] OU'],
		searchShow: false,
		challengeShow: false,
		onValidateTeam(team, format) {
			const pool = ['Florges', 'Comfey', 'Eldegoss', 'Lilligant', 'Vileplume'];
			let fromPool = 0;
			let stones = 0;
			for (const set of team) {
				const item = this.dex.items.get(set.item);
				// eslint-disable-next-line prefer-const
				let species = item.megaEvolves === set.species ? this.dex.species.get(item.megaStone).name : set.species;
				if (item.megaStone) stones++;
				if (pool.includes(species)) fromPool++;
			}
			if (stones > 1) {
				return [`You can only have 1 mega on your team.`];
			}
			if (fromPool === 0) {
				return [`Your team must have at least one of the following Pok\u00e9mon: ${pool.join(', ')}.`];
			}
		},
	},
	{
		name: "[Gen 8] Custom Game",
		mod: 'gen8rr',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},

	// Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "Doubles",
	},
	{
		name: "[Gen 8] Random Doubles Battle",

		mod: 'gen8rr',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause'],
	},
	{
		name: "[Gen 8] RRC",
		mod: 'gen8rr',
		gameType: 'doubles',
		ruleset: ['Standard', 'VGC Timer', 'Item Clause', 'Dynamax Clause', 'Z-Move Clause', 'Adjust Level = 50', 'Picked Team Size = 4'],
		banlist: [
			'Mewtwo',
			'Unown', 'Ho-Oh', 'Lugia',
			'Groudon', 'Kyogre', 'Rayquaza', 'Deoxys',
			'Dialga', 'Palkia', 'Heatran', 'Regigigas', 'Giratina', 'Cresselia', 'Darkrai', 'Shaymin', 'Arceus',
			'Kyurem', 'Reshiram', 'Zekrom',
			'Xerneas', 'Yveltal', 'Zygarde',
			'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow',
			'Eternatus', 'Zacian', 'Zamazenta', 'Calyrex',
		],
	},
	{
		name: "[Gen 8] Doubles Custom Game",

		mod: 'gen8rr',
		gameType: 'doubles',
		searchShow: false,
		battle: {trunc: Math.trunc},
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},

	// Draft
	///////////////////////////////////////////////////////////////////

	{
		section: "Draft",
	},
	{
		name: "[Gen 8] RRDL",
		mod: 'gen8rr',
		searchShow: false,
		ruleset: ['Standard', 'Dynamax Clause', 'Z-Move Clause'],
		banlist: [
			// mons
			'Alakazam-Mega', 'Arceus', 'Blaziken-Mega', 'Calyrex-Ice', 'Calyrex-Shadow', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Latias-Mega', 'Latios-Mega', 'Lucario-Mega', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Meloetta-Pirouette', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Necrozma-Ultra', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Unown', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Complete',
			// abilities
			'Moody', 'Power Construct', 'Shadow Tag',
			// moves
			'Swagger', 'Dark Hole', 'Misty Explosion', 'Explosion', 'Self-Destruct', 'Hidden Power',
			// complex bans
			'Blastoise-Mega + Shell Smash', 'Blaziken + Speed Boost', 'Kangaskhan-Mega + Seismic Toss', 'Greninja + Protean', 'Cinderace + Libero', 'Kyurem-Black + Dragon Dance', 'Kyurem-Black + Scale Shot', 'Deoxys-Speed + Nasty Plot',
			// Items
			'Quick Claw', 'Razor Fang', 'Razor Claw', 'Kings Rock', 'Bright Powder', 'Lax Incense',
		],
	},
	{
		name: "[Gen 8] Draft",
		mod: 'gen8rr',
		searchShow: false,
		ruleset: ['Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Z-Move Clause', 'Arceus Forme Clause'],
	},
	{
		name: "[Gen 8] RRC Draft",
		mod: 'gen8rr',
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Standard', 'VGC Timer', 'Item Clause', 'Dynamax Clause', 'Z-Move Clause', 'Adjust Level = 50', 'Picked Team Size = 4'],
	},
	{
		name: "[Gen 8] Doubles Draft",

		mod: 'gen8rr',
		gameType: 'doubles',
		searchShow: false,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Z-Move Clause', 'Arceus Forme Clause'],
	},

	// PLA Drafts

	{
		section: "PLA Draft",
		column: 2,
	},
	{
		name: "[Gen 8] PLA Draft",
		mod: 'gen8pla',
		searchShow: false,
		ruleset: ['PLA NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Dynamax Clause', 'Z-Move Clause'],
	},
	{
		name: "[Gen 8] PLA Legacy Draft",
		mod: 'gen8pla',
		searchShow: false,
		ruleset: ['PLA Legacy', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Dynamax Clause', 'Z-Move Clause'],
	},
	{
		name: "[Gen 8] PLA Doubles Draft",
		mod: 'gen8pla',
		gameType: "doubles",
		searchShow: false,
		ruleset: ['PLA NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Dynamax Clause', 'Z-Move Clause'],
	},
	{
		name: "[Gen 8] PLA VGC Draft",
		mod: 'gen8pla',
		gameType: "doubles",
		searchShow: false,
		ruleset: ['PLA NatDex', 'Flat Rules', '!! Adjust Level = 50', '!! Picked Team Size = 4', 'Z-Move Clause'],
		unbanlist: ['Restricted Legendary', 'Mythical', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre', 'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star'],
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "Other Metagames",
		column: 2,
	},
	{
		name: "[Gen 8] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,

		mod: 'gen8rr',
		ruleset: ['-Nonexistent', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause', 'Arceus Forme Clause', 'Dynamax Clause', 'Z-Move Clause', 'CFZ Clause'],
		banlist: [
			'Eternatus-Eternamax', 'Groudon-Primal', 'Calyrex-Shadow', 'Darmanitan-Galar-Zen', 'Shedinja', 'Rayquaza-Mega', 'Zacian-Crowned', 'Dialga-Primal', 'Cramorant-Gorging',
			// abilities
			'Arena Trap', 'Contrary', 'Feline Prowess', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Protean', 'Psychic Surge', 'Pure Power', 'Sage Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			// moves
			'Bolt Beak', 'Chatter', 'Double Iron Bash', 'Octolock', 'Shell Smash', 'Fishious Rend', 'Dark Hole',
			// items
			'Gengarite', 'Kangaskhanite', 'Rusted Sword', 'Adamant Orb', 'Eternamax Orb', 'Red Orb',
			// other stuff
			'Comatose + Sleep Talk',
		],
		onChangeSet(set) {
			const item = this.dex.toID(set.item);
			if (set.species === 'Zacian' && item === 'rustedsword') {
				set.species = 'Zacian-Crowned';
				set.ability = 'Intrepid Sword';
				const ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothblade';
				}
			}
			if (set.species === 'Zamazenta' && item === 'rustedshield') {
				set.species = 'Zamazenta-Crowned';
				set.ability = 'Dauntless Shield';
				const ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothbash';
				}
			}
		},
	},
	{
		name: "[Gen 8] Pure Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,

		mod: 'gen8rr',
		searchShow: false,
		ruleset: ['-Nonexistent', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 8] Inclement Emerald AG",
		desc: `The long awaited for IESH is here!`,
		mod: 'gen8ie',
		ruleset: ['Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Z-Move Clause'],
	},
	{
		name: "[Gen 8] IEDL",
		desc: `IE Draft League`,
		mod: 'gen8ie',
		ruleset: ['Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Z-Move Clause'],
		banlist: ['Swagger', 'Misty Explosion', 'Explosion', 'Self-Destruct', 'Hidden Power', 'Shadow Tag', 'Moody', 'Power Construct', 'Baton Pass',
		// mons
			'Alakazam-Mega', 'Arceus', 'Blaziken-Mega', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Dialga', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Kyurem-Black', 'Latias-Mega', 'Latios-Mega', 'Lucario-Mega', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Meloetta-Pirouette', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Necrozma-Ultra', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Unown', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde-Complete',
		],
	},

	// Randomized Metas
	///////////////////////////////////////////////////////////////////

	{
		section: "Randomized Metas",
	},
	/* {
		name: "[Gen 8] Monotype Random Battle",

		mod: 'gen8rr',
		team: 'random',
		ruleset: ['Obtainable', 'Same Type Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Dynamax Clause'],
	}, */
	{
		name: "[Gen 8] Challenge Cup",

		mod: 'gen8rr',
		team: 'randomCC',
		searchShow: false,
		ruleset: ['Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Z-Move Clause'],
	},
	{
		name: "[Gen 8] Challenge Cup 1v1",

		mod: 'gen8rr',
		team: 'randomCC',
		ruleset: ['[Gen 8] Challenge Cup', 'Team Preview', 'Picked Team Size = 1'],
	},
	{
		name: "[Gen 8] Challenge Cup 2v2",

		mod: 'gen8rr',
		team: 'randomCC',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['[Gen 8] Challenge Cup 1v1', '!! Picked Team Size = 2'],
	},
	{
		name: "[Gen 8] Hackmons Cup",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item.`,

		mod: 'gen8rr',
		team: 'randomHC',
		ruleset: ['Obtainable Formes', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Z-Move Clause'],
	},
	{
		name: "[Gen 8] Doubles Hackmons Cup",

		mod: 'gen8rr',
		gameType: 'doubles',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Z-Move Clause'],
	},
];
