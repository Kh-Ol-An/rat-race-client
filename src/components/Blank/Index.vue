<template>
    <form class="relative py-6 px-8 w-full max-w-5xl flex flex-col gap-4 shadow rounded-md" @submit.prevent="submit">
        <div class="grid grid-cols-2 gap-4">
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
        </div>

        <div class="flex items-center gap-4">
            <button
                class="py-2 px-24 shadow hover:shadow-lg rounded-md bg-opposite text-xl text-white font-bold leading-none transition-all duration-300"
                type="button"
                title="Заплатити"
                @click="decrement"
            >
                &#8722;
            </button>
            <Input v-model:value="transaction" id="transaction" placeholder="Транзакція" />
            <button
                class="py-2 px-24 shadow hover:shadow-lg rounded-md bg-secondary  text-xl text-white font-bold leading-none transition-all duration-300"
                type="button"
                title="Отримати"
                @click="increment"
            >
                &#43;
            </button>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-4">
                <InfoField opposite label="Борги:" :value="debt" />

                <!-- Витрати -->
                <h2 class="px-4 text-xl font-bold text-opposite text-center">Витрати</h2>
                <div v-if="user.rent === 0" class="flex items-center gap-3">
                    <Input v-model:value="rent" id="rent" placeholder="Оренда житла" />
                    <Add :value="rent" opposite @add="addRent" />
                </div>
                <InfoField
                    v-if="user.rent > 0"
                    opposite
                    label="Оренда житла:"
                    :value="user.rent"
                    editable
                    @edit="editRent"
                />

                <div v-if="user.food === 0" class="flex items-center gap-3">
                    <Input v-model:value="food" id="food" placeholder="Витрати на харчування" />
                    <Add :value="food" opposite @add="addFood" />
                </div>
                <InfoField v-if="user.food > 0" opposite label="Витрати на харчування:" :value="user.food" />

                <div v-if="user.clothes === 0" class="flex items-center gap-3">
                    <Input v-model:value="clothes" id="food" placeholder="Витрати на одяг" />
                    <Add :value="clothes" opposite @add="addClothes" />
                </div>
                <InfoField v-if="user.clothes > 0" opposite label="Витрати на одяг:" :value="user.clothes" />

                <div v-if="user.fare === 0" class="flex items-center gap-3">
                    <Input v-model:value="fare" id="food" placeholder="Витрати на проїзд" />
                    <Add :value="fare" opposite @add="addFare" />
                </div>
                <InfoField
                    v-if="user.fare > 0"
                    opposite
                    label="Витрати на проїзд:"
                    :value="user.fare"
                    editable
                    @edit="editFare"
                />

                <div v-if="user.phone === 0" class="flex items-center gap-3">
                    <Input v-model:value="phone" id="food" placeholder="Витрати на телефонні розмови" />
                    <Add :value="phone" opposite @add="addPhone" />
                </div>
                <InfoField
                    v-if="user.phone > 0"
                    opposite
                    label="Витрати на телефонні розмови:"
                    :value="user.phone"
                />

                <!-- Багатство -->
                <h2 class="px-4 text-xl font-bold text-opposite text-center">Багатство</h2>
                <Quantity label="Квартири:" :expense="user.apartments" v-model:count="apartments" />
                <Quantity label="Автівки:" :expense="user.cars" v-model:count="cars" />
                <Quantity label="Будинки:" :expense="user.houses" v-model:count="houses" />
                <Quantity label="Яхти:" :expense="user.yachts" v-model:count="yachts" />
                <Quantity label="Літаки:" :expense="user.aircraft" v-model:count="aircraft" />

                <!-- Капризи та примхи -->
                <h2 class="px-4 text-xl font-bold text-opposite text-center">Капризи та примхи</h2>
                <Quantity label="Капризи та примхи:" v-model:count="user.whimsAndFancies" />

                <!-- Сімейний стан -->
                <h2 class="px-4 text-xl font-bold text-opposite text-center">Сімейний стан</h2>
                <Checkbox v-model:checked="user.marriage" id="marriage" label="Шлюб:" />
                <Quantity label="Діти:" :expense="user.children" v-model:count="children" />

                <!-- Виплати за кредитами -->
                <h2 class="px-4 text-xl font-bold text-opposite text-center">Виплати за кредитами</h2>
                <InputCredit @add="addCredit" />
                <ul v-if="user.credits.length > 0">
                    <li class="grid grid-cols-4 gap-2 border-b-2 border-b-silver-900 text-opposite font-bold">
                        <span>
                            Назва
                        </span>
                        <span>
                            Загалом
                        </span>
                        <span>
                            Платіж
                        </span>
                        <span>
                            Термін
                        </span>
                    </li>
                    <InfoCredit
                        v-for="{ id, name, body, payment, quantity } in user.credits"
                        :key="id"
                        :name="name"
                        :body="body"
                        :payment="payment"
                        :quantity="quantity"
                    />
                </ul>
            </div>

            <div class="flex flex-col gap-4">
                <InfoField label="Готівка:" :value="cash" />
                <InfoField label="Активний дохід:" :value="user.salary" />
                <InfoField label="Пасивний дохід:" :value="passiveIncome" />
                <InfoField label="Загальний дохід:" :value="income" />
                <InfoField opposite label="Загальні витрати:" :value="expenses" />
                <InfoField label="Грошовий потік:" :value="cashFlow" getting @get="getCashFlow" />

                <!-- Доходи -->
                <h2 class="px-4 text-xl font-bold text-primary text-center">Доходи</h2>
                <div v-if="user.salary === 0" class="flex items-center gap-3">
                    <Input v-model:value="salary" id="salary" placeholder="Зарплата" />
                    <Add :value="salary" @add="addSalary" />
                </div>
                <InfoField
                    v-if="user.salary > 0"
                    label="Зарплата:"
                    :value="user.salary"
                    editable
                    @edit="editSalary"
                />
                <InputField
                    label="Малий бізнес"
                    fieldType="business"
                    fieldSubType="small"
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
                        v-for="{id, worth, value} in user.business.small"
                        :key="id"
                        :id="id"
                        :worth="worth"
                        :value="value"
                        @edit="editBusinessSmall"
                    />
                </ul>
                <InputField
                    label="Середній бізнес"
                    fieldType="business"
                    fieldSubType="middle"
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
                        v-for="{id, worth, value} in user.business.middle"
                        :key="id"
                        :id="id"
                        :worth="worth"
                        :value="value"
                        @edit="editBusinessMiddle"
                    />
                </ul>
                <InputField
                    label="Великий бізнес"
                    fieldType="business"
                    fieldSubType="big"
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
                        v-for="{id, worth, value} in user.business.big"
                        :key="id"
                        :id="id"
                        :worth="worth"
                        :value="value"
                        @edit="editBusinessBig"
                    />
                </ul>
                <InputField
                    label="Корупційний бізнес"
                    fieldType="business"
                    fieldSubType="corrupt"
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
                        v-for="{id, worth, value} in user.business.corrupt"
                        :key="id"
                        :id="id"
                        :worth="worth"
                        :value="value"
                        @edit="editBusinessCorrupt"
                    />
                </ul>

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
                <ul v-if="user.shares.gc.length > 0" class="flex flex-col gap-2">
                    <li class="grid grid-cols-3 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
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
                        :worth="worth"
                        :value="value"
                        :cost="cost"
                    />
                </ul>
                <InputField
                    label="ЩУН"
                    fieldType="shares"
                    fieldSubType="shchun"
                    placeholderWorth="Вартість"
                    placeholderValue="Кількість"
                    @add="addShares"
                />
                <ul v-if="user.shares.shchun.length > 0" class="flex flex-col gap-2">
                    <li class="grid grid-cols-3 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
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
                        v-for="{id, worth, value, cost} in user.shares.shchun"
                        :key="id"
                        :worth="worth"
                        :value="value"
                        :cost="cost"
                    />
                </ul>
                <InputField
                    label="TO"
                    fieldType="shares"
                    fieldSubType="to"
                    placeholderWorth="Вартість"
                    placeholderValue="Кількість"
                    @add="addShares"
                />
                <ul v-if="user.shares.to.length > 0" class="flex flex-col gap-2">
                    <li class="grid grid-cols-3 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
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
                        v-for="{id, worth, value, cost} in user.shares.to"
                        :key="id"
                        :worth="worth"
                        :value="value"
                        :cost="cost"
                    />
                </ul>
                <InputField
                    label="CST"
                    fieldType="shares"
                    fieldSubType="cst"
                    placeholderWorth="Вартість"
                    placeholderValue="Кількість"
                    @add="addShares"
                />
                <ul v-if="user.shares.cst.length > 0" class="flex flex-col gap-2">
                    <li class="grid grid-cols-3 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
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
                        v-for="{id, worth, value, cost} in user.shares.cst"
                        :key="id"
                        :worth="worth"
                        :value="value"
                        :cost="cost"
                    />
                </ul>
            </div>
        </div>

        <button
            class="
                fixed left-10 bottom-10
                p-4
                shadow hover:shadow-lg
                rounded-full
                bg-opposite
                outline-0
                transition-all duration-300
            "
            type="button"
            title="Почати спочатку"
            @click="reset"
        >
            <ResetIcon width="30px" height="30px" />
        </button>

        <button
            class="
                fixed right-10 bottom-10
                p-4
                shadow hover:shadow-lg
                rounded-full
                bg-secondary
                outline-0
                transition-all duration-300
            "
            type="submit"
            title="Зберегти"
        >
            <SaveIcon width="30px" height="30px" color="fill-white" />
        </button>
    </form>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue';
