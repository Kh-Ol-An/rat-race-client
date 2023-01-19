<template>
    <div :class="[
        'flex items-center justify-between gap-2',
        disabled && 'opacity-20',
    ]">
        <div class="flex items-center gap-8">
            <span class="text-slate-500">
                {{ label }}
            </span>

            <div class="flex items-center gap-2">
                <span class="w-5 flex items-center justify-center text-slate-400 cursor-default">
                    {{ count }}
                </span>
                <button
                    class="p-2 font-bold leading-none text-slate-800 outline-0"
                    type="button"
                    :disabled="disabled"
                    @click="$emit('have:baby')"
                >
                    <SexIcon width="16px" height="16px" color="fill-primary" />
                </button>
            </div>
        </div>

        <div v-if="expense" class="flex items-center gap-2">
            <span class="text-slate-500">Витрати:</span>
            <span class="text-slate-400">{{ addingSpaces(expense) }}</span>
        </div>
    </div>
</template>

<script setup>
import SexIcon from '../../../icons/SexIcon.vue';
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
