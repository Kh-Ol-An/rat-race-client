<template>
    <div class="flex items-center justify-between gap-2">
        <span class="text-additional">
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
                -
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
                +
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
});

const disabledDecrement = computed(() => props.count === 0);
const disabledIncrement = computed(() => props.count === 10);
</script>
