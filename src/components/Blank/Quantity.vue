<template>
    <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-8">
            <span class="text-opposite">
                {{ label }}
            </span>

            <div class="flex items-center gap-2">
                <button
                    :class="[
                    'p-2 font-bold leading-none',
                    disabledDecrement ? 'text-slate-300' : 'text-slate-800'
                ]"
                    type="button"
                    :disabled="disabledDecrement"
                    @click="$emit('update:count', count - 1)"
                >
                    &#8722;
                </button>
                <span class="w-5 flex items-center justify-center text-silver-800 cursor-default">
                    {{ count }}
                </span>
                <button
                    :class="[
                    'p-2 font-bold leading-none',
                    disabledIncrement ? 'text-slate-300' : 'text-slate-800'
                ]"
                    type="button"
                    :disabled="disabledIncrement"
                    @click="$emit('update:count', count + 1)"
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
import { computed } from 'vue';
import { addingSpaces } from '../../helpers/formating-values.js';

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
});

const disabledDecrement = computed(() => props.count === 0);
const disabledIncrement = computed(() => props.count === 10);
</script>
