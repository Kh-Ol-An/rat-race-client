<script setup>
import { ref, toRef } from 'vue'
import InputField from '../../plugins/InputField.vue'
import LandHead from './LandHead.vue'
import PieceOfLand from './PieceOfLand.vue'
import LandTotal from './LandTotal.vue'
import Modal from '../../plugins/Modal.vue'

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
})

const blank = toRef(props, 'blankProp')

const emit = defineEmits(['buy:land', 'sell:land', 'sell:acres'])

const showModal = ref(false)

const buyLand = (id, quantity, cost, subType, deputies) => {
    if (blank.value.cash < cost || blank.value.deputies < deputies)
        return (showModal.value = true)
    emit('buy:land', id, quantity, cost, deputies)
}
const sellLand = (id, price) => emit('sell:land', id, price)
const sellAcres = (price) => emit('sell:acres', price)
</script>

<template>
    <InputField
        label="Корупційна земля"
        type="assets"
        sub-type="corruptLand"
        first-placeholder="Кількість соток"
        third-placeholder="Депутати"
        second-placeholder="Вартість"
        second-bg
        @add="buyLand"
    />
    <ul v-if="blank.assets.corruptLand.length > 0" class="flex flex-col gap-2">
        <LandHead />
        <PieceOfLand
            v-for="{ id, price, quantity, cost } in blank.assets.corruptLand"
            :id="id"
            :key="id"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellLand"
        />
        <LandTotal :blank-land="blank.assets.corruptLand" @sell="sellAcres" />
    </ul>

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-center text-2xl font-bold text-opposite">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-center text-lg font-normal text-slate-400">
            Ти нас здивував! Намагатись купити у корупціонера і не доплатити
            йому)))<br />
            Поміркуй над кар'єрою депутата :)
        </p>
    </Modal>
</template>
