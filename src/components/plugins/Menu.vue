<script setup>
import { ref } from 'vue';
import { mapActions } from '../../store/helpers.js';
import HomeIcon from '../../assets/images/icons/HomeIcon.vue';
import BlankIcon from '../../assets/images/icons/BlankIcon.vue';
import GameIcon from '../../assets/images/icons/GameIcon.vue';
import LogoutIcon from '../../assets/images/icons/LogoutIcon.vue';

const { logout } = mapActions();
const show = ref(false);
</script>

<template>
    <button
        class="
            fixed md:absolute
            top-6 md:top-2.5 left-6 md:left-2.5
            p-2
            flex flex-col gap-2
            rounded-md
            bg-slate-700 md:bg-slate-800
        "
        type="button"
        @click="show = !show"
    >
        <span class="w-8 h-0.5 block bg-slate-300"></span>
        <span class="w-8 h-0.5 block bg-slate-300"></span>
        <span class="w-8 h-0.5 block bg-slate-300"></span>
    </button>
    <nav v-if="show" class="">
        <router-link
            class="fixed md:absolute top-2 left-[88px] z-50 p-2 rounded-md bg-slate-700 md:bg-slate-800"
            to="/"
        >
            <HomeIcon width="24px" height="24px" color="fill-slate-300" />
        </router-link>
        <router-link
            class="fixed md:absolute top-10 left-[76px] z-50 p-2 rounded-md bg-slate-700 md:bg-slate-800"
            to="/blank"
        >
            <BlankIcon width="24px" height="24px" color="stroke-slate-300" />
        </router-link>
        <router-link
            class="fixed md:absolute top-16 left-12 z-50 p-2 rounded-md bg-slate-700 md:bg-slate-800"
            to="/game"
        >
            <GameIcon width="24px" height="24px" color="fill-slate-300" />
        </router-link>
        <button
            class="fixed md:absolute top-[72px] left-3 z-50 p-2 rounded-md bg-slate-700 md:bg-slate-800"
            type="button"
            @click="logout"
        >
            <LogoutIcon width="24px" height="24px" color="fill-slate-300" />
        </button>
    </nav>
</template>
