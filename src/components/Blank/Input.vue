<template>
    <div class="relative w-full">
        <input
            class="
                peer
                py-1 px-3
                w-full
                shadow
                border-2 rounded-md
                text-secondary
                placeholder-transparent
                focus:border-secondary focus:outline-none
                transition-all duration-300
            "
            :id="id"
            type="text"
            :placeholder="placeholder"
            :value="value"
            @input="input"
        />
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
import { addingSpaces } from '../../helpers/formating-values.js';

const props = defineProps({
    value: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    typeText: {
        type: Boolean,
        default: false
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

const input = ({ target }) => {
    if (!props.typeText) {
        const regExp = /^[\d\s]*$/;
        if (!regExp.test(target.value) || target.value === '0' || target.value.length > 19) {
            return target.value = entered.value;
        }
        target.value = addingSpaces(target.value);
    }
    entered.value = target.value;
    emit('update:value', entered.value);
};
</script>
