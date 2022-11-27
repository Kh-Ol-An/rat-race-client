<template>
    <form class="py-4 px-8 w-full max-w-5xl flex flex-col gap-4 shadow rounded-md" @submit.prevent="submit">
        <Save />

        <div class="w-full grid grid-cols-2 gap-4">
            <Input v-model:value="name" id="name" type="text" placeholder="Ім'я" />

            <Input v-model:value="profession" id="profession" type="text" placeholder="Професія" />

            <div class="flex flex-col gap-4">
                <Input v-model:value="cash" id="cash" placeholder="Готівка" />
                <InfoField label="Активний дохід:" :value="salary" />
                <InfoField label="Пасивний дохід:" :value="passiveIncome" />

                <InputField label="Акції GC:">
                    <Input v-model:value="gcSharePrice" id="gc-share-price" placeholder="Ціна" smallLabel />
                    <Input v-model:value="gcSharesCount" id="gc-share-count" placeholder="Кількість" smallLabel />
                </InputField>
                <InputField label="Акції ЩУН:">
                    <Input v-model:value="shchunSharePrice" id="shchun-share-price" placeholder="Ціна" smallLabel />
                    <Input v-model:value="shchunSharesCount" id="shchun-share-count" placeholder="Кількість" smallLabel />
                </InputField>
                <InputField label="Акції TO:">
                    <Input v-model:value="toSharePrice" id="to-share-price" placeholder="Ціна" smallLabel />
                    <Input v-model:value="toSharesCount" id="to-share-count" placeholder="Кількість" smallLabel />
                </InputField>
                <InputField label="Акції CST:">
                    <Input v-model:value="cstSharePrice" id="cst-share-price" placeholder="Ціна" smallLabel />
                    <Input v-model:value="cstSharesCount" id="cst-share-count" placeholder="Кількість" smallLabel />
                </InputField>

                <Input v-model:value="salary" id="salary" placeholder="Зарплата" />
                <InputField label="Малий бізнес:">
                    <Input v-model:value="smallBusinessValue" id="small-business-value" placeholder="Вартість" smallLabel />
                    <Input v-model:value="smallBusinessIncome" id="small-business-income" placeholder="Доходи" smallLabel />
                </InputField>
                <InputField label="Середній бізнес:">
                    <Input v-model:value="middleBusinessValue" id="small-business-value" placeholder="Вартість" smallLabel />
                    <Input v-model:value="middleBusinessIncome" id="middle-business-income" placeholder="Доходи" smallLabel />
                </InputField>
                <InputField label="Великий бізнес:">
                    <Input v-model:value="bigBusinessValue" id="big-business-value" placeholder="Вартість" smallLabel />
                    <Input v-model:value="bigBusinessIncome" id="big-business-income" placeholder="Доходи" smallLabel />
                </InputField>
                <InputField label="Корупційний бізнес:">
                    <Input v-model:value="corruptBusinessValue" id="corrupt-business-value" placeholder="Вартість" smallLabel />
                    <Input v-model:value="corruptBusinessIncome" id="corrupt-business-income" placeholder="Доходи" smallLabel />
                </InputField>
            </div>

            <div class="flex flex-col gap-4">
                <Input v-model:value="debt" id="debt" placeholder="Борги" />
            </div>
        </div>

        <Save />
    </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import Save from "./Save.vue";
import Input from "./Input.vue";
import InfoField from "./InfoField.vue";
import InputField from "./InputField.vue";

const name = ref('');
const profession = ref('');

const cash = ref(null);
const debt = ref(null);

const gcSharePrice = ref(null);
const gcSharesCount = ref(null);
const shchunSharePrice = ref(null);
const shchunSharesCount = ref(null);
const toSharePrice = ref(null);
const toSharesCount = ref(null);
const cstSharePrice = ref(null);
const cstSharesCount = ref(null);

const salary = ref(null);
const smallBusinessValue = ref(null);
const smallBusinessIncome = ref(null);
const middleBusinessValue = ref(null);
const middleBusinessIncome = ref(null);
const bigBusinessValue = ref(null);
const bigBusinessIncome = ref(null);
const corruptBusinessValue = ref(null);
const corruptBusinessIncome = ref(null);
const passiveIncome = computed(() => {
    return '';
});

const submit = () => {
    const player = {
        name: name.value,
        profession: profession.value,
        gc: {
            price: gcSharePrice.value,
            count: gcSharesCount.value,
        },
        shchun: {
            price: shchunSharePrice.value,
            count: shchunSharesCount.value,
        },
        to: {
            price: toSharePrice.value,
            count: toSharesCount.value,
        },
        cst: {
            price: cstSharePrice.value,
            count: cstSharesCount.value,
        },
        salary: salary.value,
        business: {
            small: {
                value: smallBusinessValue.value,
                income: smallBusinessIncome.value,
            },
            middle: {
                value: middleBusinessValue.value,
                income: middleBusinessIncome.value,
            },
            big: {
                value: bigBusinessValue.value,
                income: bigBusinessIncome.value,
            },
            corrupt: {
                value: corruptBusinessValue.value,
                income: corruptBusinessIncome.value,
            },
        },
    };
    console.log('player: ', player);
}
</script>
