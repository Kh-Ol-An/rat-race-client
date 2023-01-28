<script setup>
import { computed } from 'vue';
import AddIcon from '../../icons/AddIcon.vue';

const props = defineProps({
    name: {
        type: String,
        default: 'true',
    },
    firstValue: {
        type: String,
        required: true,
    },
    secondValue: {
        type: String,
        default: 'true',
    },
    opposite: {
        type: Boolean,
        default: false,
    },
});

const disabled = computed(() =>
    props.name.length === 0 || props.firstValue.length === 0 || props.secondValue.length === 0);
</script>

<template>
    <button
        :class="['outline-0', disabled && 'cursor-not-allowed']"
        type="button"
        title="Додати"
        :disabled="disabled"
        @click="$emit('add')"
    >
        <AddIcon width="30px" height="30px" :color="disabled ? 'fill-slate-400' : 'fill-primary'" />
    </button>
</template>
