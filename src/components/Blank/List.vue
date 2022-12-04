<template>
    <li :class="[
        'grid grid-cols-3 gap-2',
        cost ? 'grid-cols-4' : 'grid-cols-3'
    ]">
        <span class="text-additional">
            {{ label }}
        </span>
        <span class="text-silver-800 whitespace-nowrap">
            {{ addingSpaces(worth) }}
        </span>
        <span class="text-silver-800 whitespace-nowrap">
            {{ addingSpaces(value) }}
        </span>
        <span v-if="cost" class="text-silver-800 whitespace-nowrap">
            {{ addingSpaces(cost) }}
        </span>
    </li>
</template>

<script setup>
import { addingSpaces } from '../../helpers/formating-values.js';

defineProps({
    label: {
        type: String,
        required: true,
    },
    worth: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    cost: {
        type: String,
        default: '',
    },
});
</script>
