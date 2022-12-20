<template>
    <div v-if="user.name.length === 0" class="flex items-center gap-3">
        <Input v-model:value="name" id="name" type="text" placeholder="Ім'я" />
        <Add :firstValue="name" @add="$emit('add:name', name)" />
    </div>
    <InfoField v-if="user.name.length > 0" labelClasses="text-additional" label="Ім'я:" :value="user.name" />

    <div v-if="user.profession.length === 0" class="flex items-center gap-3">
        <Input v-model:value="profession" id="profession" type="text" placeholder="Професія" />
        <Add :firstValue="profession" @add="$emit('add:profession', profession)" />
    </div>
    <InfoField v-if="user.profession.length > 0" labelClasses="text-additional" label="Професія:" :value="user.profession" />
</template>

<script setup>
import { ref, toRef } from "vue";
import Input from '../plugins/Input.vue';
import Add from '../plugins/Add.vue';
import InfoField from '../plugins/InfoField.vue';

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
