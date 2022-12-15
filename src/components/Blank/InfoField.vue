<template>
    <div :class="['flex items-center', wrapClasses]">
        <span :class="labelClasses">
            {{ label }}
        </span>
        <span class="ml-2 text-slate-800">
            {{ typeof value === 'number' ? addingSpaces(value) : value }}
        </span>
        <button
            v-if="editable"
            class="ml-2 outline-0"
            type="button"
            title="Редагувати"
            @click="$emit('edit')"
        >
            <EditIcon width="14px" height="14px" />
        </button>
        <button
            v-if="getting"
            class="ml-4 outline-0"
            type="button"
            title="Отримати"
            @click="$emit('get')"
        >
            <MoneyIcon width="30px" height="30px" />
        </button>
    </div>
</template>

<script setup>
import EditIcon from '../icons/EditIcon.vue';
import MoneyIcon from '../icons/MoneyIcon.vue';
import { addingSpaces } from '../../helpers/formating-values.js';

defineProps({
    wrapClasses: {
        type: String,
        default: '',
    },
    labelClasses: {
        type: String,
        default: '',
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
    getting: {
        type: Boolean,
        default: false,
    },
});
</script>