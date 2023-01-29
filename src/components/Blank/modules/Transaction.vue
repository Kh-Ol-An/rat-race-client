<script setup>
import { ref } from "vue";
import Input from '../../plugins/Input.vue';

defineProps({
    rich: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['decrement', 'increment']);

const transaction = ref('');
const decrement = () => {
    emit('decrement', Number(transaction.value));
    transaction.value = '';
};
const increment = () => {
    emit('increment', Number(transaction.value));
    transaction.value = '';
};
</script>

<template>
    <button
        class="
            py-2 px-24 md:px-10
            shadow hover:shadow-lg
            rounded-md
            bg-opposite
            text-xl text-slate-300 font-bold leading-none
            outline-0
            transition-all duration-300
        "
        type="button"
        title="Заплатити"
        @click="decrement"
    >
        &#8722;
    </button>
    <div class="relative w-full">
        <Input v-model:value="transaction" id="transaction" placeholder="Транзакція" />
        <button
            v-if="rich"
            class="absolute top-1/2 right-3 -translate-y-1/2 text-sm font-bold text-opposite"
            type="button"
            @click="$emit('tax')"
        >
            -10%
        </button>
    </div>
    <button
        class="
            py-2 px-24 md:px-10
            shadow hover:shadow-lg
            rounded-md
            bg-secondary
            text-xl text-slate-300 font-bold leading-none
            outline-0
            transition-all duration-300
        "
        type="button"
        title="Отримати"
        @click="increment"
    >
        &#43;
    </button>
</template>
