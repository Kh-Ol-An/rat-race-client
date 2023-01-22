<template>
    <AuthGuard>
        <h1 class="text-white">Home</h1>
    </AuthGuard>
</template>

<script setup>
import { mapGetters } from '../store/helpers.js';
import AuthGuard from '../components/plugins/AuthGuard.vue';

const { getAuth } = mapGetters();
</script>
