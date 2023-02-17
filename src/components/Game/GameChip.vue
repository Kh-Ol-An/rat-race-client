<script setup>
import GameChipIcon from "../../assets/images/icons/GameChipIcon.vue";

defineProps({
    userPosition: {
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
            top: userPosition.top && `${cellHeight * userPosition.top}px`,
            right: userPosition.right && `${cellWidth * userPosition.right}px`,
            bottom: userPosition.bottom && `${cellHeight * userPosition.bottom}px`,
            left: userPosition.left && `${cellWidth * userPosition.left}px`,
            width: `${cellWidth}px`,
            height: `${cellHeight}px`,
        }"
        class="absolute z-10 flex items-center justify-center bg-transparent transition-all duration-700"
    >
        <GameChipIcon :color="gameChipColor" />
    </div>
</template>
