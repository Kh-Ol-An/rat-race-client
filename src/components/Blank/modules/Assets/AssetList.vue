<script setup>
import HouseList from './HouseList.vue'
import LandList from './LandList.vue'
import CorruptLandList from './CorruptLandList.vue'

defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
})

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
])

const buyHouse = (id, price) => emit('buy:house', id, price)
const sellHouse = (id, price) => emit('sell:house', id, price)
const sellHouses = (price) => emit('sell:houses', price)

const buyLand = (id, price, quantity) => emit('buy:land', id, price, quantity)
const sellLand = (id, price) => emit('sell:land', id, price)
const sellAcres = (price) => emit('sell:acres', price)

const buyCorruptLand = (id, quantity, cost, deputies) =>
    emit('buy:corrupt-land', id, quantity, cost, deputies)
const sellCorruptLand = (id, price) => emit('sell:corrupt-land', id, price)
const sellCorruptAcres = (price) => emit('sell:corrupt-acres', price)
</script>

<template>
    <h2 class="px-4 text-center text-xl font-bold text-primary">Активи</h2>

    <!-- Будинки -->
    <HouseList
        :blank-prop="blankProp"
        @buy:house="buyHouse"
        @sell:house="sellHouse"
        @sell:houses="sellHouses"
    />

    <!-- Земля -->
    <LandList
        :blank-prop="blankProp"
        @buy:land="buyLand"
        @sell:land="sellLand"
        @sell:acres="sellAcres"
    />

    <!-- Корупційна земля -->
    <CorruptLandList
        v-if="blankProp.rich"
        :blank-prop="blankProp"
        @buy:land="buyCorruptLand"
        @sell:land="sellCorruptLand"
        @sell:acres="sellCorruptAcres"
    />
</template>
