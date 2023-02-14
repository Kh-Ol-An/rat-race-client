<script setup>
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue';
import Menu from '../components/plugins/Menu.vue';
import Dice from '../components/Game/Dice.vue';
import GameChip from "../components/Game/GameChip.vue";
import poorCircle from '../database/poor-circle.js';
import richCircle from '../database/rich-circle.js';
import {
    OUTER_CIRCLE_FACTOR,
    INNER_CIRCLE_FACTOR,
    FIELDS_COUNT_BY_WIDTH_IN_OUTER_CIRCLE,
    FIELDS_COUNT_BY_WIDTH_IN_INNER_CIRCLE,
    FIELDS_COUNT_BY_HEIGHT_IN_OUTER_CIRCLE,
    FIELDS_COUNT_BY_HEIGHT_IN_INNER_CIRCLE,
    ASPECT_RATIO_FIELD_OUTER_CIRCLE,
    ASPECT_RATIO_FIELD_INNER_CIRCLE,
    ASPECT_RATIO_HUGE_FIELD_INNER,
    FIELDS_COUNT_OF_OUTER_CIRCLE,
    FIELDS_COUNT_OF_INNER_CIRCLE,
} from '../database/variables.js';

const container = ref(null);
const containerWidth = ref(null);
const containerHeight = ref(null);
const outerCircleWidth = ref('100%');
const outerCircleHeight = ref('100%');
const fieldWidthInOuterCircle = ref(null);
const fieldHeightInOuterCircle = ref(null);
const innerCircleWidth = ref(null);
const innerCircleHeight = ref(null);
const fieldWidthInInnerCircle = ref(null);
const fieldHeightInInnerCircle = ref(null);
const hugeFieldWidthInInnerCircle = ref(null);

const numberOnDice = ref(6);
const gameChip = reactive({
    id: 1,
    position: 1,
    rich: true,
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
    const fieldsCount = gameChip.rich ? FIELDS_COUNT_OF_OUTER_CIRCLE : FIELDS_COUNT_OF_INNER_CIRCLE;
    gameChip.position > fieldsCount && (gameChip.position = gameChip.position - fieldsCount);
};

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        containerWidth.value = entry.target.clientWidth;
        containerHeight.value = entry.target.clientHeight;
        if (containerHeight.value / containerWidth.value > OUTER_CIRCLE_FACTOR) {
            // Outer
            const outerHeight = containerWidth.value * OUTER_CIRCLE_FACTOR;
            outerCircleWidth.value = '100%';
            outerCircleHeight.value = `${outerHeight}px`;

            fieldWidthInOuterCircle.value = outerHeight / FIELDS_COUNT_BY_HEIGHT_IN_OUTER_CIRCLE;
            fieldHeightInOuterCircle.value = fieldWidthInOuterCircle.value / ASPECT_RATIO_FIELD_OUTER_CIRCLE;

            // Inner
            const innerHeight = outerHeight - fieldHeightInOuterCircle.value * 2 - 16;
            innerCircleWidth.value = `${innerHeight / INNER_CIRCLE_FACTOR}px`;
            innerCircleHeight.value = `${innerHeight}px`;

            fieldWidthInInnerCircle.value = innerHeight / FIELDS_COUNT_BY_HEIGHT_IN_INNER_CIRCLE;
            fieldHeightInInnerCircle.value = fieldWidthInInnerCircle.value / ASPECT_RATIO_FIELD_INNER_CIRCLE;
            hugeFieldWidthInInnerCircle.value = fieldWidthInInnerCircle.value / ASPECT_RATIO_HUGE_FIELD_INNER;
        } else {
            // Outer
            const outerWidth = containerHeight.value / OUTER_CIRCLE_FACTOR;
            outerCircleWidth.value = `${outerWidth}px`;
            outerCircleHeight.value = '100%';

            fieldWidthInOuterCircle.value = outerWidth / FIELDS_COUNT_BY_WIDTH_IN_OUTER_CIRCLE;
            fieldHeightInOuterCircle.value = fieldWidthInOuterCircle.value / ASPECT_RATIO_FIELD_OUTER_CIRCLE;

            // Inner
            const innerWidth = outerWidth - fieldHeightInOuterCircle.value * 2 - 16;
            innerCircleWidth.value = `${innerWidth}px`;
            innerCircleHeight.value = `${innerWidth * INNER_CIRCLE_FACTOR}px`;

            fieldWidthInInnerCircle.value = innerWidth / FIELDS_COUNT_BY_WIDTH_IN_INNER_CIRCLE;
            fieldHeightInInnerCircle.value = fieldWidthInInnerCircle.value / ASPECT_RATIO_FIELD_INNER_CIRCLE;
            hugeFieldWidthInInnerCircle.value = fieldWidthInInnerCircle.value / ASPECT_RATIO_HUGE_FIELD_INNER;
        }
    }
});

