<template>
    <h2 class="px-4 text-xl font-bold text-primary text-center">Прибутки</h2>

    <!-- Зарплата -->
    <div
        v-if="user.salary === 0 && firedSalary === 0"
        :class="[
            'flex items-center gap-3',
            salaryDisabled && 'pointer-events-none opacity-20',
        ]"
    >
        <Input v-model:value="salary" id="salary" placeholder="Зарплата" />
        <Add :firstValue="salary" @add="$emit('add:salary', Number(salary))" />
    </div>
    <InfoField v-if="user.salary > 0 || firedSalary > 0" labelClasses="text-primary" label="Зарплата:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(user.salary) }}
        </span>

        <button
            class="ml-4 px-2 rounded shadow bg-opposite text-sm text-slate-300 font-bold outline-0"
            type="button"
            title="Звільнили"
            @click="fired"
        >
            Звільнили
        </button>

        <button
            class="ml-4 px-2 rounded shadow bg-secondary text-sm text-slate-300 font-bold outline-0"
            type="button"
            title="Звільнитись"
            @click="quit"
        >
            Звільнитись
        </button>
    </InfoField>

    <!-- Малий -->
    <InputField
        label="Малий бізнес"
        type="business"
        subType="small"
        placeholderWorth="Вартість"
        placeholderValue="Прибутки"
        :disabled="
            ((user.salary > 0 || firedSalary > 0) && user.business.small.length > 0) ||
            user.business.middle.length > 0 ||
            user.business.big.length > 0 ||
            user.business.corrupt.length > 0
        "
        @add="buyBusiness"
    />
    <ul v-if="user.business.small.length > 0" class="flex flex-col gap-2">
        <BusinessHead
            firstTitle="Вартість"
            secondTitle="Прибутки"
            confirmationModalText="Ти впевнений що хочешь продати всі свої малі бізнеси?"
            @sell="sellBusiness('small')"
        />
        <Business
            v-for="({ id, price, income }) in user.business.small"
            :key="id"
            :id="id"
            :firstValue="price"
            :secondValue="income"
            :lastBusiness="user.business.last"
            incremental
            :disabledEdit="user.salary > 0 || firedSalary > 0"
            @increment="incrementIncomeBusiness"
            @delete="deleteBusiness('small', id)"
        />
    </ul>

    <!-- Середній -->
    <InputField
        label="Середній бізнес"
        type="business"
        subType="middle"
        placeholderWorth="Вартість"
        placeholderValue="Прибутки"
        :disabled="
            ((user.salary > 0 || firedSalary > 0) && user.business.middle.length > 0) ||
            user.business.small.length > 0 ||
            user.business.big.length > 0 ||
            user.business.corrupt.length > 0
        "
        @add="buyBusiness"
    />
    <ul v-if="user.business.middle.length > 0" class="flex flex-col gap-2">
        <BusinessHead
            firstTitle="Вартість"
            secondTitle="Прибутки"
            confirmationModalText="Ти впевнений що хочешь продати всі свої середні бізнеси?"
            @sell="sellBusiness('middle')"
        />
        <Business
            v-for="({ id, price, income })  in user.business.middle"
            :key="id"
            :id="id"
            :firstValue="price"
            :secondValue="income"
            :lastBusiness="user.business.last"
            @delete="deleteBusiness('middle', id)"
        />
    </ul>

    <!-- Великий -->
    <InputField
        label="Великий бізнес"
        type="business"
        subType="big"
        placeholderWorth="Вартість"
        placeholderValue="Прибутки"
        :disabled="
            (user.salary > 0 && user.business.big.length > 0) ||
            (user.salary > 0 && user.business.corrupt.length > 0) ||
            user.business.small.length > 0 ||
            user.business.middle.length > 0
        "
        @add="buyBusiness"
    />
    <ul v-if="user.business.big.length > 0" class="flex flex-col gap-2">
        <BusinessHead firstTitle="Вартість" secondTitle="Прибутки" :isSell="false" />
        <Business
            v-for="({ id, price, income })  in user.business.big"
            :key="id"
            :id="id"
            :firstValue="price"
            :secondValue="income"
            :lastBusiness="user.business.last"
            @delete="deleteBusiness('big', id)"
        />
    </ul>

    <!-- Корупційний -->
    <InputField
        label="Корупційний бізнес"
        type="business"
        subType="corrupt"
        placeholderWorth="Вартість"
        placeholderValue="Прибутки"
        :disabled="
            (user.salary > 0 && user.business.big.length > 0) ||
            (user.salary > 0 && user.business.corrupt.length > 0) ||
            user.business.small.length > 0 ||
            user.business.middle.length > 0
        "
        @add="buyBusiness"
    />
    <ul v-if="user.business.corrupt.length > 0" class="flex flex-col gap-2">
        <BusinessHead firstTitle="Вартість" secondTitle="Прибутки" :isSell="false" />
        <Business
            v-for="({ id, price, income }) in user.business.corrupt"
            :key="id"
            :id="id"
            :firstValue="price"
            :secondValue="income"
            :lastBusiness="user.business.last"
            @delete="deleteBusiness('corrupt', id)"
        />
    </ul>

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-800 text-center">
            Куди ти сунешся жебрак? Бізнес він зібрався купляти... Іди гроші заробляй!
        </p>
    </Modal>
</template>

<script setup>
import { ref, toRef, computed } from 'vue';
import Input from '../../plugins/Input.vue';
import Add from '../../plugins/Add.vue';
import InfoField from '../../plugins/InfoField.vue';
import InputField from '../../plugins/InputField.vue';
import BusinessHead from './BusinessHead.vue';
import Business from './Business.vue';
import Modal from '../../plugins/Modal.vue';
import { addingSpaces } from '../../../../helpers/formating-values.js';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
    firedSalary: {
        type: Number,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([ 'fired:salary', 'quit:salary', 'buy:business', 'increment:income', 'sell' ]);

const salary = ref('');
const fired = () => {
    emit('fired:salary');
    salary.value = '';
};
const quit = () => {
    emit('quit:salary');
    salary.value = '';
};
const salaryDisabled = computed(
    () =>
        user.value.business.small.find(business => business.expanded) ||
        user.value.business.small.length > 1 ||
        user.value.business.middle.length > 1 ||
        user.value.business.big.length > 1 ||
        user.value.business.corrupt.length > 1 ||
        (user.value.business.big.length > 0 && user.value.business.corrupt.length > 0)
);

const showModal = ref(false);

const buyBusiness = (id, price, income, subType) => {
    if (user.value.cash < price) return showModal.value = true;
    emit('buy:business', id, price, income, subType);
};
const incrementIncomeBusiness = (id, income) => emit('increment:income', id, income);
const deleteBusiness = (subType, id) => emit('delete:business', subType, id);
const sellBusiness = subType => emit('sell', subType);
</script>
