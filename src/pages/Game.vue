<script setup>
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue';
import Menu from '../components/plugins/Menu.vue';
import Dice from '../components/Game/Dice.vue';
import GameChip from "../components/Game/GameChip.vue";
import poorCircle from '../database/poor-circle.json';
import richCircle from '../database/rich-circle.json';
import {
    POOR_CIRCLE_FACTOR,
    RICH_CIRCLE_FACTOR,
    CELLS_COUNT_BY_WIDTH,
    CELLS_COUNT_BY_HEIGHT,
    FIELDS_COUNT,
    FIELDS_GAP,
} from '../database/variables.js';
import MoneyIcon from "../assets/images/icons/MoneyIcon.vue";
import BusinessIcon from "../assets/images/icons/BusinessIcon.vue";
import InvestmentsIcon from "../assets/images/icons/InvestmentsIcon.vue";
import ExpenseIcon from "../assets/images/icons/ExpenseIcon.vue";
import LayoffIcon from "../assets/images/icons/LayoffIcon.vue";
import OpportunitiesIcon from "../assets/images/icons/OpportunitiesIcon.vue";
import CartIcon from "../assets/images/icons/CartIcon.vue";
import WeddingIcon from "../assets/images/icons/WeddingIcon.vue";
import BabyIcon from "../assets/images/icons/BabyIcon.vue";
import DivorceIcon from "../assets/images/icons/DivorceIcon.vue";
import VacationIcon from "../assets/images/icons/VacationIcon.vue";
import BankruptcyIcon from "../assets/images/icons/BankruptcyIcon.vue";

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

