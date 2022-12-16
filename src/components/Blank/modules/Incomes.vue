<template>
    <h2 class="px-4 text-xl font-bold text-primary text-center">Доходи</h2>

    <!-- Зарплата -->
    <div v-if="user.salary === 0" class="flex items-center gap-3">
        <Input v-model:value="salary" id="salary" placeholder="Зарплата" />
        <Add :value="salary" @add="$emit('add:salary', Number(removingSpaces(salary)))" />
    </div>
    <InfoField
        v-if="user.salary > 0"
        labelClasses="text-additional"
        label="Зарплата:"
        :value="user.salary"
        editable
        @edit="$emit('edit:salary')"
    />

    <!-- Малий -->
    <InputField
        label="Малий бізнес"
        type="business"
        subType="small"
        placeholderWorth="Вартість"
        placeholderValue="Доходи"
        @add="addBusiness"
    />
    <ul v-if="user.business.small.length > 0" class="flex flex-col gap-2">
        <li class="grid grid-cols-2 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
            <span>
                Вартість
            </span>
            <span>
                Доходи
            </span>
        </li>
        <List
            v-for="({ id, worth, value }, idx) in user.business.small"
            :key="id"
            :id="id"
            subType="small"
            :worth="worth"
            :value="value"
            :idx="idx"
            :listLength="user.business.small.length"
            @edit="editBusiness"
            @delete="deleteBusiness('small', id)"
        />
    </ul>

    <!-- Середній -->
    <InputField
        label="Середній бізнес"
        type="business"
        subType="middle"
        placeholderWorth="Вартість"
        placeholderValue="Доходи"
        @add="addBusiness"
    />
    <ul v-if="user.business.middle.length > 0" class="flex flex-col gap-2">
        <li class="grid grid-cols-2 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
            <span>
                Вартість
            </span>
            <span>
                Доходи
            </span>
        </li>
        <List
            v-for="({ id, worth, value }, idx)  in user.business.middle"
            :key="id"
            :id="id"
            subType="middle"
            :worth="worth"
            :value="value"
            :idx="idx"
            :listLength="user.business.middle.length"
            @edit="editBusiness"
            @delete="deleteBusiness('middle', id)"
        />
    </ul>

    <!-- Великий -->
    <InputField
        label="Великий бізнес"
        type="business"
        subType="big"
        placeholderWorth="Вартість"
        placeholderValue="Доходи"
        @add="addBusiness"
    />
    <ul v-if="user.business.big.length > 0" class="flex flex-col gap-2">
        <li class="grid grid-cols-2 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
            <span>
                Вартість
            </span>
            <span>
                Доходи
            </span>
        </li>
        <List
            v-for="({ id, worth, value }, idx)  in user.business.big"
            :key="id"
            :id="id"
            subType="big"
            :worth="worth"
            :value="value"
            :idx="idx"
            :listLength="user.business.big.length"
            @edit="editBusiness"
            @delete="deleteBusiness('big', id)"
        />
    </ul>

    <!-- Корупційний -->
    <InputField
        label="Корупційний бізнес"
        type="business"
        subType="corrupt"
        placeholderWorth="Вартість"
        placeholderValue="Доходи"
        @add="addBusiness"
    />
    <ul v-if="user.business.corrupt.length > 0" class="flex flex-col gap-2">
        <li class="grid grid-cols-2 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
            <span>
                Вартість
            </span>
            <span>
                Доходи
            </span>
        </li>
        <List
            v-for="({ id, worth, value }, idx) in user.business.corrupt"
            :key="id"
            :id="id"
            subType="corrupt"
            :worth="worth"
            :value="value"
            :idx="idx"
            :listLength="user.business.corrupt.length"
            @edit="editBusiness"
            @delete="deleteBusiness('corrupt', id)"
        />
    </ul>
</template>

<script setup>
import { ref, toRef } from 'vue';
import Input from '../plugins/Input.vue';
import Add from '../plugins/Add.vue';
import InfoField from '../plugins/InfoField.vue';
import InputField from '../plugins/InputField.vue';
import List from '../plugins/List.vue';
import { removingSpaces } from "../../../helpers/formating-values.js";

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([ 'add:business', 'edit:business' ]);

const salary = ref('');

const addBusiness = (type, subType, id, worth, value) => emit('add:business', type, subType, id, worth, value);
const editBusiness = (subType, id, value) => emit('edit:business', subType, id, value);
const deleteBusiness = (subType, id) => emit('delete:business', subType, id);
</script>
