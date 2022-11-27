<template>
    <div>
        <span>
            {{ label }}
        </span>
        <span>
            {{ value }}
        </span>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        default: ''
    },
    value: {
        type: String,
        default: ''
    },
});
</script>