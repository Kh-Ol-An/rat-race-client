<template>
    <div class="flex items-center gap-3">
        <Input
            id="credit-name"
            placeholder="Назва:"
            typeText
            smallLabel
            v-model:value="name"
        />
        <Input
            id="credit-payment"
            placeholder="Платіж:"
            smallLabel
            v-model:value="payment"
        />
        <Input
            id="credit-quantity"
            placeholder="Термін:"
            smallLabel
            v-model:value="quantity"
        />
        <Add :name="name" :firstValue="payment" :secondValue="quantity" opposite @add="add" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import Input from './Input.vue';
import Add from './Add.vue';
import { removingSpaces } from '../../../helpers/formating-values.js';

const emit = defineEmits(['add']);

const name = ref('');
const payment = ref('');
const quantity = ref('');

const add = () => {
    emit(
        'add',
        new Date().valueOf(),
        name.value,
        Number(removingSpaces(payment.value)),
        Number(removingSpaces(quantity.value)),
    );
    name.value = '';
    payment.value = '';
    quantity.value = '';
};
</script>
