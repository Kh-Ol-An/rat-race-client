<template>
    <div class="w-full h-screen flex items-center justify-center">
        <div class="py-6 px-8 flex flex-col items-center justify-center gap-4 shadow-lg rounded-md bg-slate-800">
            <Input v-model:value="email" type="text" id="email" placeholder="Пошта" />
            <Input v-model:value="password" type="text" id="password" placeholder="Пароль" />
            <Input v-model:value="repeatPassword" type="text" id="repeat-password" placeholder="Повторити пароль" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Input from '../components/Blank/plugins/Input.vue';

const email = ref('');
const password = ref('');
const repeatPassword = ref('');

console.log(email.value, password.value);
</script>
