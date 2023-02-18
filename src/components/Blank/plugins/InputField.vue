<script setup>
import { ref } from 'vue';
import Input from '../../plugins/Input.vue';
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
    firstPlaceholder: {
        type: String,
        required: true,
    },
    secondPlaceholder: {
        type: String,
        required: true,
    },
    thirdPlaceholder: {
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
});

const emit = defineEmits(['add']);

const firstValue = ref('');
const secondValue = ref('');
const thirdValue = ref(props.thirdPlaceholder.length ? '' : 'true');

const add = () => {
    emit(
        'add',
        new Date().valueOf(),
        Number(removingSpaces(firstValue.value)),
        Number(removingSpaces(secondValue.value)),
        props.subType,
        Number(removingSpaces(thirdValue.value)),
    );
    firstValue.value = '';
    secondValue.value = '';
    thirdValue.value = '';
};
</script>

<template>
    <div :class="[
        'flex flex-col gap-2',
        disabled && 'pointer-events-none opacity-20',
    ]">
        <span class="text-slate-500">{{ label }}</span>
        <div
            :class="[
                'flex items-center gap-3',
                thirdPlaceholder.length && 'md:flex-col',
            ]"
        >
            <Input
                :id="`${subType}-${type}-value`"
                :placeholder="firstPlaceholder"
                smallLabel
                :secondBg="secondBg"
                v-model:value="firstValue"
            />
            <Input
                :id="`${subType}-${type}-income`"
                :placeholder="secondPlaceholder"
                smallLabel
                :secondBg="secondBg"
                v-model:value="secondValue"
            />
            <Input
                v-if="thirdPlaceholder.length"
                :id="`${subType}-${type}-deputies`"
                :placeholder="thirdPlaceholder"
                smallLabel
                :secondBg="secondBg"
                v-model:value="thirdValue"
            />
            <Add :firstValue="firstValue" :secondValue="secondValue" :thirdValue="thirdValue" @add="add" />
        </div>
    </div>
</template>
