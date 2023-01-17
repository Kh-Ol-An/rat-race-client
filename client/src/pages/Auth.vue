<template>
    <div class="w-full h-screen flex flex-col items-center justify-center">
        <div v-if="getError.length > 0" class="text-red-400">{{ getError }}</div>
        <div v-if="getLoading">getLoading...</div>
        <div v-else class="py-6 px-8 flex flex-col items-center justify-center gap-4 shadow-lg rounded-md bg-slate-800">
            <p class="text-white">{{ getAuth ? getUser.email : 'Авторизуйся' }}</p>
            <p class="text-white">{{ getUser.isActivated ? getUser.id : 'Активуй аккаунт' }}</p>
            <Input v-model:value="name" type="text" id="name" placeholder="Ім'я" />
            <Input v-model:value="email" type="text" id="email" placeholder="Пошта" />
            <Input v-model:value="password" type="text" id="password" placeholder="Пароль" />
            <button class="text-white" type="button" @click="registration({ name, email, password })">
                Зареєструватися
            </button>
            <button class="text-white" type="button" @click="login({ email, password })">
                Увійти
            </button>
            <button class="text-white" type="button" @click="logout">
                Вийти
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Input from '../components/Blank/plugins/Input.vue';
import { mapActions, mapGetters } from '../store/helpers.js';

const name = ref('');
const email = ref('');
const password = ref('');

const { registration, login, logout } = mapActions();
const { getUser, getAuth, getLoading, getError } = mapGetters();
</script>
