<script setup>
import { ref, toRef } from 'vue'
import Input from '../../../plugins/Input.vue'
import ActionAdd from '../../plugins/ActionAdd.vue'
import LuxuryItemPurchased from './LuxuryItemPurchased.vue'
import Modal from '../../plugins/Modal.vue'
import InfoField from '../../../plugins/InfoField.vue'
import {
    removingSpaces,
    addingSpaces,
} from '../../../../helpers/formating-values.js'
import {
    APARTMENT_EXPENSES,
    CAR_EXPENSES,
    COTTAGE_EXPENSES,
    YACHT_EXPENSES,
    PLANE_EXPENSES,
} from '../../../../database/variables.js'

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
    cashFlow: {
        type: Number,
        required: true,
    },
})

const blank = toRef(props, 'blankProp')

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
])

const showModal = ref(false)
const showModalCredit = ref(false)
const purchase = ref('')

// Квартира
const apartmentName = ref('')
const apartmentPrice = ref('')
const buyApartment = () => {
    if (blank.value.cash < Number(removingSpaces(apartmentPrice.value))) {
        purchase.value = 'Квартири'
        showModal.value = true
        apartmentName.value = ''
        apartmentPrice.value = ''
        return
    }

    emit(
        'buy:apartment',
        new Date().valueOf(),
        apartmentName.value,
        Number(removingSpaces(apartmentPrice.value))
    )
    apartmentName.value = ''
    apartmentPrice.value = ''
}
const apartmentPayment = ref('')
const apartmentTerm = ref('')
const buyApartmentOnCredit = () => {
    if (props.cashFlow < Number(removingSpaces(apartmentPayment.value))) {
        showModalCredit.value = true
        apartmentName.value = ''
        apartmentPayment.value = ''
        apartmentTerm.value = ''
        return
    }

    emit(
        'credit:apartment',
        new Date().valueOf(),
        apartmentName.value,
        Number(removingSpaces(apartmentPayment.value)),
        Number(removingSpaces(apartmentTerm.value))
    )
    apartmentName.value = ''
    apartmentPayment.value = ''
    apartmentTerm.value = ''
}
const sellApartment = (id) => emit('sell:apartment', id)

// Автівка
const carName = ref('')
const carPrice = ref('')
const buyCar = () => {
    if (blank.value.cash < Number(removingSpaces(carPrice.value))) {
        purchase.value = 'Машини'
        showModal.value = true
        carName.value = ''
        carPrice.value = ''
        return
    }

    emit(
        'buy:car',
        new Date().valueOf(),
        carName.value,
        Number(removingSpaces(carPrice.value))
    )
    carName.value = ''
    carPrice.value = ''
}
const carPayment = ref('')
const carTerm = ref('')
const buyCarOnCredit = () => {
    if (props.cashFlow < Number(removingSpaces(carPayment.value))) {
        showModalCredit.value = true
        carPayment.value = ''
        carTerm.value = ''
        return
    }

    emit(
        'credit:car',
        new Date().valueOf(),
        carName.value,
        Number(removingSpaces(carPayment.value)),
        Number(removingSpaces(carTerm.value))
    )
    carName.value = ''
    carPayment.value = ''
    carTerm.value = ''
}
const sellCar = (id) => emit('sell:car', id)

// Котедж
const cottageName = ref('')
const cottagePrice = ref('')
const buyCottage = () => {
    if (blank.value.cash < Number(removingSpaces(cottagePrice.value))) {
        purchase.value = 'Котеджі'
        showModal.value = true
        cottageName.value = ''
        cottagePrice.value = ''
        return
    }

    emit(
        'buy:cottage',
        new Date().valueOf(),
        cottageName.value,
        Number(removingSpaces(cottagePrice.value))
    )
    cottageName.value = ''
    cottagePrice.value = ''
}
const sellCottage = (id) => emit('sell:cottage', id)

// Яхта
const yachtName = ref('')
const yachtPrice = ref('')
const buyYacht = () => {
    if (blank.value.cash < Number(removingSpaces(yachtPrice.value))) {
        purchase.value = 'Яхти'
        showModal.value = true
        yachtName.value = ''
        yachtPrice.value = ''
        return
    }

    emit(
        'buy:yacht',
        new Date().valueOf(),
        yachtName.value,
        Number(removingSpaces(yachtPrice.value))
    )
    yachtName.value = ''
    yachtPrice.value = ''
}
const sellYacht = (id) => emit('sell:yacht', id)

