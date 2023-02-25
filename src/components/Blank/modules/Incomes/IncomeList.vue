<script setup>
import { ref, toRef } from 'vue'
import Input from '../../../plugins/Input.vue'
import ActionAdd from '../../plugins/ActionAdd.vue'
import InfoField from '../../../plugins/InfoField.vue'
import InputField from '../../plugins/InputField.vue'
import BusinessHead from './BusinessHead.vue'
import BusinessItem from './BusinessItem.vue'
import Modal from '../../plugins/Modal.vue'
import {
    removingSpaces,
    addingSpaces,
} from '../../../../helpers/formating-values.js'

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
    firedSalary: {
        type: Number,
        required: true,
    },
})

const blank = toRef(props, 'blankProp')

const emit = defineEmits([
    'add:salary',
    'fired:salary',
    'quit:salary',
    'buy:business',
    'increment:income',
    'delete:business',
    'sell',
    'one-time:income',
])

const salary = ref('')
const fired = () => {
    emit('fired:salary')
    salary.value = ''
}
const quit = () => {
    emit('quit:salary')
    salary.value = ''
}

const showModal = ref(false)

const buyBusiness = (id, price, income, subType, deputies) => {
    if (blank.value.cash < price || blank.value.deputies < deputies)
        return (showModal.value = true)
    emit('buy:business', id, price, income, subType, deputies)
}
const incrementIncomeBusiness = (id, income) =>
    emit('increment:income', id, income)
const deleteBusiness = (subType, id) => emit('delete:business', subType, id)
const sellBusiness = (subType) => emit('sell', subType)

const oneTimeIncome = (id, price, income, subType, deputies) => {
    if (blank.value.cash < price || blank.value.deputies < deputies)
        return (showModal.value = true)
    emit('one-time:income', income - price, deputies)
}
</script>

