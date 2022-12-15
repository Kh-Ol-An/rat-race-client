<template>
    <div v-if="user.name.length === 0" class="flex items-center gap-3">
        <Input v-model:value="name" id="name" typeText placeholder="Ім'я" />
        <Add :value="name" @add="$emit('add:name', name)" />
    </div>
    <InfoField v-if="user.name.length > 0" labelClasses="text-additional" label="Ім'я:" :value="user.name" />

    <div v-if="user.profession.length === 0" class="flex items-center gap-3">
        <Input v-model:value="profession" id="profession" typeText placeholder="Професія" />
        <Add :value="profession" @add="$emit('add:profession', profession)" />
    </div>
    <InfoField v-if="user.profession.length > 0" labelClasses="text-additional" label="Професія:" :value="user.profession" />
</template>

<script setup>
import { ref, toRef } from "vue";
import Input from './Input.vue';
import Add from './Add.vue';
import InfoField from './InfoField.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const name = ref('');
const profession = ref('');
</script>
