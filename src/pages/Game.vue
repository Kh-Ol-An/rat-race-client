<script setup>
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue';
import Menu from '../components/plugins/Menu.vue';
import Circle from "../components/Game/Circle.vue";
import Dice from '../components/Game/Dice.vue';
import poorCircle from '../database/poor-circle.json';
import richCircle from '../database/rich-circle.json';
import {
    POOR_CIRCLE_FACTOR,
    RICH_CIRCLE_FACTOR,
    CELLS_COUNT_BY_WIDTH,
    CELLS_COUNT_BY_HEIGHT,
    FIELDS_COUNT,
    FIELDS_GAP,
    BALANCE_X_GAP,
    BALANCE_Y_GAP,
} from '../database/variables.js';

const container = ref(null);
const containerWidth = ref(null);
const containerHeight = ref(null);
const richCircleWidth = ref('100%');
const richCircleHeight = ref('100%');
const cellSizeInRichCircle = ref(null);
const poorCircleWidth = ref(null);
const poorCircleHeight = ref(null);
const cellWidthInPoorCircle = ref(null);
const cellHeightInPoorCircle = ref(null);
const balancePosition = ref(null);
const balanceSide = ref(null);

const gameChip = reactive({
    id: 1,
    position: 1,
    rich: false,
})
const rollingDice = (numberOnDice) => {
    gameChip.position += numberOnDice;
    gameChip.position > FIELDS_COUNT && (gameChip.position = gameChip.position - FIELDS_COUNT);
};
const gameChipStyles = computed(
    () =>
        gameChip.rich
            ? richCircle.find(field => field.id === gameChip.position)
            : poorCircle.find(field => field.id === gameChip.position)
);

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        containerWidth.value = entry.target.clientWidth;
        containerHeight.value = entry.target.clientHeight;
        if (containerHeight.value / containerWidth.value > RICH_CIRCLE_FACTOR) {
            // Rich
            const richHeight = containerWidth.value * RICH_CIRCLE_FACTOR;
            richCircleHeight.value = `${richHeight}px`;
            richCircleWidth.value = '100%';
            cellSizeInRichCircle.value = richHeight / CELLS_COUNT_BY_HEIGHT;

            // Poor
            const poorHeight = richHeight - cellSizeInRichCircle.value * 2 - FIELDS_GAP;
            const poorWidth = poorHeight / POOR_CIRCLE_FACTOR;
            poorCircleHeight.value = `${poorHeight}px`;
            poorCircleWidth.value = `${poorWidth}px`;
            cellHeightInPoorCircle.value = poorHeight / CELLS_COUNT_BY_HEIGHT;
            cellWidthInPoorCircle.value = poorWidth / CELLS_COUNT_BY_WIDTH;

            // Balance
            balancePosition.value = cellWidthInPoorCircle.value + BALANCE_X_GAP;
            balanceSide.value = poorHeight - cellHeightInPoorCircle.value * 2 - BALANCE_Y_GAP;
        } else {
            // Rich
            const richWidth = containerHeight.value / RICH_CIRCLE_FACTOR;
            richCircleWidth.value = `${richWidth}px`;
            richCircleHeight.value = '100%';
            cellSizeInRichCircle.value = richWidth / CELLS_COUNT_BY_WIDTH;

            // Poor
            const poorWidth = richWidth - cellSizeInRichCircle.value * 2 - FIELDS_GAP;
            const poorHeight = poorWidth * POOR_CIRCLE_FACTOR;
            poorCircleWidth.value = `${poorWidth}px`;
            poorCircleHeight.value = `${poorHeight}px`;
            cellWidthInPoorCircle.value = poorWidth / CELLS_COUNT_BY_WIDTH;
            cellHeightInPoorCircle.value = poorHeight / CELLS_COUNT_BY_HEIGHT;

            // Balance
            balancePosition.value = cellWidthInPoorCircle.value + BALANCE_X_GAP;
            balanceSide.value = poorHeight - cellHeightInPoorCircle.value * 2 - BALANCE_Y_GAP;
        }
    }
});

onMounted(() => resizeObserver.observe(container.value));

onUnmounted(() => resizeObserver.disconnect());

const development = ref(false);
// setTimeout(() => development.value = false, 3000);
setTimeout(() => development.value = true, 3000);
</script>

<template>
    <Menu />
    <Transition>
        <div
            v-if="development"
            class="fixed top-0 right-0 bottom-0 left-0 z-40 w-full h-screen flex items-center justify-center"
        >
            <p class="text-2xl text-slate-300">
                Цей функціонал у процесі розробки
            </p>
        </div>
    </Transition>

    <Transition>
        <div v-if="!development" class="pt-4 pb-6 px-6 w-full h-screen flex flex-col items-center gap-4">
            <h1 class="md:hidden text-4xl font-bold text-white text-center">ГРА 'Гроші є'</h1>

            <div class="relative w-full h-full flex items-center justify-center" ref="container">
                <!-- Rich -->
                <Circle
                    :width="richCircleWidth"
                    :height="richCircleHeight"
                    classes="relative"
                    :circle="richCircle"
                    :cellWidth="cellSizeInRichCircle && cellSizeInRichCircle"
                    :cellHeight="cellSizeInRichCircle && cellSizeInRichCircle"
                    :gameChipStyles="gameChipStyles"
                    :gameChipHere="gameChip.rich"
                />

                <!-- Poor -->
                <Circle
                    :width="poorCircleWidth && poorCircleWidth"
                    :height="poorCircleHeight && poorCircleHeight"
                    classes="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                    :circle="poorCircle"
                    :cellWidth="cellWidthInPoorCircle && cellWidthInPoorCircle"
                    :cellHeight="cellHeightInPoorCircle && cellHeightInPoorCircle"
                    :gameChipStyles="gameChipStyles"
                    :gameChipHere="!gameChip.rich"
                    :balancePosition="balancePosition && balancePosition"
                    :balanceSide="balanceSide && balanceSide"
                />

                <Dice @rolling="rollingDice" />
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 10s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
