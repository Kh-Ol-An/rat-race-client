<template>
    <li :class="[
        'grid items-center gap-2',
        cost ? 'grid-cols-3' : 'grid-cols-2'
    ]">
        <span class="text-silver-800 whitespace-nowrap">
            {{ addingSpaces(worth) }}
        </span>
        <div class="flex items-center gap-2">
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
            <div v-if="id">
                <button
                    v-if="editable"
                    class="p-2 shadow hover:shadow-lg rounded-full bg-secondary transition-all duration-300"
                    type="button"
                    title="Редагувати"
                    @click="editable = !editable"
                >
                    <EditIcon width="14px" height="14px" />
                </button>
                <button
                    v-else
                    class="p-2 shadow hover:shadow-lg rounded-full bg-secondary transition-all duration-300"
                    type="button"
                    title="Зберегти"
                    @click="save"
                >
                    <SaveIcon width="14px" height="14px" />
                </button>
            </div>
        </div>
        <span v-if="cost" class="text-silver-800 whitespace-nowrap">
            {{ addingSpaces(cost) }}
        </span>
    </li>
</template>

<script setup>
import { ref } from 'vue';
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

const save = () => {
    editable.value = !editable.value;
    emit('edit', props.id, Number(removingSpaces(editValue.value)));
};
</script>
