<script setup>
import { ref, toRef } from "vue";
import Input from '../../../plugins/Input.vue';
import Add from '../../plugins/Add.vue';
import Purchased from './Purchased.vue';
import Modal from '../../plugins/Modal.vue';
import InfoField from "../../../plugins/InfoField.vue";
import { removingSpaces } from '../../../../helpers/formating-values.js';

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
    cashFlow: {
        type: Number,
        required: true,
    },
});

const blank = toRef(props, 'blankProp');

const emit = defineEmits([
    'buy:apartment',
    'credit:apartment',
    'sell:apartment',
    'buy:car',
    'credit:car',
    'sell:car',
    'buy:cottage',
    'sell:cottage',
    'buy:yacht',
    'sell:yacht',
    'buy:plane',
    'sell:plane',
]);

const showModal = ref(false);
const showModalCredit = ref(false);
const purchase = ref('');

// Квартира
const apartmentName = ref('');
const apartmentPrice = ref('');
const buyApartment = () => {
    if (blank.value.cash < Number(removingSpaces(apartmentPrice.value))) {
        purchase.value = 'Квартири';
        showModal.value = true;
        apartmentName.value = '';
        apartmentPrice.value = '';
        return;
    }

    emit('buy:apartment', new Date().valueOf(), apartmentName.value, Number(removingSpaces(apartmentPrice.value)));
    apartmentName.value = '';
    apartmentPrice.value = '';
};
const apartmentPayment = ref('');
const apartmentTerm = ref('');
const buyApartmentOnCredit = () => {
    if (props.cashFlow < Number(removingSpaces(apartmentPayment.value))) {
        showModalCredit.value = true;
        apartmentName.value = '';
        apartmentPayment.value = '';
        apartmentTerm.value = '';
        return;
    }

    emit(
        'credit:apartment',
        new Date().valueOf(),
        apartmentName.value,
        Number(removingSpaces(apartmentPayment.value)),
        Number(removingSpaces(apartmentTerm.value)),
    );
    apartmentName.value = '';
    apartmentPayment.value = '';
    apartmentTerm.value = '';
};
const sellApartment = id => emit('sell:apartment', id);

// Автівка
const carName = ref('');
const carPrice = ref('');
const buyCar = () => {
    if (blank.value.cash < Number(removingSpaces(carPrice.value))) {
        purchase.value = 'Машини';
        showModal.value = true;
        carName.value = '';
        carPrice.value = '';
        return;
    }

    emit('buy:car', new Date().valueOf(), carName.value, Number(removingSpaces(carPrice.value)));
    carName.value = '';
    carPrice.value = '';
};
const carPayment = ref('');
const carTerm = ref('');
const buyCarOnCredit = () => {
    if (props.cashFlow < Number(removingSpaces(carPayment.value))) {
        showModalCredit.value = true;
        carPayment.value = '';
        carTerm.value = '';
        return;
    }

    emit(
        'credit:car',
        new Date().valueOf(),
        carName.value,
        Number(removingSpaces(carPayment.value)),
        Number(removingSpaces(carTerm.value)),
    );
    carName.value = '';
    carPayment.value = '';
    carTerm.value = '';
};
const sellCar = id => emit('sell:car', id);

// Котедж
const cottageName = ref('');
const cottagePrice = ref('');
const buyCottage = () => {
    if (blank.value.cash < Number(removingSpaces(cottagePrice.value))) {
        purchase.value = 'Котеджі';
        showModal.value = true;
        cottageName.value = '';
        cottagePrice.value = '';
        return;
    }

    emit('buy:cottage', new Date().valueOf(), cottageName.value, Number(removingSpaces(cottagePrice.value)));
    cottageName.value = '';
    cottagePrice.value = '';
};
const sellCottage = id => emit('sell:cottage', id);

// Яхта
const yachtName = ref('');
const yachtPrice = ref('');
const buyYacht = () => {
    if (blank.value.cash < Number(removingSpaces(yachtPrice.value))) {
        purchase.value = 'Яхти';
        showModal.value = true;
        yachtName.value = '';
        yachtPrice.value = '';
        return;
    }

    emit('buy:yacht', new Date().valueOf(), yachtName.value, Number(removingSpaces(yachtPrice.value)));
    yachtName.value = '';
    yachtPrice.value = '';
};
const sellYacht = id => emit('sell:yacht', id);

