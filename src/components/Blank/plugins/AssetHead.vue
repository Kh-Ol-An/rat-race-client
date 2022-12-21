<template>
    <li :class="[
        'relative pr-12 grid gap-2 text-secondary font-bold text-center',
        thirdTitle.length > 0 ? 'grid-cols-10' : 'grid-cols-6',
    ]">
        <span class="col-span-3">
            {{ firstTitle }}
        </span>
        <span class="col-span-3">
            {{ secondTitle }}
        </span>
        <span v-if="thirdTitle.length > 0" class="col-span-4">
            {{ thirdTitle }}
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
        <ConfirmationModal
            :show="showModal"
            :text="confirmationModalText"
            confirm="Продати"
            @confirm="sell"
            @cansel="showModal = false"
        />
    </li>
</template>

<script setup>
import { ref } from "vue";
import ConfirmationModal from './ConfirmationModal.vue';
import SellIcon from "../../icons/SellIcon.vue";

defineProps({
    firstTitle: {
        type: String,
        required: true,
    },
    secondTitle: {
        type: String,
        required: true,
    },
    thirdTitle: {
        type: String,
        default: '',
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
