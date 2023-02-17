<script setup>
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue';
import Menu from '../components/plugins/Menu.vue';
import Circle from "../components/Game/Circle.vue";
import Dice from '../components/Game/Dice.vue';
import poorCircle from '../database/poor-circle.json';
import richCircle from '../database/rich-circle.json';
import maleProfessions from '../database/male-professions.json';
import femaleProfessions from '../database/female-professions.json';
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

const user = reactive({
    id: 1,
    position: 1,
    rich: false,
    gender: '',
    profession: '',
    salary: 0,
    rent: 0,
    food: 0,
    clothes: 0,
    fare: 0,
    utilities: 0,
})
const rollingDice = (numberOnDice) => {
    user.position += numberOnDice;
    user.position > FIELDS_COUNT && (user.position = user.position - FIELDS_COUNT);
};
const userPosition = computed(
    () =>
        user.rich
            ? richCircle.find((field) => field.id === user.position).styles
            : poorCircle.find((field) => field.id === user.position).styles
);
const choiceGender = (gender) => {
    const randomId = Math.floor(1 + Math.random() * 4);
    let genderCard = {};
    gender === 'male' && (genderCard = maleProfessions.find((profession) => profession.id === randomId));
    gender === 'female' && (genderCard = femaleProfessions.find((profession) => profession.id === randomId));
    user.gender = gender;
    user.profession = genderCard.profession;
    user.salary = genderCard.salary;
    user.rent = genderCard.rent;
    user.food = genderCard.food;
    user.clothes = genderCard.clothes;
    user.fare = genderCard.fare;
    user.utilities = genderCard.utilities;
};

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
                    :userPosition="userPosition"
                    :gameChipHere="user.rich"
                    :user="user"
                />

                <!-- Poor -->
                <Circle
                    :width="poorCircleWidth && poorCircleWidth"
                    :height="poorCircleHeight && poorCircleHeight"
                    classes="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                    :circle="poorCircle"
                    :cellWidth="cellWidthInPoorCircle && cellWidthInPoorCircle"
                    :cellHeight="cellHeightInPoorCircle && cellHeightInPoorCircle"
                    :userPosition="userPosition"
                    :gameChipHere="!user.rich"
                    :balancePosition="balancePosition && balancePosition"
                    :balanceSide="balanceSide && balanceSide"
                    :user="user"
                    @choice:gender="choiceGender"
                />

                <Dice v-if="user.gender.length" @rolling="rollingDice" />
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
