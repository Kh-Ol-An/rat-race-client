<template>
    <div class="flex items-center gap-3">
        <Input v-model:value="price" id="assets-houses" placeholder="Ціна будинка" />
        <Add :firstValue="price" @add="buyHouse" />

        <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
            <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
                Це не можливо!
            </h4>
            <p class="mx-auto mt-4 text-lg font-normal text-slate-800 text-center">
                Куди ти сунешся жебрак? Будинки він зібрався купляти... Іди гроші заробляй!
            </p>
        </Modal>
    </div>
    <ul v-if="user.assets.houses.length > 0" class="flex flex-col gap-2">
        <House
            v-for="{ id, price } in user.assets.houses"
            :id="id"
            :price="price"
            @sell="sellHouse"
        />

        <li
            v-if="user.assets.houses.length > 1"
            class="relative py-2 flex items-center gap-3 border-t-2 border-slate-300"
        >
            <span class="flex items-center gap-1 text-additional whitespace-nowrap">
                <span class="text-slate-800">{{ user.assets.houses.length }}</span>
                {{ user.assets.houses.length > 4 ? 'будинків' : 'будинка' }}
                на суму
                <span class="text-slate-800">
                    {{ addingSpaces(user.assets.houses.reduce((total, house) => total += house.price, 0)) }}
                </span>
            </span>

            <Sell inputId="sell-price-houses" @sell="sellHouses" />
        </li>
    </ul>
</template>

<script setup>
import { ref, toRef } from "vue";
import Input from '../../plugins/Input.vue';
import Add from '../../plugins/Add.vue';
import Modal from '../../plugins/Modal.vue';
import House from './House.vue';
import Sell from '../../plugins/Sell.vue';
import { addingSpaces } from '../../../../helpers/formating-values.js';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([ 'buy:house', 'sell:house', 'sell:houses' ]);

const showModal = ref(false);

const price = ref('');
const buyHouse = () => {
    if (user.value.cash < Number(price.value)) return showModal.value = true;

    emit('buy:house', new Date().valueOf(), Number(price.value));
    price.value = '';
};
const sellHouse = (price, id) => emit('sell:house', price, id);
const sellHouses = (price) => emit('sell:houses', price);
</script>
