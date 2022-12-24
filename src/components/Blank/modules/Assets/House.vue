<template>
    <li class="relative pr-12 flex items-center gap-2">
        <InfoField labelClasses="text-additional" label="Будинок:">
            <span class="ml-2 text-slate-800">
                {{ addingSpaces(price) }}
            </span>
        </InfoField>

        <Sell inputId="sell-price-house" @sell="sell" />
    </li>
</template>

<script setup>
import InfoField from '../../plugins/InfoField.vue';
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
});

const emit = defineEmits([ 'sell' ]);

const sell = (price) => emit('sell', price, props.id);
</script>
