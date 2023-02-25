<script setup>
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue'
import Menu from '../components/plugins/Menu.vue'
import Circle from '../components/Game/Circle.vue'
import Dice from '../components/Game/Dice.vue'
import poorCircle from '../database/poor-circle.json'
import richCircle from '../database/rich-circle.json'
import professions from '../database/professions.json'
import {
    POOR_CIRCLE_FACTOR,
    RICH_CIRCLE_FACTOR,
    CELLS_COUNT_BY_WIDTH,
    CELLS_COUNT_BY_HEIGHT,
    FIELDS_COUNT,
    FIELDS_GAP,
    BLANK_X_GAP,
    BLANK_Y_GAP,
    BLANK_FACTOR,
} from '../database/variables.js'

const container = ref(null)
const containerWidth = ref(null)
const containerHeight = ref(null)
const richCircleWidth = ref('100%')
const richCircleHeight = ref('100%')
const cellSizeInRichCircle = ref(null)
const poorCircleWidth = ref(null)
const poorCircleHeight = ref(null)
const cellWidthInPoorCircle = ref(null)
const cellHeightInPoorCircle = ref(null)
const blankPosition = ref(null)
const blankWidth = ref(null)
const blankHeight = ref(null)
const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        containerWidth.value = entry.target.clientWidth
        containerHeight.value = entry.target.clientHeight
        if (containerHeight.value / containerWidth.value > RICH_CIRCLE_FACTOR) {
            // Rich
            const richHeight = containerWidth.value * RICH_CIRCLE_FACTOR
            richCircleHeight.value = `${richHeight}px`
            richCircleWidth.value = '100%'
            cellSizeInRichCircle.value = richHeight / CELLS_COUNT_BY_HEIGHT

            // Poor
            const poorHeight =
                richHeight - cellSizeInRichCircle.value * 2 - FIELDS_GAP
            const poorWidth = poorHeight / POOR_CIRCLE_FACTOR
            poorCircleHeight.value = `${poorHeight}px`
            poorCircleWidth.value = `${poorWidth}px`
            cellHeightInPoorCircle.value = poorHeight / CELLS_COUNT_BY_HEIGHT
            cellWidthInPoorCircle.value = poorWidth / CELLS_COUNT_BY_WIDTH

            // Blank
            blankPosition.value = cellWidthInPoorCircle.value + BLANK_X_GAP
            blankHeight.value =
                poorHeight - cellHeightInPoorCircle.value * 2 - BLANK_Y_GAP
            blankWidth.value = blankHeight.value * BLANK_FACTOR
        } else {
            // Rich
            const richWidth = containerHeight.value / RICH_CIRCLE_FACTOR
            richCircleWidth.value = `${richWidth}px`
            richCircleHeight.value = '100%'
            cellSizeInRichCircle.value = richWidth / CELLS_COUNT_BY_WIDTH

            // Poor
            const poorWidth =
                richWidth - cellSizeInRichCircle.value * 2 - FIELDS_GAP
            const poorHeight = poorWidth * POOR_CIRCLE_FACTOR
            poorCircleWidth.value = `${poorWidth}px`
            poorCircleHeight.value = `${poorHeight}px`
            cellWidthInPoorCircle.value = poorWidth / CELLS_COUNT_BY_WIDTH
            cellHeightInPoorCircle.value = poorHeight / CELLS_COUNT_BY_HEIGHT

            // Blank
            blankPosition.value = cellWidthInPoorCircle.value + BLANK_X_GAP
            blankHeight.value =
                poorHeight - cellHeightInPoorCircle.value * 2 - BLANK_Y_GAP
            blankWidth.value = blankHeight.value * BLANK_FACTOR
        }
    }
})
onMounted(() => resizeObserver.observe(container.value))
onUnmounted(() => resizeObserver.disconnect())

const showEventCard = ref(false)

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
    user.position += numberOnDice
    user.position > FIELDS_COUNT &&
        (user.position = user.position - FIELDS_COUNT)
    setTimeout(() => (showEventCard.value = true), 700)
}
const userPosition = computed(() =>
    user.rich
        ? richCircle.find((field) => field.position === user.position)
        : poorCircle.find((field) => field.position === user.position)
)
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

const expenses = computed(() => {
    let sum = 0
    sum += user.rent
    sum += user.food
    sum += user.clothes
    sum += user.fare
    sum += user.utilities
    return sum
})

const confirmEvent = (eventCard) => {
    console.log(eventCard)
    showEventCard.value = false
}

const development = ref(false)
setTimeout(() => (development.value = false), 3000)
// setTimeout(() => development.value = true, 3000);
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
        <div
            v-if="!development"
            class="pt-4 pb-6 px-6 w-full h-screen flex flex-col items-center gap-4"
        >
            <h1 class="md:hidden text-4xl font-bold text-white text-center">
                ГРА 'Гроші є'
            </h1>

            <div
                ref="container"
                class="relative w-full h-full flex items-center justify-center"
            >
                <!-- Rich -->
                <Circle
                    :width="richCircleWidth"
                    :height="richCircleHeight"
                    classes="relative"
                    :circle="richCircle"
                    :cell-width="cellSizeInRichCircle && cellSizeInRichCircle"
                    :cell-height="cellSizeInRichCircle && cellSizeInRichCircle"
                    :user-position="userPosition"
                    :game-chip-here="user.rich"
                    :user="user"
                />

                <!-- Poor -->
                <Circle
                    :width="poorCircleWidth && poorCircleWidth"
                    :height="poorCircleHeight && poorCircleHeight"
                    classes="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                    :circle="poorCircle"
                    :cell-width="cellWidthInPoorCircle && cellWidthInPoorCircle"
                    :cell-height="
                        cellHeightInPoorCircle && cellHeightInPoorCircle
                    "
                    :user-position="userPosition"
                    :game-chip-here="!user.rich"
                    :blank-position="blankPosition && blankPosition"
                    :blank-width="blankWidth && blankWidth"
                    :blank-height="blankHeight && blankHeight"
                    :user="user"
                    :show-event-card="showEventCard"
                    :expenses="expenses"
                    @choice:gender="choiceGender"
                    @confirm:event="confirmEvent"
                    @cancel:event="showEventCard = false"
                />

                <Dice
                    v-if="user.gender.length && !showEventCard"
                    @rolling="rollingDice"
                />
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
