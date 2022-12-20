<template>
    <h2 class="px-4 text-xl font-bold text-primary text-center">Доходи</h2>

    <!-- Зарплата -->
    <div
        v-if="user.salary === 0"
        :class="[
            'flex items-center gap-3',
            salaryDisabled && 'pointer-events-none opacity-20',
        ]"
    >
        <Input v-model:value="salary" id="salary" placeholder="Зарплата" />
        <Add :firstValue="salary" @add="$emit('add:salary', Number(salary))" />
    </div>
    <InfoField
        v-if="user.salary > 0"
        labelClasses="text-additional"
        label="Зарплата:"
        :value="user.salary"
        editable
        @edit="$emit('edit:salary')"
    />

    <!-- Малий -->
    <InputField
        label="Малий бізнес"
        type="business"
        subType="small"
        placeholderWorth="Вартість"
        placeholderValue="Доходи"
        :disabled="
            (user.salary > 0 && user.business.small.length > 0) ||
            user.business.middle.length > 0 ||
            user.business.big.length > 0 ||
            user.business.corrupt.length > 0
        "
        @add="addBusiness"
    />
    <ul v-if="user.business.small.length > 0" class="flex flex-col gap-2">
        <AssetHead
            firstTitle="Вартість"
            secondTitle="Доходи"
            confirmationModalText="Ти впевнений що хочешь продати всі свої малі бізнеси?"
            @sell="sell('small')"
        />
        <List
            v-for="({ id, price, income }, idx) in user.business.small"
            :key="id"
            :id="id"
            subType="small"
            :firstValue="price"
            :secondValue="income"
            :idx="idx"
            :listLength="user.business.small.length"
            :lastBusiness="user.business.last"
            :disabledEdit="user.salary > 0"
            @edit="editBusiness"
            @delete="deleteBusiness('small', id)"
        />
    </ul>

    <!-- Середній -->
    <InputField
        label="Середній бізнес"
        type="business"
        subType="middle"
        placeholderWorth="Вартість"
        placeholderValue="Доходи"
        :disabled="
            (user.salary > 0 && user.business.middle.length > 0) ||
            user.business.small.length > 0 ||
            user.business.big.length > 0 ||
            user.business.corrupt.length > 0
        "
        @add="addBusiness"
    />
    <ul v-if="user.business.middle.length > 0" class="flex flex-col gap-2">
        <AssetHead
            firstTitle="Вартість"
            secondTitle="Доходи"
            confirmationModalText="Ти впевнений що хочешь продати всі свої середні бізнеси?"
            @sell="sell('middle')"
        />
        <List
            v-for="({ id, price, income }, idx)  in user.business.middle"
            :key="id"
            :id="id"
            subType="middle"
            :firstValue="price"
            :secondValue="income"
            :idx="idx"
            :listLength="user.business.middle.length"
            :lastBusiness="user.business.last"
            :disabledEdit="user.salary > 0"
            @edit="editBusiness"
            @delete="deleteBusiness('middle', id)"
        />
    </ul>

    <!-- Великий -->
    <InputField
        label="Великий бізнес"
        type="business"
        subType="big"
        placeholderWorth="Вартість"
        placeholderValue="Доходи"
        :disabled="
            (user.salary > 0 && user.business.big.length > 0) ||
            (user.salary > 0 && user.business.corrupt.length > 0) ||
            user.business.small.length > 0 ||
            user.business.middle.length > 0
        "
        @add="addBusiness"
    />
    <ul v-if="user.business.big.length > 0" class="flex flex-col gap-2">
        <AssetHead firstTitle="Вартість" secondTitle="Доходи" :isSell="false" />
        <List
            v-for="({ id, price, income }, idx)  in user.business.big"
            :key="id"
            subType="big"
            :firstValue="price"
            :secondValue="income"
            :idx="idx"
            :listLength="user.business.big.length"
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
        placeholderValue="Доходи"
        :disabled="
            (user.salary > 0 && user.business.big.length > 0) ||
            (user.salary > 0 && user.business.corrupt.length > 0) ||
            user.business.small.length > 0 ||
            user.business.middle.length > 0
        "
        @add="addBusiness"
    />
    <ul v-if="user.business.corrupt.length > 0" class="flex flex-col gap-2">
        <AssetHead firstTitle="Вартість" secondTitle="Доходи" :isSell="false" />
        <List
            v-for="({ id, price, income }, idx) in user.business.corrupt"
            :key="id"
            subType="corrupt"
            :firstValue="price"
            :secondValue="income"
            :idx="idx"
            :listLength="user.business.corrupt.length"
            :lastBusiness="user.business.last"
            @delete="deleteBusiness('corrupt', id)"
        />
    </ul>
</template>

<script setup>
import { ref, toRef, computed } from 'vue';
import Input from '../plugins/Input.vue';
import Add from '../plugins/Add.vue';
import InfoField from '../plugins/InfoField.vue';
import InputField from '../plugins/InputField.vue';
import AssetHead from '../plugins/AssetHead.vue';
import List from '../plugins/List.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([ 'add:business', 'edit:business', 'sell' ]);

const salary = ref('');
const salaryDisabled = computed(
    () =>
        user.value.business.small.length > 1 ||
        user.value.business.middle.length > 1 ||
        user.value.business.big.length > 1 ||
        user.value.business.corrupt.length > 1 ||
        (user.value.business.big.length > 0 && user.value.business.corrupt.length > 0)
);

const addBusiness = (subType, id, price, income) => emit('add:business', subType, id, price, income);
const editBusiness = (subType, id, income) => emit('edit:business', subType, id, income);
const deleteBusiness = (subType, id) => emit('delete:business', subType, id);
const sell = subType => emit('sell', subType);
</script>
