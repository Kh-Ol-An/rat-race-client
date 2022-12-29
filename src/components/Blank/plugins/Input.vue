<template>
    <div :class="['relative w-full', disabled && 'opacity-20']">
        <input
            class="
                peer
                py-1 px-3 md:px-2
                w-full
                shadow
                rounded-md border-2 border-slate-700
                bg-transparent
                text-base text-transparent
                placeholder-transparent
                focus:border-primary focus:outline-none
                transition-all duration-300
            "
            :id="id"
            :type="type"
            :placeholder="placeholder"
            :value="value"
            :disabled="disabled"
            @focus="focused = true"
            @blur="focused = false"
            @input="input"
        />

        <div
            v-if="value.length > 0"
            class="
                absolute
                top-1/2 left-3
                -translate-y-1/2
                flex items-center gap-px
                bg-transparent
                text-base text-primary
            "
        >
            {{ type === 'number' ? addingSpaces(value) : value }}
            <div :class="['opacity-0 w-px h-4 bg-primary animate-flashing', focused && 'opacity-100']"></div>
        </div>

        <label
            :class="[
                'absolute',
                'top-0 left-2',
                'peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3 md:peer-placeholder-shown:left-2',
                '-translate-y-1/2',
                'px-1 peer-placeholder-shown:px-0',
                'text-xs text-primary peer-placeholder-shown:text-slate-400',
                'cursor-text',
                'transition-all duration-300',
                secondBg ? 'md:bg-slate-900' : 'bg-slate-800',
                smallLabel ? 'peer-placeholder-shown:text-sm' : 'peer-placeholder-shown:text-base',
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
        default: 'number',
    },
    placeholder: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    secondBg: {
        type: Boolean,
        default: false,
    },
    smallLabel: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['input']);

const entered = ref('');
const input = (event) => {
    const regExp = /\d|null/;
    if (
        event.target.value.length > 15 ||
        props.type === 'number' &&
        (!regExp.test(event.data) ||
        event.target.value === '0')
    ) {
        return event.target.value = entered.value;
    }
    entered.value = event.target.value;
    emit('update:value', entered.value);
};

const focused = ref(false);
</script>
