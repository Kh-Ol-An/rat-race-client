<script setup>
import { reactive, ref, computed } from 'vue';
import { mapActions, mapGetters } from '../store/helpers.js';
import Menu from '../components/plugins/Menu.vue';
import BlankIdentification from '../components/Blank/modules/BlankIdentification.vue';
import Transaction from '../components/Blank/modules/Transaction.vue';
import InfoField from '../components/Blank/plugins/InfoField.vue';
import ExpenseInfo from '../components/Blank/modules/ExpenseInfo.vue';
import Costs from '../components/Blank/modules/Costs.vue';
import Riches from '../components/Blank/modules/Riches/Riches.vue';
import WhimsAndFancies from '../components/Blank/modules/WhimsAndFancies.vue';
import FamilyStatus from '../components/Blank/modules/FamilyStatus/FamilyStatus.vue';
import Credits from '../components/Blank/modules/Credits/Credits.vue';
import IncomeInfo from '../components/Blank/modules/IncomeInfo.vue';
import Incomes from '../components/Blank/modules/Incomes/Incomes.vue';
import Shares from '../components/Blank/modules/Shares/Shares.vue';
import Assets from '../components/Blank/modules/Assets/Assets.vue';
import Modal from '../components/Blank/plugins/Modal.vue';
import SaveIcon from '../components/icons/SaveIcon.vue';
import MoneyIcon from '../components/icons/MoneyIcon.vue';
import { addingSpaces } from '../helpers/formating-values.js';

const { uploadBlank, downloadBlank } = mapActions();
const { getBlank } = mapGetters();

await downloadBlank();

const blank = reactive(getBlank.value);

const addGender = (gender) => blank.gender = gender;
const addProfession = (profession) => blank.profession = profession;

const decrement = (transaction) => {
    if (blank.cash < transaction) {
        blank.debt += transaction - blank.cash;
        return blank.cash = 0;
    }

    return blank.cash -= transaction;
};
const tax = () => blank.cash -= Math.round(blank.cash * 0.1);
const increment = (transaction) => blank.cash += transaction;

// PASSIVE
const expenses = computed(() => {
    let sum = 0;
    sum += blank.rent;
    sum += blank.food;
    sum += blank.clothes;
    sum += blank.fare;
    sum += blank.phone;
    sum += blank.apartments.length * 200;
    sum += blank.cars.length * 600;
    sum += blank.cottages.length * 1000;
    sum += blank.yachts.length * 1500;
    sum += blank.planes.length * 5000;
    sum += blank.children.expense;
    blank.credits.map(credit => sum += credit.payment);
    return sum;
});

const showModalRepay = ref(false);
const modalRepayTitle = ref('');
const modalRepayText = ref('');
const repayDebt = (debt) => {
    if (debt > blank.debt) {
        modalRepayTitle.value = 'Цікаво...';
        modalRepayText.value = 'Перший раз бачу такого дивака який намагається повернути більш ніж брав. Нам чужого не треба.';
        return showModalRepay.value = true;
    }
    if (debt > blank.cash) {
        modalRepayTitle.value = 'Ай-яй-яй...';
        modalRepayText.value = 'Ми таких хитрунів здалеку бачимо. Будуть гроші повертайся.';
        return showModalRepay.value = true;
    }
    blank.debt -= debt;
    blank.cash -= debt;
};
const showModalDebt = computed(() => blank.debt > 10000);

const addRent = (rent) => blank.rent = rent;
const addFood = (food) => blank.food = food;
const addClothes = (clothes) => blank.clothes = clothes;
const addFare = (fare) => blank.fare = fare;
const addPhone = (phone) => blank.phone = phone;

