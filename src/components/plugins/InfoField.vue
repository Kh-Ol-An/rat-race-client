<script setup>
defineProps({
    wrapClasses: {
        type: String,
        default: '',
    },
    labelClasses: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div :class="['flex items-center', wrapClasses]">
        <span :class="labelClasses">
            {{ label }}
        </span>

        <slot></slot>
    </div>
</template>
