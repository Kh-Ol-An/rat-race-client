<template>
    <InfoField labelClasses="text-opposite" label="Борги:" :value="debt" />
    <InfoField labelClasses="text-opposite" label="Загальні витрати:" :value="expenses" />
</template>

<script setup>
import InfoField from './InfoField.vue';

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
