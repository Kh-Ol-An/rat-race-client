<template>
    <h2 class="px-4 text-xl font-bold text-primary text-center">Доходи</h2>

    <!-- Зарплата -->
    <div v-if="userSalary === 0" class="flex items-center gap-3">
        <Input v-model:value="salary" id="salary" placeholder="Зарплата" />
        <Add :value="salary" @add="$emit('add:salary', Number(removingSpaces(salary)))" />
    </div>
    <InfoField
        v-if="userSalary > 0"
        label="Зарплата:"
        :value="userSalary"
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
    <ul v-if="small.length > 0" class="flex flex-col gap-2">
        <li class="grid grid-cols-2 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
            <span>
                Вартість
            </span>
            <span>
                Доходи
            </span>
        </li>
        <List
            v-for="{id, worth, value} in small"
            :key="id"
            :id="id"
            subType="small"
            :worth="worth"
            :value="value"
            @edit="editBusiness"
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
    <ul v-if="middle.length > 0" class="flex flex-col gap-2">
        <li class="grid grid-cols-2 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
            <span>
                Вартість
            </span>
            <span>
                Доходи
            </span>
        </li>
        <List
            v-for="{id, worth, value} in middle"
            :key="id"
            :id="id"
            subType="middle"
            :worth="worth"
            :value="value"
            @edit="editBusiness"
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
    <ul v-if="big.length > 0" class="flex flex-col gap-2">
        <li class="grid grid-cols-2 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
            <span>
                Вартість
            </span>
            <span>
                Доходи
            </span>
        </li>
        <List
            v-for="{id, worth, value} in big"
            :key="id"
            :id="id"
            subType="big"
            :worth="worth"
            :value="value"
            @edit="editBusiness"
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
    <ul v-if="corrupt.length > 0" class="flex flex-col gap-2">
        <li class="grid grid-cols-2 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
            <span>
                Вартість
            </span>
            <span>
                Доходи
            </span>
        </li>
        <List
            v-for="{id, worth, value} in corrupt"
            :key="id"
            :id="id"
            subType="corrupt"
            :worth="worth"
            :value="value"
            @edit="editBusiness"
        />
    </ul>
</template>

<script setup>
import { ref } from 'vue';
import Input from './Input.vue';
import Add from './Add.vue';
import InfoField from './InfoField.vue';
import InputField from './InputField.vue';
import List from './List.vue';
import { removingSpaces } from "../../helpers/formating-values.js";

defineProps({
    userSalary: {
        type: Number,
        required: true,
    },
    small: {
        type: Array,
        required: true,
    },
    middle: {
        type: Array,
        required: true,
    },
    big: {
        type: Array,
        required: true,
    },
    corrupt: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits([ 'add:business', 'edit:business' ]);

const salary = ref('');

const addBusiness = (type, subType, id, worth, value) => emit('add:business', type, subType, id, worth, value);
const editBusiness = (subType, id, value) => emit('edit:business', subType, id, value);
</script>
