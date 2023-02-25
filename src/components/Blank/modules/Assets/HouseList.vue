<script setup>
import { ref, toRef } from 'vue'
import Input from '../../../plugins/Input.vue'
import ActionAdd from '../../plugins/ActionAdd.vue'
import Modal from '../../plugins/Modal.vue'
import HouseItem from './HouseItem.vue'
import ActionSell from '../../plugins/ActionSell.vue'
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

const housePrice = ref('')
const buyHouse = () => {
    if (blank.value.cash < Number(removingSpaces(housePrice.value))) {
        showModal.value = true
        return (housePrice.value = '')
    }

    emit(
        'buy:house',
        new Date().valueOf(),
        Number(removingSpaces(housePrice.value))
    )
    housePrice.value = ''
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
                v-model:value="housePrice"
                placeholder="Ціна будинка"
                second-bg
            />
            <ActionAdd :first-value="housePrice" @add="buyHouse" />

            <Modal
                :show="showModal"
                cancel="Зрозумів"
                @cancel="showModal = false"
            >
                <h4
                    class="mx-auto text-center text-2xl font-bold text-opposite"
                >
                    Це не можливо!
                </h4>
                <p
                    class="mx-auto mt-4 text-center text-lg font-normal text-slate-400"
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
            :id="id"
            :key="id"
            :price="price"
            @sell="sellHouse"
        />

        <li
            v-if="blank.assets.houses.length > 1"
            class="relative flex items-center gap-3 border-t-2 border-slate-700 py-2"
        >
            <span
                class="flex items-center gap-1 whitespace-nowrap text-primary"
            >
                <span class="text-slate-400">
                    {{ blank.assets.houses.length }}
                </span>
                {{ blank.assets.houses.length > 4 ? 'будинків' : 'будинки' }}
                <ActionSell
                    input-id="sell-price-houses"
                    second-bg
                    @sell="sellHouses"
                >
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
                </ActionSell>
            </span>
        </li>
    </ul>
</template>
