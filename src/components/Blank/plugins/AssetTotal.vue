<template>
    <li v-if="userShare.length > 1" class="grid grid-cols-3 gap-2 border-t-2 border-b-silver-900 font-bold text-center">
        <span>
            {{ addingSpaces(price) }}
        </span>
        <span class="pr-8">
            {{ addingSpaces(quantity) }}
        </span>
        <span class="pr-8">
            {{ addingSpaces(cost) }}
        </span>
    </li>
</template>

<script setup>
import { computed } from "vue";
import { addingSpaces } from '../../../helpers/formating-values.js';

const props = defineProps({
    userShare: {
        type: Array,
        required: true,
    },
});

const cost = computed(() => props.userShare.reduce((total, share) => total += share.cost, 0));
const quantity = computed(() => props.userShare.reduce((total, share) => total += share.quantity, 0));
const price = computed(() => {
    const result = cost.value / quantity.value;
    if (Number.isInteger(result)) {
        return Math.round(result);
    }

    return `~${Math.round(result)}`;
});
</script>
