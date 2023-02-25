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
        default: 'fill-slate-400',
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
            d="M21.555,8.168l-9-6A1,1,0,0,0,12,2h0a1,1,0,0,0-.554.168l-9,6A1,1,0,0,0,3,10H4V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V10h1a1,1,0,0,0,.556-1.832ZM18,20H6V8.2l6-4,6,4Z"
        />
    </svg>
</template>
