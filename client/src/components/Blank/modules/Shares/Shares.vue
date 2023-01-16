<template>
    <h2 class="px-4 text-xl font-bold text-primary text-center">Акції</h2>

    <!-- GC -->
    <InputField
        label="GC"
        type="shares"
        subType="gc"
        placeholderWorth="Ціна"
        placeholderValue="Кількість"
        @add="buy"
    />
    <ul v-if="blank.shares.gc.length > 0" class="flex flex-col gap-2">
        <PackagesHead />
        <Package
            v-for="{id, price, quantity, cost} in blank.shares.gc"
            :key="id"
            :id="id"
            subType="gc"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellPackage"
        />
        <PackagesTotal
            :blankShare="blank.shares.gc"
            subType="gc"
            @sell="sellAll"
        />
    </ul>

    <!-- ЩГП -->
    <InputField
        label="ЩГП"
        type="shares"
        subType="schp"
        placeholderWorth="Ціна"
        placeholderValue="Кількість"
        @add="buy"
    />
    <ul v-if="blank.shares.schp.length > 0" class="flex flex-col gap-2">
        <PackagesHead />
        <Package
            v-for="{id, price, quantity, cost} in blank.shares.schp"
            :key="id"
            :id="id"
            subType="schp"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellPackage"
        />
        <PackagesTotal
            :blankShare="blank.shares.schp"
            subType="schp"
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
        @add="buy"
    />
    <ul v-if="blank.shares.to.length > 0" class="flex flex-col gap-2">
        <PackagesHead />
        <Package
            v-for="{id, price, quantity, cost} in blank.shares.to"
            :key="id"
            :id="id"
            subType="to"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellPackage"
        />
        <PackagesTotal
            :blankShare="blank.shares.to"
            subType="to"
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
        @add="buy"
    />
    <ul v-if="blank.shares.cst.length > 0" class="flex flex-col gap-2">
        <PackagesHead />
        <Package
            v-for="{id, price, quantity, cost} in blank.shares.cst"
            :key="id"
            :id="id"
            subType="cst"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellPackage"
        />
        <PackagesTotal
            :blankShare="blank.shares.cst"
            subType="cst"
            @sell="sellAll"
        />
    </ul>

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
            Куди ти сунешся жебрак? Акції він зібрався купляти... Іди гроші заробляй!
        </p>
    </Modal>
</template>

<script setup>
import { ref, toRef } from "vue";
import InputField from '../../plugins/InputField.vue';
import PackagesHead from './PackagesHead.vue';
import Package from './Package.vue';
import PackagesTotal from './PackagesTotal.vue';
import Modal from '../../plugins/Modal.vue';

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
});

const blank = toRef(props, 'blankProp');

const emit = defineEmits([ 'buy', 'sell:package', 'sell:all' ]);

const showModal = ref(false);

const buy = (id, price, quantity, subType) => {
    if (blank.value.cash < price * quantity) return showModal.value = true;
    emit('buy', id, price, quantity, subType);
};

const sellPackage = (id, subType, price) => emit('sell:package', id, subType, price);
const sellAll = (subType, price) => emit('sell:all', subType, price);
</script>
