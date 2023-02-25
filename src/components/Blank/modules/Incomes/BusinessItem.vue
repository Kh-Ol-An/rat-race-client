<script setup>
import { ref } from 'vue'
import Input from '../../../plugins/Input.vue'
import Modal from '../../plugins/Modal.vue'
import CheckIcon from '../../../../assets/images/icons/CheckIcon.vue'
import {
    removingSpaces,
    addingSpaces,
} from '../../../../helpers/formating-values.js'

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    firstValue: {
        type: Number,
        required: true,
    },
    secondValue: {
        type: Number,
        required: true,
    },
    lastBusiness: {
        type: Array,
        required: true,
    },
    incremental: {
        type: Boolean,
        default: false,
    },
    disabledEdit: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['increment', 'delete'])

const showIncome = ref(false)
const addIncome = ref('')
const hidIncome = () => {
    showIncome.value = false
    addIncome.value = ''
}
const increment = () => {
    showIncome.value = false
    emit('increment', props.id, Number(removingSpaces(addIncome.value)))
    addIncome.value = ''
}

const showModal = ref(false)
</script>

<template>
    <li class="relative grid grid-cols-5 items-center gap-2 pr-12">
        <span class="col-span-2 whitespace-nowrap text-center text-slate-400">
            {{ addingSpaces(firstValue) }}
        </span>

        <div class="col-span-3 mx-auto flex items-center gap-3">
            <span class="whitespace-nowrap text-center text-slate-400">
                {{ addingSpaces(secondValue) }}
            </span>
            <div v-if="showIncome" class="relative">
                <Input
                    id="edit-value"
                    v-model:value="addIncome"
                    placeholder="Прибутки"
                    small-label
                    second-bg
                />
                <button
                    class="absolute top-1/2 right-3 -translate-y-1/2 rotate-45 text-2xl font-bold text-opposite"
                    type="button"
                    title="Скасувати"
                    @click="hidIncome"
                >
                    &#43;
                </button>
            </div>
            <div v-if="incremental" class="flex items-center justify-center">
                <button
                    v-if="!showIncome"
                    :class="[
                        'text-2xl font-bold outline-0',
                        disabledEdit
                            ? 'cursor-not-allowed text-slate-700'
                            : 'text-primary',
                    ]"
                    type="button"
                    title="Збільшити дохід"
                    :disabled="disabledEdit"
                    @click="showIncome = true"
                >
                    &#43;
                </button>
                <button
                    v-else
                    class="outline-0"
                    :class="[
                        'outline-0',
                        addIncome.length === 0 && 'cursor-not-allowed',
                    ]"
                    type="button"
                    :title="`Збільшити прибуток на ${addingSpaces(addIncome)}`"
                    :disabled="addIncome.length === 0"
                    @click="increment"
                >
                    <CheckIcon
                        :color="
                            addIncome.length === 0
                                ? 'fill-slate-300'
                                : 'fill-primary'
                        "
                    />
                </button>
            </div>
        </div>

        <button
            v-if="lastBusiness[lastBusiness.length - 1] === id"
            class="absolute top-1/2 right-0 -translate-y-1/2 rotate-45 px-2 text-3xl font-bold leading-none text-opposite outline-0"
            type="button"
            title="Банкротство"
            @click="showModal = true"
        >
            &#43;
        </button>
        <Modal
            :show="showModal"
            confirm="Видалити"
            @confirm="$emit('delete')"
            @cancel="showModal = false"
        >
            <h4 class="mx-auto text-center text-2xl font-bold text-opposite">
                Увага!!!
            </h4>
            <p
                class="mx-auto mt-4 text-center text-lg font-normal text-slate-400"
            >
                Ти впевнений що хочешь видалити останній відкритий бізнес?
            </p>
        </Modal>
    </li>
</template>
