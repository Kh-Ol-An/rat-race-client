<template>
    <div class="flex items-center">
        <div v-if="user.name.length === 0" class="flex items-center gap-3 w-full">
            <Input v-model:value="name" id="name" type="text" placeholder="Ім'я" />
            <Add :firstValue="name" @add="$emit('add:name', name)" />
        </div>
        <InfoField v-else labelClasses="text-additional" label="Ім'я:">
            <span class="ml-2 text-slate-800">
                {{ user.name }}
            </span>
        </InfoField>

        <div v-if="user.name.length > 0 && user.gender.length === 0" class="mx-auto flex items-center gap-3">
            <input class="peer hidden" type="radio" id="male" name="gender" value="male" v-model="gender">
            <label class="cursor-pointer" for="male">
                <MaleIcon width="24px" height="24px" :classes="gender === 'male' ? 'fill-primary' : 'fill-slate-300'" />
            </label>

            <input class="peer hidden" type="radio" id="female" name="gender" value="female" v-model="gender">
            <label class="cursor-pointer" for="female">
                <FemaleIcon
                    width="24px"
                    height="24px"
                    :classes="gender === 'female' ? 'fill-primary' : 'fill-slate-300'"
                />
            </label>
            <Add :firstValue="gender" @add="$emit('add:gender', gender)" />
        </div>
        <InfoField
            v-if="user.gender.length > 0"
            wrapClasses="mx-auto"
            labelClasses="text-additional"
            label="Стать:"
            :value="user.gender"
        >
            <MaleIcon v-if="user.gender === 'male'" width="24px" height="24px" classes="ml-4 fill-primary" />
            <FemaleIcon v-if="user.gender === 'female'" width="24px" height="24px" classes="ml-4 fill-primary" />
        </InfoField>
    </div>

    <div v-if="user.profession.length === 0" class="flex items-center gap-3">
        <Input v-model:value="profession" id="profession" type="text" placeholder="Професія" />
        <Add :firstValue="profession" @add="$emit('add:profession', profession)" />
    </div>
    <InfoField v-else labelClasses="text-additional" label="Професія:">
        <span class="ml-2 text-slate-800">
            {{ user.profession }}
        </span>
    </InfoField>
</template>

<script setup>
import { ref, toRef } from "vue";
import Input from '../plugins/Input.vue';
import Add from '../plugins/Add.vue';
import InfoField from '../plugins/InfoField.vue';
import MaleIcon from '../../icons/MaleIcon.vue';
import FemaleIcon from '../../icons/FemaleIcon.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const name = ref('');
const gender = ref('');
const profession = ref('');
</script>
