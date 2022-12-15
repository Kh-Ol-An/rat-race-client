<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Витрати</h2>

    <div v-if="userRent === 0" class="flex items-center gap-3">
        <Input v-model:value="rent" id="rent" placeholder="Оренда житла" />
        <Add :value="rent" opposite @add="$emit('add:rent', Number(removingSpaces(rent)))" />
    </div>
    <InfoField
        v-if="userRent > 0"
        labelClasses="text-opposite"
        :value="userRent"
        label="Оренда житла:"
        editable
        @edit="$emit('edit:rent')"
    />

    <div v-if="userFood === 0" class="flex items-center gap-3">
        <Input v-model:value="food" id="food" placeholder="Витрати на харчування" />
        <Add :value="food" opposite @add="$emit('add:food', Number(removingSpaces(food)))" />
    </div>
    <InfoField v-if="userFood > 0" labelClasses="text-opposite" label="Витрати на харчування:" :value="userFood" />

    <div v-if="userClothes === 0" class="flex items-center gap-3">
        <Input v-model:value="clothes" id="food" placeholder="Витрати на одяг" />
        <Add :value="clothes" opposite @add="$emit('add:clothes', Number(removingSpaces(clothes)))" />
    </div>
    <InfoField v-if="userClothes > 0" labelClasses="text-opposite" label="Витрати на одяг:" :value="userClothes" />

    <div v-if="userFare === 0" class="flex items-center gap-3">
        <Input v-model:value="fare" id="food" placeholder="Витрати на проїзд" />
        <Add :value="fare" opposite @add="$emit('add:fare', Number(removingSpaces(fare)))" />
    </div>
    <InfoField
        v-if="userFare > 0"
        labelClasses="text-opposite"
        :value="userFare"
        label="Витрати на проїзд:"
        editable
        @edit="$emit('edit:fare')"
    />

    <div v-if="userPhone === 0" class="flex items-center gap-3">
        <Input v-model:value="phone" id="food" placeholder="Витрати на телефонні розмови" />
        <Add :value="phone" opposite @add="$emit('add:phone', Number(removingSpaces(phone)))" />
    </div>
    <InfoField v-if="userPhone > 0" labelClasses="text-opposite" :value="userPhone" label="Витрати на телефонні розмови:" />
</template>

<script setup>
import { ref } from "vue";
import Input from './Input.vue';
import Add from './Add.vue';
import InfoField from './InfoField.vue';
import { removingSpaces } from "../../helpers/formating-values.js";

defineProps({
    userRent: {
        type: Number,
        required: true,
    },
    userFood: {
        type: Number,
        required: true,
    },
    userClothes: {
        type: Number,
        required: true,
    },
    userFare: {
        type: Number,
        required: true,
    },
    userPhone: {
        type: Number,
        required: true,
    },
});

const rent = ref('');
const food = ref('');
const clothes = ref('');
const fare = ref('');
const phone = ref('');
</script>
