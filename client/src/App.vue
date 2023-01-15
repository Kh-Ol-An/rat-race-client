<template>
    <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { mapActions } from './store/helpers.js';

const { checkAuth } = mapActions();

onMounted(() => {
    if (localStorage.getItem('token')) {
        checkAuth();
    }
});
</script>

<style>
input:-webkit-autofill {
    -webkit-box-shadow: inset 0 0 0 50px #1e293b !important; /* Цвет фона */
    -webkit-text-fill-color: #000 !important; /* цвет текста */
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
