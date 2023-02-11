<script setup>
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue';
import Menu from '../components/plugins/Menu.vue';
import Dice from '../components/Game/Dice.vue';
import richCircle from '../database/rich-circle.js';
import {
    CONTAINER_FACTOR,
    FIELDS_COUNT_BY_WIDTH,
    FIELDS_COUNT_BY_HEIGHT,
    ASPECT_RATIO,
} from '../database/variables.js';

const container = ref(null); // 78 x 54 || 75 x 52
const containerWidth = ref(null);
const containerHeight = ref(null);
const richWidth = ref('100%');
const richHeight = ref('100%');
const richSmall = ref(null);
const richBig = ref(null);

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
        if (containerHeight.value / containerWidth.value > CONTAINER_FACTOR) {
            const height = containerWidth.value * CONTAINER_FACTOR;
            richWidth.value = '100%';
            richHeight.value = `${height}px`;

            richSmall.value = height / FIELDS_COUNT_BY_HEIGHT;
            richBig.value = richSmall.value / ASPECT_RATIO;
        } else {
            const width = containerHeight.value / CONTAINER_FACTOR;
            richWidth.value = `${width}px`;
            richHeight.value = '100%';

            richSmall.value = width / FIELDS_COUNT_BY_WIDTH;
            richBig.value = richSmall.value / ASPECT_RATIO;
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
                            type === 'start' && 'bg-amber-300',
                            type === 'target' && 'bg-indigo-400',
                            type === 'buys' && 'bg-cyan-300',
                            type === 'business' && 'bg-secondary',
                            type === 'market' && 'bg-blue-500',
                            type === 'chance' && 'bg-orange-300',
                            type === 'bankruptcy' && 'bg-slate-700',
                            type === 'profit' && 'bg-primary',
                            type === 'deputy' && 'bg-stone-800',
                        ]"
                    >
                        {{ name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
