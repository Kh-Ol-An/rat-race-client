<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Багатство</h2>
    <Quantity :count="apartments" :expense="user.apartments" label="Квартири:" @change="changeApartments" />
    <Quantity :count="cars" :expense="user.cars" label="Автівки:" @change="changeCars" />
    <Quantity :count="houses" :expense="user.houses" label="Будинки:" @change="changeHouses" />
    <Quantity :count="yachts" :expense="user.yachts" label="Яхти:" @change="changeYachts" />
    <Quantity :count="aircraft" :expense="user.aircraft" label="Літаки:" @change="changeAircraft" />
</template>

<script setup>
import { ref, toRef } from "vue";
import Quantity from './Quantity.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([
    'change:apartments',
    'change:cars',
    'change:houses',
    'change:yachts',
    'change:aircraft',
]);

const apartments = ref(user.value.apartments / 200);
const changeApartments = count => {
    apartments.value = count;
    emit('change:apartments', apartments.value);
};

const cars = ref(user.value.cars / 600);
const changeCars = count => {
    cars.value = count;
    emit('change:cars', cars.value);
};

const houses = ref(user.value.houses / 1000);
const changeHouses = count => {
    houses.value = count;
    emit('change:houses', houses.value);
};

const yachts = ref(user.value.yachts / 1500);
const changeYachts = count => {
    yachts.value = count;
    emit('change:yachts', yachts.value);
};

const aircraft = ref(user.value.aircraft / 5000);
const changeAircraft = count => {
    aircraft.value = count;
    emit('change:aircraft', aircraft.value);
};
</script>
