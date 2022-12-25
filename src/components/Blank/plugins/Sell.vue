<template>
    <slot v-if="!show"></slot>
    <div v-if="show" class="relative col-span-1">
        <Input
            :id="inputId"
            placeholder="Продати по"
            smallLabel
            v-model:value="price"
        />
        <button
            class="absolute top-1/2 right-3 -translate-y-1/2 rotate-45 text-2xl font-bold text-opposite"
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
        <CheckIcon width="24px" height="24px" :color="price.length === 0 ? 'fill-slate-300' : 'fill-primary'" />
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
        <SellIcon width="24px" height="24px" color="fill-primary" />
    </button>
</template>

<script setup>
import { ref } from "vue";
import Input from './Input.vue';
import CheckIcon from "../../icons/CheckIcon.vue";
import SellIcon from "../../icons/SellIcon.vue";
import { addingSpaces } from '../../../helpers/formating-values.js';

defineProps({
    inputId: {
        type: String,
        required: true,
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
    emit('sell', Number(price.value));
    hid();
};
</script>
