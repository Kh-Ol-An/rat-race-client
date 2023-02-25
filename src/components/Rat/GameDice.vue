<script setup>
defineProps({
    numberOnDice: {
        type: Number,
        required: true,
    },
})
</script>

<template>
    <button
        class="absolute top-1/2 left-1/2 z-10 h-12 w-12 -translate-y-1/2 -translate-x-1/2 rounded bg-gradient-to-b from-stone-200 to-stone-400 shadow-[0_0_6px_1px_rgb(255,255,255)_inset]"
        type="button"
        @click="$emit('rolling')"
    >
        <span
            v-if="
                numberOnDice === 1 || numberOnDice === 3 || numberOnDice === 5
            "
            class="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-stone-800"
        ></span>
        <span
            v-if="
                numberOnDice === 4 || numberOnDice === 5 || numberOnDice === 6
            "
            class="absolute top-3 left-3 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-stone-800"
        ></span>
        <span
            v-if="
                numberOnDice === 2 ||
                numberOnDice === 3 ||
                numberOnDice === 4 ||
                numberOnDice === 5 ||
                numberOnDice === 6
            "
            class="absolute top-3 left-9 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-stone-800"
        ></span>
        <span
            v-if="numberOnDice === 6"
            class="absolute top-1/2 left-3 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-stone-800"
        ></span>
        <span
            v-if="numberOnDice === 6"
            class="absolute top-1/2 left-9 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-stone-800"
        ></span>
        <span
            v-if="
                numberOnDice === 2 ||
                numberOnDice === 3 ||
                numberOnDice === 4 ||
                numberOnDice === 5 ||
                numberOnDice === 6
            "
            class="absolute top-9 left-3 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-stone-800"
        ></span>
        <span
            v-if="
                numberOnDice === 4 || numberOnDice === 5 || numberOnDice === 6
            "
            class="absolute top-9 left-9 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-stone-800"
        ></span>
    </button>
</template>
