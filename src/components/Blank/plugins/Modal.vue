<script setup>
import { watch } from 'vue'

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    confirm: {
        type: String,
        default: '',
    },
    cancel: {
        type: String,
        default: 'Ні',
    },
    onlyCancelAction: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['cancel', 'confirm'])

const escapeHandler = (e) => e.key === 'Escape' && emit('cancel')

watch(
    () => props.show,
    () =>
        props.show && !props.onlyCancelAction
            ? document.addEventListener('keyup', escapeHandler)
            : document.removeEventListener('keyup', escapeHandler)
)
</script>

<template>
    <Transition>
        <div
            v-if="show"
            class="fixed top-0 right-0 bottom-0 left-0 z-40 flex items-center justify-center"
        >
            <div
                class="absolute h-full w-full bg-black opacity-60"
                @click="!onlyCancelAction && $emit('cancel')"
            ></div>

            <div
                class="relative z-50 max-w-lg rounded-2xl bg-slate-800 py-4 px-6 shadow-lg"
            >
                <button
                    v-if="!onlyCancelAction"
                    class="absolute top-4 right-4 rotate-45 px-2 text-3xl font-bold leading-none text-slate-800 outline-0"
                    type="button"
                    title="Банкротство"
                    @click="$emit('cancel')"
                >
                    &#43;
                </button>

                <slot></slot>

                <div class="mt-4 flex items-center justify-center gap-6">
                    <button
                        v-if="confirm.length > 0"
                        class="p-2 text-lg font-bold text-opposite outline-0"
                        type="button"
                        :title="confirm"
                        @click="$emit('confirm')"
                    >
                        {{ confirm }}
                    </button>
                    <button
                        class="p-2 text-lg font-bold text-primary outline-0"
                        type="button"
                        :title="cancel"
                        @click="$emit('cancel')"
                    >
                        {{ cancel }}
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>
