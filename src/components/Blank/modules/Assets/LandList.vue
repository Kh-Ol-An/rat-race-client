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

const buyLand = (id, price, quantity) => {
    if (blank.value.cash < price * quantity) return (showModal.value = true)
    emit('buy:land', id, price, quantity)
}
const sellLand = (id, price) => emit('sell:land', id, price)
const sellAcres = (price) => emit('sell:acres', price)
</script>

<template>
    <InputField
        label="Земля"
        type="assets"
        sub-type="land"
        first-placeholder="Ціна за сотку"
        second-placeholder="Кількість соток"
        second-bg
        @add="buyLand"
    />
    <ul v-if="blank.assets.land.length > 0" class="flex flex-col gap-2">
        <LandHead />
        <PieceOfLand
            v-for="{ id, price, quantity, cost } in blank.assets.land"
            :id="id"
            :key="id"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellLand"
        />
        <LandTotal :blank-land="blank.assets.land" @sell="sellAcres" />
    </ul>

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-center text-2xl font-bold text-opposite">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-center text-lg font-normal text-slate-400">
            Куди ти сунешся жебрак? Землю він зібрався купляти... Іди гроші
            заробляй!
        </p>
    </Modal>
</template>
