<script setup>
import { ref, toRef } from 'vue'
import Input from '../../plugins/Input.vue'
import Add from '../plugins/Add.vue'
import InfoField from '../../plugins/InfoField.vue'
import {
    removingSpaces,
    addingSpaces,
} from '../../../helpers/formating-values.js'

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
})

defineEmits(['add:rent', 'add:food', 'add:clothes', 'add:fare', 'add:phone'])

const blank = toRef(props, 'blankProp')

const rent = ref('')
const food = ref('')
const clothes = ref('')
const fare = ref('')
const phone = ref('')
</script>

<template>
    <h2 class="text-xl font-bold text-opposite text-center">Витрати</h2>

    <div
        v-if="blank.rent === 0 && blank.apartments.length === 0"
        class="flex items-center gap-3"
    >
        <Input
            id="rent"
            v-model:value="rent"
            placeholder="Оренда житла"
            second-bg
        />
        <Add
            :first-value="rent"
            opposite
            @add="$emit('add:rent', Number(removingSpaces(rent)))"
        />
    </div>
    <InfoField v-else label-classes="text-opposite" label="Оренда житла:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.rent) }}
        </span>
    </InfoField>

    <div v-if="blank.food === 0" class="flex items-center gap-3">
        <Input
            id="food"
            v-model:value="food"
            placeholder="Витрати на харчування"
            second-bg
        />
        <Add
            :first-value="food"
            opposite
            @add="$emit('add:food', Number(removingSpaces(food)))"
        />
    </div>
    <InfoField
        v-else
        label-classes="text-opposite"
        label="Витрати на харчування:"
    >
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.food) }}
        </span>
    </InfoField>

    <div v-if="blank.clothes === 0" class="flex items-center gap-3">
        <Input
            id="clothes"
            v-model:value="clothes"
            placeholder="Витрати на одяг"
            second-bg
        />
        <Add
            :first-value="clothes"
            opposite
            @add="$emit('add:clothes', Number(removingSpaces(clothes)))"
        />
    </div>
    <InfoField v-else label-classes="text-opposite" label="Витрати на одяг:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.clothes) }}
        </span>
    </InfoField>

    <div
        v-if="blank.fare === 0 && blank.cars.length === 0"
        class="flex items-center gap-3"
    >
        <Input
            id="fare"
            v-model:value="fare"
            placeholder="Витрати на проїзд"
            second-bg
        />
        <Add
            :first-value="fare"
            opposite
            @add="$emit('add:fare', Number(removingSpaces(fare)))"
        />
    </div>
    <InfoField v-else label-classes="text-opposite" label="Витрати на проїзд:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.fare) }}
        </span>
    </InfoField>

    <div v-if="blank.phone === 0" class="flex items-center gap-3">
        <Input
            id="phone"
            v-model:value="phone"
            placeholder="Витрати на телефонні розмови"
            second-bg
        />
        <Add
            :first-value="phone"
            opposite
            @add="$emit('add:phone', Number(removingSpaces(phone)))"
        />
    </div>
    <InfoField
        v-else
        label-classes="text-opposite"
        label="Витрати на телефонні розмови:"
    >
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.phone) }}
        </span>
    </InfoField>
</template>
