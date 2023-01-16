<template>
    <InfoField labelClasses="text-primary" label="Готівка:">
        <span class="ml-2 text-lg font-bold text-slate-200">
            {{ addingSpaces(blank.cash) }}
        </span>
    </InfoField>
    <InfoField labelClasses="text-primary" label="Активний дохід:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.salary) }}
        </span>
    </InfoField>
    <InfoField labelClasses="text-primary" label="Пасивний дохід:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(passiveIncome) }}
        </span>
    </InfoField>
    <InfoField labelClasses="text-primary" label="Загальний дохід:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(income) }}
        </span>
    </InfoField>
</template>

<script setup>
import { toRef } from "vue";
import InfoField from '../plugins/InfoField.vue';
import { addingSpaces } from '../../../helpers/formating-values.js';

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
    passiveIncome: {
        type: Number,
        required: true,
    },
    income: {
        type: Number,
        required: true,
    },
});

const blank = toRef(props, 'blankProp');
</script>
