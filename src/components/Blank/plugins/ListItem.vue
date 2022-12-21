<template>
    <li :class="[
        'relative pr-12 grid items-center gap-2',
        thirdValue ? 'grid-cols-10' : 'grid-cols-6'
    ]">
        <span class="col-span-3 text-silver-800 text-center whitespace-nowrap">
            {{ addingSpaces(firstValue) }}
        </span>
        <div class="col-span-3 mx-auto flex items-center gap-3">
            <span class="text-silver-800 text-center whitespace-nowrap">
                {{ addingSpaces(secondValue) }}
            </span>
            <Input
                v-if="!addingIncome"
                id="edit-value"
                placeholder="Доходи"
                smallLabel
                v-model:value="additionalIncome"
            />
            <div v-if="id" class="flex items-center justify-center">
                <button
                    v-if="addingIncome"
                    :class="[
                        'font-bold text-2xl outline-0',
                         disabledEdit ? 'text-slate-300 cursor-not-allowed' : 'text-secondary',
                    ]"
                    type="button"
                    title="Збільшити дохід"
                    :disabled="disabledEdit"
                    @click="addingIncome = !addingIncome"
                >
                    &#43;
                </button>
                <button
                    v-else
                    class="outline-0"
                    type="button"
                    title="Зберегти"
                    @click="increment"
                >
                    <SaveIcon width="16px" height="16px" />
                </button>
            </div>
        </div>
        <span v-if="thirdValue" class="col-span-4 text-silver-800 text-center whitespace-nowrap">
            {{ addingSpaces(thirdValue) }}
        </span>
        <button
            v-if="
                idx === listLength - 1 &&
                lastBusiness.length > 0 &&
                lastBusiness[lastBusiness.length - 1] === subType
            "
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
        <ConfirmationModal
            :show="showModal"
            text="Ти впевнений шо хочешь видалити останній відкритий бізнес?"
            @confirm="$emit('delete')"
            @cansel="showModal = false"
        />
    </li>
</template>

<script setup>
import { ref } from 'vue';
import Input from './Input.vue';
import ConfirmationModal from './ConfirmationModal.vue';
import SaveIcon from '../../icons/SaveIcon.vue';
import { addingSpaces } from '../../../helpers/formating-values.js';

const props = defineProps({
    id: {
        type: Number,
        default: null,
    },
    subType: {
        type: String,
        default: '',
    },
    firstValue: {
        type: Number,
        required: true,
    },
    secondValue: {
        type: Number,
        required: true,
    },
    thirdValue: {
        type: Number,
        default: null,
    },
    idx: {
        type: Number,
        default: null,
    },
    listLength: {
        type: Number,
        default: null,
    },
    lastBusiness: {
        type: Array,
        default: [],
    },
    disabledEdit: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits([ 'increment' ]);

const addingIncome = ref(true);
const additionalIncome = ref('');

const increment = () => {
    addingIncome.value = !addingIncome.value;
    emit('increment', props.subType, props.id, Number(additionalIncome.value));
    additionalIncome.value = '';
};

const showModal = ref(false);
</script>
