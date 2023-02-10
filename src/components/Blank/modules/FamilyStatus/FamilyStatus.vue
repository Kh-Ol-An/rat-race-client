<script setup>
import { toRef } from "vue";
import Marriage from './Marriage.vue';
import Children from './Children.vue';

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
});

const blank = toRef(props, 'blankProp');

const emit = defineEmits([ 'change:marriage', 'have:baby' ]);

const changeMarriage = checked => emit('change:marriage', checked);
</script>

<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Сімейний стан</h2>
    <Marriage label="Шлюб:" :checked="blank.marriage" :disabled="blank.gender.length === 0" @change="changeMarriage" />
    <Children
        label="Діти:"
        :count="blank.children.count"
        :expense="blank.children.expense"
        :disabled="blank.gender.length === 0 || (blank.gender === 'male' && !blank.marriage)"
        @have:baby="$emit('have:baby')"
    />
</template>
