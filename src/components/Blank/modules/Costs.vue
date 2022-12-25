<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Витрати</h2>

    <div v-if="user.rent === 0 && user.apartments.length === 0" class="flex items-center gap-3">
        <Input v-model:value="rent" id="rent" placeholder="Оренда житла" />
        <Add :firstValue="rent" opposite @add="$emit('add:rent', Number(rent))" />
    </div>
    <InfoField v-else labelClasses="text-opposite" label="Оренда житла:">
        <span class="ml-2 text-slate-800">
            {{ addingSpaces(user.rent) }}
        </span>
    </InfoField>

    <div v-if="user.food === 0" class="flex items-center gap-3">
        <Input v-model:value="food" id="food" placeholder="Витрати на харчування" />
        <Add :firstValue="food" opposite @add="$emit('add:food', Number(food))" />
    </div>
    <InfoField v-else labelClasses="text-opposite" label="Витрати на харчування:">
        <span class="ml-2 text-slate-800">
            {{ addingSpaces(user.food) }}
        </span>
    </InfoField>

    <div v-if="user.clothes === 0" class="flex items-center gap-3">
        <Input v-model:value="clothes" id="clothes" placeholder="Витрати на одяг" />
        <Add :firstValue="clothes" opposite @add="$emit('add:clothes', Number(clothes))" />
    </div>
    <InfoField v-else labelClasses="text-opposite" label="Витрати на одяг:">
        <span class="ml-2 text-slate-800">
            {{ addingSpaces(user.clothes) }}
        </span>
    </InfoField>

    <div v-if="user.fare === 0 && user.cars.length === 0" class="flex items-center gap-3">
        <Input v-model:value="fare" id="fare" placeholder="Витрати на проїзд" />
        <Add :firstValue="fare" opposite @add="$emit('add:fare', Number(fare))" />
    </div>
    <InfoField v-else labelClasses="text-opposite" label="Витрати на проїзд:">
        <span class="ml-2 text-slate-800">
            {{ addingSpaces(user.fare) }}
        </span>
    </InfoField>

    <div v-if="user.phone === 0" class="flex items-center gap-3">
        <Input v-model:value="phone" id="phone" placeholder="Витрати на телефонні розмови" />
        <Add :firstValue="phone" opposite @add="$emit('add:phone', Number(phone))" />
    </div>
    <InfoField v-else labelClasses="text-opposite" label="Витрати на телефонні розмови:">
        <span class="ml-2 text-slate-800">
            {{ addingSpaces(user.phone) }}
        </span>
    </InfoField>
</template>

<script setup>
import { ref, toRef } from "vue";
import Input from '../plugins/Input.vue';
import Add from '../plugins/Add.vue';
import InfoField from '../plugins/InfoField.vue';
import { addingSpaces } from '../../../helpers/formating-values.js';

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
