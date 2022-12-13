<template>
    <div v-if="userName.length === 0" class="flex items-center gap-3">
        <Input v-model:value="name" id="name" typeText placeholder="Ім'я" />
        <Add :value="name" @add="$emit('add:name', name)" />
    </div>
    <InfoField v-if="userName.length > 0" label="Ім'я:" :value="userName" />

    <div v-if="userProfession.length === 0" class="flex items-center gap-3">
        <Input v-model:value="profession" id="profession" typeText placeholder="Професія" />
        <Add :value="profession" @add="$emit('add:profession', profession)" />
    </div>
    <InfoField v-if="userProfession.length > 0" label="Професія:" :value="userProfession" />
</template>

<script setup>
import { ref } from "vue";
import Input from './Input.vue';
import Add from './Add.vue';
import InfoField from './InfoField.vue';

defineProps({
    userName: {
        type: String,
        required: true,
    },
    userProfession: {
        type: String,
        required: true,
    },
});

const name = ref('');
const profession = ref('');
</script>