// Літак
const planeName = ref('')
const planePrice = ref('')
const buyPlane = () => {
    if (blank.value.cash < Number(removingSpaces(planePrice.value))) {
        purchase.value = 'Літаки'
        showModal.value = true
        planeName.value = ''
        planePrice.value = ''
        return
    }

    emit(
        'buy:plane',
        new Date().valueOf(),
        planeName.value,
        Number(removingSpaces(planePrice.value))
    )
    planeName.value = ''
    planePrice.value = ''
}
const sellPlane = (id) => emit('sell:plane', id)
</script>

<template>
    <h2 class="px-4 text-center text-xl font-bold text-opposite">Багатство</h2>

    <div class="flex flex-col">
        <!-- Квартири -->
        <div class="flex flex-col gap-1 pb-2">
            <span class="text-slate-500"> Квартири </span>
            <div class="flex items-center gap-3">
                <Input
                    id="apartment-name"
                    v-model:value="apartmentName"
                    type="text"
                    placeholder="Назва"
                    :max-length="15"
                />
                <Input
                    id="apartment-price"
                    v-model:value="apartmentPrice"
                    placeholder="Ціна"
                    :disabled="
                        apartmentPayment.length > 0 || apartmentTerm.length > 0
                    "
                />
                <ActionAdd :first-value="apartmentPrice" @add="buyApartment" />
            </div>
            <ul v-if="blank.apartments.length > 0" class="flex flex-col gap-1">
                <LuxuryItemPurchased
                    v-for="{ id, name, price } in blank.apartments"
                    :id="id"
                    :key="id"
                    :price="price"
                    :label="name.length > 0 ? `${name}:` : 'Квартира:'"
                    @sell="sellApartment"
                />
                <li>
                    <InfoField
                        wrap-classes="gap-2"
                        label-classes="text-opposite"
                        label="Витрати:"
                    >
                        <span class="text-slate-400">
                            {{
                                addingSpaces(
                                    blank.apartments.length * APARTMENT_EXPENSES
                                )
                            }}
                        </span>
                    </InfoField>
                </li>
            </ul>
            <span class="text-xs text-slate-500"> Кредит на квартиру </span>
            <div class="flex items-center gap-3">
                <Input
                    id="apartment-payment"
                    v-model:value="apartmentPayment"
                    placeholder="Платіж"
                    :disabled="apartmentPrice.length > 0"
                />
                <Input
                    id="apartment-term"
                    v-model:value="apartmentTerm"
                    placeholder="Термін"
                    :disabled="apartmentPrice.length > 0"
                />
                <Add
                    :first-value="apartmentPayment"
                    :second-value="apartmentTerm"
                    @add="buyApartmentOnCredit"
                />
            </div>
        </div>

        <!-- Автівки -->
        <div
            class="flex flex-col gap-1 border-t border-dotted border-slate-700 pt-1 pb-2"
        >
            <span class="text-slate-500"> Автівки </span>
            <div class="flex items-center gap-3">
                <Input
                    id="car-name"
                    v-model:value="carName"
                    type="text"
                    placeholder="Назва"
                    :max-length="15"
                />
                <Input
                    id="car-price"
                    v-model:value="carPrice"
                    placeholder="Ціна"
                    :disabled="carPayment.length > 0 || carTerm.length > 0"
                />
                <ActionAdd :first-value="carPrice" @add="buyCar" />
            </div>
            <ul v-if="blank.cars.length > 0" class="flex flex-col gap-1">
                <LuxuryItemPurchased
                    v-for="{ id, name, price } in blank.cars"
                    :id="id"
                    :key="id"
                    :price="price"
                    :label="name.length > 0 ? `${name}:` : 'Автівка:'"
                    @sell="sellCar"
                />
                <li>
                    <InfoField
                        wrap-classes="gap-2"
                        label-classes="text-opposite"
                        label="Витрати:"
                    >
                        <span class="text-slate-400">
                            {{ addingSpaces(blank.cars.length * CAR_EXPENSES) }}
                        </span>
                    </InfoField>
                </li>
            </ul>
            <span class="text-xs text-slate-500"> Кредит на автівку </span>
            <div class="flex items-center gap-3">
                <Input
                    id="car-payment"
                    v-model:value="carPayment"
                    placeholder="Платіж"
                    :disabled="carPrice.length > 0"
                />
                <Input
                    id="car-term"
                    v-model:value="carTerm"
                    placeholder="Термін"
                    :disabled="carPrice.length > 0"
                />
                <ActionAdd
                    :first-value="carPayment"
                    :second-value="carTerm"
                    @add="buyCarOnCredit"
                />
            </div>
        </div>

        <!-- Котеджі -->
        <div class="border-t border-dotted border-slate-700 pt-1 pb-2">
            <div>
                <span class="text-slate-500"> Котеджі </span>
                <div class="mt-2 flex items-center gap-3">
                    <Input
                        id="plane"
                        v-model:value="cottageName"
                        type="text"
                        placeholder="Назва"
                        :max-length="15"
                    />
                    <Input
                        id="cottage"
                        v-model:value="cottagePrice"
                        placeholder="Ціна"
                    />
                    <ActionAdd :first-value="cottagePrice" @add="buyCottage" />
                </div>
            </div>
            <ul v-if="blank.cottages.length > 0" class="flex flex-col gap-2">
                <LuxuryItemPurchased
                    v-for="{ id, name, price } in blank.cottages"
                    :id="id"
                    :key="id"
                    :price="price"
                    :label="name.length > 0 ? `${name}:` : 'Котедж:'"
                    @sell="sellCottage"
                />
                <li>
                    <InfoField
                        wrap-classes="gap-2"
                        label-classes="text-opposite"
                        label="Витрати:"
                    >
                        <span class="text-slate-400">
                            {{
                                addingSpaces(
                                    blank.cottages.length * COTTAGE_EXPENSES
                                )
                            }}
                        </span>
                    </InfoField>
                </li>
            </ul>
        </div>

        <!-- Яхти -->
        <div class="border-t border-dotted border-slate-700 pt-1 pb-2">
            <div>
                <span class="text-slate-500"> Яхти </span>
                <div class="mt-2 flex items-center gap-3">
                    <Input
                        id="plane"
                        v-model:value="yachtName"
                        type="text"
                        placeholder="Назва"
                        :max-length="15"
                    />
                    <Input
                        id="yacht"
                        v-model:value="yachtPrice"
                        placeholder="Ціна"
                    />
                    <ActionAdd :first-value="yachtPrice" @add="buyYacht" />
                </div>
            </div>
            <ul v-if="blank.yachts.length > 0" class="flex flex-col gap-2">
                <LuxuryItemPurchased
                    v-for="{ id, name, price } in blank.yachts"
                    :id="id"
                    :key="id"
                    :price="price"
                    :label="name.length > 0 ? `${name}:` : 'Яхта:'"
                    @sell="sellYacht"
                />
                <li>
                    <InfoField
                        wrap-classes="gap-2"
                        label-classes="text-opposite"
                        label="Витрати:"
                    >
                        <span class="text-slate-400">
                            {{
                                addingSpaces(
                                    blank.yachts.length * YACHT_EXPENSES
                                )
                            }}
                        </span>
                    </InfoField>
                </li>
            </ul>
        </div>

        <!-- Літаки -->
        <div class="border-t border-dotted border-slate-700 pt-1">
            <div>
                <span class="text-slate-500"> Літаки </span>
                <div class="mt-2 flex items-center gap-3">
                    <Input
                        id="plane"
                        v-model:value="planeName"
                        type="text"
                        placeholder="Назва"
                        :max-length="15"
                    />
                    <Input
                        id="plane"
                        v-model:value="planePrice"
                        placeholder="Ціна"
                    />
                    <ActionAdd :first-value="planePrice" @add="buyPlane" />
                </div>
            </div>
            <ul v-if="blank.planes.length > 0" class="flex flex-col gap-2">
                <LuxuryItemPurchased
                    v-for="{ id, name, price } in blank.planes"
                    :id="id"
                    :key="id"
                    :price="price"
                    :label="name.length > 0 ? `${name}:` : 'Літак:'"
                    @sell="sellPlane"
                />
                <li>
                    <InfoField
                        wrap-classes="gap-2"
                        label-classes="text-opposite"
                        label="Витрати:"
                    >
                        <span class="text-slate-400">
                            {{
                                addingSpaces(
                                    blank.planes.length * PLANE_EXPENSES
                                )
                            }}
                        </span>
                    </InfoField>
                </li>
            </ul>
        </div>
    </div>

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-center text-2xl font-bold text-opposite">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-center text-lg font-normal text-slate-400">
            Куди ти сунешся жебрак? {{ purchase }} він зібрався купляти... Іди
            гроші заробляй!
        </p>
    </Modal>

    <Modal
        :show="showModalCredit"
        cancel="Зрозумів"
        @cancel="showModalCredit = false"
    >
        <h4 class="mx-auto text-center text-2xl font-bold text-opposite">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-center text-lg font-normal text-slate-400">
            На жаль кредит не схвалений службою безпеки банку. Нас не цікавить
            хто Ви і що робите. Нас хвилює як Ви будете віддавати наші гроші.
        </p>
    </Modal>
</template>
