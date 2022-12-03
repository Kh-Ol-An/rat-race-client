<template>
    <form class="py-4 px-8 w-full max-w-5xl flex flex-col gap-4 shadow rounded-md" @submit.prevent="submit">
        <Save />

        <div class="w-full grid grid-cols-2 gap-4">
            <Input v-model:value="name" id="name" type="text" placeholder="Ім'я" />

            <Input v-model:value="profession" id="profession" type="text" placeholder="Професія" />

            <div class="flex flex-col gap-4">
                <InfoField label="Готівка:" :value="cash" />
                <InfoField label="Активний дохід:" :value="salary" />
                <InfoField label="Пасивний дохід:" :value="passiveIncome" />


                <!-- Акції -->
                <h2 class="px-4 text-xl font-bold text-primary text-center">Акції</h2>
                <InputField
                    label="GC"
                    fieldType="shares"
                    fieldSubType="gc"
                    placeholderWorth="Вартість"
                    placeholderValue="Кількість"
                    @add="addShares"
                />
                <InputField
                    label="ЩУН"
                    fieldType="shares"
                    fieldSubType="shchun"
                    placeholderWorth="Вартість"
                    placeholderValue="Кількість"
                    @add="addShares"
                />
                <InputField
                    label="TO"
                    fieldType="shares"
                    fieldSubType="to"
                    placeholderWorth="Вартість"
                    placeholderValue="Кількість"
                    @add="addShares"
                />
                <InputField
                    label="CST"
                    fieldType="shares"
                    fieldSubType="cst"
                    placeholderWorth="Вартість"
                    placeholderValue="Кількість"
                    @add="addShares"
                />

                <!-- Доходи -->
                <h2 class="px-4 text-xl font-bold text-primary text-center">Доходи</h2>
                <Input v-model:value="salary" id="salary" placeholder="Зарплата" />
                <InputField
                    label="Малий бізнес"
                    fieldType="business"
                    fieldSubType="small"
                    placeholderWorth="Вартість"
                    placeholderValue="Доходи"
                    @add="addBusiness"
                />
                <InputField
                    label="Середній бізнес"
                    fieldType="business"
                    fieldSubType="middle"
                    placeholderWorth="Вартість"
                    placeholderValue="Доходи"
                    @add="addBusiness"
                />
                <InputField
                    label="Великий бізнес"
                    fieldType="business"
                    fieldSubType="big"
                    placeholderWorth="Вартість"
                    placeholderValue="Доходи"
                    @add="addBusiness"
                />
                <InputField
                    label="Корупційний бізнес"
                    fieldType="business"
                    fieldSubType="corrupt"
                    placeholderWorth="Вартість"
                    placeholderValue="Доходи"
                    @add="addBusiness"
                />


                <!-- Активи -->
                <h2 class="px-4 text-xl font-bold text-primary text-center">Активи</h2>
                <ul class="flex flex-col gap-2">
                    <li class="grid grid-cols-3 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
                        <span>
                            Бізнес
                        </span>
                        <span>
                            Вартість
                        </span>
                        <span>
                            Доходи
                        </span>
                    </li>
                    <List
                        v-for="{id, worth, value} in user.business.small"
                        :key="id"
                        label="Малий"
                        :worth="worth"
                        :value="value"
                    />
                    <List
                        v-for="{id, worth, value} in user.business.middle"
                        :key="id"
                        label="Середній"
                        :worth="worth"
                        :value="value"
                    />
                    <List
                        v-for="{id, worth, value} in user.business.big"
                        :key="id"
                        label="Великий"
                        :worth="worth"
                        :value="value"
                    />
                    <List
                        v-for="{id, worth, value} in user.business.corrupt"
                        :key="id"
                        label="Корупційний"
                        :worth="worth"
                        :value="value"
                    />
                </ul>

                <ul class="flex flex-col gap-2">
                    <li class="grid grid-cols-4 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
                        <span>
                            Акції
                        </span>
                        <span>
                            Ціна
                        </span>
                        <span>
                            Кількість
                        </span>
                        <span>
                            Вартість
                        </span>
                    </li>
                    <List
                        v-for="{id, worth, value, cost} in user.shares.gc"
                        :key="id"
                        label="GC"
                        :worth="worth"
                        :value="value"
                        :cost="cost"
                    />
                    <List
                        v-for="{id, worth, value, cost} in user.shares.shchun"
                        :key="id"
                        label="ЩУН"
                        :worth="worth"
                        :value="value"
                        :cost="cost"
                    />
                    <List
                        v-for="{id, worth, value, cost} in user.shares.to"
                        :key="id"
                        label="TO"
                        :worth="worth"
                        :value="value"
                        :cost="cost"
                    />
                    <List
                        v-for="{id, worth, value, cost} in user.shares.cst"
                        :key="id"
                        label="CST"
                        :worth="worth"
                        :value="value"
                        :cost="cost"
                    />
                </ul>
            </div>

            <div class="flex flex-col gap-4">
                <InfoField label="Борги:" :value="debt" />
            </div>
        </div>

        <Save />
    </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import Save from './Save.vue';
import Input from './Input.vue';
import InfoField from './InfoField.vue';
import List from './List.vue';
import InputField from './InputField.vue';
import { removingSpaces } from '../../helpers/formating-values.js';

const user = ref({
    name: '',
    profession: '',
    shares: {
        gc: [],
        shchun: [],
        to: [],
        cst: [],
    },
    business: {
        small: [],
        middle: [],
        big: [],
        corrupt: [],
    },
});

const addShares = (fieldType, fieldSubType, id, worth, value) =>
    user.value[fieldType][fieldSubType].push({
        id,
        worth: removingSpaces(worth),
        value: removingSpaces(value),
        cost: String(removingSpaces(worth) * removingSpaces(value)),
    });

const addBusiness = (fieldType, fieldSubType, id, worth, value) =>
    user.value[fieldType][fieldSubType].push({ id, worth: removingSpaces(worth), value: removingSpaces(value) });
const name = ref('');
const profession = ref('');

const cash = computed(() => {
    return '';
});
const debt = computed(() => {
    return '';
});
const passiveIncome = computed(() => {
    return '';
});

const salary = ref('');

const submit = () => {
    console.log('user: ', user);
}
</script>
