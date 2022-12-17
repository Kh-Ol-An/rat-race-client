<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Витрати</h2>

    <div v-if="user.rent === 0" class="flex items-center gap-3">
        <Input v-model:value="rent" id="rent" placeholder="Оренда житла" />
        <Add :firstValue="rent" opposite @add="$emit('add:rent', Number(removingSpaces(rent)))" />
    </div>
    <InfoField
        v-if="user.rent > 0"
        labelClasses="text-opposite"
        :value="user.rent"
        label="Оренда житла:"
        editable
        @edit="$emit('edit:rent')"
    />

    <div v-if="user.food === 0" class="flex items-center gap-3">
        <Input v-model:value="food" id="food" placeholder="Витрати на харчування" />
        <Add :firstValue="food" opposite @add="$emit('add:food', Number(removingSpaces(food)))" />
    </div>
    <InfoField v-if="user.food > 0" labelClasses="text-opposite" label="Витрати на харчування:" :value="user.food" />

    <div v-if="user.clothes === 0" class="flex items-center gap-3">
        <Input v-model:value="clothes" id="food" placeholder="Витрати на одяг" />
        <Add :firstValue="clothes" opposite @add="$emit('add:clothes', Number(removingSpaces(clothes)))" />
    </div>
    <InfoField v-if="user.clothes > 0" labelClasses="text-opposite" label="Витрати на одяг:" :value="user.clothes" />

    <div v-if="user.fare === 0" class="flex items-center gap-3">
        <Input v-model:value="fare" id="food" placeholder="Витрати на проїзд" />
        <Add :firstValue="fare" opposite @add="$emit('add:fare', Number(removingSpaces(fare)))" />
    </div>
    <InfoField
        v-if="user.fare > 0"
        labelClasses="text-opposite"
        :value="user.fare"
        label="Витрати на проїзд:"
        editable
        @edit="$emit('edit:fare')"
    />

    <div v-if="user.phone === 0" class="flex items-center gap-3">
        <Input v-model:value="phone" id="food" placeholder="Витрати на телефонні розмови" />
        <Add :firstValue="phone" opposite @add="$emit('add:phone', Number(removingSpaces(phone)))" />
    </div>
    <InfoField v-if="user.phone > 0" labelClasses="text-opposite" :value="user.phone" label="Витрати на телефонні розмови:" />
</template>

<script setup>
import { ref, toRef } from "vue";
import Input from '../plugins/Input.vue';
import Add from '../plugins/Add.vue';
import InfoField from '../plugins/InfoField.vue';
import { removingSpaces } from "../../../helpers/formating-values.js";

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const rent = ref('');
const food = ref('');
const clothes = ref('');
const fare = ref('');
const phone = ref('');
</script>
