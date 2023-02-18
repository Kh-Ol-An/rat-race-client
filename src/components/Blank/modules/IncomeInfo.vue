<script setup>
import InfoField from '../../plugins/InfoField.vue';
import { addingSpaces } from '../../../helpers/formating-values.js';

const props = defineProps({
    blank: {
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
</script>

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

    <InfoField v-if="blank.deputies" labelClasses="text-primary" label="Кількість депутатів:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.deputies) }}
        </span>
        <button
            class="rotate-45 ml-4 px-2 text-3xl text-opposite font-bold leading-none outline-0"
            type="button"
            title="Вибори :)"
            @click="$emit('remove:deputies')"
        >
            &#43;
        </button>
    </InfoField>
</template>
