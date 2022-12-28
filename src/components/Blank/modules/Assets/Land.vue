<template>
    <InputField
        label="Земля"
        type="assets"
        subType="land"
        placeholderWorth="Ціна за сотку"
        placeholderValue="Кількість соток"
        secondBg
        @add="buyLand"
    />
    <ul v-if="user.assets.land.length > 0" class="flex flex-col gap-2">
        <LandHead />
        <PieceOfLand
            v-for="{id, price, quantity, cost} in user.assets.land"
            :key="id"
            :id="id"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellLand"
        />
        <Total
            :userLand="user.assets.land"
            @sell="sellAcres"
        />
    </ul>

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-800 text-center">
            Куди ти сунешся жебрак? Землю він зібрався купляти... Іди гроші заробляй!
        </p>
    </Modal>
</template>

<script setup>
import { ref, toRef } from "vue";
import InputField from '../../plugins/InputField.vue';
import LandHead from './LandHead.vue';
import PieceOfLand from './PieceOfLand.vue';
import Total from './Total.vue';
import Modal from '../../plugins/Modal.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([ 'buy:land', 'sell:land', 'sell:acres' ]);

const showModal = ref(false);

const buyLand = (id, price, quantity) => {
    if (user.value.cash < price * quantity) return showModal.value = true;
    emit('buy:land', id, price, quantity);
};
const sellLand = (id, price) => emit('sell:land', id, price);
const sellAcres = (price) => emit('sell:acres', price);
</script>
