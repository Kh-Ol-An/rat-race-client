<template>
    <li class="relative pr-12 grid grid-cols-12 items-center gap-2">
        <div v-if="showPrice" class="relative col-span-5 flex items-center gap-2">
            <Input
                id="sell-price-package"
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
        <span v-else class="col-span-6 text-silver-800 text-center whitespace-nowrap">
            {{ addingSpaces(price) }}
        </span>

        <span class="col-span-3 text-silver-800 text-center whitespace-nowrap">
            {{ addingSpaces(quantity) }}
        </span>

        <span class="col-span-3 text-silver-800 text-center whitespace-nowrap">
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
import { ref } from 'vue';
import Input from '../../plugins/Input.vue';
import CheckIcon from "../../../icons/CheckIcon.vue";
import SellIcon from "../../../icons/SellIcon.vue";
import { addingSpaces } from '../../../../helpers/formating-values.js';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    subType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits([ 'sell' ]);

const showPrice = ref(false);
const sellPrice = ref('');
const hidPrice = () => {
    showPrice.value = false;
    sellPrice.value = '';
};
const sell = () => emit('sell', props.id, props.subType, (props.quantity * Number(sellPrice.value)));
</script>
