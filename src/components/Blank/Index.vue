<template>
    <form class="py-4 px-8 w-full max-w-5xl flex flex-col gap-4 shadow rounded-md" @submit.prevent="submit">
        <Save />

        <div class="w-full grid grid-cols-2 gap-4">
            <div v-if="user.name.length === 0" class="flex items-center gap-3">
                <Input v-model:value="name" id="name" typeText placeholder="Ім'я" />
                <Add :value="name" @add="addName" />
            </div>
            <InfoField v-if="user.name.length > 0" label="Ім'я:" :value="user.name" />

            <div v-if="user.profession.length === 0" class="flex items-center gap-3">
                <Input v-model:value="profession" id="profession" typeText placeholder="Професія" />
                <Add :value="profession" @add="addProfession" />
            </div>
            <InfoField v-if="user.profession.length > 0" label="Професія:" :value="user.profession" />

            <div class="flex flex-col gap-4">
                <InfoField label="Готівка:" :value="cash" />
                <InfoField label="Активний дохід:" :value="user.salary" />
                <InfoField label="Пасивний дохід:" :value="passiveIncome" />
                <InfoField label="Загальний дохід:" :value="income" />
                <InfoField opposite label="Загальні витрати:" :value="expenses" />
                <InfoField label="Грошовий потік:" :value="cashFlow" />

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
                <div class="flex items-center gap-3">
                    <Input v-model:value="salary" id="salary" placeholder="Зарплата" />
                    <Add :value="salary" @add="addSalary" />
                </div>
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
                        :id="id"
                        label="Малий"
                        :worth="worth"
                        :value="value"
                        @edit="editBusinessSmall"
                    />
                    <List
                        v-for="{id, worth, value} in user.business.middle"
                        :key="id"
                        :id="id"
                        label="Середній"
                        :worth="worth"
                        :value="value"
                        @edit="editBusinessMiddle"
                    />
                    <List
                        v-for="{id, worth, value} in user.business.big"
                        :key="id"
                        :id="id"
                        label="Великий"
                        :worth="worth"
                        :value="value"
                        @edit="editBusinessBig"
                    />
                    <List
                        v-for="{id, worth, value} in user.business.corrupt"
                        :key="id"
                        :id="id"
                        label="Корупційний"
                        :worth="worth"
                        :value="value"
                        @edit="editBusinessCorrupt"
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
                <InfoField opposite label="Борги:" :value="debt" />

                <!-- Багатство -->
                <h2 class="px-4 text-xl font-bold text-opposite text-center">Багатство</h2>
                <Quantity label="Квартири:" v-model:count="user.apartments" />
                <Quantity label="Автівки:" v-model:count="user.cars" />
                <Quantity label="Будинки:" v-model:count="user.houses" />
                <Quantity label="Яхти:" v-model:count="user.yachts" />
                <Quantity label="Літаки:" v-model:count="user.aircraft" />

                <!-- Капризи та примхи -->
                <h2 class="px-4 text-xl font-bold text-opposite text-center">Капризи та примхи</h2>
                <Quantity label="Капризи та примхи:" v-model:count="user.whimsAndFancies" />

                <!-- Сімейний стан -->
                <h2 class="px-4 text-xl font-bold text-opposite text-center">Сімейний стан</h2>
                <Checkbox v-model:checked="user.marriage" id="marriage" label="Шлюб:" />
                <Quantity label="Діти:" v-model:count="user.children" />

                <!-- Виплати за кредитами -->
                <h2 class="px-4 text-xl font-bold text-opposite text-center">Виплати за кредитами</h2>
                <InputCredit @add="addCredit" />
                <ul v-if="user.credit.length > 0">
                    <InfoCredit
                        v-for="{ id, name, body, payment, quantity } in user.credit"
                        :key="id"
                        :name="name"
                        :body="body"
                        :payment="payment"
                        :quantity="quantity"
                    />
                </ul>

                <!-- Витрати -->
                <h2 class="px-4 text-xl font-bold text-opposite text-center">Витрати</h2>
                <div v-if="user.rent.length === 0" class="flex items-center gap-3">
                    <Input v-model:value="rent" id="rent" placeholder="Оренда житла" />
                    <Add :value="rent" @add="addRent" />
                </div>
                <InfoField
                    v-if="user.rent.length > 0"
                    opposite
                    label="Оренда житла:"
                    :value="user.rent"
                    editable
                    @edit="editRent"
                />

                <div v-if="user.food.length === 0" class="flex items-center gap-3">
                    <Input v-model:value="food" id="food" placeholder="Витрати на харчування" />
                    <Add :value="food" @add="addFood" />
                </div>
                <InfoField v-if="user.food.length > 0" opposite label="Витрати на харчування:" :value="user.food" />

                <div v-if="user.clothes.length === 0" class="flex items-center gap-3">
                    <Input v-model:value="clothes" id="food" placeholder="Витрати на одяг" />
                    <Add :value="clothes" @add="addClothes" />
                </div>
                <InfoField v-if="user.clothes.length > 0" opposite label="Витрати на одяг:" :value="user.clothes" />

                <div v-if="user.fare.length === 0" class="flex items-center gap-3">
                    <Input v-model:value="fare" id="food" placeholder="Витрати на проїзд" />
                    <Add :value="fare" @add="addFare" />
                </div>
                <InfoField
                    v-if="user.fare.length > 0"
                    opposite
                    label="Витрати на проїзд:"
                    :value="user.fare"
                    editable
                    @edit="editFare"
                />

                <div v-if="user.phone.length === 0" class="flex items-center gap-3">
                    <Input v-model:value="phone" id="food" placeholder="Витрати на телефонні розмови" />
                    <Add :value="phone" @add="addPhone" />
                </div>
                <InfoField
                    v-if="user.phone.length > 0"
                    opposite
                    label="Витрати на телефонні розмови:"
                    :value="user.phone"
                />
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
import Add from './Add.vue';
import Quantity from './Quantity.vue';
import Checkbox from './Checkbox.vue';
import InputCredit from './InputCredit.vue';
import InfoCredit from './InfoCredit.vue';
import { removingSpaces } from '../../helpers/formating-values.js';

