<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Багатство</h2>

    <!-- Квартири -->
    <div class="mt-2 flex items-center gap-3">
        <Input v-model:value="apartment" id="apartment" placeholder="Ціна квартири" />
        <Add :firstValue="apartment" @add="buyApartment" />
    </div>
    <ul v-if="user.apartments.length > 0" class="flex flex-col gap-2">
        <Purchased
            v-for="{ id, price } in user.apartments"
            :id="id"
            :price="price"
            label="Квартира:"
            @sell="sellApartment"
        />
    </ul>

    <!-- Автівки -->
    <div class="mt-2 flex items-center gap-3">
        <Input v-model:value="car" id="car" placeholder="Ціна автівки" />
        <Add :firstValue="car" @add="buyCar" />
    </div>
    <ul v-if="user.cars.length > 0" class="flex flex-col gap-2">
        <Purchased
            v-for="{ id, price } in user.cars"
            :id="id"
            :price="price"
            label="Автівка:"
            @sell="sellCar"
        />
    </ul>

    <!-- Котеджі -->
    <div class="mt-2 flex items-center gap-3">
        <Input v-model:value="cottage" id="cottage" placeholder="Ціна котеджу" />
        <Add :firstValue="cottage" @add="buyCottage" />
    </div>
    <ul v-if="user.cottages.length > 0" class="flex flex-col gap-2">
        <Purchased
            v-for="{ id, price } in user.cottages"
            :id="id"
            :price="price"
            label="Котедж:"
            @sell="sellCottage"
        />
    </ul>

    <!-- Яхти -->
    <div class="mt-2 flex items-center gap-3">
        <Input v-model:value="yacht" id="yacht" placeholder="Ціна яхти" />
        <Add :firstValue="yacht" @add="buyYacht" />
    </div>
    <ul v-if="user.yachts.length > 0" class="flex flex-col gap-2">
        <Purchased
            v-for="{ id, price } in user.yachts"
            :id="id"
            :price="price"
            label="Яхта:"
            @sell="sellYacht"
        />
    </ul>

    <!-- Літаки -->
    <div class="mt-2 flex items-center gap-3">
        <Input v-model:value="plane" id="plane" placeholder="Ціна літака" />
        <Add :firstValue="plane" @add="buyPlane" />
    </div>
    <ul v-if="user.planes.length > 0" class="flex flex-col gap-2">
        <Purchased
            v-for="{ id, price } in user.planes"
            :id="id"
            :price="price"
            label="Літак:"
            @sell="sellPlane"
        />
    </ul>

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-800 text-center">
            Куди ти сунешся жебрак? {{ purchase }} він зібрався купляти... Іди гроші заробляй!
        </p>
    </Modal>
</template>

<script setup>
import { ref, toRef } from "vue";
import Input from '../plugins/Input.vue';
import Add from '../plugins/Add.vue';
import Purchased from '../plugins/Purchased.vue';
import Modal from '../plugins/Modal.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([
    'buy:apartment',
    'sell:apartment',
    'buy:car',
    'sell:car',
    'buy:cottage',
    'sell:cottage',
    'buy:yacht',
    'sell:yacht',
    'buy:plane',
    'sell:plane',
]);

const showModal = ref(false);
const purchase = ref('');

const apartment = ref('');
const buyApartment = () => {
    if (user.value.cash < Number(apartment.value)) {
        purchase.value = 'Квартири';
        showModal.value = true;
        return apartment.value = '';
    }

    emit('buy:apartment', new Date().valueOf(), Number(apartment.value));
    apartment.value = '';
};
const sellApartment = id => emit('sell:apartment', id);

const car = ref('');
const buyCar = () => {
    if (user.value.cash < Number(car.value)) {
        purchase.value = 'Машини';
        showModal.value = true;
        return car.value = '';
    }

    emit('buy:car', new Date().valueOf(), Number(car.value));
    car.value = '';
};
const sellCar = id => emit('sell:car', id);

const cottage = ref('');
const buyCottage = () => {
    if (user.value.cash < Number(cottage.value)) {
        purchase.value = 'Котеджі';
        showModal.value = true;
        return cottage.value = '';
    }

    emit('buy:cottage', new Date().valueOf(), Number(cottage.value));
    cottage.value = '';
};
const sellCottage = id => emit('sell:cottage', id);

const yacht = ref('');
const buyYacht = () => {
    if (user.value.cash < Number(yacht.value)) {
        purchase.value = 'Яхти';
        showModal.value = true;
        return yacht.value = '';
    }

    emit('buy:yacht', new Date().valueOf(), Number(yacht.value));
    yacht.value = '';
};
const sellYacht = id => emit('sell:yacht', id);

const plane = ref('');
const buyPlane = () => {
    if (user.value.cash < Number(plane.value)) {
        purchase.value = 'Літаки';
        showModal.value = true;
        return plane.value = '';
    }

    emit('buy:plane', new Date().valueOf(), Number(plane.value));
    plane.value = '';
};
const sellPlane = id => emit('sell:plane', id);
</script>
