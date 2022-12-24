<template>
    <form
        class="relative md:mt-2 py-6 px-8 md:p-0 w-full max-w-5xl flex flex-col gap-4 shadow md:shadow-none rounded-md"
        @submit.prevent="submit"
    >
        <div class="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-2">
            <UserIdentification
                :userProp="user"
                @add:name="addName"
                @add:gender="addGender"
                @add:profession="addProfession"
            />
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

        <InfoField wrapClasses="mx-auto" labelClasses="text-lg font-bold text-primary" label="Грошовий потік:">
            <span class="ml-2 text-slate-800">
                {{ addingSpaces(cashFlow) }}
            </span>

            <button
                class="ml-4 outline-0"
                type="button"
                title="Отримати"
                @click="getCashFlow"
            >
                <MoneyIcon width="30px" height="30px" />
            </button>
        </InfoField>

        <div class="grid grid-cols-2 md:grid-cols-1 gap-4">
            <div class="flex flex-col gap-4 md:order-last md:gap-2">
                <ExpenseInfo :debt="user.debt" :expenses="expenses" @repay="repayDebt" />
                <Modal :show="showModalRepay" cancel="Зрозумів" @cancel="showModalRepay = false">
                    <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
                        {{ modalRepayTitle }}
                    </h4>
                    <p class="mx-auto mt-4 text-lg font-normal text-slate-800 text-center">
                        {{ modalRepayText }}
                    </p>
                </Modal>
                <Modal
                    :show="showModalDebt"
                    cancel="Спочатку"
                    onlyCancelAction
                    @cancel="restart"
                >
                    <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
                        Дуже прикро...
                    </h4>
                    <p class="mx-auto mt-4 text-lg font-normal text-slate-800 text-center">
                        Ти програв. Але не вмер. Не засмучуйся. Бери нову професію і починай спочатку :)
                    </p>
                </Modal>

                <!-- Витрати -->
                <Costs
                    :userProp="user"
                    @add:rent="addRent"
                    @add:food="addFood"
                    @add:clothes="addClothes"
                    @add:fare="addFare"
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
                    :firedSalary="firedSalary"
                    @add:salary="addSalary"
                    @fired:salary="fired"
                    @quit:salary="quit"
                    @add:business="addBusiness"
                    @increment:income="incrementIncomeBusiness"
                    @delete:business="deleteBusiness"
                    @sell="sellBusiness"
                />

                <!-- Акції -->
                <Shares :userProp="user" @add="addShares" @sell:package="sellSharesPackage" @sell:all="sellAllShares" />

                <!-- Активи -->
                <Assets
                    :userProp="user"
                    @buy:house="buyHouse"
                    @sell:house="sellHouse"
                    @sell:houses="sellHouses"
                />
            </div>
        </div>

        <UserActions :isSavedUser="!!savedUser" @restart="restart" @disable:storage="disableStorage" />
        <Modal :show="showModalSaveInterval" cancel="Зрозумів" @cancel="showModalSaveInterval = false">
            <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
                Попередження.
            </h4>
            <p class="mx-auto mt-4 text-lg font-normal text-slate-800 text-center">
                Автоматичне зберігання вимкнено.
            </p>
        </Modal>
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
import Credits from './modules/Credits/Credits.vue';
import IncomeInfo from './modules/IncomeInfo.vue';
import Incomes from './modules/Incomes/Incomes.vue';
import Shares from './modules/Shares/Shares.vue';
import Assets from './modules/Assets/Assets.vue';
import UserActions from './modules/UserActions.vue';
import Modal from './plugins/Modal.vue';
import SaveIcon from '../icons/SaveIcon.vue';
import MoneyIcon from '../icons/MoneyIcon.vue';
import { addingSpaces } from '../../helpers/formating-values.js';

const savedUser = computed(() => localStorage.getItem('user'));
const user = savedUser.value ? reactive(JSON.parse(savedUser.value)) : reactive({
    name: '',
    gender: '',
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
    children: {
        count: 0,
        expense: 0,
    },
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
    assets: {
        houses: [],
        land: [],
        corruptLand: [],
    }
});

const addName = (name) => user.name = name;
const addGender = (gender) => user.gender = gender;
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
    sum += user.children.expense;
    user.credits.map(credit => sum += credit.payment);
    return sum;
});

const showModalRepay = ref(false);
const modalRepayTitle = ref('');
const modalRepayText = ref('');
const repayDebt = (debt) => {
    if (debt > user.debt) {
        modalRepayTitle.value = 'Цікаво...';
        modalRepayText.value = 'Перший раз бачу такого дивака який намагається повернути більш ніж брав. Нам чужого не треба.';
        return showModalRepay.value = true;
    }
    if (debt > user.cash) {
        modalRepayTitle.value = 'Ай-яй-яй...';
        modalRepayText.value = 'Ми таких хитрунів здалеку бачимо. Будуть гроші повертайся.';
        return showModalRepay.value = true;
    }
    user.debt -= debt;
    user.cash -= debt;
};
const showModalDebt = computed(() => user.debt > 10000);

