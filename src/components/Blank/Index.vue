<template>
    <form
        class="relative md:mt-2 py-6 px-8 md:p-0 w-full max-w-5xl flex flex-col gap-4 shadow md:shadow-none rounded-md"
        @submit.prevent="submit"
    >
        <div class="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-2">
            <UserIdentification :userProp="user" @add:name="addName" @add:profession="addProfession" />
        </div>

        <button
            class="
                p-4
                hidden md:flex items-center justify-center
                shadow hover:shadow-lg
                rounded-md
                bg-secondary
                outline-0
                transition-all duration-300
            "
            type="submit"
            title="Зберегти"
        >
            <SaveIcon width="30px" height="30px" color="fill-white" />
        </button>

        <div class="flex items-center gap-4 md:gap-2">
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

        <div class="grid grid-cols-2 md:grid-cols-1 gap-4">
            <div class="flex flex-col gap-4 md:order-last md:gap-2">
                <ExpenseInfo :debt="user.debt" :expenses="expenses" />

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

            <div class="flex flex-col gap-4 md:gap-2">
                <IncomeInfo :userProp="user" :passiveIncome="passiveIncome" :income="income" />

                <!-- Доходи -->
                <Incomes
                    :userProp="user"
                    @add:salary="addSalary"
                    @edit:salary="editSalary"
                    @add:business="addBusiness"
                    @edit:business="editBusiness"
                    @delete:business="deleteBusiness"
                    @sell="sellBusiness"
                />

                <!-- Акції -->
                <Shares :userProp="user" @add="addShares" @sell="sellShares" />
            </div>
        </div>

        <UserActions :isSavedUser="!!savedUser" />
    </form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import UserIdentification from './modules/UserIdentification.vue';
import Transaction from './modules/Transaction.vue';
import InfoField from './plugins/InfoField.vue';
import ExpenseInfo from './modules/ExpenseInfo.vue';
import Costs from './modules/Costs.vue';
import Riches from './modules/Riches.vue';
import WhimsAndFancies from './modules/WhimsAndFancies.vue';
import FamilyStatus from './modules/FamilyStatus.vue';
import Credits from './modules/Credits.vue';
import IncomeInfo from './modules/IncomeInfo.vue';
import Incomes from './modules/Incomes.vue';
import Shares from './modules/Shares.vue';
import UserActions from './modules/UserActions.vue';
import SaveIcon from '../icons/SaveIcon.vue';

const savedUser = ref(localStorage.getItem('user'));
const user = savedUser.value ? reactive(JSON.parse(savedUser.value)) : reactive({
    name: '',
    profession: '',
    debt: 0,
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
    cash: 0,
    salary: 0,
    business: {
        small: [],
        middle: [],
        big: [],
        corrupt: [],
        last: [],
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

const decrement = (transaction) => {
    if (user.cash < transaction) {
        user.debt += transaction - user.cash;
        return user.cash = 0;
    }

    return user.cash -= transaction;
};
const increment = (transaction) => user.cash += transaction;

// PASSIVE
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
const passiveIncome = computed(() => {
    let sum = 0;
    user.business.small.map(business => sum += business.income);
    user.business.middle.map(business => sum += business.income);
    user.business.big.map(business => sum += business.income);
    user.business.corrupt.map(business => sum += business.income);
    return sum;
});
const income = computed(() => user.salary + passiveIncome.value);

const cashFlow = computed(() => {
    return income.value - expenses.value;
});
const getCashFlow = () => {
    const result = user.cash + cashFlow.value;
    if (result < 0) {
        user.debt += Math.abs(result);
        return user.cash = 0;
    }

    return user.cash = result;
};

const addSalary = (salary) => user.salary = salary;
const editSalary = () => user.salary = 0;
const addBusiness = (subType, id, price, income) => {
    user.business[subType].push({id, price, income});
    user.business.last.push(subType);
};
const editBusiness = (subType, id, income) => {
    user.business[subType].find(business => business.id === id && (business.income = income))
};
const deleteBusiness = (subType, id) => {
    const removableIndex = user.business[subType].findIndex(business => business.id === id);
    removableIndex !== -1 && user.business[subType].splice(removableIndex, 1);
    user.business.last.pop();
};
const sellBusiness = subType => {
    user.cash = user.business[subType].reduce((total, business) => total += business.price, user.cash);
    user.business[subType] = [];
};

const addShares = (subType, id, price, quantity) =>
    user.shares[subType].push({ id, price, quantity, cost: price * quantity });
const sellShares = subType => {
    user.cash = user.shares[subType].reduce((total, share) => total += share.cost, user.cash);
    user.shares[subType] = [];
};

const submit = () => {
    localStorage.setItem('user', JSON.stringify(user));
    savedUser.value = localStorage.getItem('user');
};
setInterval(submit, 59000);
</script>
