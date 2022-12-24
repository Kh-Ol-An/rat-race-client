<template>
    <h2 class="px-4 text-xl font-bold text-primary text-center">Активи</h2>

    <!-- Будинки -->
    <Houses :userProp="userProp" @buy:house="buyHouse" @sell:house="sellHouse" @sell:houses="sellHouses" />
</template>

<script setup>
import Houses from './Houses.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits([ 'buy:house', 'sell:house', 'sell:houses' ]);

const buyHouse = (id, price) => emit('buy:house', id, price);
const sellHouse = (id, price) => emit('sell:house', id, price);
const sellHouses = (id, price) => emit('sell:houses', id, price);
</script>
