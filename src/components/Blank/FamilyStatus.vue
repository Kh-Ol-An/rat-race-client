<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Сімейний стан</h2>
    <Checkbox label="Шлюб:" id="marriage" :checked="user.marriage" @change="changeMarriage" />
    <Quantity label="Діти:" :count="children" :expense="user.children" @change="changeChildren" />
</template>

<script setup>
import { ref, toRef } from "vue";
import Quantity from './Quantity.vue';
import Checkbox from './Checkbox.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([ 'change:marriage', 'change:children' ]);

const changeMarriage = checked => emit('change:marriage', checked);

const children = ref(user.value.children / 300);
const changeChildren = count => {
    children.value = count;
    emit('change:children', children.value);
};
</script>
