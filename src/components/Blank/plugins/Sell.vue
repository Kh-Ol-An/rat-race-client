<script setup>
import { ref } from "vue";
import Input from '../../plugins/Input.vue';
import CheckIcon from "../../../assets/images/icons/CheckIcon.vue";
import SellIcon from "../../../assets/images/icons/SellIcon.vue";
import { removingSpaces, addingSpaces } from '../../../helpers/formating-values.js';

defineProps({
    inputId: {
        type: String,
        required: true,
    },
    secondBg: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits([ 'sell' ]);

const show = ref(false);
const price = ref('');
const hid = () => {
    show.value = false;
    price.value = '';
};
const sell = () => {
    emit('sell', Number(removingSpaces(price.value)));
    hid();
};
</script>

<template>
    <slot v-if="!show"></slot>
    <div v-if="show" class="relative col-span-1">
        <Input
            :id="inputId"
            placeholder="Продати по"
            smallLabel
            :secondBg="secondBg"
            v-model:value="price"
        />
        <button
            class="absolute top-1/2 right-3 md:right-2 -translate-y-1/2 rotate-45 text-2xl font-bold text-opposite"
            type="button"
            title="Скасувати"
            @click="hid"
        >
            &#43;
        </button>
    </div>
    <button
        v-if="show"
        :class="[
            'px-2',
            'outline-0',
            price.length === 0 && 'cursor-not-allowed',
        ]"
        type="button"
        :title="`Продати по ціні ${addingSpaces(price)}`"
        :disabled="price.length === 0"
        @click="sell"
    >
        <CheckIcon :color="price.length === 0 ? 'fill-slate-300' : 'fill-primary'" />
    </button>

    <button
        v-if="!show"
        class="
            absolute
            top-1/2 right-0
            -translate-y-1/2
            px-2
            outline-0
        "
        type="button"
        title="Продати"
        @click="show = true"
    >
        <SellIcon color="fill-primary" />
    </button>
</template>