<template>
    <h2 class="px-4 text-xl font-bold text-primary text-center">Прибутки</h2>

    <!-- Зарплата -->
    <div
        v-if="
            blank.salary === 0 &&
            firedSalary === 0 &&
            blank.business.small.length < 2 &&
            !blank.business.small.some(({ expanded }) => expanded) &&
            blank.business.middle.length < 2 &&
            blank.business.big.length < 2 &&
            blank.business.corrupt.length < 2 &&
            (blank.business.big.length < 1 || blank.business.corrupt.length < 1)
        "
        class="flex items-center gap-3"
    >
        <Input
            id="salary"
            v-model:value="salary"
            placeholder="Зарплата"
            second-bg
        />
        <ActionAdd
            :first-value="salary"
            @add="$emit('add:salary', Number(removingSpaces(salary)))"
        />
    </div>
    <InfoField
        v-if="blank.salary > 0 || firedSalary > 0"
        label-classes="text-primary"
        label="Зарплата:"
    >
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.salary) }}
        </span>

        <button
            class="ml-4 px-2 rounded shadow bg-gradient-to-b from-oppositeLight to-opposite text-sm text-slate-300 font-bold outline-0"
            type="button"
            title="Звільнили"
            @click="fired"
        >
            Звільнили
        </button>

        <button
            class="ml-4 px-2 rounded shadow bg-gradient-to-b from-secondaryLight to-secondary text-sm text-slate-300 font-bold outline-0"
            type="button"
            title="Звільнитись"
            @click="quit"
        >
            Звільнитись
        </button>
    </InfoField>

    <!-- Малий -->
    <InputField
        v-if="
            blank.business.middle.length === 0 &&
            blank.business.big.length === 0 &&
            blank.business.corrupt.length === 0
        "
        label="Малий бізнес"
        type="business"
        sub-type="small"
        first-placeholder="Вартість"
        second-placeholder="Прибутки"
        :disabled="
            ((blank.salary > 0 || firedSalary > 0) &&
                blank.business.small.length > 0) ||
            blank.business.middle.length > 0 ||
            blank.business.big.length > 0 ||
            blank.business.corrupt.length > 0
        "
        second-bg
        @add="buyBusiness"
    />
    <ul v-if="blank.business.small.length > 0" class="flex flex-col gap-2">
        <BusinessHead
            first-title="Вартість"
            second-title="Прибутки"
            confirmation-modal-text="Ти впевнений що хочешь продати всі свої малі бізнеси?"
            @sell="sellBusiness('small')"
        />
        <BusinessItem
            v-for="{ id, price, income } in blank.business.small"
            :id="id"
            :key="id"
            :first-value="price"
            :second-value="income"
            :last-business="blank.business.last"
            incremental
            :disabled-edit="blank.salary > 0 || firedSalary > 0"
            @increment="incrementIncomeBusiness"
            @delete="deleteBusiness('small', id)"
        />
    </ul>

    <!-- Середній -->
    <InputField
        v-if="
            blank.business.small.length === 0 &&
            blank.business.big.length === 0 &&
            blank.business.corrupt.length === 0
        "
        label="Середній бізнес"
        type="business"
        sub-type="middle"
        first-placeholder="Вартість"
        second-placeholder="Прибутки"
        :disabled="
            ((blank.salary > 0 || firedSalary > 0) &&
                blank.business.middle.length > 0) ||
            blank.business.small.length > 0 ||
            blank.business.big.length > 0 ||
            blank.business.corrupt.length > 0
        "
        second-bg
        @add="buyBusiness"
    />
    <ul v-if="blank.business.middle.length > 0" class="flex flex-col gap-2">
        <BusinessHead
            first-title="Вартість"
            second-title="Прибутки"
            confirmation-modal-text="Ти впевнений що хочешь продати всі свої середні бізнеси?"
            @sell="sellBusiness('middle')"
        />
        <BusinessItem
            v-for="{ id, price, income } in blank.business.middle"
            :id="id"
            :key="id"
            :first-value="price"
            :second-value="income"
            :last-business="blank.business.last"
            @delete="deleteBusiness('middle', id)"
        />
    </ul>

    <!-- Великий -->
    <InputField
        v-if="
            blank.business.small.length === 0 &&
            blank.business.middle.length === 0
        "
        label="Великий бізнес"
        type="business"
        sub-type="big"
        first-placeholder="Вартість"
        second-placeholder="Прибутки"
        :disabled="
            (blank.salary > 0 && blank.business.big.length > 0) ||
            (blank.salary > 0 && blank.business.corrupt.length > 0) ||
            blank.business.small.length > 0 ||
            blank.business.middle.length > 0
        "
        second-bg
        @add="buyBusiness"
    />
    <ul v-if="blank.business.big.length > 0" class="flex flex-col gap-2">
        <BusinessHead
            first-title="Вартість"
            second-title="Прибутки"
            :is-sell="false"
        />
        <BusinessItem
            v-for="{ id, price, income } in blank.business.big"
            :id="id"
            :key="id"
            :first-value="price"
            :second-value="income"
            :last-business="blank.business.last"
            @delete="deleteBusiness('big', id)"
        />
    </ul>

    <!-- Корупційний -->
    <InputField
        v-if="
            blank.business.small.length === 0 &&
            blank.business.middle.length === 0 &&
            blank.rich
        "
        label="Корупційний бізнес"
        type="business"
        sub-type="corrupt"
        first-placeholder="Вартість"
        second-placeholder="Прибутки"
        third-placeholder="Депутати"
        :disabled="
            (blank.salary > 0 && blank.business.big.length > 0) ||
            (blank.salary > 0 && blank.business.corrupt.length > 0) ||
            blank.business.small.length > 0 ||
            blank.business.middle.length > 0
        "
        second-bg
        @add="buyBusiness"
    />
    <ul v-if="blank.business.corrupt.length > 0" class="flex flex-col gap-2">
        <BusinessHead
            first-title="Вартість"
            second-title="Прибутки"
            :is-sell="false"
        />
        <BusinessItem
            v-for="{ id, price, income } in blank.business.corrupt"
            :id="id"
            :key="id"
            :first-value="price"
            :second-value="income"
            :last-business="blank.business.last"
            @delete="deleteBusiness('corrupt', id)"
        />
    </ul>

    <!-- Разовий дохід -->
    <InputField
        v-if="blank.rich"
        label="Разовий дохід"
        type="one-time"
        sub-type="corrupt"
        first-placeholder="Вартість"
        second-placeholder="Прибуток"
        third-placeholder="Депутати"
        second-bg
        @add="oneTimeIncome"
    />

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
            Куди ти сунешся жебрак? Бізнес він зібрався купляти... Іди гроші
            заробляй!
        </p>
    </Modal>
</template>
