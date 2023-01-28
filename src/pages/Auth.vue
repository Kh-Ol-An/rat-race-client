<script setup>
import { ref } from "vue";
import Input from '../components/Blank/plugins/Input.vue';
import { mapActions, mapGetters } from '../store/helpers.js';

const name = ref('');
const email = ref('');
const password = ref('');
const repeatPassword = ref('');

const { registration, login } = mapActions();
const { getLoading, getError } = mapGetters();
</script>

<template>
    <div class="w-full h-screen flex flex-col items-center justify-center">
        <div class="text-red-400">{{ getError }}</div>
        <div v-if="getLoading">getLoading...</div>
        <div v-else class="py-6 px-8 flex flex-col items-center justify-center gap-4 shadow-lg rounded-md bg-slate-800">
            <Input v-model:value="name" type="text" id="name" placeholder="Ім'я" />
            <Input v-model:value="email" type="text" id="email" placeholder="Пошта" />
            <Input v-model:value="password" type="text" id="password" placeholder="Пароль" />
            <Input v-model:value="repeatPassword" type="text" id="password" placeholder="Пароль ще раз" />
            <button class="text-white" type="button" @click="registration({ name, email, password })">
                Зареєструватися
            </button>
            <button class="text-white" type="button" @click="login({ email, password })">
                Увійти
            </button>
        </div>
    </div>
</template>