const savedRent = ref(0);
const buyApartment = (id, name, price) => {
    blank.apartments.push({ id, name, price });
    blank.cash -= price;

    if (blank.apartments.length === 0) {
        blank.rent = savedRent.value;
        savedRent.value = 0;
    }
    if (blank.apartments.length > 0 && blank.rent > 0) {
        savedRent.value = blank.rent;
        blank.rent = 0;
    }
};
const creditApartment = (id, name, payment, term) => {
    blank.credits.push({id, name: name.length > 0 ? name : 'Кредит', body: payment * term, payment, term});
    blank.apartments.push({ id, name, price: payment * term });

    if (blank.apartments.length === 0) {
        blank.rent = savedRent.value;
        savedRent.value = 0;
    }
    if (blank.apartments.length > 0 && blank.rent > 0) {
        savedRent.value = blank.rent;
        blank.rent = 0;
    }
};
const sellApartment = id => {
    const apartment = blank.apartments.find(apartment => apartment.id === id);
    blank.cash += Math.floor(apartment.price / 2);
    blank.apartments = blank.apartments.filter(apartment => apartment.id !== id);

    if (blank.apartments.length === 0) {
        blank.rent = savedRent.value;
        savedRent.value = 0;
    }
    if (blank.apartments.length > 0 && blank.rent > 0) {
        savedRent.value = blank.rent;
        blank.rent = 0;
    }
};
const savedFare = ref(0);
const buyCar = (id, name, price) => {
    blank.cars.push({ id, name, price });
    blank.cash -= price;

    if (blank.cars.length === 0) {
        blank.fare = savedFare.value;
        savedFare.value = 0;
    }
    if (blank.cars.length > 0 && blank.fare > 0) {
        savedFare.value = blank.fare;
        blank.fare = 0;
    }
};
const creditCar = (id, name, payment, term) => {
    blank.credits.push({id, name: name.length > 0 ? name : 'Кредит', body: payment * term, payment, term});
    blank.cars.push({ id, name, price: payment * term });

    if (blank.cars.length === 0) {
        blank.fare = savedFare.value;
        savedFare.value = 0;
    }
    if (blank.cars.length > 0 && blank.fare > 0) {
        savedFare.value = blank.fare;
        blank.fare = 0;
    }
};
const sellCar = id => {
    const cars = blank.cars.find(car => car.id === id);
    blank.cash += Math.floor(cars.price / 2);
    blank.cars = blank.cars.filter(car => car.id !== id);

    if (blank.cars.length === 0) {
        blank.fare = savedFare.value;
        savedFare.value = 0;
    }
    if (blank.cars.length > 0 && blank.fare > 0) {
        savedFare.value = blank.fare;
        blank.fare = 0;
    }
};
const buyCottage = (id, name, price) => {
    blank.cottages.push({ id, name, price });
    blank.cash -= price;
};
const sellCottage = id => {
    const cottage = blank.cottages.find(cottage => cottage.id === id);
    blank.cash += Math.floor(cottage.price / 2);
    blank.cottages = blank.cottages.filter(cottage => cottage.id !== id);
};
const buyYacht = (id, name, price) => {
    blank.yachts.push({ id, name, price });
    blank.cash -= price;
};
const sellYacht = id => {
    const yacht = blank.yachts.find(yacht => yacht.id === id);
    blank.cash += Math.floor(yacht.price / 2);
    blank.yachts = blank.yachts.filter(yacht => yacht.id !== id);
};
const buyPlane = (id, name, price) => {
    blank.planes.push({ id, name, price });
    blank.cash -= price;
};
const sellPlane = id => {
    const plane = blank.planes.find(plane => plane.id === id);
    blank.cash += Math.floor(plane.price / 2);
    blank.planes = blank.planes.filter(plane => plane.id !== id);
};

const buyWhimsAndFancies = (name, price) => {
    blank.whimsAndFancies.push({ name, price });
    blank.cash -= price;
};

const changeMarriage = checked => {
    if (checked) {
        blank.gender === 'male' && decrement(5000);
        blank.gender === 'female' && (blank.children.expense = 0);
    } else {
        if (blank.gender === 'male' ) {
            blank.cash = Math.round(blank.cash / 2);
            blank.children.count = 0;
            blank.children.expense = 0;
        }
        blank.gender === 'female' && (blank.children.expense = blank.children.count * 300);
    }

    blank.marriage = checked;
};
const haveBaby = () => {
    blank.children.count += 1;
    blank.gender === 'male' && (blank.children.expense = blank.children.count * 300);
    blank.gender === 'female' && !blank.marriage && (blank.children.expense = blank.children.count * 300);
    blank.cash += 1000;
};

// ACTIVE
const passiveIncome = computed(() => {
    let sum = 0;
    blank.business.small.map(business => sum += business.income);
    blank.business.middle.map(business => sum += business.income);
    blank.business.big.map(business => sum += business.income);
    blank.business.corrupt.map(business => sum += business.income);
    return sum;
});
const income = computed(() => blank.salary + passiveIncome.value);

const cashFlow = computed(() => {
    return income.value - expenses.value;
});
const firedSalary = ref(0);
const getCashFlow = () => {
    const result = blank.cash + cashFlow.value;

    if (firedSalary.value > 0) {
        blank.salary = firedSalary.value;
        firedSalary.value = 0;
    }

    if (result < 0) {
        blank.debt += Math.abs(result); // Math.abs(число) Перетворює негативне число на позитивне
        return blank.cash = 0;
    }

    blank.credits = blank.credits.map(credit => ({
        ...credit,
        body: credit.body - credit.payment,
        term: credit.term -= 1,
    }));
    blank.credits = blank.credits.filter(credit => credit.term > 0);

    return blank.cash = result;
};

