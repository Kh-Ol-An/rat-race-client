<template>
    <form class="relative py-6 px-8 w-full max-w-5xl flex flex-col gap-4 shadow rounded-md" @submit.prevent="submit">
        <div class="grid grid-cols-2 gap-4">
            <UserIdentification :userProp="user" @add:name="addName" @add:profession="addProfession" />
        </div>

        <div class="flex items-center gap-4">
            <Transaction @decrement="decrement" @increment="increment" />
        </div>

        <InfoField
            wrapClasses="mx-auto"
            labelClasses="text-lg font-bold text-primary"
            label="Грошовий потік:"
            :value="cashFlow"
            getting
            @get="getCashFlow"
        />

        <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-4">
                <ExpenseInfo :debt="debt" :expenses="expenses" />

                <!-- Витрати -->
                <Costs
                    :userProp="user"
                    @add:rent="addRent"
                    @edit:rent="editRent"
                    @add:food="addFood"
                    @add:clothes="addClothes"
                    @add:fare="addFare"
                    @edit:fare="editFare"
                    @add:phone="addPhone"
                />

                <!-- Багатство -->
                <Riches
                    :userProp="user"
                    @change:apartments="changeApartments"
                    @change:cars="changeCars"
                    @change:houses="changeHouses"
                    @change:yachts="changeYachts"
                    @change:aircraft="changeAircraft"
                />

                <!-- Капризи та примхи -->
                <WhimsAndFancies :whimsAndFancies="user.whimsAndFancies" @change="changeWhimsAndFancies" />

                <!-- Сімейний стан -->
                <FamilyStatus
                    :userProp="user"
                    @change:marriage="changeMarriage"
                    @change:children="changeChildren"
                />

                <!-- Виплати за кредитами -->
                <Credits :credits="user.credits" @add="addCredit" />
            </div>

            <div class="flex flex-col gap-4">
                <IncomeInfo :cash="cash" :userSalary="user.salary" :passiveIncome="passiveIncome" :income="income" />

                <!-- Доходи -->
                <Incomes
                    :userProp="user"
                    @add:salary="addSalary"
                    @edit:salary="editSalary"
                    @add:business="addBusiness"
                    @edit:business="editBusiness"
                />

                <!-- Акції -->
                <Shares :userProp="user" @add="addShares" />
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
import { reactive, ref, computed } from 'vue';
import UserIdentification from './UserIdentification.vue';
import Transaction from './Transaction.vue';
import InfoField from './InfoField.vue';
import ExpenseInfo from './ExpenseInfo.vue';
import Costs from './Costs.vue';
import Riches from './Riches.vue';
import WhimsAndFancies from './WhimsAndFancies.vue';
import FamilyStatus from './FamilyStatus.vue';
import Credits from './Credits.vue';
import IncomeInfo from './IncomeInfo.vue';
import Incomes from './Incomes.vue';
import Shares from './Shares.vue';
import ResetIcon from '../icons/ResetIcon.vue';
import SaveIcon from '../icons/SaveIcon.vue';

const savedUser = localStorage.getItem('user');
const user = savedUser ? reactive(JSON.parse(savedUser)) : reactive({
    name: '',
    profession: '',
    rent: 0,
    food: 0,
    clothes: 0,
    fare: 0,
    phone: 0,
    apartments: 0,
    cars: 0,
    houses: 0,
    yachts: 0,
    aircraft: 0,
    whimsAndFancies: 0,
    marriage: false,
    children: 0,
    credits: [],
    salary: 0,
    business: {
        small: [],
        middle: [],
        big: [],
        corrupt: [],
    },
    shares: {
        gc: [],
        shchun: [],
        to: [],
        cst: [],
    },
});

const addName = (name) => user.name = name;
const addProfession = (profession) => user.profession = profession;

const balance = ref(0);
const decrement = (transaction) => balance.value -= transaction;
const increment = (transaction) => balance.value += transaction;

// PASSIVE
const debt = computed(() => balance.value <= 0 ? balance.value : 0);
const expenses = computed(() => {
    let sum = 0;
    sum += user.rent;
    sum += user.food;
    sum += user.clothes;
    sum += user.fare;
    sum += user.phone;
    sum += user.apartments;
    sum += user.cars;
    sum += user.houses;
    sum += user.yachts;
    sum += user.aircraft;
    sum += user.children;
    user.credits.map(credit => sum += credit.payment);
    return sum;
});

const addRent = (rent) => user.rent = rent;
const editRent = () => user.rent = 0;
const addFood = (food) => user.food = food;
const addClothes = (clothes) => user.clothes = clothes;
const addFare = (fare) => user.fare = fare;
const editFare = () => user.fare = 0;
const addPhone = (phone) => user.phone = phone;

const changeApartments = count => user.apartments = count * 200;
const changeCars = count => user.cars = count * 600;
const changeHouses = count => user.houses = count * 1000;
const changeYachts = count => user.yachts = count * 1500;
const changeAircraft = count => user.aircraft = count * 5000;

const changeWhimsAndFancies = count => user.whimsAndFancies = count;

const changeMarriage = checked => user.marriage = checked;
const changeChildren = count => user.children = count * 300;

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
const income = computed(() => user.salary + passiveIncome.value);

const cashFlow = computed(() => {
    return income.value - expenses.value;
});
const getCashFlow = () => balance.value += cashFlow.value;

const addSalary = (salary) => user.salary = salary;
const editSalary = () => user.salary = 0;
const addBusiness = (type, subType, id, worth, value) => user[type][subType].push({ id, worth, value });
const editBusiness = (subType, id, value) =>
    user.business[subType].find(business => business.id === id && (business.value = value));

const addShares = (type, subType, id, worth, value) =>
    user[type][subType].push({ id, worth, value, cost: worth * value });

const submit = () => {
  console.log('user: ', user);
  localStorage.setItem('user', JSON.stringify(user));
};
const reset = () => {
    localStorage.removeItem('user');
    location.reload();
};
</script>
