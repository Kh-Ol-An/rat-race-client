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
        <path d="m0 19.216 5.414 4.784h15.882l2.274-3.195-23.568-1.589z" />
        <path d="m13.985 0v19.073l7.309.503z" />
        <path d="m12.989 3.214-10.56 15.027 10.56.713z" />
    </svg>
</template>
