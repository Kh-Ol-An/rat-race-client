<template>
    <button
        class="
            py-2 px-24 md:px-10
            shadow hover:shadow-lg
            rounded-md
            bg-opposite
            text-xl text-white font-bold leading-none
            outline-0
            transition-all duration-300
        "
        type="button"
        title="Заплатити"
        @click="decrement"
    >
        &#8722;
    </button>
    <Input v-model:value="transaction" id="transaction" placeholder="Транзакція" />
    <button
        class="
            py-2 px-24 md:px-10
            shadow hover:shadow-lg
            rounded-md
            bg-secondary
            text-xl text-white font-bold leading-none
            outline-0
            transition-all duration-300
        "
        type="button"
        title="Отримати"
        @click="increment"
    >
        &#43;
    </button>
</template>

<script setup>
import { ref } from "vue";
import Input from '../plugins/Input.vue';

const emit = defineEmits(['decrement', 'increment']);

const transaction = ref('');
const decrement = () => {
    emit('decrement', Number(transaction.value));
    transaction.value = '';
};
const increment = () => {
    emit('increment', Number(transaction.value));
    transaction.value = '';
};
</script>
