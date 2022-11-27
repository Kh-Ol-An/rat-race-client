<template>
    <div class="py-4 px-8 flex flex-col items-center justify-center">
        <Title title="ГРА 'Щурячі перегони Ⅱ'"/>
        <Blank />
    </div>
</template>

<script setup>
import Title from './components/Title.vue'
import Blank from './components/Blank/Index.vue'
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
</style>
