<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Виплати за кредитами</h2>

    <ul>
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
        <Info
            v-for="{ id, name, body, payment, term } in credits"
            :key="id"
            :name="name"
            :body="body"
            :payment="payment"
            :term="term"
        />
    </ul>
</template>

<script setup>
import Info from './Info.vue';

defineProps({
    credits: {
        type: Array,
        required: true,
    },
});
</script>
