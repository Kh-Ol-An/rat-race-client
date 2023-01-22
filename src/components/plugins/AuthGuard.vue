<template>
    <div class="relative">
        <Menu />
        <slot v-if="getAuth"></slot>
        <Auth v-else />
    </div>
</template>

<script setup>
import Auth from '../../pages/Auth.vue';
import Menu from './Menu.vue';
import { mapGetters } from '../../store/helpers.js';

const { getAuth } = mapGetters();
</script>
