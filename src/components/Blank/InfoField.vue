<template>
    <div class="flex items-center gap-2">
        <span :class="[opposite ? 'text-opposite' : 'text-additional']">
            {{ label }}
        </span>
        <span class="text-silver-800">
            {{ addingSpaces(value) }}
        </span>
        <button
            v-if="editable"
            class="text-slate-800"
            type="button"
            @click="$emit('edit')"
        >
            edit
        </button>
    </div>
</template>

<script setup>
import { addingSpaces } from '../../helpers/formating-values.js';

defineProps({
    opposite: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String || Number,
        required: true,
    },
    editable: {
        type: Boolean,
        default: false,
    },
});
</script>