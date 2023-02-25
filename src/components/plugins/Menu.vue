<script setup>
import { ref } from 'vue'
import { mapActions } from '../../store/helpers.js'
import HomeIcon from '../../assets/images/icons/HomeIcon.vue'
import BlankIcon from '../../assets/images/icons/BlankIcon.vue'
import RatIcon from '../../assets/images/icons/RatIcon.vue'
import GameIcon from '../../assets/images/icons/GameIcon.vue'
import LogoutIcon from '../../assets/images/icons/LogoutIcon.vue'

const { logout } = mapActions()
const show = ref(false)
</script>

<template>
    <button
        class="fixed md:absolute top-6 md:top-2.5 left-6 md:left-2.5 z-50 p-2 flex flex-col gap-2 rounded-md bg-slate-700 md:bg-slate-800"
        type="button"
        @click="show = !show"
    >
        <span class="w-8 h-0.5 block bg-slate-300"></span>
        <span class="w-8 h-0.5 block bg-slate-300"></span>
        <span class="w-8 h-0.5 block bg-slate-300"></span>
    </button>
    <nav v-if="show" class="">
        <router-link
            class="fixed md:absolute top-0 left-[96px] z-50 p-2 rounded-md bg-slate-700 md:bg-slate-800"
            to="/"
        >
            <HomeIcon color="fill-slate-300" />
        </router-link>
        <router-link
            class="fixed md:absolute top-8 left-[86px] z-50 p-2 rounded-md bg-slate-700 md:bg-slate-800"
            to="/blank"
        >
            <BlankIcon color="stroke-slate-300" />
        </router-link>
        <router-link
            class="fixed md:absolute top-[64px] left-[64px] z-50 p-2 rounded-md bg-slate-700 md:bg-slate-800"
            to="/rat"
        >
            <RatIcon color="fill-slate-300" />
        </router-link>
        <router-link
            class="fixed md:absolute top-[74px] left-8 z-50 p-2 rounded-md bg-slate-700 md:bg-slate-800"
            to="/game"
        >
            <GameIcon color="fill-slate-300" />
        </router-link>
        <button
            class="fixed md:absolute top-[78px] left-0 z-50 p-2 rounded-md bg-slate-700 md:bg-slate-800"
            type="button"
            @click="logout"
        >
            <LogoutIcon color="fill-slate-300" />
        </button>
    </nav>
</template>
