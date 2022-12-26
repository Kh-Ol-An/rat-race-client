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
                    :cashFlow="cashFlow"
                    @buy:apartment="buyApartment"
                    @credit:apartment="creditApartment"
                    @sell:apartment="sellApartment"
                    @buy:car="buyCar"
                    @credit:car="creditCar"
                    @sell:car="sellCar"
                    @buy:cottage="buyCottage"
                    @sell:cottage="sellCottage"
                    @buy:yacht="buyYacht"
                    @sell:yacht="sellYacht"
                    @buy:plane="buyPlane"
                    @sell:plane="sellPlane"
                />

                <!-- Капризи та примхи -->
                <WhimsAndFancies :userProp="user" @buy="buyWhimsAndFancies" />

                <!-- Сімейний стан -->
                <FamilyStatus
                    :userProp="user"
                    @change:marriage="changeMarriage"
                    @have:baby="haveBaby"
                />

                <!-- Виплати за кредитами -->
                <Credits v-if="user.credits.length > 0" :credits="user.credits" />
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
                    @buy:business="buyBusiness"
                    @increment:income="incrementIncomeBusiness"
                    @delete:business="deleteBusiness"
                    @sell="sellBusiness"
                />

                <!-- Акції -->
                <Shares :userProp="user" @buy="buyShares" @sell:package="sellSharesPackage" @sell:all="sellAllShares" />

                <!-- Активи -->
                <Assets
                    :userProp="user"
                    @buy:house="buyHouse"
                    @sell:house="sellHouse"
                    @sell:houses="sellHouses"
                    @buy:land="buyLand"
                    @sell:land="sellLand"
                    @sell:acres="sellAcres"
                    @buy:corrupt-land="buyCorruptLand"
                    @sell:corrupt-land="sellCorruptLand"
                    @sell:corrupt-acres="sellCorruptAcres"
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

    <Modal :show="showModalRich" cancel="Зрозумів" @cancel="rich = false">
        <h4 class="mx-auto text-2xl font-bold text-primary text-center">
            Вітаємо!!!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-800 text-center">
            Видихай) Ти багатий! Переходь на зовнішнє коло.
        </p>
    </Modal>

    <Modal :show="showModalWin" cancel="Зрозумів" @cancel="win = false">
        <h4 class="mx-auto text-2xl font-bold text-primary text-center">
            Вітаємо!!!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-800 text-center">
            Ти переміг! Але можешь продовжувати гру.
        </p>
    </Modal>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import UserIdentification from './modules/UserIdentification.vue';
import Transaction from './modules/Transaction.vue';
import InfoField from './plugins/InfoField.vue';
import ExpenseInfo from './modules/ExpenseInfo.vue';
import Costs from './modules/Costs.vue';
import Riches from './modules/Riches/Riches.vue';
import WhimsAndFancies from './modules/WhimsAndFancies.vue';
import FamilyStatus from './modules/FamilyStatus/FamilyStatus.vue';
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
const savedUserObj = savedUser.value ? JSON.parse(savedUser.value) : {};
const savedUserArr = Object.keys(savedUserObj);
const userObj = {
    name: '',
    gender: '',
    profession: '',
    debt: 0,
    rent: 0,
    food: 0,
    clothes: 0,
    fare: 0,
    phone: 0,
    apartments: [],
    cars: [],
    cottages: [],
    yachts: [],
    planes: [],
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
        schp: [],
        to: [],
        cst: [],
    },
    assets: {
        houses: [],
        land: [],
        corruptLand: [],
    },
};
const userArr = Object.keys(userObj);
const user = JSON.stringify(savedUserArr) === JSON.stringify(userArr) ? reactive(savedUserObj) : reactive(userObj);

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
    sum += user.apartments.length * 200;
    sum += user.cars.length * 600;
    sum += user.cottages.length * 1000;
    sum += user.yachts.length * 1500;
    sum += user.planes.length * 5000;
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
const buyApartment = (id, name, price) => {
    user.apartments.push({ id, name, price });
    user.cash -= price;

    if (user.apartments.length === 0) {
        user.rent = savedRent.value;
        savedRent.value = 0;
    }
    if (user.apartments.length > 0 && user.rent > 0) {
        savedRent.value = user.rent;
        user.rent = 0;
    }
};
const creditApartment = (id, name, payment, term) => {
    user.credits.push({id, name: name.length > 0 ? name : 'Кредит', body: payment * term, payment, term});
    user.apartments.push({ id, name, price: payment * term });

    if (user.apartments.length === 0) {
        user.rent = savedRent.value;
        savedRent.value = 0;
    }
    if (user.apartments.length > 0 && user.rent > 0) {
        savedRent.value = user.rent;
        user.rent = 0;
    }
};
const sellApartment = id => {
    const apartment = user.apartments.find(apartment => apartment.id === id);
    user.cash += Math.floor(apartment.price / 2);
    user.apartments = user.apartments.filter(apartment => apartment.id !== id);

    if (user.apartments.length === 0) {
        user.rent = savedRent.value;
        savedRent.value = 0;
    }
    if (user.apartments.length > 0 && user.rent > 0) {
        savedRent.value = user.rent;
        user.rent = 0;
    }
};
const savedFare = ref(0);
const buyCar = (id, name, price) => {
    user.cars.push({ id, name, price });
    user.cash -= price;

    if (user.cars.length === 0) {
        user.fare = savedFare.value;
        savedFare.value = 0;
    }
    if (user.cars.length > 0 && user.fare > 0) {
        savedFare.value = user.fare;
        user.fare = 0;
    }
};
const creditCar = (id, name, payment, term) => {
    user.credits.push({id, name: name.length > 0 ? name : 'Кредит', body: payment * term, payment, term});
    user.cars.push({ id, name, price: payment * term });

    if (user.cars.length === 0) {
        user.fare = savedFare.value;
        savedFare.value = 0;
    }
    if (user.cars.length > 0 && user.fare > 0) {
        savedFare.value = user.fare;
        user.fare = 0;
    }
};
const sellCar = id => {
    const cars = user.cars.find(car => car.id === id);
    user.cash += Math.floor(cars.price / 2);
    user.cars = user.cars.filter(car => car.id !== id);

    if (user.cars.length === 0) {
        user.fare = savedFare.value;
        savedFare.value = 0;
    }
    if (user.cars.length > 0 && user.fare > 0) {
        savedFare.value = user.fare;
        user.fare = 0;
    }
};
const buyCottage = (id, price) => {
    user.cottages.push({ id, price });
    user.cash -= price;
};
const sellCottage = id => {
    const cottage = user.cottages.find(cottage => cottage.id === id);
    user.cash += Math.floor(cottage.price / 2);
    user.cottages = user.cottages.filter(cottage => cottage.id !== id);
};
const buyYacht = (id, price) => {
    user.yachts.push({ id, price });
    user.cash -= price;
};
const sellYacht = id => {
    const yacht = user.yachts.find(yacht => yacht.id === id);
    user.cash += Math.floor(yacht.price / 2);
    user.yachts = user.yachts.filter(yacht => yacht.id !== id);
};
const buyPlane = (id, price) => {
    user.planes.push({ id, price });
    user.cash -= price;
};
const sellPlane = id => {
    const plane = user.planes.find(plane => plane.id === id);
    user.cash += Math.floor(plane.price / 2);
    user.planes = user.planes.filter(plane => plane.id !== id);
};

