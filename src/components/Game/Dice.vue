<script setup>
defineProps({
    numberOnDice: {
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
            z-10
            -translate-y-1/2 -translate-x-1/2
            w-12 h-12
            rounded
            bg-gradient-to-b from-stone-200 to-stone-400
            shadow-[0_0_4px_1px_rgb(50,50,50)_inset]
        "
        type="button"
        @click="$emit('rolling')"
    >
        <Transition>
            <span
                v-if="numberOnDice === 1 || numberOnDice === 3 || numberOnDice === 5"
                class="
                   absolute
                   top-1/2 left-1/2
                   -translate-y-1/2 -translate-x-1/2
                   w-2.5 h-2.5
                   rounded-full
                   bg-stone-800
                "
            ></span>
        </Transition>
        <Transition>
            <span
                v-if="numberOnDice === 4 || numberOnDice === 5 || numberOnDice === 6"
                class="
                   absolute
                   top-3 left-3
                   -translate-y-1/2 -translate-x-1/2
                   w-2.5 h-2.5
                   rounded-full
                   bg-stone-800
                "
            ></span>
        </Transition>
        <Transition>
            <span
                v-if="numberOnDice === 2 || numberOnDice === 3 || numberOnDice === 4 || numberOnDice === 5 || numberOnDice === 6"
                class="
                   absolute
                   top-3 left-9
                   -translate-y-1/2 -translate-x-1/2
                   w-2.5 h-2.5
                   rounded-full
                   bg-stone-800
                "
            ></span>
        </Transition>
        <Transition>
            <span
                v-if="numberOnDice === 6"
                class="
                   absolute
                   top-1/2 left-3
                   -translate-y-1/2 -translate-x-1/2
                   w-2.5 h-2.5
                   rounded-full
                   bg-stone-800
                "
            ></span>
        </Transition>
        <Transition>
            <span
                v-if="numberOnDice === 6"
                class="
                   absolute
                   top-1/2 left-9
                   -translate-y-1/2 -translate-x-1/2
                   w-2.5 h-2.5
                   rounded-full
                   bg-stone-800
                "
            ></span>
        </Transition>
        <Transition>
            <span
                v-if="numberOnDice === 2 || numberOnDice === 3 || numberOnDice === 4 || numberOnDice === 5 || numberOnDice === 6"
                class="
                   absolute
                   top-9 left-3
                   -translate-y-1/2 -translate-x-1/2
                   w-2.5 h-2.5
                   rounded-full
                   bg-stone-800
                "
            ></span>
        </Transition>
        <Transition>
            <span
                v-if="numberOnDice === 4 || numberOnDice === 5 || numberOnDice === 6"
                class="
                   absolute
                   top-9 left-9
                   -translate-y-1/2 -translate-x-1/2
                   w-2.5 h-2.5
                   rounded-full
                   bg-stone-800
                "
            ></span>
        </Transition>
    </button>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 50ms ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
