<template>
    <div class="flex items-center gap-2">
        <span class="text-additional">
            {{ label }}
        </span>
        <span class="text-silver-800">
            {{ value }}
        </span>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});
</script>