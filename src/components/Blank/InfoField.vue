<template>
    <div class="flex items-center gap-2">
        <span :class="[opposite ? 'text-opposite' : 'text-additional']">
            {{ label }}
        </span>
        <span class="text-slate-800">
            {{ typeof value === 'number' ? addingSpaces(value) : value }}
        </span>
        <button
            v-if="editable"
            :class="[
                'p-1.5',
                'shadow hover:shadow-lg',
                'rounded-full',
                'transition-all duration-300',
                opposite ? 'bg-opposite' : 'bg-secondary',
            ]"
            type="button"
            title="Редагувати"
            @click="$emit('edit')"
        >
            <EditIcon width="14px" height="14px" />
        </button>
    </div>
</template>

<script setup>
import EditIcon from '../icons/EditIcon.vue';
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
        type: [String, Number],
        required: true,
    },
    editable: {
        type: Boolean,
        default: false,
    },
});
</script>