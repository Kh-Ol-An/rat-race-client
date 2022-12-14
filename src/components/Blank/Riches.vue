<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Багатство</h2>
    <Quantity :count="apartments" :expense="userApartments" label="Квартири:" @change="changeApartments" />
    <Quantity :count="cars" :expense="userCars" label="Автівки:" @change="changeCars" />
    <Quantity :count="houses" :expense="userHouses" label="Будинки:" @change="changeHouses" />
    <Quantity :count="yachts" :expense="userYachts" label="Яхти:" @change="changeYachts" />
    <Quantity :count="aircraft" :expense="userAircraft" label="Літаки:" @change="changeAircraft" />
</template>

<script setup>
import { ref } from "vue";
import Quantity from './Quantity.vue';

const props = defineProps({
    userApartments: {
        type: Number,
        required: true,
    },
    userCars: {
        type: Number,
        required: true,
    },
    userHouses: {
        type: Number,
        required: true,
    },
    userYachts: {
        type: Number,
        required: true,
    },
    userAircraft: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits([
    'change:apartments',
    'change:cars',
    'change:houses',
    'change:yachts',
    'change:aircraft',
]);

const apartments = ref(props.userApartments / 200);
const changeApartments = count => {
    apartments.value = count;
    emit('change:apartments', apartments.value);
};

const cars = ref(props.userCars / 600);
const changeCars = count => {
    cars.value = count;
    emit('change:cars', cars.value);
};

const houses = ref(props.userHouses / 1000);
const changeHouses = count => {
    houses.value = count;
    emit('change:houses', houses.value);
};

const yachts = ref(props.userYachts / 1500);
const changeYachts = count => {
    yachts.value = count;
    emit('change:yachts', yachts.value);
};

const aircraft = ref(props.userAircraft / 5000);
const changeAircraft = count => {
    aircraft.value = count;
    emit('change:aircraft', aircraft.value);
};
</script>
