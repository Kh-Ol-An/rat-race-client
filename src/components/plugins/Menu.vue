<script setup>
import { ref } from 'vue';
import { mapActions } from '../../store/helpers.js';
import HomeIcon from '../icons/HomeIcon.vue';
import BlankIcon from '../icons/BlankIcon.vue';
import GameIcon from '../icons/GameIcon.vue';
import LogoutIcon from '../icons/LogoutIcon.vue';

const { logout } = mapActions();
const show = ref(false);
</script>

<template>
    <button class="fixed top-6 left-6 flex flex-col gap-2" type="button" @click="show = !show">
        <span class="w-8 h-0.5 block bg-slate-300"></span>
        <span class="w-8 h-0.5 block bg-slate-300"></span>
        <span class="w-8 h-0.5 block bg-slate-300"></span>
    </button>
    <nav v-if="show" class="fixed top-14 left-10 flex flex-col gap-4">
        <router-link class="text-white" to="/">
            <HomeIcon width="24px" height="24px" color="fill-slate-300" />
        </router-link>
        <router-link class="text-white" to="/blank">
            <BlankIcon width="24px" height="24px" color="stroke-slate-300" />
        </router-link>
        <router-link class="text-white" to="/game">
            <GameIcon width="24px" height="24px" color="fill-slate-300" />
        </router-link>
        <button class="text-white" type="button" @click="logout">
            <LogoutIcon width="24px" height="24px" color="fill-slate-300" />
        </button>
    </nav>
</template>