const addSalary = (salary) => blank.salary = salary;
const fired = () => {
    firedSalary.value = blank.salary;
    blank.salary = 0;
};
const quitSalary = ref(0);
const quit = () => {
    if (blank.salary > 0) {
        quitSalary.value = blank.salary;
    }

    if (firedSalary.value > 0) {
        quitSalary.value = firedSalary.value;
        firedSalary.value = 0;
    }
    blank.salary = 0;
};
const buyBusiness = (id, price, income, subType) => {
    blank.business[subType].push({id, price, income});
    blank.cash -= price;
    blank.business.last.push(id);
};
const incrementIncomeBusiness = (id, income) => blank.business.small.find(business => {
    if (business.id === id) {
        business.expanded = true;
        business.income += income;
    }
});
const deleteBusiness = (subType, id) => {
    const removableIndex = blank.business[subType].findIndex(business => business.id === id);
    removableIndex !== -1 && blank.business[subType].splice(removableIndex, 1);
    blank.business.last.pop();

    quitSalary.value > 0 && income.value === 0 && (blank.salary = quitSalary.value);
};
const sellBusiness = subType => {
    blank.cash = blank.business[subType].reduce((total, business) => total += business.price, blank.cash);
    blank.business[subType] = [];
};

const buyShares = (id, price, quantity, subType) => {
    const cost = price * quantity;
    blank.shares[subType].push({id, price, quantity, cost});
    blank.cash -= cost;
};
const sellSharesPackage = (id, subType, price) => {
    increment(price);
    blank.shares[subType] = blank.shares[subType].filter(share => share.id !== id);
};
const sellAllShares = (subType, price) => {
    increment(price);
    blank.shares[subType] = [];
};

const buyHouse = (id, price) => {
    blank.assets.houses.push({ id, price });
    blank.cash -= price;
};
const sellHouse = (price, id) => {
    increment(price);
    blank.assets.houses = blank.assets.houses.filter(house => house.id !== id);
};
const sellHouses = (price) => {
    increment(blank.assets.houses.length * price);
    blank.assets.houses = [];
};
const buyLand = (id, price, quantity) => {
    const cost = price * quantity;
    blank.assets.land.push({id, price, quantity, cost});
    blank.cash -= cost;
};
const sellLand = (id, price) => {
    increment(price);
    blank.assets.land = blank.assets.land.filter(land => land.id !== id);
};
const sellAcres = (price) => {
    increment(price);
    blank.assets.land= [];
};
const buyCorruptLand = (id, quantity, cost) => {
    const price = cost / quantity;
    blank.assets.corruptLand.push({id, price, quantity, cost});
    blank.cash -= cost;
};
const sellCorruptLand = (id, price) => {
    increment(price);
    blank.assets.corruptLand = blank.assets.corruptLand.filter(land => land.id !== id);
};
const sellCorruptAcres = (price) => {
    increment(price);
    blank.assets.corruptLand= [];
};

const restart = () => {
    console.log('restart');
};

const showModalRich = computed(
    () =>
        blank.cash >= 3000000 &&
        cashFlow.value >= 50000 &&
        blank.debt === 0 &&
        blank.apartments.length > 0 &&
        blank.cars.length > 0 &&
        !blank.rich
);
const showModalWin = computed(
    () =>
        blank.cottages.length > 0 &&
        blank.yachts.length > 0 &&
        blank.planes.length > 0 &&
        blank.whimsAndFancies.length > 0 &&
        !blank.win
);
</script>

