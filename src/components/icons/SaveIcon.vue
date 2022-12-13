<template>
    <svg :class="color" :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231 231">
        <path d="M198.5,0h-17v83h-132V0h-49v231h230V32.668L198.5,0z M197.5,199h-165v-83h165V199z" />
        <rect width="33" x="131.5" height="66" />
    </svg>
</template>

<script setup>
defineProps({
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: 'fill-secondary',
    },
});
</script>
