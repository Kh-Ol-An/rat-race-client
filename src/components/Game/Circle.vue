<script setup>
import GameChip from "../../components/Game/GameChip.vue";
import ReductionBalance from "../../components/Game/ReductionBalance.vue";
import IncreaseBalance from "../../components/Game/IncreaseBalance.vue";
import MoneyIcon from "../../assets/images/icons/MoneyIcon.vue";
import BusinessIcon from "../../assets/images/icons/BusinessIcon.vue";
import InvestmentsIcon from "../../assets/images/icons/InvestmentsIcon.vue";
import ExpenseIcon from "../../assets/images/icons/ExpenseIcon.vue";
import LayoffIcon from "../../assets/images/icons/LayoffIcon.vue";
import OpportunitiesIcon from "../../assets/images/icons/OpportunitiesIcon.vue";
import CartIcon from "../../assets/images/icons/CartIcon.vue";
import WeddingIcon from "../../assets/images/icons/WeddingIcon.vue";
import BabyIcon from "../../assets/images/icons/BabyIcon.vue";
import DivorceIcon from "../../assets/images/icons/DivorceIcon.vue";
import VacationIcon from "../../assets/images/icons/VacationIcon.vue";
import BankruptcyIcon from "../../assets/images/icons/BankruptcyIcon.vue";

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
    circle: {
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
    userPosition: {
        type: Object,
        required: true,
    },
    gameChipHere: {
        type: Boolean,
        required: true,
    },
    balancePosition: {
        type: String,
        required: true,
    },
    balanceSide: {
        type: String,
        required: true,
    },
    user: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div :style="{ width, height }" :class="classes">
        <div
            v-for="{ styles, type, name } in circle"
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
                type === 'profit' && 'bg-primary',
                type === 'business' && 'bg-secondary',
                type === 'investments' && 'bg-sky-600',
                type === 'expenses' && 'bg-red-600',
                type === 'layoff' && 'bg-gray-700',
                type === 'opportunities' && 'bg-orange-600',
                type === 'buys' && 'bg-sky-400',
                type === 'wedding' && 'bg-fuchsia-600',
                type === 'baby' && 'bg-yellow-400',
                type === 'divorce' && 'bg-gray-600',
                type === 'vacation' && 'bg-teal-600',
                type === 'bankruptcy' && 'bg-gray-900',
            ]"
            :title="name"
        >
            <MoneyIcon v-if="type === 'profit'" />
            <BusinessIcon v-if="type === 'business'" />
            <InvestmentsIcon v-if="type === 'investments'" width="30px" height="30px" />
            <ExpenseIcon v-if="type === 'expenses'" width="30px" height="30px" />
            <LayoffIcon v-if="type === 'layoff'" />
            <OpportunitiesIcon v-if="type === 'opportunities'" width="30px" height="30px" />
            <CartIcon v-if="type === 'buys'" width="30px" height="30px" />
            <WeddingIcon v-if="type === 'wedding'" width="30px" height="30px" />
            <BabyIcon v-if="type === 'baby'" width="30px" height="30px" />
            <DivorceIcon v-if="type === 'divorce'" width="30px" height="30px" />
            <VacationIcon v-if="type === 'vacation'" width="30px" height="30px" />
            <BankruptcyIcon v-if="type === 'bankruptcy'" width="30px" height="30px" />
        </div>

        <GameChip
            v-if="gameChipHere"
            :userPosition="userPosition"
            :cellWidth="cellWidth"
            :cellHeight="cellHeight"
            gameChipColor="fill-red-600"
        />

        <ReductionBalance
            v-if="balancePosition && balanceSide"
            :left="`${balancePosition}px`"
            :width="`${balanceSide}px`"
            :height="`${balanceSide}px`"
            :user="user"
            @choice:gender="$emit('choice:gender', 'male')"
        />

        <IncreaseBalance
            v-if="balancePosition && balanceSide"
            :right="`${balancePosition}px`"
            :width="`${balanceSide}px`"
            :height="`${balanceSide}px`"
            :user="user"
            @choice:gender="$emit('choice:gender', 'female')"
        />
    </div>
</template>
