<template>
    <div :class="[
        'flex items-center justify-between gap-2',
        disabled && 'opacity-20 cursor-not-allowed',
    ]">
        <div class="flex items-center gap-8">
            <span class="text-opposite">
                {{ label }}
            </span>

            <div class="flex items-center gap-2">
                <span class="w-5 flex items-center justify-center text-silver-800 cursor-default">
                    {{ count }}
                </span>
                <button
                    class="p-2 font-bold leading-none text-slate-800 outline-0"
                    type="button"
                    @click="$emit('have:baby')"
                >
                    &#43;
                </button>
            </div>
        </div>

        <div v-if="expense" class="flex items-center gap-2">
            <span class="text-opposite">Витрати:</span>
            <span>{{ addingSpaces(expense) }}</span>
        </div>
    </div>
</template>

<script setup>
import { addingSpaces } from '../../../../helpers/formating-values.js';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    expense: {
        type: Number,
        default: null,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
</script>
