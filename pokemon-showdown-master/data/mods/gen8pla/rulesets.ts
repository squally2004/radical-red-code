export const Rulesets: {[k: string]: ModdedFormatData} = {
	planatdex: {
		effectType: 'ValidatorRule',
		name: 'PLA NatDex',
		desc: "The standard ruleset for all National Dex tiers",
		ruleset: [
			'Obtainable', '+Future', '+Unobtainable', '+Past', 'Sketch Gen 8 Moves', 'Team Preview', 'Nickname Clause', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause',
		],
		onValidateSet(set) {
			// These Pokemon are still unobtainable
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.species.get(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (set.item) {
				const item = this.dex.items.get(set.item);
				if (item.isNonstandard) {
					if (['Past', 'Unobtainable'].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
						if (this.ruleTable.has(`+item:${item.id}`)) return;
						return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
					}
				}
			}
			// Past moves should still not be allowed
			for (const m of set.moves) {
				const move = this.dex.moves.get(m);
				if (move.isNonstandard) {
					if (['Past', 'Unobtainable'].includes(move.isNonstandard)) {
						return [`${set.name}'s move ${move.name} does not exist in Gen ${this.dex.gen}.`];
					}
				}
			}
		},
	},
	plalegacy: {
		effectType: 'ValidatorRule',
		name: 'PLA Legacy',
		desc: "The standard ruleset for all National Dex tiers",
		ruleset: [
			'Obtainable', '+Future', '+Unobtainable', '+Past', 'Sketch Gen 8 Moves', 'Team Preview', 'Nickname Clause', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause',
		],
		onValidateSet(set) {
			// These Pokemon are still unobtainable
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.species.get(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (set.item) {
				const item = this.dex.items.get(set.item);
				if (item.isNonstandard) {
					if (['Past', 'Unobtainable'].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
						if (this.ruleTable.has(`+item:${item.id}`)) return;
						return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
					}
				}
			}
		},
	},
};
