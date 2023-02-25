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
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="48" height="48" fill="none" />
        <path
            d="M10,22V15a2,2,0,0,0-2-2H4a2,2,0,0,0,0,4H6v6a.7.7,0,0,0,.1.5,17.8,17.8,0,0,0,4,10,6.5,6.5,0,1,0,8.9,6v-.2a20.8,20.8,0,0,0,5,.7,20.8,20.8,0,0,0,5-.7v.2a6.5,6.5,0,1,0,8.9-6A18,18,0,0,0,42,22Zm2.5,20A2.5,2.5,0,1,1,15,39.5,2.5,2.5,0,0,1,12.5,42Zm23,0A2.5,2.5,0,1,1,38,39.5,2.5,2.5,0,0,1,35.5,42Z"
        />
        <path d="M26.3,2H26a1.9,1.9,0,0,0-2,1.8V18H42C42,9.8,35.1,3,26.3,2Z" />
    </svg>
</template>
