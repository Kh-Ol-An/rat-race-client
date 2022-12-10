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
                    class="text-slate-800"
                    type="button"
                    @click="editable = !editable"
                >
                    edit
                </button>
                <button
                    v-else
                    class="text-slate-800"
                    type="button"
                    @click="save"
                >
                    save
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
import { addingSpaces } from '../../helpers/formating-values.js';

const props = defineProps({
    id: {
        type: Number,
        default: null,
    },
    worth: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    cost: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['edit']);

const editable = ref(true);
const editValue = ref(addingSpaces(props.value));

const save = () => {
    editable.value = !editable.value;
    emit('edit', props.id, editValue);
};
</script>
