<script setup>
import { onMounted, ref, onErrorCaptured } from "vue";
import { mapActions } from './store/helpers.js';
import router from "./router/index.js";

const { checkAuth } = mapActions();

const error = ref(null);

onErrorCaptured(() => {
    error.value = "Ой-йо-йой!!! Щось пішло не так...";
});

onMounted(() => {
    if (localStorage.getItem('token')) {
        checkAuth();
    }
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'Auth' && !localStorage.getItem('token')) {
        next({
            path: 'auth',
            replace: true
        })
    }

    if (to.name === 'Auth' && localStorage.getItem('token')) {
        next({
            path: '/',
            replace: true
        })
    }

    next();
})
</script>

<template>
    <notifications />
    <div v-if="error" class="w-full h-screen flex items-center justify-center">
        <span class="text-2xl text-opposite font-bold text-center">{{ error }}</span>
    </div>
    <Suspense>
        <template #default>
            <router-view></router-view>
        </template>
        <template #fallback>
            <h1>Loading...</h1>
        </template>
    </Suspense>
</template>

<style>
/* reset autofill for input */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: inset 0 0 0 1000px #1e293b !important; /* Цвет фона */
    -webkit-text-fill-color: #528D36 !important; /* цвет текста */
    transition: background-color 600000s 0s, color 600000s 0s;
}

/* Removing arrows for the input number */
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
