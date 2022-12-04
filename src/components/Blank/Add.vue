<template>
    <button
        :class="[disabled ? 'text-slate-300' : 'text-slate-800']"
        type="button"
        :disabled="disabled"
        @click="$emit('add')"
    >
        додати
    </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    value: {
        type: String,
        required: true,
    },
    secondValue: {
        type: String,
        default: 'true',
    },
});

const disabled = computed(() => props.value.length === 0 || props.secondValue.length === 0);
</script>