<template>
    <Menu />
    <div class="pt-4 pb-8 px-8 md:py-2 md:px-0 md:w-screen max-w-full flex flex-col items-center justify-center">
        <h1 class="p-4 md:p-2 text-4xl md:text-xl font-bold text-slate-300 text-center">
            Бланк 'Щурячі перегони Ⅱ'
        </h1>

        <form
            class="relative md:mt-2 w-full max-w-5xl flex flex-col gap-4 shadow-lg md:shadow-none rounded-md bg-slate-800"
            @submit.prevent="uploadBlank(blank)"
        >
            <div class="pt-6 px-8 md:pt-2 md:px-2 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-2">
                <BlankIdentification
                    :blankProp="blank"
                    @add:gender="addGender"
                    @add:profession="addProfession"
                />
            </div>

            <div class="px-2 hidden md:block">
                <button
                    class="
                        p-4
                        flex items-center justify-center
                        w-full
                        shadow hover:shadow-lg
                        rounded-md
                        bg-secondary
                        outline-0
                        transition-all duration-300
                    "
                    type="submit"
                    title="Зберегти"
                >
                    <SaveIcon width="30px" height="30px" color="fill-slate-300" />
                </button>
            </div>

            <div class="px-8 md:px-2 flex items-center gap-4 md:gap-2">
                <Transaction :rich="blank.rich" @decrement="decrement" @tax="tax" @increment="increment" />
            </div>

            <InfoField wrapClasses="mx-auto px-8 md:px-2" labelClasses="font-bold text-primary" label="Грошовий потік:">
                <span class="ml-2 font-bold text-slate-300">
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

            <div class="grid grid-cols-2 md:grid-cols-1">
                <div class="flex flex-col md:order-last">
                    <!-- Витрати -->
                    <div class="py-4 pr-4 pl-8 md:px-2 flex flex-col gap-2">
                        <Costs
                            :blankProp="blank"
                            @add:rent="addRent"
                            @add:food="addFood"
                            @add:clothes="addClothes"
                            @add:fare="addFare"
                            @add:phone="addPhone"
                        />
                    </div>

                    <!-- Багатство -->
                    <div class="py-4 pr-4 pl-8 md:px-2 flex flex-col gap-2 md:bg-slate-900">
                        <Riches
                            :blankProp="blank"
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
                    </div>

                    <!-- Капризи та примхи -->
                    <div class="py-4 pr-4 pl-8 md:px-2 flex flex-col gap-2">
                        <WhimsAndFancies :blankProp="blank" @buy="buyWhimsAndFancies" />
                    </div>

                    <!-- Сімейний стан -->
                    <div
                        :class="[
                            'pt-4 pr-4 pl-8 md:px-2 flex flex-col gap-2 md:bg-slate-900',
                             blank.credits.length === 0 ? 'pb-8' : 'pb-4',
                        ]"
                    >
                        <FamilyStatus
                            :blankProp="blank"
                            @change:marriage="changeMarriage"
                            @have:baby="haveBaby"
                        />
                    </div>

                    <!-- Виплати за кредитами -->
                    <div v-if="blank.credits.length > 0" class="pt-4 pr-4 pb-8 pl-8 md:px-2 flex flex-col gap-2">
                        <Credits :credits="blank.credits" />
                    </div>
                </div>

                <div class="flex flex-col">
                    <!-- Загальні прибутки -->
                    <div class="pb-4 pr-8 pl-4 md:px-2 flex flex-col gap-2">
                        <IncomeInfo :blankProp="blank" :passiveIncome="passiveIncome" :income="income" />
                    </div>

                    <!-- Борги та витрати -->
                    <div class="pb-4 pr-4 pl-8 md:px-2 md:py-4 flex flex-col gap-2">
                        <ExpenseInfo :debt="blank.debt" :expenses="expenses" @repay="repayDebt" />
                        <Modal :show="showModalRepay" cancel="Зрозумів" @cancel="showModalRepay = false">
                            <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
                                {{ modalRepayTitle }}
                            </h4>
                            <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
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
                            <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
                                Ти програв. Але не вмер. Не засмучуйся. Бери нову професію і починай спочатку :)
                            </p>
                        </Modal>
                    </div>

                    <!-- Прибутки -->
                    <div class="py-4 pr-8 pl-4 md:px-2 flex flex-col gap-2 md:bg-slate-900">
                        <Incomes
                            :blankProp="blank"
                            :firedSalary="firedSalary"
                            @add:salary="addSalary"
                            @fired:salary="fired"
                            @quit:salary="quit"
                            @buy:business="buyBusiness"
                            @increment:income="incrementIncomeBusiness"
                            @delete:business="deleteBusiness"
                            @sell="sellBusiness"
                        />
                    </div>

                    <!-- Акції -->
                    <div class="py-4 pr-8 pl-4 md:px-2 flex flex-col gap-2">
                        <Shares
                            :blankProp="blank"
                            @buy="buyShares"
                            @sell:package="sellSharesPackage"
                            @sell:all="sellAllShares"
                        />
                    </div>

                    <!-- Активи -->
                    <div class="pt-4 pr-8 pl-4 pb-8 md:px-2 flex flex-col gap-2 md:bg-slate-900">
                        <Assets
                            :blankProp="blank"
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
            </div>

            <button
                class="
                    fixed md:static
                    right-10 bottom-10
                    p-4
                    flex items-center justify-center
                    md:w-full
                    shadow hover:shadow-lg
                    rounded-full md:rounded-md
                    bg-secondary
                    outline-0
                    transition-all duration-300
                "
                type="submit"
                title="Зберегти"
            >
                <SaveIcon width="30px" height="30px" color="fill-slate-300" />
            </button>
        </form>

        <Modal :show="showModalRich" cancel="Зрозумів" @cancel="blank.rich = true">
            <h4 class="mx-auto text-2xl font-bold text-primary text-center">
                Вітаємо!!!
            </h4>
            <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
                Видихай) Ти багатий! Переходь на зовнішнє коло.
            </p>
        </Modal>

        <Modal :show="showModalWin" cancel="Зрозумів" @cancel="blank.win = true">
            <h4 class="mx-auto text-2xl font-bold text-primary text-center">
                Вітаємо!!!
            </h4>
            <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
                Ти переміг! Але можешь продовжувати гру.
            </p>
        </Modal>
    </div>
</template>
