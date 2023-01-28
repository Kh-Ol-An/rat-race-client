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

<template>
    <li class="relative pr-12 grid grid-cols-12 items-center gap-2">
        <div class="col-span-6 flex items-center justify-center">
            <Sell :value="addingSpaces(price)" inputId="sell-land" secondBg @sell="sell">
                <span class="col-span-5 text-slate-400 text-center whitespace-nowrap">
                    {{ addingSpaces(Number.isInteger(price) ? Math.round(price) : `~${Math.round(price)}`) }}
                </span>
            </Sell>
        </div>

        <span class="col-span-3 text-slate-400 text-center whitespace-nowrap">
            {{ addingSpaces(quantity) }}
        </span>

        <span class="col-span-3 text-slate-400 text-center whitespace-nowrap">
            {{ addingSpaces(cost) }}
        </span>
    </li>
</template>
