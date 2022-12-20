<template>
    <div class="relative w-full">
        <input
            class="
                peer
                py-1 px-3
                w-full
                shadow
                border-2 rounded-md
                text-base text-transparent
                placeholder-transparent
                focus:border-secondary focus:outline-none
                transition-all duration-300
            "
            :id="id"
            :type="type"
            :placeholder="placeholder"
            :value="value"
            @input="input"
        />
        <div
            v-if="value.length > 0"
            class="absolute top-1/2 left-3 -translate-y-1/2 flex items-center gap-px bg-white text-base text-secondary"
        >
            {{ type === 'number' ? addingSpaces(value) : value }}
            <div class="-mt-0.5 w-px h-4 bg-secondary animate-flashing"></div>
        </div>
        <label
            :class="[
                'absolute',
                'top-0 left-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4',
                '-translate-y-1/2',
                'px-1 peer-placeholder-shown:px-0',
                'bg-white',
                'text-xs text-secondary peer-placeholder-shown:text-slate-500',
                'cursor-text',
                'transition-all duration-300',
                 smallLabel ? 'peer-placeholder-shown:text-sm' : 'peer-placeholder-shown:text-base'
            ]"
            :for="id"
        >
            {{ placeholder }}
        </label>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { addingSpaces } from '../../../helpers/formating-values.js';

const props = defineProps({
    value: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'number'
    },
    placeholder: {
        type: String,
        default: ''
    },
    smallLabel: {
        type: Boolean,
        default: false
    },
});

const emit = defineEmits(['input']);

const entered = ref('');

const input = (event) => {
    const regExp = /\d|null/;
    if (
        props.type === 'number' &&
        !regExp.test(event.data) ||
        event.target.value === '0' ||
        event.target.value.length > 15
    ) {
        return event.target.value = entered.value;
    }
    entered.value = event.target.value;
    emit('update:value', entered.value);
};
</script>
