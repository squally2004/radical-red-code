export const Items: {[k: string]: ModdedItemData} = {
	eviolite: {
		inherit: true,
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.nfe ||
				pokemon.baseSpecies.baseSpecies === "Ursaring" ||
				pokemon.baseSpecies.baseSpecies === "Stantler") {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.nfe ||
				pokemon.baseSpecies.baseSpecies === "Ursaring" ||
				pokemon.baseSpecies.baseSpecies === "Stantler") {
				return this.chainModify(1.5);
			}
		},
	},
	adamantorb: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.baseSpecies === 'Dialga' && (move.type === 'Steel' || move.type === 'Dragon')) {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	lustrousorb: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.baseSpecies === 'Palkia' && (move.type === 'Water' || move.type === 'Dragon')) {
				return this.chainModify([4915, 4096]);
			}
		},
	},
};
