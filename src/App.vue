<template>
    <div class="pt-4 pb-8 px-8 md:p-2 w-full flex flex-col items-center justify-center">
        <h1 class="p-4 md:p-2 text-4xl md:text-xl font-bold text-slate-700 text-center">
            ГРА 'Щурячі перегони Ⅱ'
        </h1>
        <Blank />
    </div>
</template>

<script setup>
import Blank from './components/Blank/Blank.vue'
</script>

<style>
input:-webkit-autofill {
    -webkit-box-shadow: inset 0 0 0 50px #fff !important; /* Цвет фона */
    -webkit-text-fill-color: #000 !important; /* цвет текста */
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
