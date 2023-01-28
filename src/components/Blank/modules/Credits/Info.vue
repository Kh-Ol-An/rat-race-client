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
    term: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <li class="grid grid-cols-4 items-center gap-2">
        <span class="text-opposite">
            {{ name }}
        </span>
        <span class="text-slate-400">
            {{ addingSpaces(body) }}
        </span>
        <span class="text-slate-400">
            {{ addingSpaces(payment) }}
        </span>
        <span class="text-slate-400">
            {{ addingSpaces(term) }}
        </span>
    </li>
</template>