const buyWhimsAndFancies = price => {
    user.whimsAndFancies += 1;
    user.cash -= price;
};

const changeMarriage = checked => {
    if (checked) {
        user.gender === 'male' && decrement(5000);
        user.gender === 'female' && (user.children.expense = 0);
    } else {
        if (user.gender === 'male' ) {
            user.cash = Math.round(user.cash / 2);
            user.children.count = 0;
            user.children.expense = 0;
        }
        user.gender === 'female' && (user.children.expense = user.children.count * 300);
    }

    user.marriage = checked;
};
const haveBaby = () => {
    user.children.count += 1;
    user.children.expense = user.children.count * 300;
};

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

    user.credits = user.credits.map(credit => ({
        ...credit,
        body: credit.body - credit.payment,
        term: credit.term -= 1,
    }));
    user.credits = user.credits.filter(credit => credit.term > 0);

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
const buyBusiness = (id, price, income, subType) => {
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

const buyShares = (id, price, quantity, subType) => {
    const cost = price * quantity;
    user.shares[subType].push({id, price, quantity, cost});
    user.cash -= cost;
};
const sellSharesPackage = (id, subType, price) => {
    increment(price);
    user.shares[subType] = user.shares[subType].filter(share => share.id !== id);
};
const sellAllShares = (subType, price) => {
    increment(price);
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
const buyLand = (id, price, quantity) => {
    const cost = price * quantity;
    user.assets.land.push({id, price, quantity, cost});
    user.cash -= cost;
};
const sellLand = (id, price) => {
    increment(price);
    user.assets.land = user.assets.land.filter(land => land.id !== id);
};
const sellAcres = (price) => {
    increment(price);
    user.assets.land= [];
};
const buyCorruptLand = (id, price, quantity) => {
    const cost = price * quantity;
    user.assets.corruptLand.push({id, price, quantity, cost});
    user.cash -= cost;
};
const sellCorruptLand = (id, price) => {
    increment(price);
    user.assets.corruptLand = user.assets.corruptLand.filter(land => land.id !== id);
};
const sellCorruptAcres = (price) => {
    increment(price);
    user.assets.corruptLand= [];
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

const rich = ref(true);
const showModalRich = computed(
    () =>
        user.cash >= 3000000 &&
        cashFlow.value >= 50000 &&
        user.debt === 0 &&
        user.apartments.length > 0 &&
        user.cars.length > 0 &&
        rich.value
);
const win = ref(true);
const showModalWin = computed(
    () =>
        user.cottages.length > 0 &&
        user.yachts.length > 0 &&
        user.planes.length > 0 &&
        user.whimsAndFancies > 0 &&
        win.value
);
</script>
