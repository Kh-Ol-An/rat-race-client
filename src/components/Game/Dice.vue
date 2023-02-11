<script setup>
const props = defineProps({
    dice: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <button
        class="
            absolute
            top-1/2 left-1/2
            -translate-y-1/2 -translate-x-1/2
            w-12 h-12
            rounded
            bg-gradient-to-b from-stone-50 to-stone-400
            dice
        "
        type="button"
        @click="$emit('rolling')"
    >
        <span
            v-if="dice === 1 || dice === 3 || dice === 5"
            class="
               absolute
               top-1/2 left-1/2
               -translate-y-1/2 -translate-x-1/2
               w-2.5 h-2.5
               rounded-full
               bg-stone-800
            "
        ></span>
        <span
            v-if="dice === 4 || dice === 5 || dice === 6"
            class="
               absolute
               top-3 left-3
               -translate-y-1/2 -translate-x-1/2
               w-2.5 h-2.5
               rounded-full
               bg-stone-800
            "
        ></span>
        <span
            v-if="dice === 2 || dice === 3 || dice === 4 || dice === 5 || dice === 6"
            class="
               absolute
               top-3 left-9
               -translate-y-1/2 -translate-x-1/2
               w-2.5 h-2.5
               rounded-full
               bg-stone-800
            "
        ></span>
        <span
            v-if="dice === 6"
            class="
               absolute
               top-1/2 left-3
               -translate-y-1/2 -translate-x-1/2
               w-2.5 h-2.5
               rounded-full
               bg-stone-800
            "
        ></span>
        <span
            v-if="dice === 6"
            class="
               absolute
               top-1/2 left-9
               -translate-y-1/2 -translate-x-1/2
               w-2.5 h-2.5
               rounded-full
               bg-stone-800
            "
        ></span>
        <span
            v-if="dice === 2 || dice === 3 || dice === 4 || dice === 5 || dice === 6"
            class="
               absolute
               top-9 left-3
               -translate-y-1/2 -translate-x-1/2
               w-2.5 h-2.5
               rounded-full
               bg-stone-800
            "
        ></span>
        <span
            v-if="dice === 4 || dice === 5 || dice === 6"
            class="
               absolute
               top-9 left-9
               -translate-y-1/2 -translate-x-1/2
               w-2.5 h-2.5
               rounded-full
               bg-stone-800
            "
        ></span>
    </button>
</template>

<style scoped>
.dice {
    box-shadow: 0 0 6px 1px rgb(0, 0, 0, 0.9) inset;
}
</style>
