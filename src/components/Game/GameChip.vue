<script setup>
import GameChipIcon from "../../assets/images/icons/GameChipIcon.vue";

defineProps({
    userStyles: {
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
            top: userStyles.top && `${cellHeight * userStyles.top}px`,
            right: userStyles.right && `${cellWidth * userStyles.right}px`,
            bottom: userStyles.bottom && `${cellHeight * userStyles.bottom}px`,
            left: userStyles.left && `${cellWidth * userStyles.left}px`,
            width: `${cellWidth}px`,
            height: `${cellHeight}px`,
        }"
        class="absolute z-10 flex items-center justify-center bg-transparent transition-all duration-700"
    >
        <GameChipIcon :color="gameChipColor" />
    </div>
</template>
