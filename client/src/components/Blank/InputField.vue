<template>
    <div class="flex flex-col gap-2">
        <span class="text-sm">{{ label }}</span>
        <div class="flex items-center space-x-3">
            <Input
                :id="`${fieldSubType}-${fieldType}-value`"
                :placeholder="placeholderWorth"
                smallLabel
                v-model:value="worth"
            />
            <Input
                :id="`${fieldSubType}-${fieldType}-income`"
                :placeholder="placeholderValue"
                smallLabel
                v-model:value="value"
            />
            <button
                :class="[disabled ? 'text-slate-300' : 'text-slate-800']"
                type="button"
                :disabled="disabled"
                @click="add"
            >
                додати
            </button>
        </div>
    </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import Input from './Input.vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    fieldType: {
        type: String,
        required: true,
    },
    fieldSubType: {
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

const worth = ref('');
const value = ref('');
const disabled = computed(() => worth.value.length === 0 || value.value.length === 0);

const add = () => {
    emit(
        'add',
        props.fieldType,
        props.fieldSubType,
        new Date().valueOf(),
        worth.value,
        value.value,
    );
    worth.value = '';
    value.value = '';
};
</script>
