<script setup>
import { ref } from 'vue'
import Modal from '../plugins/Modal.vue'
import ReturnIcon from '../../../assets/images/icons/ReturnIcon.vue'
import ResetIcon from '../../../assets/images/icons/ResetIcon.vue'

defineProps({
    historyBlank: {
        type: Array,
        required: true,
    },
    historyPeriod: {
        type: Number,
        required: true,
    },
})

defineEmits(['back', 'forward', 'restart'])

const showModal = ref(false)
</script>

<template>
    <Transition>
        <div v-if="historyBlank.length > 0" class="flex items-center gap-3">
            <Transition>
                <button
                    v-if="historyPeriod !== 0"
                    class="fixed left-10 bottom-10 flex items-center justify-center rounded-full bg-gradient-to-b from-secondaryLight to-secondary p-4 shadow outline-0 transition-all duration-300 hover:shadow-lg md:static md:w-full md:rounded-md"
                    type="button"
                    title="Хід назад"
                    @click="$emit('back')"
                >
                    <ReturnIcon
                        width="30px"
                        height="30px"
                        color="fill-slate-300"
                    />
                </button>
            </Transition>
            <Transition>
                <button
                    v-if="historyPeriod !== historyBlank.length - 1"
                    class="fixed left-28 bottom-10 flex -scale-x-100 items-center justify-center rounded-full bg-gradient-to-b from-secondaryLight to-secondary p-4 shadow outline-0 transition-all duration-300 hover:shadow-lg md:static md:w-full md:rounded-md"
                    type="button"
                    title="Хід вперед"
                    @click="$emit('forward')"
                >
                    <ReturnIcon
                        width="30px"
                        height="30px"
                        color="fill-slate-300"
                    />
                </button>
            </Transition>
        </div>
    </Transition>

    <button
        class="fixed right-10 bottom-10 flex items-center justify-center rounded-full bg-gradient-to-b from-oppositeLight to-opposite p-4 shadow outline-0 transition-all duration-300 hover:shadow-lg md:static md:w-full md:rounded-md"
        type="button"
        title="Почати спочатку"
        @click="showModal = true"
    >
        <ResetIcon width="30px" height="30px" color="fill-slate-300" />
    </button>
    <Modal
        :show="showModal"
        confirm="Видалити"
        @confirm="$emit('restart')"
        @cancel="showModal = false"
    >
        <h4 class="mx-auto text-center text-2xl font-bold text-opposite">
            Увага!!!
        </h4>
        <p class="mx-auto mt-4 text-center text-lg font-normal text-slate-400">
            Якщо ти тицьнеш 'Видалити', тебе вже нічого не врятує... Усі ті
            циферки які ти так довго вводив, зникнуть. І навіть найголовніший
            розробник не зможе їх повернути.
        </p>
    </Modal>
</template>
