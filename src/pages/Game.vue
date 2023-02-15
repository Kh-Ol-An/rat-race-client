<script setup>
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue';
import Menu from '../components/plugins/Menu.vue';
import Dice from '../components/Game/Dice.vue';
import GameChip from "../components/Game/GameChip.vue";
import poorCircle from '../database/poor-circle.json';
// import richCircle from '../database/rich-circle.json';
import {
    CIRCLE_FACTOR,
    CELLS_COUNT_BY_WIDTH,
    CELLS_COUNT_BY_HEIGHT,
} from '../database/variables.js';
import StartIcon from "../assets/images/icons/StartIcon.vue";
import BusinessIcon from "../assets/images/icons/BusinessIcon.vue";
import CartIcon from "../assets/images/icons/CartIcon.vue";
import ChanceIcon from "../assets/images/icons/ChanceIcon.vue";
import ExpenseIcon from "../assets/images/icons/ExpenseIcon.vue";
import MarketIcon from "../assets/images/icons/MarketIcon.vue";
import BankruptcyIcon from "../assets/images/icons/BankruptcyIcon.vue";

const container = ref(null);
const containerWidth = ref(null);
const containerHeight = ref(null);
const outerCircleWidth = ref('100%');
const outerCircleHeight = ref('100%');
const cellSizeInOuterCircle = ref(null);
const innerCircleWidth = ref(null);
const innerCircleHeight = ref(null);
const fieldWidthInInnerCircle = ref(null);
const fieldHeightInInnerCircle = ref(null);
const hugeFieldWidthInInnerCircle = ref(null);

const numberOnDice = ref(6);
const gameChip = reactive({
    id: 1,
    position: 1,
    rich: false,
})
const gameChipStyles = computed(
    () =>
        gameChip.rich
            ? richCircle(fieldWidthInOuterCircle.value, fieldHeightInOuterCircle.value).find(field =>
                field.id === gameChip.position)
            : poorCircle(
                fieldWidthInInnerCircle.value,
                fieldHeightInInnerCircle.value,
                hugeFieldWidthInInnerCircle.value,
            ).find(field => field.id === gameChip.position)
);
const rollingDice = () => {
    numberOnDice.value = Math.floor(1 + Math.random() * 6);
    gameChip.position += numberOnDice.value;
    // const fieldsCount = gameChip.rich ? FIELDS_COUNT_OF_OUTER_CIRCLE : FIELDS_COUNT_OF_INNER_CIRCLE;
    // gameChip.position > fieldsCount && (gameChip.position = gameChip.position - fieldsCount);
};

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        containerWidth.value = entry.target.clientWidth;
        containerHeight.value = entry.target.clientHeight;
        if (containerHeight.value / containerWidth.value > CIRCLE_FACTOR) {
            const outerHeight = containerWidth.value * CIRCLE_FACTOR;
            outerCircleWidth.value = '100%';
            outerCircleHeight.value = `${outerHeight}px`;

            cellSizeInOuterCircle.value = outerHeight / CELLS_COUNT_BY_HEIGHT;
        } else {
            const outerWidth = containerHeight.value / CIRCLE_FACTOR;
            outerCircleWidth.value = `${outerWidth}px`;
            outerCircleHeight.value = '100%';

            cellSizeInOuterCircle.value = outerWidth / CELLS_COUNT_BY_WIDTH;
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
        <div v-if="!development" class="pt-4 pb-8 px-8 w-full h-screen flex flex-col items-center gap-6">
            <h1 class="md:hidden text-4xl font-bold text-white text-center">ГРА 'Сам склепав'</h1>

            <div class="w-full h-full flex items-center justify-center bg-slate-900" ref="container">
                <div :style="{ width: outerCircleWidth, height: outerCircleHeight }" class="w-full h-full bg-slate-600">
                    <Dice :numberOnDice="numberOnDice" @rolling="rollingDice" />

                    <div v-if="cellSizeInOuterCircle" class="relative w-full h-full">
                        <div
                            v-for="{ styles, type, name } in poorCircle"
                            :style="{
                                top: styles.top && `${styles.top}px`,
                                right: styles.right && `${cellSizeInOuterCircle * styles.right}px`,
                                bottom: styles.bottom && `${styles.bottom}px`,
                                left: styles.left && `${styles.left}px`,
                                width: `${cellSizeInOuterCircle}px`,
                                height: `${cellSizeInOuterCircle}px`,
                            }"
                            :class="[
                                'absolute',
                                'flex items-center justify-center',
                                // type === 'start' && 'bg-amber-500',
                                // type === 'business' && 'bg-secondary', // half
                                // type === 'buys' && 'bg-sky-600',
                                // type === 'chance' && 'bg-orange-700',
                                // type === 'expenses' && 'bg-red-600',
                                // type === 'market' && 'bg-blue-700',
                                // type === 'bankruptcy' && 'bg-slate-700',
                                // type === 'profit' && 'bg-primary',
                                // type === 'wedding' && 'bg-fuchsia-600',
                                // type === 'vacation' && 'bg-gray-700',
                                // type === 'divorce' && 'bg-gray-700',
                                // type === 'firing' && 'bg-gray-700',
                            ]"
                            :title="name"
                        >
                            {{ name }}
                        </div>
                    </div>
                </div>
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