import Input from './Input.vue';
import Add from './Add.vue';
import InfoField from './InfoField.vue';
import InputField from './InputField.vue';
import List from './List.vue';
import Quantity from './Quantity.vue';
import Checkbox from './Checkbox.vue';
import InputCredit from './InputCredit.vue';
import InfoCredit from './InfoCredit.vue';
import ResetIcon from '../icons/ResetIcon.vue';
import SaveIcon from '../icons/SaveIcon.vue';
import { removingSpaces } from '../../helpers/formating-values.js';

const savedUser = localStorage.getItem('user');
const user = savedUser ? reactive(JSON.parse(savedUser)) : reactive({
    name: '',
    profession: '',
    salary: 0,
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
    credits: [],
    rent: 0,
    food: 0,
    clothes: 0,
    fare: 0,
    phone: 0,
});

const name = ref('');
const addName = () => user.name = name.value;
const profession = ref('');
const addProfession = () => user.profession = profession.value;

const decrement = () => {
    balance.value -= Number(removingSpaces(transaction.value));
    transaction.value = '';
};
const increment = () => {
    balance.value += Number(removingSpaces(transaction.value));
    transaction.value = '';
};
const transaction = ref('');
const balance = ref(0);

// PASSIVE
const debt = computed(() => balance.value <= 0 ? balance.value : 0);

