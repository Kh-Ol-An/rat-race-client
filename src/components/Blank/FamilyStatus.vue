<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Сімейний стан</h2>
    <Checkbox :checked="userMarriage" id="marriage" label="Шлюб:" @change="changeMarriage" />
    <Quantity :count="children" :expense="userChildren" label="Діти:" @change="changeChildren" />
</template>

<script setup>
import { ref } from "vue";
import Quantity from './Quantity.vue';
import Checkbox from './Checkbox.vue';

defineProps({
    userMarriage: {
        type: Boolean,
        required: true,
    },
    userChildren: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits([ 'change:marriage', 'change:children' ]);
const changeMarriage = checked = emit('change:marriage', checked);

const children = ref(0);
const changeChildren = count => {
    children.value = count;
    emit('change:children', children.value);
};
</script>
