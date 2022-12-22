<template>
    <li class="relative pr-12 grid grid-cols-2 items-center gap-2">
        <span class="text-silver-800 text-center whitespace-nowrap">
            {{ addingSpaces(firstValue) }}
        </span>

        <div class="mx-auto flex items-center gap-3">
            <span class="text-silver-800 text-center whitespace-nowrap">
                {{ addingSpaces(secondValue) }}
            </span>
            <div v-if="showIncome" class="relative">
                <Input
                    id="edit-value"
                    placeholder="Доходи"
                    smallLabel
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
            <div v-if="id" class="flex items-center justify-center">
                <button
                    v-if="!showIncome"
                    :class="[
                        'font-bold text-2xl outline-0',
                         disabledEdit ? 'text-slate-300 cursor-not-allowed' : 'text-secondary',
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
                    :title="`Збільшити прибуток на ${addIncome}`"
                    :disabled="addIncome.length === 0"
                    @click="increment"
                >
                    <CheckIcon width="24px" height="24px" :color="addIncome.length === 0 ? 'fill-slate-300' : 'fill-primary'" />
                </button>
            </div>
        </div>
        <button
            v-if="
                idx === businessLength - 1 &&
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
import Input from '../../plugins/Input.vue';
import ConfirmationModal from '../../plugins/ConfirmationModal.vue';
import CheckIcon from '../../../icons/CheckIcon.vue';
import { addingSpaces } from '../../../../helpers/formating-values.js';

const props = defineProps({
    id: {
        type: Number,
        default: null,
    },
    subType: {
        type: String,
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
    idx: {
        type: Number,
        required: true,
    },
    businessLength: {
        type: Number,
        required: true,
    },
    lastBusiness: {
        type: Array,
        required: true,
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
    emit('increment', props.subType, props.id, Number(addIncome.value));
    addIncome.value = '';
};

const showModal = ref(false);
</script>
