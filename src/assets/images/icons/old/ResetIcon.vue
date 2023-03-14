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
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 207.868 207.868"
        xml:space="preserve"
    >
        <path
            d="M39.608,107.806c0,35.47,28.857,64.326,64.327,64.326c35.469,0,64.325-28.856,64.325-64.326
        c0-22.881-12.319-44.229-32.149-55.712l17.909-30.926c30.827,17.853,49.976,51.05,49.976,86.638
        c0,55.175-44.887,100.062-100.062,100.062c-55.175,0-100.063-44.888-100.063-100.062c0-35.587,19.149-68.784,49.976-86.638
        l17.91,30.926C51.927,63.578,39.608,84.926,39.608,107.806z M121.804,0H86.066v110.189h35.737V0z"
        />
    </svg>
</template>