const user = ref({
    name: '',
    profession: '',
    salary: '',
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
    apartments: 0,
    cars: 0,
    houses: 0,
    yachts: 0,
    aircraft: 0,
    whimsAndFancies: 0,
    marriage: false,
    children: 0,
    credit: [],
    rent: '',
    food: '',
    clothes: '',
    fare: '',
    phone: '',
});

const name = ref('');
const addName = () => user.value.name = name.value;

const profession = ref('');
const addProfession = () => user.value.profession = profession.value;

// active
const addShares = (fieldType, fieldSubType, id, worth, value) =>
    user.value[fieldType][fieldSubType].push({
        id,
        worth: removingSpaces(worth),
        value: removingSpaces(value),
        cost: String(removingSpaces(worth) * removingSpaces(value)),
    });

const salary = ref('');
const addSalary = () => user.value.salary = salary.value;

const addBusiness = (fieldType, fieldSubType, id, worth, value) =>
    user.value[fieldType][fieldSubType].push({ id, worth: removingSpaces(worth), value: removingSpaces(value) });
const editBusinessSmall = (id, editValue) => {
    user.value.business.small.find(business => business.id === id && (business.value = editValue.value));
}
const editBusinessMiddle = (id, editValue) => {
    user.value.business.middle.find(business => business.id === id && (business.value = editValue.value));
}
const editBusinessBig = (id, editValue) => {
    user.value.business.big.find(business => business.id === id && (business.value = editValue.value));
}
const editBusinessCorrupt = (id, editValue) => {
    user.value.business.corrupt.find(business => business.id === id && (business.value = editValue.value));
}

const cash = computed(() => {
    return '';
});
const passiveIncome = computed(() => {
    let sum = 0;
    user.value.business.small.map(business => sum += Number(business.value));
    user.value.business.middle.map(business => sum += Number(business.value));
    user.value.business.big.map(business => sum += Number(business.value));
    user.value.business.corrupt.map(business => sum += Number(business.value));
    return sum;
});
const income = computed(() => {
    return Number(user.value.salary) + Number(passiveIncome.value);
});
const cashFlow = computed(() => {
    return '';
});

// passive
const addCredit = (id, name, payment, quantity) =>
    user.value.credit.push({ id, name, body: Number(payment) * Number(quantity), payment, quantity });

const rent = ref('');
const addRent = () => user.value.rent = rent.value;
const editRent = () => user.value.rent = '';

const food = ref('');
const addFood = () => user.value.food = food.value;

const clothes = ref('');
const addClothes = () => user.value.clothes = clothes.value;

const fare = ref('');
const addFare = () => user.value.fare = fare.value;
const editFare = () => user.value.fare = '';

const phone = ref('');
const addPhone = () => user.value.phone = phone.value;

const debt = computed(() => {
    return '';
});
const expenses = computed(() => {
    return '';
});

const submit = () => {
    console.log('user: ', user.value);
}
</script>
