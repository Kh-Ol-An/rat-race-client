<template>
    <h2 class="px-4 text-xl font-bold text-primary text-center">Активи</h2>

    <!-- Будинки -->
    <Houses :userProp="userProp" @buy:house="buyHouse" @sell:house="sellHouse" @sell:houses="sellHouses" />

    <!-- Земля -->
    <Land :userProp="userProp" @buy:land="buyLand" @sell:land="sellLand" @sell:acres="sellAcres" />

    <!-- Корупційна земля -->
    <CorruptLand :userProp="userProp" @buy:land="buyCorruptLand" @sell:land="sellCorruptLand" @sell:acres="sellCorruptAcres" />
</template>

<script setup>
import Houses from './Houses.vue';
import Land from './Land.vue';
import CorruptLand from './CorruptLand.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits([
    'buy:house',
    'sell:house',
    'sell:houses',
    'buy:land',
    'sell:land',
    'sell:acres',
    'buy:corrupt-land',
    'sell:corrupt-land',
    'sell:corrupt-acres',
]);

const buyHouse = (id, price) => emit('buy:house', id, price);
const sellHouse = (id, price) => emit('sell:house', id, price);
const sellHouses = (price) => emit('sell:houses', price);

const buyLand = (id, price, quantity) => emit('buy:land', id, price, quantity);
const sellLand = (id, price) => emit('sell:land', id, price);
const sellAcres = (price) => emit('sell:acres', price);

const buyCorruptLand = (id, quantity, cost) => emit('buy:corrupt-land', id, quantity, cost);
const sellCorruptLand = (id, price) => emit('sell:corrupt-land', id, price);
const sellCorruptAcres = (price) => emit('sell:corrupt-acres', price);
</script>
