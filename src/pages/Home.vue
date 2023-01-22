<template>
    <AuthGuard>
        <h1 class="text-white">Home</h1>
        <p class="text-white">getAuth: {{ getAuth }}</p>
        <router-link class="text-white" to="/">Blank</router-link>
    </AuthGuard>
</template>

<script setup>
import { mapGetters } from '../store/helpers.js';
import AuthGuard from '../components/plugins/AuthGuard.vue';

const { getAuth } = mapGetters();
</script>
