<script setup>
import GameChip from '../../components/Game/GameChip.vue'
import ReductionBalance from '../../components/Game/ReductionBalance.vue'
import IncreaseBalance from '../../components/Game/IncreaseBalance.vue'
import EventCard from '../../components/Game/EventCard.vue'
import MoneyIcon from '../../assets/images/icons/MoneyIcon.vue'
import BusinessIcon from '../../assets/images/icons/BusinessIcon.vue'
import InvestmentsIcon from '../../assets/images/icons/InvestmentsIcon.vue'
import ExpenseIcon from '../../assets/images/icons/ExpenseIcon.vue'
import LayoffIcon from '../../assets/images/icons/LayoffIcon.vue'
import OpportunitiesIcon from '../../assets/images/icons/OpportunitiesIcon.vue'
import CartIcon from '../../assets/images/icons/CartIcon.vue'
import WeddingIcon from '../../assets/images/icons/WeddingIcon.vue'
import BabyIcon from '../../assets/images/icons/BabyIcon.vue'
import DivorceIcon from '../../assets/images/icons/DivorceIcon.vue'
import VacationIcon from '../../assets/images/icons/VacationIcon.vue'
import BankruptcyIcon from '../../assets/images/icons/BankruptcyIcon.vue'

defineProps({
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    classes: {
        type: String,
        required: true,
    },
    circleFields: {
        type: Array,
        required: true,
    },
    cellWidth: {
        type: Number,
        required: true,
    },
    cellHeight: {
        type: Number,
        required: true,
    },
    userPositionOnFields: {
        type: Object,
        required: true,
    },
    blankPosition: {
        type: Number,
        default: null,
    },
    blankWidth: {
        type: Number,
        default: null,
    },
    blankHeight: {
        type: Number,
        default: null,
    },
    user: {
        type: Object,
        required: true,
    },
    showEventCard: {
        type: Boolean,
        default: false,
    },
    expenses: {
        type: Number,
        default: null,
    },
})

const emit = defineEmits(['confirm:event', 'choice:gender', 'cancel:event'])

const confirmEvent = (eventCard) => emit('confirm:event', eventCard)
</script>

<template>
    <div :style="{ width, height }" :class="classes">
        <div
            v-for="{ position, styles, type, name } in circleFields"
            :key="position"
            :style="{
                top: styles.top && `${cellHeight * styles.top}px`,
                right: styles.right && `${cellWidth * styles.right}px`,
                bottom: styles.bottom && `${cellHeight * styles.bottom}px`,
                left: styles.left && `${cellWidth * styles.left}px`,
                width: `${cellWidth}px`,
                height: `${cellHeight}px`,
            }"
            :class="[
                'absolute',
                'flex items-center justify-center',
                styles.bg,
            ]"
            :title="name"
        >
            <MoneyIcon v-if="type === 'profit'" />
            <BusinessIcon v-if="type === 'business'" />
            <InvestmentsIcon
                v-if="type === 'investments'"
                width="30px"
                height="30px"
            />
            <ExpenseIcon
                v-if="type === 'expenses'"
                width="30px"
                height="30px"
            />
            <LayoffIcon v-if="type === 'layoff'" />
            <OpportunitiesIcon
                v-if="type === 'opportunities'"
                width="30px"
                height="30px"
            />
            <CartIcon v-if="type === 'buys'" width="30px" height="30px" />
            <WeddingIcon v-if="type === 'wedding'" width="30px" height="30px" />
            <BabyIcon v-if="type === 'baby'" width="30px" height="30px" />
            <DivorceIcon v-if="type === 'divorce'" width="30px" height="30px" />
            <VacationIcon
                v-if="type === 'vacation'"
                width="30px"
                height="30px"
            />
            <BankruptcyIcon
                v-if="type === 'bankruptcy'"
                width="30px"
                height="30px"
            />
        </div>

        <GameChip
            :user-styles="userPositionOnFields.styles"
            :cell-width="cellWidth"
            :cell-height="cellHeight"
            game-chip-color="fill-red-600"
        />

        <IncreaseBalance
            v-if="blankPosition && blankWidth && blankHeight"
            :left="`${blankPosition}px`"
            :width="`${blankWidth}px`"
            :height="`${blankHeight}px`"
            :user="user"
            @choice:gender="$emit('choice:gender', 'male')"
        />

        <ReductionBalance
            v-if="blankPosition && blankWidth && blankHeight"
            :right="`${blankPosition}px`"
            :width="`${blankWidth}px`"
            :height="`${blankHeight}px`"
            :user="user"
            :expenses="expenses"
            @choice:gender="$emit('choice:gender', 'female')"
        />

        <EventCard
            v-if="blankWidth && blankHeight && showEventCard"
            :width="`${blankWidth}px`"
            :height="`${blankHeight}px`"
            :user-position-on-fields="userPositionOnFields"
            @confirm="confirmEvent"
            @cancel="$emit('cancel:event')"
        />
    </div>
</template>
