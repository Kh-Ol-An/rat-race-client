<template>
    <InfoField labelClasses="text-additional" label="Готівка:" :value="user.cash" />
    <InfoField labelClasses="text-additional" label="Активний дохід:" :value="user.salary" />
    <InfoField labelClasses="text-additional" label="Пасивний дохід:" :value="passiveIncome" />
    <InfoField labelClasses="text-additional" label="Загальний дохід:" :value="income" />
</template>

<script setup>
import { toRef } from "vue";
import InfoField from '../plugins/InfoField.vue';

const props = defineProps({
    userProp: {
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

const user = toRef(props, 'userProp');
</script>
