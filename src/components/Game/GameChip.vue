<script setup>
import GameChipIcon from "../../assets/images/icons/GameChipIcon.vue";

defineProps({
    gameChipStyles: {
        type: Object,
        required: true,
    },
    cellWidth: {
        type: Number,
        required: true,
    },
    cellHeight: {
        type: Number,
        required: true,
    },
    gameChipColor: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div
        :style="{
            top: gameChipStyles.styles.top && `${cellHeight * gameChipStyles.styles.top}px`,
            right: gameChipStyles.styles.right && `${cellWidth * gameChipStyles.styles.right}px`,
            bottom: gameChipStyles.styles.bottom && `${cellHeight * gameChipStyles.styles.bottom}px`,
            left: gameChipStyles.styles.left && `${cellWidth * gameChipStyles.styles.left}px`,
            width: `${cellWidth}px`,
            height: `${cellHeight}px`,
        }"
        class="absolute z-10 flex items-center justify-center bg-transparent transition-all duration-700"
    >
        <GameChipIcon :color="gameChipColor" />
    </div>
</template>
