<template>
    <li :class="[
        'relative pr-20 grid gap-2 text-secondary font-bold text-center',
        thirdTitle.length > 0 ? 'grid-cols-3' : 'grid-cols-2',
    ]">
        <span>
            {{ firstTitle }}
        </span>
        <span>
            {{ secondTitle }}
        </span>
        <span v-if="thirdTitle.length > 0">
            {{ thirdTitle }}
        </span>
        <button
            class="
                absolute
                top-1/2 right-0
                -translate-y-1/2
                px-2
            "
            type="button"
            title="Продати все"
            @click="showModal = true"
        >
            <SellIcon width="24px" height="24px" color="fill-primary" />
        </button>
        <ConfirmationModal
            :show="showModal"
            text="Ти впевнений шо хочешь видалити останній відкритий бізнес?"
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
});

const emit = defineEmits([ 'sell' ]);

const showModal = ref(false);
const sell = () => {
    emit('sell');
    showModal.value = false;
};
</script>
