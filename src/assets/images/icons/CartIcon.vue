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
        viewBox="0 0 32 32"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10,27h4c0,1.105-0.895,2-2,2S10,28.105,10,27z M23,29c1.105,0,2-0.895,2-2h-4
            C21,28.105,21.895,29,23,29z M30,9H6.819l-1-5H2v2h2.181l4,20H26v-2H9.819l-0.6-3H26L30,9z"
        />
    </svg>
</template>
