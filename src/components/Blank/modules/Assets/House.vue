<script setup>
import InfoField from '../../../plugins/InfoField.vue';
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

<template>
    <li class="relative pr-12 flex items-center gap-2">
        <InfoField wrapClasses="gap-2" labelClasses="text-primary" label="Будинок:">
            <Sell :value="addingSpaces(price)" inputId="sell-price-house" secondBg @sell="sell">
                <span class="ml-2 text-slate-400">
                    {{ addingSpaces(price) }}
                </span>
            </Sell>
        </InfoField>
    </li>
</template>
