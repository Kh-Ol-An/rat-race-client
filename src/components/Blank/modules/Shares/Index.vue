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
        <PackagesHead />
        <Package
            v-for="{id, price, quantity, cost} in user.shares.gc"
            :key="id"
            :id="id"
            subType="gc"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellPackage"
        />
        <PackagesTotal
            :userShare="user.shares.gc"
            subType="gc"
            confirmationModalText="Ти впевнений що хочешь продати всі свої акції GC?"
            @sell="sellAll"
        />
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
        <PackagesHead />
        <Package
            v-for="{id, price, quantity, cost} in user.shares.shchun"
            :key="id"
            :id="id"
            subType="shchun"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellPackage"
        />
        <PackagesTotal
            :userShare="user.shares.shchun"
            subType="shchun"
            confirmationModalText="Ти впевнений що хочешь продати всі свої акції ЩУН?"
            @sell="sellAll"
        />
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
        <PackagesHead />
        <Package
            v-for="{id, price, quantity, cost} in user.shares.to"
            :key="id"
            :id="id"
            subType="to"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellPackage"
        />
        <PackagesTotal
            :userShare="user.shares.to"
            subType="to"
            confirmationModalText="Ти впевнений що хочешь продати всі свої акції TO?"
            @sell="sellAll"
        />
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
        <PackagesHead />
        <Package
            v-for="{id, price, quantity, cost} in user.shares.cst"
            :key="id"
            :id="id"
            subType="cst"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellPackage"
        />
        <PackagesTotal
            :userShare="user.shares.cst"
            subType="cst"
            confirmationModalText="Ти впевнений що хочешь продати всі свої акції CST?"
            @sell="sellAll"
        />
    </ul>

    <InfoModal
        :show="showModal"
        title="Це не можливо!"
        text="Куди ти сунешся жебрак? Акції він зібрався купляти... Іди гроші заробляй!"
        @cancel="showModal = false"
    />
</template>

<script setup>
import {ref, toRef} from "vue";
import InputField from '../../plugins/InputField.vue';
import PackagesHead from './PackagesHead.vue';
import Package from './Package.vue';
import PackagesTotal from './PackagesTotal.vue';
import InfoModal from '../../plugins/InfoModal.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([ 'add', 'sell:package', 'sell:all' ]);

const showModal = ref(false);

const add = (subType, id, firstValue, secondValue) => {
    if (user.value.cash < Number(firstValue) * Number(secondValue)) return showModal.value = true;
    emit('add', subType, id, firstValue, secondValue);
};

const sellPackage = (id, subType, sellPrice) => emit('sell:package', id, subType, sellPrice);
const sellAll = (subType, sellPrice) => emit('sell:all', subType, sellPrice);
</script>
