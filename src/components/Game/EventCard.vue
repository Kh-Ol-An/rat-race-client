<script setup>
import { computed, ref } from 'vue'
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

const chosenBusinessType = ref('')

const eventCard = computed(() => {
    const rand = randomInteger(1, 3)
    if (props.userPositionOnFields.type === 'business') {
        return chosenBusinessType.value.length
            ? eventCards.business[chosenBusinessType.value].find((card) => card.id === rand)
            : props.userPositionOnFields
    }

    if (
        props.userPositionOnFields.type === 'investments' ||
        props.userPositionOnFields.type === 'expenses' ||
        props.userPositionOnFields.type === 'opportunities' ||
        props.userPositionOnFields.type === 'buys'
    ) {
        return eventCards[props.userPositionOnFields.type].find((card) => card.id === rand)
    }

    return props.userPositionOnFields
})

const confirm = () => {
    emit('confirm', eventCard.value)
    chosenBusinessType.value = ''
}

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
        <div
            v-if="userPositionOnFields.type === 'business' && chosenBusinessType.length === 0"
            class="absolute top-0 right-0 bottom-0 left-0 w-full h-full flex flex-col items-center justify-center"
        >
            <button
                class="w-full h-1/2 flex items-center justify-center bg-gradient-to-b from-primaryLight to-primary text-center font-bold text-6xl text-slate-300"
                type="button"
                title="Малий бізнес"
                @click="chosenBusinessType = 'small'"
            >
                Малий бізнес
            </button>
            <button
                class="w-full h-1/2 flex items-center justify-center bg-gradient-to-b from-secondaryLight to-secondary text-center font-bold text-6xl text-slate-300"
                type="button"
                title="Великий бізнес"
                @click="chosenBusinessType = 'big'"
            >
                Великий бізнес
            </button>
        </div>

        <div v-if="eventCard" class="w-full h-full flex flex-col items-center justify-around">
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
    </div>
</template>
