<script setup>
import { ref } from 'vue';

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
});

const emit = defineEmits(['input']);

const enteredFirst = ref('');
const enteredSecond = ref('');
const input = (event) => {
    enteredFirst.value = event.target.value;
    if (event.target.value.length > 3) {
        enteredFirst.value = event.target.value.slice(0, 3);
        enteredSecond.value = event.target.value.slice(3);
    }
    emit('update:value', event.target.value);
};
</script>

<template>
    <div :class="['relative w-full flex items-center', disabled && 'opacity-20']">
        <input
            class="
                peer
                py-1 px-3 md:px-2
                w-full
                shadow
                rounded-md border-2 border-slate-700
                bg-transparent
                text-base text-slate-400
                placeholder-transparent
                focus:border-primary focus:outline-none
                transition-all duration-300
            "
            :id="id + 'first'"
            :type="type"
            :placeholder="placeholder"
            :value="enteredFirst"
            :disabled="disabled"
            @input="input"
        />
        <input
            class="
                py-1 px-3 md:px-2
                w-full
                shadow
                rounded-md border-2 border-slate-700
                bg-transparent
                text-base text-slate-400
                placeholder-transparent
                focus:border-primary focus:outline-none
                transition-all duration-300
            "
            :id="id + 'second'"
            :type="type"
            :value="enteredSecond"
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
                smallLabel ? 'peer-placeholder-shown:text-sm' : 'peer-placeholder-shown:text-base',
            ]"
            :for="id"
        >
            {{ placeholder }}
        </label>
    </div>
</template>
