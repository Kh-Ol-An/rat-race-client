<template>
    <div class="flex items-center gap-3">
        <Input
            id="credit-name"
            placeholder="Назва:"
            type="text"
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
import Input from '../../plugins/Input.vue';
import Add from '../../plugins/Add.vue';

const emit = defineEmits(['add']);

const name = ref('');
const payment = ref('');
const quantity = ref('');

const add = () => {
    emit('add', new Date().valueOf(), name.value, Number(payment.value), Number(quantity.value));
    name.value = '';
    payment.value = '';
    quantity.value = '';
};
</script>
