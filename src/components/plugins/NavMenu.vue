<script setup>
import { ref } from 'vue'
import { mapActions } from '../../store/helpers.js'
import HomeIcon from '../../assets/images/icons/HomeIcon.vue'
import BlankIcon from '../../assets/images/icons/BlankIcon.vue'
import GameIcon from '../../assets/images/icons/GameIcon.vue'
import LogoutIcon from '../../assets/images/icons/LogoutIcon.vue'

const { logout } = mapActions()
const show = ref(false)
</script>

<template>
    <button
        class="fixed top-6 left-6 z-50 flex flex-col gap-2 rounded-md bg-slate-700 p-2 md:absolute md:top-2.5 md:left-2.5 md:bg-slate-800"
        type="button"
        @click="show = !show"
    >
        <span class="block h-0.5 w-8 bg-slate-300"></span>
        <span class="block h-0.5 w-8 bg-slate-300"></span>
        <span class="block h-0.5 w-8 bg-slate-300"></span>
    </button>
    <nav v-if="show" class="">
        <router-link
            class="fixed top-2 left-[88px] z-50 rounded-md bg-slate-700 p-2 md:absolute md:bg-slate-800"
            to="/"
        >
            <HomeIcon color="fill-slate-300" />
        </router-link>
        <router-link
            class="fixed top-10 left-[76px] z-50 rounded-md bg-slate-700 p-2 md:absolute md:bg-slate-800"
            to="/blank"
        >
            <BlankIcon color="stroke-slate-300" />
        </router-link>
        <router-link
            class="fixed top-16 left-12 z-50 rounded-md bg-slate-700 p-2 md:absolute md:bg-slate-800"
            to="/game"
        >
            <GameIcon color="fill-slate-300" />
        </router-link>
        <button
            class="fixed top-[72px] left-3 z-50 rounded-md bg-slate-700 p-2 md:absolute md:bg-slate-800"
            type="button"
            @click="logout"
        >
            <LogoutIcon color="fill-slate-300" />
        </button>
    </nav>
</template>