const addRent = (rent) => user.rent = rent;
const addFood = (food) => user.food = food;
const addClothes = (clothes) => user.clothes = clothes;
const addFare = (fare) => user.fare = fare;
const addPhone = (phone) => user.phone = phone;

const savedRent = ref(0);
const changeApartments = count => {
    user.apartments = count * 200;

    if (count === 0) {
        user.rent = savedRent.value;
        savedRent.value = 0;
    }
    if (count > 0 && user.rent > 0) {
        savedRent.value = user.rent;
        user.rent = 0;
    }
};
const savedFare = ref(0);
const changeCars = count => {
    user.cars = count * 600;

    if (count === 0) {
        user.fare = savedFare.value;
        savedFare.value = 0;
    }
    if (count > 0 && user.fare > 0) {
        savedFare.value = user.fare;
        user.fare = 0;
    }
};
const changeHouses = count => user.houses = count * 1000;
const changeYachts = count => user.yachts = count * 1500;
const changeAircraft = count => user.aircraft = count * 5000;

const changeWhimsAndFancies = count => user.whimsAndFancies = count;

const changeMarriage = checked => {
    if (checked) {
        user.gender === 'male' && decrement(5000);
        user.gender === 'female' && (user.children.expense = 0);
    } else {
        if (user.gender === 'male' ) {
            user.cash = user.cash / 2;
            user.children.count = 0;
            user.children.expense = 0;
        }
        user.gender === 'female' && (user.children.expense = user.children.count * 300);
    }

    user.marriage = checked;
};
const changeChildren = count => {
    user.children.count = count
    user.children.expense = count * 300;
};

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
const firedSalary = ref(0);
const getCashFlow = () => {
    const result = user.cash + cashFlow.value;

    if (firedSalary.value > 0) {
        user.salary = firedSalary.value;
        firedSalary.value = 0;
    }

    if (result < 0) {
        user.debt += Math.abs(result); // Math.abs(число) Перетворює негативне число на позитивне
        return user.cash = 0;
    }

    return user.cash = result;
};

const addSalary = (salary) => user.salary = salary;
const fired = () => {
    firedSalary.value = user.salary;
    user.salary = 0;
};
const quitSalary = ref(0);
const quit = () => {
    quitSalary.value = user.salary;
    user.salary = 0;
};
const addBusiness = (subType, id, price, income) => {
    user.business[subType].push({id, price, income});
    user.cash -= price;
    user.business.last.push(id);
};
const incrementIncomeBusiness = (id, income) => user.business.small.find(business => {
    if (business.id === id) {
        business.expanded = true;
        business.income += income;
    }
});
const deleteBusiness = (subType, id) => {
    const removableIndex = user.business[subType].findIndex(business => business.id === id);
    removableIndex !== -1 && user.business[subType].splice(removableIndex, 1);
    user.business.last.pop();

    quitSalary.value > 0 && income.value === 0 && (user.salary = quitSalary.value);
};
const sellBusiness = subType => {
    user.cash = user.business[subType].reduce((total, business) => total += business.price, user.cash);
    user.business[subType] = [];
};

const addShares = (subType, id, price, quantity) => {
    const cost = price * quantity;
    user.shares[subType].push({id, price, quantity, cost});
    user.cash -= cost;
};
const sellSharesPackage = (id, subType, price) => {
    increment(price);
    user.shares[subType] = user.shares[subType].filter(share => share.id !== id);
};
const sellAllShares = (subType, sellPrice) => {
    increment(sellPrice);
    user.shares[subType] = [];
};

const buyHouse = (id, price) => {
    user.assets.houses.push({ id, price });
    user.cash -= price;
};
const sellHouse = (price, id) => {
    increment(price);
    user.assets.houses = user.assets.houses.filter(house => house.id !== id);
};
const sellHouses = (price) => {
    increment(user.assets.houses.length * price);
    user.assets.houses = [];
};

const restart = () => {
    localStorage.removeItem('user');
    location.reload();
};

const submit = () => {
    console.log('user: ', user);
    localStorage.setItem('user', JSON.stringify(user));
    savedUser.value = localStorage.getItem('user');
};
const saveInterval = ref(true);
const showModalSaveInterval = ref(false);
const disableStorage = () => {
    saveInterval.value = false;
    showModalSaveInterval.value = true;
    setTimeout(() => showModalSaveInterval.value = false, 1000);
};
setInterval(() => saveInterval.value && submit(), 59000);
</script>
