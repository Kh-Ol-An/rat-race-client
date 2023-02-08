<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Menu from '../components/plugins/Menu.vue';
import richCircle from '../database/rich-circle.json';

const container = ref(null);
const width = ref('100%');
const height = ref('100%');

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const containerWidth = entry.target.clientWidth;
        const containerHeight = entry.target.clientHeight;
        if (containerHeight / containerWidth > 0.69) {
            (width.value = '100%');
            (height.value = `${containerWidth * 0.69}px`);
        } else {
            (width.value = `${containerHeight / 0.69}px`);
            (height.value = '100%');
        }
    }
});

onMounted(() => resizeObserver.observe(container.value));

onUnmounted(() => resizeObserver.disconnect());
</script>

<template>
    <Menu />
    <div class="pt-4 pb-8 px-8 w-full h-screen flex flex-col items-center gap-6">
        <h1 class="text-4xl font-bold text-white">ГРА 'Щурячі перегони Ⅱ'</h1>

        <div class="w-full h-full flex items-center justify-center bg-additional" ref="container">
            <ul :style="{ width, height }" class="relative bg-primaryLight">
                <li
                    v-for="{ id, name } in richCircle"
                    :class="[
                        'absolute',
                        (id >= 1 && id <= 22)
                    ]"
                >
                    {{ name }}
                </li>
            </ul>
        </div>
    </div>
</template>
