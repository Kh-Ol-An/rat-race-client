<script setup>
import { ref, toRef } from 'vue'
import Input from '../../../plugins/Input.vue'
import Add from '../../plugins/Add.vue'
import Modal from '../../plugins/Modal.vue'
import HouseItem from './HouseItem.vue'
import Sell from '../../plugins/Sell.vue'
import {
    removingSpaces,
    addingSpaces,
} from '../../../../helpers/formating-values.js'

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
})

const blank = toRef(props, 'blankProp')

const emit = defineEmits(['buy:house', 'sell:house', 'sell:houses'])

const showModal = ref(false)

const price = ref('')
const buyHouse = () => {
    if (blank.value.cash < Number(removingSpaces(price.value))) {
        showModal.value = true
        return (price.value = '')
    }

    emit('buy:house', new Date().valueOf(), Number(removingSpaces(price.value)))
    price.value = ''
}
const sellHouse = (price, id) => emit('sell:house', price, id)
const sellHouses = (price) => emit('sell:houses', price)
</script>

<template>
    <div>
        <span class="text-slate-500">Будинки</span>

        <div class="mt-2 flex items-center gap-3">
            <Input
                id="assets-houses"
                v-model:value="price"
                placeholder="Ціна будинка"
                second-bg
            />
            <Add :first-value="price" @add="buyHouse" />

            <Modal
                :show="showModal"
                cancel="Зрозумів"
                @cancel="showModal = false"
            >
                <h4
                    class="mx-auto text-2xl font-bold text-opposite text-center"
                >
                    Це не можливо!
                </h4>
                <p
                    class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center"
                >
                    Куди ти сунешся жебрак? Будинки він зібрався купляти... Іди
                    гроші заробляй!
                </p>
            </Modal>
        </div>
    </div>

    <ul v-if="blank.assets.houses.length > 0" class="flex flex-col gap-2">
        <HouseItem
            v-for="{ id, price } in blank.assets.houses"
            :key="id"
            :id="id"
            :price="price"
            @sell="sellHouse"
        />

        <li
            v-if="blank.assets.houses.length > 1"
            class="relative py-2 flex items-center gap-3 border-t-2 border-slate-700"
        >
            <span
                class="flex items-center gap-1 text-primary whitespace-nowrap"
            >
                <span class="text-slate-400">{{
                    blank.assets.houses.length
                }}</span>
                {{ blank.assets.houses.length > 4 ? 'будинків' : 'будинки' }}
                <Sell input-id="sell-price-houses" second-bg @sell="sellHouses">
                    на суму
                    <span class="text-slate-400">
                        {{
                            addingSpaces(
                                blank.assets.houses.reduce(
                                    (total, house) => (total += house.price),
                                    0
                                )
                            )
                        }}
                    </span>
                </Sell>
            </span>
        </li>
    </ul>
</template>
