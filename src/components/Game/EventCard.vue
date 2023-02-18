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
});
</script>

<template>
    <div
        :style="{ width, height }"
        class="absolute top-1/2 left-1/2 z-10 -translate-y-1/2 -translate-x-1/2 p-4 shadow-[0_5px_15px_rgba(0,0,0,0.35)]"
    >
        Event Card
    </div>
</template>
