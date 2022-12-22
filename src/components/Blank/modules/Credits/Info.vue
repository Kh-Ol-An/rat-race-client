<template>
    <li class="grid grid-cols-4 items-center gap-2">
        <span class="text-slate-800">
            {{ name }}
        </span>
        <span class="text-slate-800">
            {{ addingSpaces(body) }}
        </span>
        <span class="text-slate-800">
            {{ addingSpaces(payment) }}
        </span>
        <span class="text-slate-800">
            {{ addingSpaces(quantity) }}
        </span>
    </li>
</template>

<script setup>
import { addingSpaces } from '../../../../helpers/formating-values.js';

defineProps({
    name: {
        type: String,
        required: true,
    },
    body: {
        type: Number,
        required: true,
    },
    payment: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
</script>
