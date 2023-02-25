<script setup>
defineProps({
    gameChipStyles: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <div
        :style="{
            top: gameChipStyles.styles.top && `${gameChipStyles.styles.top}px`,
            right:
                gameChipStyles.styles.right &&
                `${gameChipStyles.styles.right}px`,
            bottom:
                gameChipStyles.styles.bottom &&
                `${gameChipStyles.styles.bottom}px`,
            left:
                gameChipStyles.styles.left && `${gameChipStyles.styles.left}px`,
            width: `${gameChipStyles.styles.width}px`,
            height: `${gameChipStyles.styles.height}px`,
        }"
        class="absolute z-10 bg-transparent"
    >
        <span
            class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-600"
        ></span>
    </div>
</template>