const expenses = computed(() => {
    let sum = 0;
    sum += user.apartments;
    sum += user.cars;
    sum += user.houses;
    sum += user.yachts;
    sum += user.aircraft;
    sum += user.children;
    user.credits.map(credit => sum += credit.payment);
    sum += user.rent;
    sum += user.food;
    sum += user.clothes;
    sum += user.fare;
    sum += user.phone;
    return sum;
});

const rent = ref('');
const addRent = () => user.rent = Number(removingSpaces(rent.value));
const editRent = () => user.rent = 0;

const food = ref('');
const addFood = () => user.food = Number(removingSpaces(food.value));

const clothes = ref('');
const addClothes = () => user.clothes = Number(removingSpaces(clothes.value));

const fare = ref('');
const addFare = () => user.fare = Number(removingSpaces(fare.value));
const editFare = () => user.fare = 0;

const phone = ref('');
const addPhone = () => user.phone = Number(removingSpaces(phone.value));

const apartments = ref(0);
const cars = ref(0);
const houses = ref(0);
const yachts = ref(0);
const aircraft = ref(0);
const children = ref(0);
watch([apartments, cars, houses, yachts, aircraft, children], () => {
    user.apartments = apartments.value * 200;
    user.cars = cars.value * 600;
    user.houses = houses.value * 1000;
    user.yachts = yachts.value * 1500;
    user.aircraft = aircraft.value * 5000;
    user.children = children.value * 300;
});

const addCredit = (id, name, payment, quantity) =>
    user.credits.push({ id, name, body: payment * quantity, payment, quantity });

// ACTIVE
const cash = computed(() => balance.value >= 0 ? balance.value : 0);
const passiveIncome = computed(() => {
    let sum = 0;
    user.business.small.map(business => sum += business.value);
    user.business.middle.map(business => sum += business.value);
    user.business.big.map(business => sum += business.value);
    user.business.corrupt.map(business => sum += business.value);
    return sum;
});
const income = computed(() => {
    return user.salary + passiveIncome.value;
});
const cashFlow = computed(() => {
    return income.value - expenses.value;
});
const getCashFlow = () => balance.value += cashFlow.value;

const salary = ref('');
const addSalary = () => user.salary = Number(removingSpaces(salary.value));
const editSalary = () => user.salary = 0;

const addBusiness = (fieldType, fieldSubType, id, worth, value) =>
    user[fieldType][fieldSubType].push({ id, worth, value });
const editBusinessSmall = (id, editValue) => {
    user.business.small.find(business => business.id === id && (business.value = editValue));
}
const editBusinessMiddle = (id, editValue) => {
    user.business.middle.find(business => business.id === id && (business.value = editValue));
}
const editBusinessBig = (id, editValue) => {
    user.business.big.find(business => business.id === id && (business.value = editValue));
}
const editBusinessCorrupt = (id, editValue) => {
    user.business.corrupt.find(business => business.id === id && (business.value = editValue));
}

const addShares = (fieldType, fieldSubType, id, worth, value) =>
    user[fieldType][fieldSubType].push({ id, worth, value, cost: worth * value });

const submit = () => localStorage.setItem('user', JSON.stringify(user));
const reset = () => {
    localStorage.removeItem('user');
    location.reload();
};
</script>
