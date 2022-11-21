<template>
    <h1 class="p-4 text-4xl text-slate-700 text-center">{{ title }}</h1>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>
