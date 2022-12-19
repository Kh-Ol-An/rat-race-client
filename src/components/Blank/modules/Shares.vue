<template>
    <h2 class="px-4 text-xl font-bold text-primary text-center">Акції</h2>

    <!-- GC -->
    <InputField
        label="GC"
        type="shares"
        subType="gc"
        placeholderWorth="Ціна"
        placeholderValue="Кількість"
        @add="add"
    />
    <ul v-if="user.shares.gc.length > 0" class="flex flex-col gap-2">
        <AssetHead
            firstTitle="Ціна"
            secondTitle="Кількість"
            thirdTitle="Вартість"
            confirmationModalText="Ти впевнений що хочешь продати всі свої акції GC?"
            @sell="sell('gc')"
        />
        <List
            v-for="{id, price, quantity, cost} in user.shares.gc"
            :key="id"
            :firstValue="price"
            :secondValue="quantity"
            :thirdValue="cost"
        />
        <AssetTotal :userShare="user.shares.gc" />
    </ul>

    <!-- ЩУН -->
    <InputField
        label="ЩУН"
        type="shares"
        subType="shchun"
        placeholderWorth="Ціна"
        placeholderValue="Кількість"
        @add="add"
    />
    <ul v-if="user.shares.shchun.length > 0" class="flex flex-col gap-2">
        <AssetHead
            firstTitle="Ціна"
            secondTitle="Кількість"
            thirdTitle="Вартість"
            confirmationModalText="Ти впевнений що хочешь продати всі свої акції ЩУН?"
            @sell="sell('shchun')"
        />
        <List
            v-for="{id, price, quantity, cost} in user.shares.shchun"
            :key="id"
            :firstValue="price"
            :secondValue="quantity"
            :thirdValue="cost"
        />
        <AssetTotal :userShare="user.shares.shchun" />
    </ul>

    <!-- TO -->
    <InputField
        label="TO"
        type="shares"
        subType="to"
        placeholderWorth="Ціна"
        placeholderValue="Кількість"
        @add="add"
    />
    <ul v-if="user.shares.to.length > 0" class="flex flex-col gap-2">
        <AssetHead
            firstTitle="Ціна"
            secondTitle="Кількість"
            thirdTitle="Вартість"
            confirmationModalText="Ти впевнений що хочешь продати всі свої акції TO?"
            @sell="sell('to')"
        />
        <List
            v-for="{id, price, quantity, cost} in user.shares.to"
            :key="id"
            :firstValue="price"
            :secondValue="quantity"
            :thirdValue="cost"
        />
        <AssetTotal :userShare="user.shares.to" />
    </ul>

    <!-- CST -->
    <InputField
        label="CST"
        type="shares"
        subType="cst"
        placeholderWorth="Ціна"
        placeholderValue="Кількість"
        @add="add"
    />
    <ul v-if="user.shares.cst.length > 0" class="flex flex-col gap-2">
        <AssetHead
            firstTitle="Ціна"
            secondTitle="Кількість"
            thirdTitle="Вартість"
            confirmationModalText="Ти впевнений що хочешь продати всі свої акції CST?"
            @sell="sell('cst')"
        />
        <List
            v-for="{id, price, quantity, cost} in user.shares.cst"
            :key="id"
            :firstValue="price"
            :secondValue="quantity"
            :thirdValue="cost"
        />
        <AssetTotal :userShare="user.shares.cst" />
    </ul>
</template>

<script setup>
import { toRef } from "vue";
import InputField from '../plugins/InputField.vue';
import AssetHead from '../plugins/AssetHead.vue';
import List from '../plugins/List.vue';
import AssetTotal from '../plugins/AssetTotal.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([ 'add', 'sell' ]);

const add = (subType, id, firstValue, secondValue) => emit('add', subType, id, firstValue, secondValue);

const sell = subType => emit('sell', subType);
</script>