// Літак
const planeName = ref('');
const planePrice = ref('');
const buyPlane = () => {
    if (blank.value.cash < Number(removingSpaces(planePrice.value))) {
        purchase.value = 'Літаки';
        showModal.value = true;
        planeName.value = '';
        planePrice.value = '';
        return;
    }

    emit('buy:plane', new Date().valueOf(), planeName.value, Number(removingSpaces(planePrice.value)));
    planeName.value = '';
    planePrice.value = '';
};
const sellPlane = id => emit('sell:plane', id);
</script>

<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Багатство</h2>

    <div class="flex flex-col">
        <!-- Квартири -->
        <div class="pb-2 flex flex-col gap-1">
            <span class="text-slate-500">
                Квартири
            </span>
            <div class="flex items-center gap-3">
                <Input
                    v-model:value="apartmentName"
                    id="apartment-name"
                    type="text"
                    placeholder="Назва"
                    secondBg
                    :maxLength="15"
                />
                <Input
                    v-model:value="apartmentPrice"
                    id="apartment-price"
                    placeholder="Ціна"
                    :disabled="apartmentPayment.length > 0 || apartmentTerm.length > 0"
                    secondBg
                />
                <Add :firstValue="apartmentPrice" @add="buyApartment" />
            </div>
            <ul v-if="blank.apartments.length > 0" class="flex flex-col gap-1">
                <Purchased
                    v-for="{ id, name, price } in blank.apartments"
                    :id="id"
                    :price="price"
                    :label="name.length > 0 ? `${name}:` : 'Квартира:'"
                    @sell="sellApartment"
                />
                <li>
                    <InfoField wrapClasses="gap-2" labelClasses="text-opposite" label="Витрати:">
                        <span class="text-slate-400">
                            {{ blank.apartments.length * 200 }}
                        </span>
                    </InfoField>
                </li>
            </ul>
            <span class="text-xs text-slate-500">
                Кредит на квартиру
            </span>
            <div class="flex items-center gap-3">
                <Input
                    v-model:value="apartmentPayment"
                    id="apartment-payment"
                    placeholder="Платіж"
                    :disabled="apartmentPrice.length > 0"
                    secondBg
                />
                <Input
                    v-model:value="apartmentTerm"
                    id="apartment-term"
                    placeholder="Термін"
                    :disabled="apartmentPrice.length > 0"
                    secondBg
                />
                <Add :firstValue="apartmentPayment" :secondValue="apartmentTerm" @add="buyApartmentOnCredit" />
            </div>
        </div>

        <!-- Автівки -->
        <div class="pt-1 pb-2 flex flex-col gap-1 border-t border-dotted border-slate-700">
            <span class="text-slate-500">
                Автівки
            </span>
            <div class="flex items-center gap-3">
                <Input
                    v-model:value="carName"
                    id="car-name"
                    type="text"
                    placeholder="Назва"
                    secondBg
                    :maxLength="15"
                />
                <Input
                    v-model:value="carPrice"
                    id="car-price"
                    placeholder="Ціна"
                    :disabled="carPayment.length > 0 || carTerm.length > 0"
                    secondBg
                />
                <Add :firstValue="carPrice" @add="buyCar" />
            </div>
            <ul v-if="blank.cars.length > 0" class="flex flex-col gap-1">
                <Purchased
                    v-for="{ id, name, price } in blank.cars"
                    :id="id"
                    :price="price"
                    :label="name.length > 0 ? `${name}:` : 'Автівка:'"
                    @sell="sellCar"
                />
                <li>
                    <InfoField wrapClasses="gap-2" labelClasses="text-opposite" label="Витрати:">
                        <span class="text-slate-400">
                            {{ blank.cars.length * 600 }}
                        </span>
                    </InfoField>
                </li>
            </ul>
            <span class="text-xs text-slate-500">
                Кредит на автівку
            </span>
            <div class="flex items-center gap-3">
                <Input
                    v-model:value="carPayment"
                    id="car-payment"
                    placeholder="Платіж"
                    :disabled="carPrice.length > 0"
                    secondBg
                />
                <Input
                    v-model:value="carTerm"
                    id="car-term"
                    placeholder="Термін"
                    :disabled="carPrice.length > 0"
                    secondBg
                />
                <Add :firstValue="carPayment" :secondValue="carTerm" @add="buyCarOnCredit" />
            </div>
        </div>

        <!-- Котеджі -->
        <div class="pt-1 pb-2 border-t border-dotted border-slate-700">
            <div>
                <span class="text-slate-500">
                    Котеджі
                </span>
                <div class="mt-2 flex items-center gap-3">
                    <Input
                        v-model:value="cottageName"
                        id="plane"
                        type="text"
                        placeholder="Назва"
                        secondBg
                        :maxLength="15"
                    />
                    <Input v-model:value="cottagePrice" id="cottage" placeholder="Ціна" secondBg />
                    <Add :firstValue="cottagePrice" @add="buyCottage" />
                </div>
            </div>
            <ul v-if="blank.cottages.length > 0" class="flex flex-col gap-2">
                <Purchased
                    v-for="{ id, name, price } in blank.cottages"
                    :id="id"
                    :price="price"
                    :label="name.length > 0 ? `${name}:` : 'Котедж:'"
                    @sell="sellCottage"
                />
                <li>
                    <InfoField wrapClasses="gap-2" labelClasses="text-opposite" label="Витрати:">
                        <span class="text-slate-400">
                            {{ blank.apartments.length * 1000 }}
                        </span>
                    </InfoField>
                </li>
            </ul>
        </div>

        <!-- Яхти -->
        <div class="pt-1 pb-2 border-t border-dotted border-slate-700">
            <div>
                <span class="text-slate-500">
                    Яхти
                </span>
                <div class="mt-2 flex items-center gap-3">
                    <Input
                        v-model:value="yachtName"
                        id="plane"
                        type="text"
                        placeholder="Назва"
                        secondBg
                        :maxLength="15"
                    />
                    <Input v-model:value="yachtPrice" id="yacht" placeholder="Ціна" secondBg />
                    <Add :firstValue="yachtPrice" @add="buyYacht" />
                </div>
            </div>
            <ul v-if="blank.yachts.length > 0" class="flex flex-col gap-2">
                <Purchased
                    v-for="{ id, name, price } in blank.yachts"
                    :id="id"
                    :price="price"
                    :label="name.length > 0 ? `${name}:` : 'Яхта:'"
                    @sell="sellYacht"
                />
                <li>
                    <InfoField wrapClasses="gap-2" labelClasses="text-opposite" label="Витрати:">
                        <span class="text-slate-400">
                            {{ blank.apartments.length * 1500 }}
                        </span>
                    </InfoField>
                </li>
            </ul>
        </div>

        <!-- Літаки -->
        <div class="pt-1 border-t border-dotted border-slate-700">
            <div>
                <span class="text-slate-500">
                    Літаки
                </span>
                <div class="mt-2 flex items-center gap-3">
                    <Input
                        v-model:value="planeName"
                        id="plane"
                        type="text"
                        placeholder="Назва"
                        secondBg
                        :maxLength="15"
                    />
                    <Input v-model:value="planePrice" id="plane" placeholder="Ціна" secondBg />
                    <Add :firstValue="planePrice" @add="buyPlane" />
                </div>
            </div>
            <ul v-if="blank.planes.length > 0" class="flex flex-col gap-2">
                <Purchased
                    v-for="{ id, name, price } in blank.planes"
                    :id="id"
                    :price="price"
                    :label="name.length > 0 ? `${name}:` : 'Літак:'"
                    @sell="sellPlane"
                />
                <li>
                    <InfoField wrapClasses="gap-2" labelClasses="text-opposite" label="Витрати:">
                        <span class="text-slate-400">
                            {{ blank.apartments.length * 5000 }}
                        </span>
                    </InfoField>
                </li>
            </ul>
        </div>
    </div>

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
            Куди ти сунешся жебрак? {{ purchase }} він зібрався купляти... Іди гроші заробляй!
        </p>
    </Modal>

    <Modal :show="showModalCredit" cancel="Зрозумів" @cancel="showModalCredit = false">
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
            На жаль кредит не схвалений службою безпеки банку. Нас не цікавить хто Ви і що робите. Нас хвилює як Ви будете віддавати наші гроші.
        </p>
    </Modal>
</template>
