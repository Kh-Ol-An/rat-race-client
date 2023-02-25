<script setup>
import { ref, toRef } from 'vue'
import InputField from '../../plugins/InputField.vue'
import PackagesHead from './PackagesHead.vue'
import SharesPackage from './SharesPackage.vue'
import PackagesTotal from './PackagesTotal.vue'
import Modal from '../../plugins/Modal.vue'

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
})

const blank = toRef(props, 'blankProp')

const emit = defineEmits(['buy', 'sell:package', 'sell:all'])

const showModal = ref(false)

const buy = (id, price, quantity, subType) => {
    if (blank.value.cash < price * quantity) return (showModal.value = true)
    emit('buy', id, price, quantity, subType)
}

const sellPackage = (id, subType, price) =>
    emit('sell:package', id, subType, price)
const sellAll = (subType, price) => emit('sell:all', subType, price)
</script>

<template>
    <h2 class="px-4 text-center text-xl font-bold text-primary">Акції</h2>

    <!-- GC -->
    <InputField
        label="GC"
        type="shares"
        sub-type="gc"
        first-placeholder="Ціна"
        second-placeholder="Кількість"
        @add="buy"
    />
    <ul v-if="blank.shares.gc.length > 0" class="flex flex-col gap-2">
        <PackagesHead />
        <SharesPackage
            v-for="{ id, price, quantity, cost } in blank.shares.gc"
            :id="id"
            :key="id"
            sub-type="gc"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellPackage"
        />
        <PackagesTotal
            :blank-share="blank.shares.gc"
            sub-type="gc"
            @sell="sellAll"
        />
    </ul>

    <!-- ЩГП -->
    <InputField
        label="ЩГП"
        type="shares"
        sub-type="schp"
        first-placeholder="Ціна"
        second-placeholder="Кількість"
        @add="buy"
    />
    <ul v-if="blank.shares.schp.length > 0" class="flex flex-col gap-2">
        <PackagesHead />
        <SharesPackage
            v-for="{ id, price, quantity, cost } in blank.shares.schp"
            :id="id"
            :key="id"
            sub-type="schp"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellPackage"
        />
        <PackagesTotal
            :blank-share="blank.shares.schp"
            sub-type="schp"
            @sell="sellAll"
        />
    </ul>

    <!-- TO -->
    <InputField
        label="TO"
        type="shares"
        sub-type="to"
        first-placeholder="Ціна"
        second-placeholder="Кількість"
        @add="buy"
    />
    <ul v-if="blank.shares.to.length > 0" class="flex flex-col gap-2">
        <PackagesHead />
        <SharesPackage
            v-for="{ id, price, quantity, cost } in blank.shares.to"
            :id="id"
            :key="id"
            sub-type="to"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellPackage"
        />
        <PackagesTotal
            :blank-share="blank.shares.to"
            sub-type="to"
            @sell="sellAll"
        />
    </ul>

    <!-- CST -->
    <InputField
        label="CST"
        type="shares"
        sub-type="cst"
        first-placeholder="Ціна"
        second-placeholder="Кількість"
        @add="buy"
    />
    <ul v-if="blank.shares.cst.length > 0" class="flex flex-col gap-2">
        <PackagesHead />
        <SharesPackage
            v-for="{ id, price, quantity, cost } in blank.shares.cst"
            :id="id"
            :key="id"
            sub-type="cst"
            :price="price"
            :quantity="quantity"
            :cost="cost"
            @sell="sellPackage"
        />
        <PackagesTotal
            :blank-share="blank.shares.cst"
            sub-type="cst"
            @sell="sellAll"
        />
    </ul>

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-center text-2xl font-bold text-opposite">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-center text-lg font-normal text-slate-400">
            Куди ти сунешся жебрак? Акції він зібрався купляти... Іди гроші
            заробляй!
        </p>
    </Modal>
</template>
