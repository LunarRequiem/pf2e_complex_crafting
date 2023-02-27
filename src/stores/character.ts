import { computed } from "vue";

import { defineStore } from "pinia";

import { ProficiencyLevel } from "../util/proficiency";
import earnIncomeTable from "../util/earnIncomeTable";
import { urlRef } from "../util/misc";

export const useCharacterStore = defineStore('character', () => {
	const characterLevel = urlRef('characterLevel', 1);
	const proficiencyLevel = urlRef('proficiencyLevel', ProficiencyLevel.Trained);
	const intScore = urlRef('intScore', 10);
	const hasQuickSetup = urlRef('hasQuickSetup', false);

	const totalProficiency = computed((): number => characterLevel.value + proficiencyLevel.value);
	const intMod = computed((): number => Math.floor((intScore.value - 10) / 2));

	const rollModifier = computed(() => totalProficiency.value + intMod.value);

	const assuranceResult = computed((): number => 10 + totalProficiency.value);

	function earnIncomeLevel(critical: boolean): number {
		return earnIncomeTable
			.levels[characterLevel.value + (critical ? 1 : 0)]
			?.success
			.get(proficiencyLevel.value) ?? 0
	}

	return {
		characterLevel, proficiencyLevel, intScore, hasQuickSetup,
		assuranceResult, totalProficiency, intMod, rollModifier,
		earnIncomeLevel,
	}
})
