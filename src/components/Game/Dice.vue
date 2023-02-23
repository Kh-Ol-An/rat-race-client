<script setup>
import { ref } from 'vue';
import sleep from '../../helpers/sleep.js';
import randomInteger from '../../helpers/random-integer.js';

const emit = defineEmits([ 'rolling' ]);

const numberOnDice = ref(6);
const animationDice = async () => {
    numberOnDice.value = randomInteger();
    await sleep(50);
    numberOnDice.value = randomInteger();
    await sleep(100);
    numberOnDice.value = randomInteger();
    await sleep(150);
    numberOnDice.value = randomInteger();
    await sleep(200);
    numberOnDice.value = randomInteger();
    await sleep(250);
    numberOnDice.value = randomInteger();
    await sleep(300);
    numberOnDice.value = randomInteger();
    await sleep(350);
    numberOnDice.value = randomInteger();
    await sleep(400);
    numberOnDice.value = randomInteger();
    await sleep(470);
};
const rollingDice = async () => {
    // await animationDice();
    numberOnDice.value = randomInteger();
    return emit('rolling', numberOnDice.value);
};
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
        @click="rollingDice"
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