const numberOnDice = ref(6);
const gameChip = reactive({
    id: 1,
    position: 1,
    rich: false,
})
const gameChipStyles = computed(
    () =>
        gameChip.rich
            ? richCircle.find(field => field.id === gameChip.position)
            : poorCircle.find(field => field.id === gameChip.position)
);
const rollingDice = () => {
    numberOnDice.value = Math.floor(1 + Math.random() * 6);
    gameChip.position += numberOnDice.value;
    gameChip.position > FIELDS_COUNT && (gameChip.position = gameChip.position - FIELDS_COUNT);
};

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        containerWidth.value = entry.target.clientWidth;
        containerHeight.value = entry.target.clientHeight;
        if (containerHeight.value / containerWidth.value > RICH_CIRCLE_FACTOR) {
            // Outer
            const outerHeight = containerWidth.value * RICH_CIRCLE_FACTOR;
            richCircleHeight.value = `${outerHeight}px`;
            richCircleWidth.value = '100%';
            cellSizeInRichCircle.value = outerHeight / CELLS_COUNT_BY_HEIGHT;

            // Inner
            const innerHeight = outerHeight - cellSizeInRichCircle.value * 2 - FIELDS_GAP;
            const innerWidth = innerHeight / POOR_CIRCLE_FACTOR;
            poorCircleHeight.value = `${innerHeight}px`;
            poorCircleWidth.value = `${innerWidth}px`;
            cellHeightInPoorCircle.value = innerHeight / CELLS_COUNT_BY_HEIGHT;
            cellWidthInPoorCircle.value = innerWidth / CELLS_COUNT_BY_WIDTH;
        } else {
            // Outer
            const outerWidth = containerHeight.value / RICH_CIRCLE_FACTOR;
            richCircleWidth.value = `${outerWidth}px`;
            richCircleHeight.value = '100%';
            cellSizeInRichCircle.value = outerWidth / CELLS_COUNT_BY_WIDTH;

            // Inner
            const innerWidth = outerWidth - cellSizeInRichCircle.value * 2 - FIELDS_GAP;
            const innerHeight = innerWidth * POOR_CIRCLE_FACTOR;
            poorCircleWidth.value = `${innerWidth}px`;
            poorCircleHeight.value = `${innerHeight}px`;
            cellWidthInPoorCircle.value = innerWidth / CELLS_COUNT_BY_WIDTH;
            cellHeightInPoorCircle.value = innerHeight / CELLS_COUNT_BY_HEIGHT;
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

            <div class="relative w-full h-full flex items-center justify-center" ref="container">
                <Dice :numberOnDice="numberOnDice" @rolling="rollingDice" />

                <!-- Outer -->
                <div
                    :style="{ width: richCircleWidth, height: richCircleHeight }"
                    class="relative"
                >
                    <div
                        v-for="{ styles, type, name } in poorCircle"
                        :style="{
                            top: styles.top && `${cellSizeInRichCircle * styles.top}px`,
                            right: styles.right && `${cellSizeInRichCircle * styles.right}px`,
                            bottom: styles.bottom && `${cellSizeInRichCircle * styles.bottom}px`,
                            left: styles.left && `${cellSizeInRichCircle * styles.left}px`,
                            width: `${cellSizeInRichCircle}px`,
                            height: `${cellSizeInRichCircle}px`,
                        }"
                        :class="[
                            'absolute',
                            'flex items-center justify-center',
                            type === 'profit' && 'bg-primary',
                            type === 'business' && 'bg-secondary', // half
                            type === 'investments' && 'bg-sky-600',
                            type === 'expenses' && 'bg-red-600',
                            type === 'layoff' && 'bg-gray-700',
                            type === 'opportunities' && 'bg-orange-600',
                            type === 'buys' && 'bg-sky-400',
                            type === 'wedding' && 'bg-fuchsia-600',
                            type === 'baby' && 'bg-yellow-400',
                            type === 'divorce' && 'bg-gray-600',
                            type === 'vacation' && 'bg-teal-600',
                            type === 'bankruptcy' && 'bg-gray-900',
                        ]"
                        :title="name"
                    >
                        <MoneyIcon v-if="type === 'profit'" />
                        <BusinessIcon v-if="type === 'business'" />
                        <InvestmentsIcon v-if="type === 'investments'" width="30px" height="30px" />
                        <ExpenseIcon v-if="type === 'expenses'" width="30px" height="30px" />
                        <LayoffIcon v-if="type === 'layoff'" />
                        <OpportunitiesIcon v-if="type === 'opportunities'" width="30px" height="30px" />
                        <CartIcon v-if="type === 'buys'" width="30px" height="30px" />
                        <WeddingIcon v-if="type === 'wedding'" width="30px" height="30px" />
                        <BabyIcon v-if="type === 'baby'" width="30px" height="30px" />
                        <DivorceIcon v-if="type === 'divorce'" width="30px" height="30px" />
                        <VacationIcon v-if="type === 'vacation'" width="30px" height="30px" />
                        <BankruptcyIcon v-if="type === 'bankruptcy'" width="30px" height="30px" />
                    </div>

                    <GameChip
                        v-if="gameChip.rich"
                        :gameChipStyles="gameChipStyles"
                        :cellWidth="cellSizeInRichCircle && cellSizeInRichCircle"
                        :cellHeight="cellSizeInRichCircle && cellSizeInRichCircle"
                        gameChipColor="fill-red-600"
                    />
                </div>

                <!-- Inner -->
                <div
                    :style="{ width: poorCircleWidth, height: poorCircleHeight }"
                    class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                >
                    <div
                        v-for="{ styles, type, name } in richCircle"
                        :style="{
                            top: styles.top && `${cellHeightInPoorCircle * styles.top}px`,
                            right: styles.right && `${cellWidthInPoorCircle * styles.right}px`,
                            bottom: styles.bottom && `${cellHeightInPoorCircle * styles.bottom}px`,
                            left: styles.left && `${cellWidthInPoorCircle * styles.left}px`,
                            width: `${cellWidthInPoorCircle}px`,
                            height: `${cellHeightInPoorCircle}px`,
                        }"
                        :class="[
                            'absolute',
                            'flex items-center justify-center',
                            type === 'profit' && 'bg-primary',
                            type === 'business' && 'bg-secondary', // half
                            type === 'investments' && 'bg-sky-600',
                            type === 'expenses' && 'bg-red-600',
                            type === 'layoff' && 'bg-gray-700',
                            type === 'opportunities' && 'bg-orange-600',
                            type === 'buys' && 'bg-sky-400',
                            type === 'wedding' && 'bg-fuchsia-600',
                            type === 'baby' && 'bg-yellow-400',
                            type === 'divorce' && 'bg-gray-600',
                            type === 'vacation' && 'bg-teal-600',
                            type === 'bankruptcy' && 'bg-gray-900',
                        ]"
                        :title="name"
                    >
                        <MoneyIcon v-if="type === 'profit'" />
                        <BusinessIcon v-if="type === 'business'" />
                        <InvestmentsIcon v-if="type === 'investments'" width="30px" height="30px" />
                        <ExpenseIcon v-if="type === 'expenses'" width="30px" height="30px" />
                        <LayoffIcon v-if="type === 'layoff'" />
                        <OpportunitiesIcon v-if="type === 'opportunities'" width="30px" height="30px" />
                        <CartIcon v-if="type === 'buys'" width="30px" height="30px" />
                        <WeddingIcon v-if="type === 'wedding'" width="30px" height="30px" />
                        <BabyIcon v-if="type === 'baby'" width="30px" height="30px" />
                        <DivorceIcon v-if="type === 'divorce'" width="30px" height="30px" />
                        <VacationIcon v-if="type === 'vacation'" width="30px" height="30px" />
                        <BankruptcyIcon v-if="type === 'bankruptcy'" width="30px" height="30px" />
                    </div>

                    <GameChip
                        v-if="!gameChip.rich"
                        :gameChipStyles="gameChipStyles"
                        :cellWidth="cellWidthInPoorCircle && cellWidthInPoorCircle"
                        :cellHeight="cellHeightInPoorCircle && cellHeightInPoorCircle"
                        gameChipColor="fill-red-600"
                    />
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
