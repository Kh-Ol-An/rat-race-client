<template>
    <li class="grid grid-cols-4 items-center gap-2">
        <span class="text-opposite">
            {{ name }}
        </span>
        <span class="text-opposite">
            {{ addingSpaces(body) }}
        </span>
        <span class="text-opposite">
            {{ addingSpaces(payment) }}
        </span>
        <span class="text-opposite">
            {{ addingSpaces(quantity) }}
        </span>
    </li>
</template>

<script setup>
import { addingSpaces } from '../../helpers/formating-values.js';

defineProps({
    name: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
});
</script>
