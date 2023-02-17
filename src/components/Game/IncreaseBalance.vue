<script setup>
defineProps({
    right: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div
        :style="{ right, width, height }"
        class="absolute top-1/2 -translate-y-1/2 p-4 bg-slate-600"
    ></div>
</template>
