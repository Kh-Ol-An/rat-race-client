<script setup>
import { ref } from 'vue'
import Input from '../../plugins/Input.vue'
import ActionAdd from './ActionAdd.vue'
import { removingSpaces } from '../../../helpers/formating-values.js'

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
})

const emit = defineEmits(['add'])

const firstValue = ref('')
const secondValue = ref('')
const thirdValue = ref('')

const add = () => {
    emit(
        'add',
        new Date().valueOf(),
        Number(removingSpaces(firstValue.value)),
        Number(removingSpaces(secondValue.value)),
        props.subType,
        Number(removingSpaces(thirdValue.value))
    )
    firstValue.value = ''
    secondValue.value = ''
    thirdValue.value = ''
}
</script>

<template>
    <div
        :class="[
            'flex flex-col gap-2',
            disabled && 'pointer-events-none opacity-20',
        ]"
    >
        <span class="text-slate-500">{{ label }}</span>
        <div
            :class="[
                'flex items-center gap-3',
                thirdPlaceholder.length && 'md:flex-col',
            ]"
        >
            <Input
                :id="`${subType}-${type}-value`"
                v-model:value="firstValue"
                :placeholder="firstPlaceholder"
                small-label
                :second-bg="secondBg"
            />
            <Input
                :id="`${subType}-${type}-income`"
                v-model:value="secondValue"
                :placeholder="secondPlaceholder"
                small-label
                :second-bg="secondBg"
            />
            <div
                v-if="thirdPlaceholder.length"
                class="w-full flex items-center gap-3"
            >
                <Input
                    :id="`${subType}-${type}-deputies`"
                    v-model:value="thirdValue"
                    :placeholder="thirdPlaceholder"
                    small-label
                    :second-bg="secondBg"
                />
                <ActionAdd
                    :first-value="firstValue"
                    :second-value="secondValue"
                    :third-value="thirdValue"
                    @add="add"
                />
            </div>
            <ActionAdd
                v-else
                :first-value="firstValue"
                :second-value="secondValue"
                @add="add"
            />
        </div>
    </div>
</template>
