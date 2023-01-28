<script setup>
import { ref } from "vue";
import Input from '../components/Blank/plugins/Input.vue';
import { mapActions, mapGetters } from '../store/helpers.js';

const isRegistration = ref(false);

const name = ref('');
const email = ref('');
const password = ref('');
const repeatPassword = ref('');

const { registration, login } = mapActions();
const { getLoading, getError } = mapGetters();
</script>

<template>
    <div class="w-full h-screen flex flex-col items-center justify-center">
        <div v-if="getLoading">getLoading...</div>
        <div v-else class="py-6 px-8 flex flex-col items-center justify-center gap-4 shadow-lg rounded-md bg-slate-800">
            <p v-if="getError" class="text-xs text-opposite">{{ getError }}</p>
            <Input v-if="isRegistration" v-model:value="name" type="text" id="name" placeholder="Ім'я" />
            <Input v-model:value="email" type="text" id="email" placeholder="Пошта" />
            <Input v-model:value="password" type="text" id="password" placeholder="Пароль" />
            <Input
                v-if="isRegistration"
                v-model:value="repeatPassword"
                type="text"
                id="password"
                placeholder="Пароль ще раз"
            />
            <p class="text-sm text-slate-400 text-center">
                {{ isRegistration ? 'В мене вже є обліковий запис.' : 'В мене ще немає облікового запису.' }}<br>Хочу
                <button class="text-primary font-bold" type="button" @click="isRegistration = !isRegistration">
                    {{ isRegistration ? 'увійти' : 'зареєструватися' }}
                </button>
            </p>
            <button
                v-if="isRegistration"
                class="w-full h-8 rounded bg-gradient-to-b from-primaryLight to-primary text-slate-100"
                type="button"
                @click="registration({ name, email, password })"
            >
                Зареєструватися
            </button>
            <button
                v-else
                class="w-full h-8 rounded bg-gradient-to-b from-primaryLight to-primary text-slate-100"
                type="button"
                @click="login({ email, password })"
            >
                Увійти
            </button>
        </div>
    </div>
</template>
