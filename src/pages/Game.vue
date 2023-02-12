<script setup>
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue';
import Menu from '../components/plugins/Menu.vue';
import Dice from '../components/Game/Dice.vue';
import poorCircle from '../database/poor-circle.js';
import richCircle from '../database/rich-circle.js';
import {
    OUTER_FACTOR,
    INNER_FACTOR,
    FIELDS_COUNT_BY_WIDTH_IN_OUTER,
    FIELDS_COUNT_BY_WIDTH_IN_INNER,
    FIELDS_COUNT_BY_HEIGHT,
    ASPECT_RATIO_OUTER,
    ASPECT_RATIO_INNER,
    ASPECT_RATIO_INNER_HUGE,
} from '../database/variables.js';

// 78 x 54 || 75 x 52
// 66 x 42
const container = ref(null);
const containerWidth = ref(null);
const containerHeight = ref(null);
const richWidth = ref('100%');
const richHeight = ref('100%');
const richSmall = ref(null);
const richBig = ref(null);
const poorWidth = ref(null);
const poorHeight = ref(null);
const poorSmall = ref(null);
const poorBig = ref(null);
const poorHuge = ref(null);

const dice = ref(6);
const rollingDice = () => {
    dice.value = Math.floor(1 + Math.random() * 6);
    playingChipPosition.value += dice.value;
};

const playingChipPosition = ref(201); // naming
const playingChip = computed(() => {
    const test = richCircle(richSmall.value, richBig.value).find(item => item.id === playingChipPosition.value)
    return {
        id: 1,
        position: test.styles,
    };
});

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        containerWidth.value = entry.target.clientWidth;
        containerHeight.value = entry.target.clientHeight;
        if (containerHeight.value / containerWidth.value > OUTER_FACTOR) {
            // Outer
            const outerHeight = containerWidth.value * OUTER_FACTOR;
            richWidth.value = '100%';
            richHeight.value = `${outerHeight}px`;

            richSmall.value = outerHeight / FIELDS_COUNT_BY_HEIGHT;
            richBig.value = richSmall.value / ASPECT_RATIO_OUTER;

            // Inner
            const innerHeight = outerHeight - richBig.value * 2 - 8;
            poorWidth.value = `${innerHeight / INNER_FACTOR}px`;
            poorHeight.value = `${innerHeight}px`;

            poorSmall.value = innerHeight / FIELDS_COUNT_BY_HEIGHT;
            poorBig.value = poorSmall.value / ASPECT_RATIO_INNER;
        } else {
            // Outer
            const outerWidth = containerHeight.value / OUTER_FACTOR;
            richWidth.value = `${outerWidth}px`;
            richHeight.value = '100%';

            richSmall.value = outerWidth / FIELDS_COUNT_BY_WIDTH_IN_OUTER;
            richBig.value = richSmall.value / ASPECT_RATIO_OUTER;

            // Inner
            const innerWidth = outerWidth - richBig.value * 2 - 16;
            poorWidth.value = `${innerWidth}px`;
            poorHeight.value = `${innerWidth * INNER_FACTOR}px`;

            poorSmall.value = innerWidth / FIELDS_COUNT_BY_WIDTH_IN_INNER;
            poorBig.value = poorSmall.value / ASPECT_RATIO_INNER;
            poorHuge.value = poorSmall.value / ASPECT_RATIO_INNER_HUGE;
        }
    }
});

onMounted(() => resizeObserver.observe(container.value));

onUnmounted(() => resizeObserver.disconnect());
</script>

<template>
    <Menu />
    <div class="pt-4 pb-8 px-8 w-full h-screen flex flex-col items-center gap-6">
        <h1 class="text-4xl font-bold text-white text-center">ГРА 'Щурячі перегони Ⅱ'</h1>

        <div class="w-full h-full flex items-center justify-center bg-slate-600" ref="container">
            <div :style="{ width: richWidth, height: richHeight }" class="relative bg-slate-800">
                <Dice :dice="dice" @rolling="rollingDice" />

                <div
                    :style="{
                            top: playingChip.position.top && `${playingChip.position.top}px`,
                            right: playingChip.position.right && `${playingChip.position.right}px`,
                            bottom: playingChip.position.bottom && `${playingChip.position.bottom}px`,
                            left: playingChip.position.left && `${playingChip.position.left}px`,
                            width: `${playingChip.position.width}px`,
                            height: `${playingChip.position.height}px`,
                        }"
                    class="absolute z-10 bg-transparent"
                >
                    <span
                        class="
                            absolute
                            top-1/2 left-1/2
                            -translate-y-1/2 -translate-x-1/2
                            w-6 h-6
                            rounded-full
                            bg-red-600
                        "
                    ></span>
                </div>

                <ul
                    v-if="poorSmall && poorBig"
                    :style="{ width: poorWidth, height: poorHeight }"
                    class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                >
                    <li
                        v-for="{ styles, type, name } in poorCircle(poorSmall, poorBig, poorHuge)"
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
                    </li>
                </ul>

                <ul v-if="richSmall && richBig" class="w-full h-full">
                    <li
                        v-for="{ styles, type, name } in richCircle(richSmall, richBig)"
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
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
