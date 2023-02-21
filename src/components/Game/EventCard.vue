<script setup>
import {computed} from "vue";
import eventCards from '../../database/event-cards.json';

const props = defineProps({
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    userPosition: {
        type: Object,
        required: true,
    },
});

const eventCard = computed(() => {
    return eventCards[props.userPosition.type].find((item) => item.id === Math.floor(1 + Math.random() * 3));
});

const bgColor = computed(() => {
    if (props.userPosition.type === 'profit') {
        return 'bg-primary';
    }
    if (props.userPosition.type === 'business') {
        return 'bg-secondary';
    }
    if (props.userPosition.type === 'investments') {
        return 'bg-sky-600';
    }
    if (props.userPosition.type === 'expenses') {
        return 'bg-red-600';
    }
    if (props.userPosition.type === 'layoff') {
        return 'bg-gray-700';
    }
    if (props.userPosition.type === 'opportunities') {
        return 'bg-orange-600';
    }
    if (props.userPosition.type === 'buys') {
        return 'bg-sky-400';
    }
    if (props.userPosition.type === 'wedding') {
        return 'bg-fuchsia-600';
    }
    if (props.userPosition.type === 'baby') {
        return 'bg-yellow-400';
    }
    if (props.userPosition.type === 'divorce') {
        return 'bg-gray-600';
    }
    if (props.userPosition.type === 'vacation') {
        return 'bg-teal-600';
    }
    if (props.userPosition.type === 'bankruptcy') {
        return 'bg-gray-900';
    }
});

const yes = computed(() => {
    if (props.userPosition.type === 'profit') {
        return 'Отримати';
    }
    if (props.userPosition.type === 'business') {
        return 'Відкрити';
    }
    if (props.userPosition.type === 'investments') {
        return 'Вкласти';
    }
    if (props.userPosition.type === 'expenses') {
        return 'Заплатити';
    }
    if (props.userPosition.type === 'layoff') {
        return 'Звільнитись';
    }
    if (props.userPosition.type === 'opportunities') {
        return 'Погодитись';
    }
    if (props.userPosition.type === 'buys') {
        return 'Купити';
    }
    if (props.userPosition.type === 'wedding') {
        return 'Одружитись';
    }
    if (props.userPosition.type === 'baby') {
        return 'Завести дитину';
    }
    if (props.userPosition.type === 'divorce') {
        return 'Розлучитись';
    }
    if (props.userPosition.type === 'vacation') {
        return 'Відпочити';
    }
    if (props.userPosition.type === 'bankruptcy') {
        return 'Втратити';
    }
});
</script>

<template>
    <div
        :style="{ width, height }"
        :class="[
            'absolute',
            'top-1/2 left-1/2 z-10',
            '-translate-y-1/2 -translate-x-1/2',
            'p-4',
            'flex flex-col items-center justify-around',
            'shadow-[0_5px_15px_rgba(0,0,0,0.35)]',
            bgColor,
        ]"
    >
        <h4 v-if="eventCard.name" class="text-2xl text-slate-400 font-bold text-center">
            {{ eventCard.name }}
        </h4>
        <p class="text-slate-400 text-center">
            {{ eventCard.description }}
        </p>
        <span v-if="eventCard.profit" class="text-xl text-slate-400 font-bold text-center">
            {{ eventCard.profit }}
        </span>
        <span v-if="eventCard.price" class="text-xl text-slate-400 font-bold text-center">
            {{ eventCard.price }}
        </span>
        <div class="grid grid-cols-2 gap-3">
            <button
                v-if="
                    userPosition.type === 'business' ||
                    userPosition.type === 'investments' ||
                    userPosition.type === 'opportunities' ||
                    userPosition.type === 'buys'
                "
                class="
                    px-4 py-3
                    rounded
                    shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                    bg-gradient-to-b from-oppositeLight to-opposite
                    text-xl text-slate-200 font-bold
                    outline-0
                "
                type="button"
            >
                {{ yes }}
            </button>
            <button
                v-if="
                    userPosition.type === 'business' ||
                    userPosition.type === 'investments' ||
                    userPosition.type === 'opportunities' ||
                    userPosition.type === 'buys'
                "
                class="
                    px-4 py-3
                    rounded
                    shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                    bg-gradient-to-b from-primaryLight to-primary
                    text-xl text-slate-200 font-bold
                    outline-0
                "
                type="button"
            >
                Заощадити
            </button>
        </div>
    </div>
</template>
