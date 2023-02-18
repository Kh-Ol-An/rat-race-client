<script setup>
import { ref, toRef } from "vue";
import Input from '../../plugins/Input.vue';
import Add from '../plugins/Add.vue';
import InfoField from '../../plugins/InfoField.vue';
import { removingSpaces, addingSpaces } from '../../../helpers/formating-values.js';

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
});

const blank = toRef(props, 'blankProp');

const rent = ref('');
const food = ref('');
const clothes = ref('');
const fare = ref('');
const phone = ref('');
</script>

<template>
    <h2 class="text-xl font-bold text-opposite text-center">Витрати</h2>

    <div v-if="blank.rent === 0 && blank.apartments.length === 0" class="flex items-center gap-3">
        <Input v-model:value="rent" id="rent" placeholder="Оренда житла" secondBg />
        <Add :firstValue="rent" opposite @add="$emit('add:rent', Number(removingSpaces(rent)))" />
    </div>
    <InfoField v-else labelClasses="text-opposite" label="Оренда житла:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.rent) }}
        </span>
    </InfoField>

    <div v-if="blank.food === 0" class="flex items-center gap-3">
        <Input v-model:value="food" id="food" placeholder="Витрати на харчування" secondBg />
        <Add :firstValue="food" opposite @add="$emit('add:food', Number(removingSpaces(food)))" />
    </div>
    <InfoField v-else labelClasses="text-opposite" label="Витрати на харчування:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.food) }}
        </span>
    </InfoField>

    <div v-if="blank.clothes === 0" class="flex items-center gap-3">
        <Input v-model:value="clothes" id="clothes" placeholder="Витрати на одяг" secondBg />
        <Add :firstValue="clothes" opposite @add="$emit('add:clothes', Number(removingSpaces(clothes)))" />
    </div>
    <InfoField v-else labelClasses="text-opposite" label="Витрати на одяг:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.clothes) }}
        </span>
    </InfoField>

    <div v-if="blank.fare === 0 && blank.cars.length === 0" class="flex items-center gap-3">
        <Input v-model:value="fare" id="fare" placeholder="Витрати на проїзд" secondBg />
        <Add :firstValue="fare" opposite @add="$emit('add:fare', Number(removingSpaces(fare)))" />
    </div>
    <InfoField v-else labelClasses="text-opposite" label="Витрати на проїзд:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.fare) }}
        </span>
    </InfoField>

    <div v-if="blank.phone === 0" class="flex items-center gap-3">
        <Input v-model:value="phone" id="phone" placeholder="Витрати на телефонні розмови" secondBg />
        <Add :firstValue="phone" opposite @add="$emit('add:phone', Number(removingSpaces(phone)))" />
    </div>
    <InfoField v-else labelClasses="text-opposite" label="Витрати на телефонні розмови:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.phone) }}
        </span>
    </InfoField>
</template>
