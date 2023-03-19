<script setup>
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue'
import GameCircle from '../components/Game/GameCircle.vue'
import GameDice from '../components/Game/GameDice.vue'
import circleFields from '../database/circle-fields.json'
import professions from '../database/professions.json'
import {
    CIRCLE_FACTOR,
    CELLS_COUNT_BY_WIDTH,
    CELLS_COUNT_BY_HEIGHT,
    FIELDS_COUNT,
    BLANK_X_GAP,
    BLANK_Y_GAP,
    BLANK_FACTOR,
} from '../database/variables.js'
import sleep from "../helpers/sleep.js";

const container = ref(null)
const containerWidth = ref(null)
const containerHeight = ref(null)
const circleWidth = ref('100%')
const circleHeight = ref('100%')
const cellSize = ref(null)
const blankPosition = ref(null)
const blankWidth = ref(null)
const blankHeight = ref(null)
const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        containerWidth.value = entry.target.clientWidth
        containerHeight.value = entry.target.clientHeight
        if (containerHeight.value / containerWidth.value > CIRCLE_FACTOR) {
            // Circle
            const height = containerWidth.value * CIRCLE_FACTOR
            circleHeight.value = `${height}px`
            circleWidth.value = '100%'
            cellSize.value = height / CELLS_COUNT_BY_HEIGHT

            // Blank
            blankPosition.value = cellSize.value + BLANK_X_GAP
            blankHeight.value = height - cellSize.value * 2 - BLANK_Y_GAP
            blankWidth.value = blankHeight.value * BLANK_FACTOR
        } else {
            // Circle
            const width = containerHeight.value / CIRCLE_FACTOR
            circleWidth.value = `${width}px`
            circleHeight.value = '100%'
            cellSize.value = width / CELLS_COUNT_BY_WIDTH

            // Blank
            blankPosition.value = cellSize.value + BLANK_X_GAP
            blankWidth.value = (width - cellSize.value * 2) / 3 - BLANK_X_GAP
            blankHeight.value = blankWidth.value / BLANK_FACTOR
        }
    }
})
onMounted(() => resizeObserver.observe(container.value))
onUnmounted(() => resizeObserver.disconnect())

const showEventCard = ref(false)

const user = reactive({
    id: 1,
    position: 1,
    gender: '',
    profession: '',
    cash: 0,
    salary: 0,
    rent: 0,
    food: 0,
    clothes: 0,
    fare: 0,
    utilities: 0,
    businesses: [],
    investments: [],
})

const passiveIncome = computed(() => {
    let sum = 0
    return sum
})

const expenses = computed(() => {
    let sum = 0
    sum += user.rent
    sum += user.food
    sum += user.clothes
    sum += user.fare
    sum += user.utilities
    return sum
})

const cashFlow = computed(() => user.salary + passiveIncome.value - expenses.value)

const rollingDice = async (numberOnDice) => {
    for (let i = 1; i <= numberOnDice; i++) {
        await sleep(500)
        user.position += 1
        user.position > FIELDS_COUNT && (user.position = 1)
        if (
            user.position === 1 ||
            user.position === 9 ||
            user.position === 17 ||
            user.position === 25 ||
            user.position === 33 ||
            user.position === 41
        ) {
            await sleep(500)
            user.cash += cashFlow.value
        }
    }
    setTimeout(() => (showEventCard.value = true), 700)
}
const userPositionOnFields = computed(() => circleFields.find((field) => field.position === user.position))
const choiceGender = (gender) => {
    const randomId = Math.floor(1 + Math.random() * 4)
    const genderCard = professions[gender].find(
        (profession) => profession.id === randomId
    )
    delete genderCard.id
    for (const [key] of Object.entries(genderCard)) {
        user[key] = genderCard[key]
    }
    user.gender = gender
}

const confirmEvent = (event, card) => {
    console.log('event: ', event)
    console.log('card: ', card)
    if (event === 'expenses') {
        user.cash -= card.price
    }
    if (card.price && event !== 'expenses') {
        user.cash -= card.price
        user[event].push(card)
    }
    showEventCard.value = false
}

// ********* Delete after the end of development *********
const development = ref(false)
// setTimeout(() => development.value = true, 3000);
// ********* Delete after the end of development *********
</script>

<template>
    <!-- ********* Delete after the end of development ********* -->
    <Transition>
        <div
            v-if="development"
            class="fixed top-0 right-0 bottom-0 left-0 z-40 flex h-screen w-full items-center justify-center"
        >
            <p class="text-2xl text-slate-300">
                Цей функціонал у процесі розробки
            </p>
        </div>
    </Transition>
    <!-- ********* Delete after the end of development ********* -->

    <Transition>
        <div
            v-if="!development"
            class="flex h-screen w-full flex-col items-center gap-4 px-6 pt-4 pb-6"
        >
            <h1 class="text-center text-4xl font-bold text-white md:hidden">
                ГРА 'Гроші є'
            </h1>

            <div
                ref="container"
                class="relative flex h-full w-full items-center justify-center"
            >
                <GameCircle
                    :width="circleWidth"
                    :height="circleHeight"
                    classes="relative"
                    :circle-fields="circleFields"
                    :cell-width="cellSize && cellSize"
                    :cell-height="cellSize && cellSize"
                    :user-position-on-fields="userPositionOnFields"
                    :show-event-card="showEventCard"
                    :blank-position="blankPosition && blankPosition"
                    :blank-width="blankWidth && blankWidth"
                    :blank-height="blankHeight && blankHeight"
                    :user="user"
                    :passive-income="passiveIncome"
                    :cash-flow="cashFlow"
                    :expenses="expenses"
                    @choice:gender="choiceGender"
                    @confirm:event="confirmEvent"
                    @cancel:event="showEventCard = false"
                />

                <GameDice
                    v-if="user.gender.length"
                    @rolling="rollingDice"
                />
            </div>
        </div>
    </Transition>
</template>

<!-- ********* Delete after the end of development ********* -->
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
<!-- ********* Delete after the end of development ********* -->
