<script setup>
import { ref } from 'vue'
import Input from '../../plugins/Input.vue'
import { removingSpaces } from '../../../helpers/formating-values.js'

defineProps({
    rich: {
        type: Boolean,
        required: true,
    },
})

const emit = defineEmits(['decrement', 'tax', 'increment'])

const transaction = ref('')
const decrement = () => {
    emit('decrement', Number(removingSpaces(transaction.value)))
    transaction.value = ''
}
const increment = () => {
    emit('increment', Number(removingSpaces(transaction.value)))
    transaction.value = ''
}
</script>

<template>
    <button
        class="rounded-md bg-gradient-to-b from-oppositeLight to-opposite py-2 px-24 text-xl font-bold leading-none text-slate-300 shadow outline-0 transition-all duration-300 hover:shadow-lg md:px-10"
        type="button"
        title="Заплатити"
        @click="decrement"
    >
        &#8722;
    </button>
    <div class="relative w-full">
        <Input
            id="transaction"
            v-model:value="transaction"
            placeholder="Транзакція"
        />
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
        class="rounded-md bg-gradient-to-b from-secondaryLight to-secondary py-2 px-24 text-xl font-bold leading-none text-slate-300 shadow outline-0 transition-all duration-300 hover:shadow-lg md:px-10"
        type="button"
        title="Отримати"
        @click="increment"
    >
        &#43;
    </button>
</template>
