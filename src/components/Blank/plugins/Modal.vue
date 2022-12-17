<template>
    <transition>
        <div v-if="show" class="fixed top-0 right-0 bottom-0 left-0 z-40 flex items-center justify-center">
            <div class="absolute w-full h-full bg-black opacity-60" @click="$emit('cansel')"></div>

            <div class="relative z-50 py-4 px-6 max-w-lg shadow-lg rounded-2xl bg-white">
                <button
                    class="
                    absolute
                    top-4 right-4
                    rotate-45
                    px-2
                    text-3xl text-slate-800 font-bold leading-none
                "
                    type="button"
                    title="Банкротство"
                    @click="$emit('cansel')"
                >
                    &#43;
                </button>

                <slot></slot>

                <div class="mt-4 flex items-center justify-center gap-6">
                    <button
                        class="p-2 text-lg text-opposite font-bold outline-0"
                        type="button"
                        :title="confirm"
                        @click="$emit('confirm')"
                    >
                        {{ confirm }}
                    </button>
                    <button
                        class="p-2 text-lg text-primary font-bold outline-0"
                        type="button"
                        :title="cansel"
                        @click="$emit('cansel')"
                    >
                        {{ cansel }}
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { watch } from "vue";

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    confirm: {
        type: String,
        default: 'Так',
    },
    cansel: {
        type: String,
        default: 'Ні',
    },
});

const emit = defineEmits([ 'cansel' ]);

const escapeHandler = (e) => e.key === 'Escape' && emit('cansel');

watch(
    () => props.show,
    () =>
        props.show
            ? document.addEventListener('keyup', escapeHandler)
            : document.removeEventListener('keyup', escapeHandler),
);
</script>
