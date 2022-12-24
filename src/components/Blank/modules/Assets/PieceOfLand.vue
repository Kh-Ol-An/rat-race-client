<template>
    <li class="relative pr-12 grid grid-cols-12 items-center gap-2">
        <div class="col-span-7 flex items-center justify-center gap-2">
            <span class="col-span-6 text-silver-800 text-center whitespace-nowrap">
                {{ addingSpaces(price) }}
            </span>
            <Sell inputId="sell-land" @sell="sell" />
        </div>

        <span class="col-span-2 text-silver-800 text-center whitespace-nowrap">
            {{ addingSpaces(quantity) }}
        </span>

        <span class="col-span-3 text-silver-800 text-center whitespace-nowrap">
            {{ addingSpaces(cost) }}
        </span>
    </li>
</template>

<script setup>
import Sell from '../../plugins/Sell.vue';
import { addingSpaces } from '../../../../helpers/formating-values.js';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits([ 'sell' ]);

const sell = (price) => emit('sell', props.id, (props.quantity * price));
</script>
