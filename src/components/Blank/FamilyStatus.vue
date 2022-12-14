<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Сімейний стан</h2>
    <Checkbox label="Шлюб:" id="marriage" :checked="userMarriage" @change="changeMarriage" />
    <Quantity label="Діти:" :count="userChildren" @change="changeChildren" />
</template>

<script setup>
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

const changeMarriage = checked => emit('change:marriage', checked);
const changeChildren = count => emit('change:children', count);
</script>
