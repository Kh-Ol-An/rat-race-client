<script setup>
defineProps({
    width: {
        type: String,
        default: '24px',
    },
    height: {
        type: String,
        default: '24px',
    },
    color: {
        type: String,
        default: 'stroke-slate-400',
    },
})
</script>

<template>
    <svg
        :width="width"
        :height="height"
        :class="color"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>
