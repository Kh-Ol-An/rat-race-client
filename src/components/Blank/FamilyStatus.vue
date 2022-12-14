<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Сімейний стан</h2>
    <Checkbox label="Шлюб:" id="marriage" :checked="marriage" @change="changeMarriage" />
    <Quantity label="Діти:" :count="children" :expense="userChildren" @change="changeChildren" />
</template>

<script setup>
import { ref } from "vue";
import Quantity from './Quantity.vue';
import Checkbox from './Checkbox.vue';

const props = defineProps({
    marriage: {
        type: Boolean,
        required: true,
    },
    userChildren: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits([ 'change:marriage', 'change:children' ]);

const changeMarriage = checked => emit('change:marriage', checked);

const children = ref(props.userChildren / 300);
const changeChildren = count => {
    children.value = count;
    emit('change:children', children.value);
};
</script>
