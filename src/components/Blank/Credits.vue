<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Виплати за кредитами</h2>
    <InputCredit @add="add" />
    <ul v-if="credits.length > 0">
        <li class="grid grid-cols-4 gap-2 border-b-2 border-b-silver-900 text-opposite font-bold">
            <span>
                Назва
            </span>
            <span>
                Загалом
            </span>
            <span>
                Платіж
            </span>
            <span>
                Термін
            </span>
        </li>
        <InfoCredit
            v-for="{ id, name, body, payment, quantity } in credits"
            :key="id"
            :name="name"
            :body="body"
            :payment="payment"
            :quantity="quantity"
        />
    </ul>
</template>

<script setup>
import InputCredit from './InputCredit.vue';
import InfoCredit from './InfoCredit.vue';

defineProps({
    credits: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['add']);

const add = (id, name, payment, quantity) => emit('add', id, name, payment, quantity);
</script>