onMounted(() => resizeObserver.observe(container.value));

onUnmounted(() => resizeObserver.disconnect());

const development = ref(false);
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
            <h1 class="md:hidden text-4xl font-bold text-white text-center">ГРА 'Щурячі перегони Ⅱ'</h1>

            <div class="w-full h-full flex items-center justify-center" ref="container">
                <div :style="{ width: outerCircleWidth, height: outerCircleHeight }" class="relative bg-slate-800">
                    <Dice :numberOnDice="numberOnDice" @rolling="rollingDice" />

                    <div
                        v-if="fieldWidthInInnerCircle && fieldHeightInInnerCircle"
                        :style="{ width: innerCircleWidth, height: innerCircleHeight }"
                        class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                    >
                        <div
                            v-for="{ styles, type, name } in poorCircle(
                                fieldWidthInInnerCircle,
                                fieldHeightInInnerCircle,
                                hugeFieldWidthInInnerCircle,
                            )"
                            :style="{
                                top: styles.top && `${styles.top}px`,
                                right: styles.right && `${styles.right}px`,
                                bottom: styles.bottom && `${styles.bottom}px`,
                                left: styles.left && `${styles.left}px`,
                                width: `${styles.width}px`,
                                height: `${styles.height}px`,
                            }"
                            :class="[
                                'absolute',
                                'flex items-center justify-center',
                                type === 'start' && 'bg-amber-500',
                                type === 'business' && 'bg-secondary', // half
                                type === 'buys' && 'bg-sky-600',
                                type === 'chance' && 'bg-orange-700',
                                type === 'expenses' && 'bg-red-600',
                                type === 'market' && 'bg-blue-700',
                                type === 'bankruptcy' && 'bg-slate-700',
                                type === 'profit' && 'bg-primary',
                                type === 'wedding' && 'bg-fuchsia-600',
                                // type === 'vacation' && 'bg-gray-700',
                                // type === 'divorce' && 'bg-gray-700',
                                // type === 'firing' && 'bg-gray-700',
                            ]"
                        >
                            <span
                                :class="[
                                    'text-sm font-bold text-slate-100',
                                    'text-center',
                                    styles.rotate,
                                ]"
                            >
                                {{ name }}
                            </span>
                        </div>

                        <GameChip v-if="!gameChip.rich" :gameChipStyles="gameChipStyles" />
                    </div>

                    <div v-if="fieldWidthInOuterCircle && fieldHeightInOuterCircle" class="w-full h-full">
                        <div
                            v-for="{ styles, type, name } in richCircle(fieldWidthInOuterCircle, fieldHeightInOuterCircle)"
                            :style="{
                                top: styles.top && `${styles.top}px`,
                                right: styles.right && `${styles.right}px`,
                                bottom: styles.bottom && `${styles.bottom}px`,
                                left: styles.left && `${styles.left}px`,
                                width: `${styles.width}px`,
                                height: `${styles.height}px`,
                            }"
                            :class="[
                                'absolute',
                                'flex items-center justify-center',
                                type === 'start' && 'bg-amber-500',
                                type === 'target' && 'bg-fuchsia-700',
                                type === 'buys' && 'bg-sky-600',
                                type === 'business' && 'bg-secondary',
                                type === 'market' && 'bg-blue-700',
                                type === 'chance' && 'bg-orange-700',
                                type === 'bankruptcy' && 'bg-slate-700',
                                type === 'profit' && 'bg-primary',
                                type === 'deputy' && 'bg-stone-800',
                                type === 'tax' && 'bg-gray-700',
                            ]"
                        >
                            <span
                                :class="[
                                    'text-sm font-bold text-slate-100',
                                    'text-center',
                                    styles.rotate,
                                ]"
                            >
                                {{ name }}
                            </span>
                        </div>

                        <GameChip v-if="gameChip.rich" :gameChipStyles="gameChipStyles" />
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
