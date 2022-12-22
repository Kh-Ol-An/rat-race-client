<template>
    <li
        v-if="userShare.length > 1"
        class="relative py-2 pr-12 grid grid-cols-12 items-center gap-2 border-t-2 border-b-silver-900 font-bold text-center"
    >
        <div v-if="showPrice" class="relative col-span-4 flex items-center gap-2">
            <Input
                id="sell-price"
                placeholder="Ціна продажі"
                smallLabel
                v-model:value="sellPrice"
            />
            <button
                class="absolute top-1/2 right-3 -translate-y-1/2 rotate-45 text-2xl font-bold text-opposite"
                type="button"
                title="Скасувати"
                @click="hidPrice"
            >
                &#43;
            </button>
        </div>
        <button
            v-if="showPrice"
            :class="[
                'col-span-1',
                'px-2',
                'outline-0',
                sellPrice.length === 0 && 'cursor-not-allowed',
            ]"
            type="button"
            :title="`Продати по ціні ${sellPrice}`"
            :disabled="sellPrice.length === 0"
            @click="sell"
        >
            <CheckIcon width="24px" height="24px" :color="sellPrice.length === 0 ? 'fill-slate-300' : 'fill-primary'" />
        </button>
        <span v-else class="col-span-5">
            {{ addingSpaces(price) }}
        </span>

        <span class="col-span-3">
            {{ addingSpaces(quantity) }}
        </span>

        <span class="col-span-4">
            {{ addingSpaces(cost) }}
        </span>
        <button
            v-if="!showPrice"
            class="
                absolute
                top-1/2 right-0
                -translate-y-1/2
                px-2
                outline-0
            "
            type="button"
            title="Продати все"
            @click="showPrice = true"
        >
            <SellIcon width="24px" height="24px" color="fill-primary" />
        </button>
    </li>
</template>

<script setup>
import { computed, ref } from "vue";
import Input from '../../plugins/Input.vue';
import CheckIcon from "../../../icons/CheckIcon.vue";
import SellIcon from "../../../icons/SellIcon.vue";
import { addingSpaces } from '../../../../helpers/formating-values.js';

const props = defineProps({
    userShare: {
        type: Array,
        required: true,
    },
    subType: {
        type: String,
        required: true,
    },
});

const emit = defineEmits([ 'sell' ]);

const cost = computed(() => props.userShare.reduce((total, share) => total += share.cost, 0));
const quantity = computed(() => props.userShare.reduce((total, share) => total += share.quantity, 0));
const price = computed(() => {
    const result = cost.value / quantity.value;
    if (Number.isInteger(result)) {
        return Math.round(result);
    }

    return `~${Math.round(result)}`;
});

const showPrice = ref(false);
const sellPrice = ref('');
const hidPrice = () => {
    showPrice.value = false;
    sellPrice.value = '';
};
const sell = () => emit('sell', props.subType, (quantity.value * Number(sellPrice.value)));
</script>
