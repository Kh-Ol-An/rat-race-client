<script setup>
import { ref } from 'vue'
import Modal from '../../plugins/Modal.vue'
import SellIcon from '../../../../assets/images/icons/SellIcon.vue'

defineProps({
    firstTitle: {
        type: String,
        required: true,
    },
    secondTitle: {
        type: String,
        required: true,
    },
    isSell: {
        type: Boolean,
        default: true,
    },
    confirmationModalText: {
        type: String,
        default: 'Ти підтверджуєш свою дію?',
    },
})

const emit = defineEmits(['sell'])

const showModal = ref(false)
const sell = () => {
    emit('sell')
    showModal.value = false
}
</script>

<template>
    <li
        class="relative grid grid-cols-5 items-center gap-2 pr-12 text-center font-bold text-primary"
    >
        <span class="col-span-2">
            {{ firstTitle }}
        </span>
        <span class="col-span-3">
            {{ secondTitle }}
        </span>
        <button
            v-if="isSell"
            class="absolute top-1/2 right-0 -translate-y-1/2 px-2 outline-0"
            type="button"
            title="Продати все"
            @click="showModal = true"
        >
            <SellIcon color="fill-primary" />
        </button>
        <Modal
            :show="showModal"
            confirm="Продати"
            @confirm="sell"
            @cancel="showModal = false"
        >
            <h4 class="mx-auto text-center text-2xl font-bold text-opposite">
                Увага!!!
            </h4>
            <p
                class="mx-auto mt-4 text-center text-lg font-normal text-slate-400"
            >
                {{ confirmationModalText }}
            </p>
        </Modal>
    </li>
</template>
