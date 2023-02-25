<script setup>
import { computed } from 'vue'
import eventCards from '../../database/event-cards.json'

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
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => emit('confirm', props.userPosition)

const isCancel = computed(
    () =>
        props.userPosition.type === 'business' ||
        props.userPosition.type === 'investments' ||
        props.userPosition.type === 'opportunities' ||
        props.userPosition.type === 'buys'
)
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
            userPosition.styles.bg,
        ]"
    >
        <h4 class="text-center text-2xl font-bold text-slate-400">
            {{ userPosition.name }}
        </h4>
        <p v-if="userPosition.description" class="text-center text-slate-400">
            {{ userPosition.description }}
        </p>
        <span
            v-if="userPosition.profit"
            class="text-center text-xl font-bold text-slate-400"
        >
            {{ userPosition.profit }}
        </span>
        <span
            v-if="userPosition.price"
            class="text-center text-xl font-bold text-slate-400"
        >
            {{ userPosition.price }}
        </span>
        <div :class="['grid', isCancel && 'grid-cols-2 gap-3']">
            <button
                class="rounded bg-gradient-to-b from-oppositeLight to-opposite px-4 py-3 text-xl font-bold text-slate-200 shadow-[0_5px_15px_rgba(0,0,0,0.35)] outline-0"
                type="button"
                @click="confirm"
            >
                {{ userPosition.action }}
            </button>
            <button
                v-if="isCancel"
                class="rounded bg-gradient-to-b from-primaryLight to-primary px-4 py-3 text-xl font-bold text-slate-200 shadow-[0_5px_15px_rgba(0,0,0,0.35)] outline-0"
                type="button"
                @click="$emit('cancel')"
            >
                Заощадити
            </button>
        </div>
    </div>
</template>
