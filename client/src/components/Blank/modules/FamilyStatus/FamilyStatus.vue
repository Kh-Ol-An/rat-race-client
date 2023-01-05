<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Сімейний стан</h2>
    <Checkbox label="Шлюб:" :checked="user.marriage" @change="changeMarriage" />
    <Children
        label="Діти:"
        :count="user.children.count"
        :expense="user.children.expense"
        :disabled="user.gender === 'male' && !user.marriage"
        @have:baby="$emit('have:baby')"
    />
</template>

<script setup>
import { toRef } from "vue";
import Checkbox from './Marriage.vue';
import Children from './Children.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([ 'change:marriage', 'have:baby' ]);

const changeMarriage = checked => emit('change:marriage', checked);
</script>
