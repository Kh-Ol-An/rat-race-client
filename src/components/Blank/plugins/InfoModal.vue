<template>
    <Modal :show="show" :cancel="cancel" :onlyCancelAction="onlyCancelAction" @cancel="$emit('cancel')">
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            {{ title }}
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-800 text-center">
            {{ text }}
        </p>
    </Modal>
</template>

<script setup>
import Modal from './Modal.vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        default: 'Інформація!',
    },
    text: {
        type: String,
        default: 'Будь більш уважним!',
    },
    cancel: {
        type: String,
        default: 'Зрозумів',
    },
    onlyCancelAction: {
        type: Boolean,
        default: false,
    },
});
</script>
