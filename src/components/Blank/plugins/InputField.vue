<script setup>
import { ref } from 'vue';
import Input from '../../plugins/Input.vue';
import Add from './Add.vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    subType: {
        type: String,
        required: true,
    },
    placeholderWorth: {
        type: String,
        required: true,
    },
    placeholderValue: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    secondBg: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['add']);

const firstValue = ref('');
const secondValue = ref('');

const add = () => {
    emit('add', new Date().valueOf(), Number(firstValue.value), Number(secondValue.value), props.subType);
    firstValue.value = '';
    secondValue.value = '';
};
</script>

<template>
    <div :class="[
        'flex flex-col gap-2',
        disabled && 'pointer-events-none opacity-20',
    ]">
        <span class="text-slate-500">{{ label }}</span>
        <div class="flex items-center gap-3">
            <Input
                :id="`${subType}-${type}-value`"
                :placeholder="placeholderWorth"
                smallLabel
                :secondBg="secondBg"
                v-model:value="firstValue"
            />
            <Input
                :id="`${subType}-${type}-income`"
                :placeholder="placeholderValue"
                smallLabel
                :secondBg="secondBg"
                v-model:value="secondValue"
            />
            <Add :firstValue="firstValue" :secondValue="secondValue" @add="add" />
        </div>
    </div>
</template>
