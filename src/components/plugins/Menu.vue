<template>
    <button class="fixed top-6 left-6" type="button" @click="show = !show">menu</button>
    <nav v-if="show" class="fixed top-14 left-10 flex flex-col gap-4">
        <router-link class="text-white" to="/">На головну</router-link>
        <router-link class="text-white" to="/blank">Бланк</router-link>
        <router-link class="text-white" to="/game">Гра</router-link>
        <button class="text-white" type="button" @click="logout">
            Вийти
        </button>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
import { mapActions } from '../../store/helpers.js';

const { logout } = mapActions();
const show = ref(false);
</script>
