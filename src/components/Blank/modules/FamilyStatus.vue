<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Сімейний стан</h2>
    <Checkbox label="Шлюб:" :checked="user.marriage" @change="changeMarriage" />
    <Quantity
        label="Діти:"
        :count="user.children.count"
        :expense="user.children.expense"
        :disabled="user.gender === 'male' && !user.marriage"
        @change="changeChildren"
    />
</template>

<script setup>
import { toRef } from "vue";
import Quantity from '../plugins/Quantity.vue';
import Checkbox from '../plugins/Checkbox.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([ 'change:marriage', 'change:children' ]);

const changeMarriage = checked => emit('change:marriage', checked);

const changeChildren = count => emit('change:children', count);
</script>
