<template>
    <li class="grid grid-cols-4 items-center gap-2">
        <span class="text-opposite">
            {{ name }}
        </span>
        <span class="text-opposite">
            {{ body }}
        </span>
        <span class="text-opposite">
            {{ payment }}
        </span>
        <span class="text-opposite">
            {{ quantity }}
        </span>
    </li>
</template>

<script setup>
defineProps({
    name: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
});
</script>
