<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Капризи та примхи</h2>
    <Quantity :count="whimsAndFancies" label="Капризи та примхи:" @change="change" />
</template>

<script setup>
import Quantity from '../plugins/Quantity.vue';

defineProps({
    whimsAndFancies: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits([ 'change' ]);

const change = (count) => emit('change', count);
</script>
