<template>
    <button
        :class="[
            'p-2',
            'shadow hover:shadow-lg',
            'rounded-full',
            'transition-all duration-300',
            disabled ? 'bg-slate-300' : opposite ? 'bg-opposite' : 'bg-secondary',
        ]"
        type="button"
        title="Додати"
        :disabled="disabled"
        @click="$emit('add')"
    >
        <AddIcon width="20px" height="20px" />
    </button>
</template>

<script setup>
import { computed } from 'vue';
import AddIcon from '../icons/AddIcon.vue';

const props = defineProps({
    name: {
        type: String,
        default: 'true',
    },
    value: {
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
    props.name.length === 0 || props.value.length === 0 || props.secondValue.length === 0);
</script>
