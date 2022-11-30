<template>
    <div>
        <span v-if="label.length > 0" class="text-sm">{{ label }}</span>
        <div class="flex items-center space-x-3">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        default: ''
    },
});
</script>
