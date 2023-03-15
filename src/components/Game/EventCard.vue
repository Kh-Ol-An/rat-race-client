<script setup>
import { computed, ref, watchEffect } from 'vue'
import eventCards from '../../database/event-cards.json'
import randomInteger from '../../helpers/random-integer.js'

const props = defineProps({
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    userPositionOnFields: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['confirm', 'cancel'])

const eventCard = ref(props.userPositionOnFields)

watchEffect(() => {
    const rand = randomInteger(1, 3)
    // console.log('rand: ', rand)
    // console.log("props.userPositionOnFields.type: ", props.userPositionOnFields.type)
    // console.log("eventCards[props.userPositionOnFields.type]: ", eventCards[props.userPositionOnFields.type])
    if (
        props.userPositionOnFields.type === 'business' ||
        props.userPositionOnFields.type === 'investments' ||
        props.userPositionOnFields.type === 'expenses' ||
        props.userPositionOnFields.type === 'opportunities' ||
        props.userPositionOnFields.type === 'buys'
    ) {
        eventCard.value = eventCards[props.userPositionOnFields.type].find(
            (card) => card.id === rand
        )
    }

    // console.log('eventCard: ', eventCard.value)
    // console.log('****************')
})

const confirm = () => emit('confirm', eventCard.value)

const isCancel = computed(
    () =>
        props.userPositionOnFields.type === 'business' ||
        props.userPositionOnFields.type === 'investments' ||
        props.userPositionOnFields.type === 'opportunities' ||
        props.userPositionOnFields.type === 'buys'
)
</script>

<template>
    <div
        v-if="eventCard"
        :style="{ width, height }"
        :class="[
            'absolute',
            'top-1/2 left-1/2 z-10',
            '-translate-y-1/2 -translate-x-1/2',
            'p-4',
            'flex flex-col items-center justify-around',
            'shadow-[0_5px_15px_rgba(0,0,0,0.35)]',
            userPositionOnFields.styles.bg,
        ]"
    >
        <h4 v-if="eventCard.name" class="text-center text-2xl font-bold text-slate-400">
            {{ eventCard.name }}
        </h4>
        <p v-if="eventCard.description" class="text-center text-slate-400">
            {{ eventCard.description }}
        </p>
        <span
            v-if="eventCard.profit"
            class="text-center text-xl font-bold text-slate-400"
        >
            {{ eventCard.profit }}
        </span>
        <span
            v-if="eventCard.price"
            class="text-center text-xl font-bold text-slate-400"
        >
            {{ eventCard.price }}
        </span>
        <div :class="['grid', isCancel && 'grid-cols-2 gap-3']">
            <button
                class="rounded bg-gradient-to-b from-oppositeLight to-opposite px-4 py-3 text-xl font-bold text-slate-200 shadow-[0_5px_15px_rgba(0,0,0,0.35)] outline-0"
                type="button"
                @click="confirm"
            >
                {{ userPositionOnFields.action }}
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
