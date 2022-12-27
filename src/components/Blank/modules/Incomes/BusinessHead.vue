<template>
    <li class="relative pr-12 grid grid-cols-5 items-center gap-2 text-primary font-bold text-center">
        <span class="col-span-2">
            {{ firstTitle }}
        </span>
        <span class="col-span-3">
            {{ secondTitle }}
        </span>
        <button
            v-if="isSell"
            class="
                absolute
                top-1/2 right-0
                -translate-y-1/2
                px-2
                outline-0
            "
            type="button"
            title="Продати все"
            @click="showModal = true"
        >
            <SellIcon width="24px" height="24px" color="fill-primary" />
        </button>
        <Modal
            :show="showModal"
            confirm="Продати"
            @confirm="sell"
            @cancel="showModal = false"
        >
            <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
                Увага!!!
            </h4>
            <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
                {{ confirmationModalText }}
            </p>
        </Modal>
    </li>
</template>

<script setup>
import { ref } from "vue";
import Modal from '../../plugins/Modal.vue';
import SellIcon from "../../../icons/SellIcon.vue";

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
});

const emit = defineEmits([ 'sell' ]);

const showModal = ref(false);
const sell = () => {
    emit('sell');
    showModal.value = false;
};
</script>
