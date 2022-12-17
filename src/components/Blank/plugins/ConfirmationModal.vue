<template>
    <Modal :show="show" :confirm="confirm" @confirm="$emit('confirm')" @cansel="$emit('cansel')">
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            {{ title }}
        </h4>
        <p class="mx-auto mt-4 text-lg text-center">
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
        default: 'Увага!!!',
    },
    text: {
        type: String,
        default: 'Ти підтверджуєш свою дію?',
    },
    confirm: {
        type: String,
        default: 'Видалити',
    },
});
</script>
