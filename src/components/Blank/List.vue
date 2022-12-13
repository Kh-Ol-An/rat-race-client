<template>
    <li :class="[
        'grid items-center gap-2',
        cost ? 'grid-cols-3' : 'grid-cols-2'
    ]">
        <span class="text-silver-800 whitespace-nowrap">
            {{ addingSpaces(worth) }}
        </span>
        <div class="flex items-center gap-3">
            <span v-if="editable" class="text-silver-800 whitespace-nowrap">
                {{ editValue }}
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
                    class="outline-0"
                    type="button"
                    title="Редагувати"
                    @click="editable = !editable"
                >
                    <EditIcon width="16px" height="16px" />
                </button>
                <button
                    v-else
                    class="outline-0"
                    type="button"
                    title="Зберегти"
                    :disabled="disabled"
                    @click="save"
                >
                    <SaveIcon width="16px" height="16px" :color="disabled ? 'fill-slate-300' : 'fill-secondary'" />
                </button>
            </div>
        </div>
        <span v-if="cost" class="text-silver-800 whitespace-nowrap">
            {{ addingSpaces(cost) }}
        </span>
    </li>
</template>

<script setup>
import {computed, ref} from 'vue';
import Input from './Input.vue';
import EditIcon from '../icons/EditIcon.vue';
import SaveIcon from '../icons/SaveIcon.vue';
import { removingSpaces, addingSpaces } from '../../helpers/formating-values.js';

const props = defineProps({
    id: {
        type: Number,
        default: null,
    },
    worth: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        default: '',
    },
});

const emit = defineEmits(['edit']);

const editable = ref(true);
const editValue = ref(addingSpaces(props.value));

const disabled = computed(() => editValue.value.length === 0);

const save = () => {
    editable.value = !editable.value;
    emit('edit', props.id, Number(removingSpaces(editValue.value)));
};
</script>
