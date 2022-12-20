<template>
    <li :class="[
        'relative pr-20 grid items-center gap-2',
        thirdValue ? 'grid-cols-3' : 'grid-cols-2'
    ]">
        <span class="text-silver-800 text-center whitespace-nowrap">
            {{ addingSpaces(firstValue) }}
        </span>
        <div class="mx-auto flex items-center gap-3">
            <span v-if="editable" class="text-silver-800 text-center whitespace-nowrap">
                {{ addingSpaces(editValue) }}
            </span>
            <Input
                v-else
                id="edit-value"
                placeholder="Доходи"
                smallLabel
                v-model:value="editValue"
            />
            <div v-if="id" class="flex items-center justify-center">
                <button
                    v-if="editable"
                    :class="['outline-0', disabledEdit && 'cursor-not-allowed']"
                    type="button"
                    title="Редагувати"
                    :disabled="disabledEdit"
                    @click="editable = !editable"
                >
                    <EditIcon width="16px" height="16px" :color="disabledEdit ? 'fill-slate-300' : 'fill-secondary'" />
                </button>
                <button
                    v-else
                    :class="['outline-0', disabledSave && 'cursor-not-allowed']"
                    type="button"
                    title="Зберегти"
                    :disabled="disabledSave"
                    @click="save"
                >
                    <SaveIcon width="16px" height="16px" :color="disabledSave ? 'fill-slate-300' : 'fill-secondary'" />
                </button>
            </div>
        </div>
        <span v-if="thirdValue" class="text-silver-800 text-center whitespace-nowrap">
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
import { computed, ref } from 'vue';
import Input from './Input.vue';
import ConfirmationModal from './ConfirmationModal.vue';
import EditIcon from '../../icons/EditIcon.vue';
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
        type: String,
        required: true,
    },
    secondValue: {
        type: String,
        required: true,
    },
    thirdValue: {
        type: String,
        default: '',
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

const emit = defineEmits([ 'edit' ]);

const editable = ref(true);
const editValue = ref(props.secondValue);

const disabledSave = computed(() => editValue.value.length === 0);

const save = () => {
    editable.value = !editable.value;
    emit('edit', props.subType, props.id, Number(editValue.value));
};

const showModal = ref(false);
</script>
