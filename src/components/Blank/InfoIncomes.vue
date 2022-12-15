<template>
    <InfoField labelClasses="text-additional" label="Готівка:" :value="cash" />
    <InfoField labelClasses="text-additional" label="Активний дохід:" :value="user.salary" />
    <InfoField labelClasses="text-additional" label="Пасивний дохід:" :value="passiveIncome" />
    <InfoField labelClasses="text-additional" label="Загальний дохід:" :value="income" />
</template>

<script setup>
import { toRef, computed } from 'vue';
import InfoField from './InfoField.vue';

const props = defineProps({
    balance: {
        type: Number,
        required: true,
    },
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp')
console.log('props.user: ', user.value);

const cash = computed(() => props.balance >= 0 ? props.balance : 0);
const passiveIncome = computed(() => {
    let sum = 0;
    user.value.business.small.map(business => sum += business.value);
    user.value.business.middle.map(business => sum += business.value);
    user.value.business.big.map(business => sum += business.value);
    user.value.business.corrupt.map(business => sum += business.value);
    return sum;
});
const income = computed(() => {
    return user.value.salary + passiveIncome.value;
});
</script>
