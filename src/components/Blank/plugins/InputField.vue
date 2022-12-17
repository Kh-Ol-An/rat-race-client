<template>
    <div class="flex flex-col gap-2">
        <span class="text-sm">{{ label }}</span>
        <div class="flex items-center gap-3">
            <Input
                :id="`${subType}-${type}-value`"
                :placeholder="placeholderWorth"
                smallLabel
                v-model:value="firstValue"
            />
            <Input
                :id="`${subType}-${type}-income`"
                :placeholder="placeholderValue"
                smallLabel
                v-model:value="secondValue"
            />
            <Add :firstValue="firstValue" :secondValue="secondValue" @add="add" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Input from './Input.vue';
import Add from './Add.vue';
import { removingSpaces } from '../../../helpers/formating-values.js';

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
});

const emit = defineEmits(['add']);

const firstValue = ref('');
const secondValue = ref('');

const add = () => {
    emit(
        'add',
        props.subType,
        new Date().valueOf(),
        Number(removingSpaces(firstValue.value)),
        Number(removingSpaces(secondValue.value)),
    );
    firstValue.value = '';
    secondValue.value = '';
};
</script>
