<template>
    <form class="py-4 px-8 flex flex-col shadow rounded-md" @submit.prevent="submit">
        <button type="submit">
            Зберегти
        </button>

        <Head
            v-model:name="name"
            v-model:profession="profession"
        />

        <button type="submit">
            Зберегти
        </button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import Head from "./Head.vue";

const name = ref('');
const profession = ref('');
const submit = () => {
    console.log('name', name);
    console.log('profession', profession);
}
</script>
