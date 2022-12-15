<template>
    <InfoField labelClasses="text-additional" label="Готівка:" :value="cash" />
    <InfoField labelClasses="text-additional" label="Активний дохід:" :value="userSalary" />
    <InfoField labelClasses="text-additional" label="Пасивний дохід:" :value="passiveIncome" />
    <InfoField labelClasses="text-additional" label="Загальний дохід:" :value="income" />
</template>

<script setup>
import InfoField from './InfoField.vue';

const props = defineProps({
    cash: {
        type: Number,
        required: true,
    },
    userSalary: {
        type: Number,
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
