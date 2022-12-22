<template>
    <InfoField labelClasses="text-opposite" label="Борги:">
        <span class="ml-2 text-slate-800">
            {{ addingSpaces(debt) }}
        </span>
    </InfoField>
    <InfoField labelClasses="text-opposite" label="Загальні витрати:">
        <span class="ml-2 text-slate-800">
            {{ addingSpaces(expenses) }}
        </span>
    </InfoField>
</template>

<script setup>
import InfoField from '../plugins/InfoField.vue';
import { addingSpaces } from '../../../helpers/formating-values.js';

const props = defineProps({
    debt: {
        type: Number,
        required: true,
    },
    expenses: {
        type: Number,
        required: true,
    },
});
</script>
