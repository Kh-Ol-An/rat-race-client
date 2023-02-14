<script setup>
import { ref } from 'vue';
import Input from '../../../plugins/Input.vue';
import Modal from '../../plugins/Modal.vue';
import CheckIcon from '../../../../assets/images/icons/CheckIcon.vue';
import { removingSpaces, addingSpaces } from '../../../../helpers/formating-values.js';

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
});

const emit = defineEmits([ 'increment' ]);

const showIncome = ref(false);
const addIncome = ref('');
const hidIncome = () => {
    showIncome.value = false;
    addIncome.value = '';
};
const increment = () => {
    showIncome.value = false;
    emit('increment', props.id, Number(removingSpaces(addIncome.value)));
    addIncome.value = '';
};

const showModal = ref(false);
</script>

<template>
    <li class="relative pr-12 grid grid-cols-5 items-center gap-2">
        <span class="col-span-2 text-slate-400 text-center whitespace-nowrap">
            {{ addingSpaces(firstValue) }}
        </span>

        <div class="col-span-3 mx-auto flex items-center gap-3">
            <span class="text-slate-400 text-center whitespace-nowrap">
                {{ addingSpaces(secondValue) }}
            </span>
            <div v-if="showIncome" class="relative">
                <Input
                    id="edit-value"
                    placeholder="Прибутки"
                    smallLabel
                    secondBg
                    v-model:value="addIncome"
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
                        'font-bold text-2xl outline-0',
                         disabledEdit ? 'text-slate-700 cursor-not-allowed' : 'text-primary',
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
                    <CheckIcon :color="addIncome.length === 0 ? 'fill-slate-300' : 'fill-primary'" />
                </button>
            </div>
        </div>

        <button
            v-if="lastBusiness[lastBusiness.length - 1] === id"
            class="
                absolute
                top-1/2 right-0
                -translate-y-1/2 rotate-45
                px-2
                text-3xl text-opposite font-bold leading-none
                outline-0
            "
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
            <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
                Увага!!!
            </h4>
            <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
                Ти впевнений шо хочешь видалити останній відкритий бізнес?
            </p>
        </Modal>
    </li>
</template>
