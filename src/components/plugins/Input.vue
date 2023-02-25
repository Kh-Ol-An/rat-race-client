<script setup>
import { ref } from 'vue'
import { addingSpaces } from '../../helpers/formating-values.js'

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
    maxLength: {
        type: Number,
        default: 35,
    },
})

const emit = defineEmits(['update:value'])

const entered = ref('')
const input = (event) => {
    const regExp = /\d|null/
    if (
        (props.type === 'number' &&
            (!regExp.test(event.data) ||
                event.target.value === '0' ||
                event.target.value.length > 15)) ||
        (props.type === 'text' && event.target.value.length > props.maxLength)
    ) {
        return (event.target.value = entered.value)
    }
    entered.value = event.target.value
    emit('update:value', entered.value)
}
</script>

<template>
    <div :class="['relative w-full', disabled && 'opacity-20']">
        <input
            :id="id"
            class="peer w-full rounded-md border-2 border-slate-700 bg-transparent py-1 px-3 text-base text-primary placeholder-transparent shadow transition-all duration-300 focus:border-primary focus:outline-none md:px-2"
            :type="type === 'number' ? 'text' : type"
            :inputmode="type === 'number' ? 'numeric' : 'text'"
            :placeholder="placeholder"
            :value="type === 'number' ? addingSpaces(value) : value"
            :disabled="disabled"
            @input="input"
        />

        <label
            :class="[
                'absolute',
                'top-0 left-2',
                'peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3 md:peer-placeholder-shown:left-2',
                '-translate-y-1/2',
                'px-1 peer-placeholder-shown:px-0',
                'bg-slate-800',
                'text-xs text-primary peer-placeholder-shown:text-slate-400',
                'cursor-text',
                'transition-all duration-300',
                secondBg && 'md:bg-slate-900',
                smallLabel
                    ? 'peer-placeholder-shown:text-sm'
                    : 'peer-placeholder-shown:text-base',
            ]"
            :for="id"
        >
            {{ placeholder }}
        </label>
    </div>
</template>
