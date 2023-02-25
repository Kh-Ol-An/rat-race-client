<script setup>
import CreditItem from './CreditItem.vue'

defineProps({
    credits: {
        type: Array,
        required: true,
    },
})
</script>

<template>
    <h2 class="px-4 text-center text-xl font-bold text-opposite">
        Виплати за кредитами
    </h2>

    <ul>
        <li
            class="grid grid-cols-4 gap-2 border-b-2 border-b-slate-700 font-bold text-opposite"
        >
            <span> Назва </span>
            <span> Загалом </span>
            <span> Платіж </span>
            <span> Термін </span>
        </li>
        <CreditItem
            v-for="{ id, name, body, payment, term } in credits"
            :key="id"
            :name="name"
            :body="body"
            :payment="payment"
            :term="term"
        />
    </ul>
</template>
