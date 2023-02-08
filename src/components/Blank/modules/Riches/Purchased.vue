<script setup>
import InfoField from '../../plugins/InfoField.vue';
import SellIcon from "../../../../assets/images/icons/SellIcon.vue";
import { addingSpaces } from '../../../../helpers/formating-values.js';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
});

const emit = defineEmits([ 'sell' ]);

const sell = () => emit('sell', props.id);
</script>

<template>
    <li class="relative pr-12 flex items-center gap-2">
        <InfoField wrapClasses="gap-2" labelClasses="text-primary" :label="label">
            <span class="text-slate-400">
                {{ addingSpaces(price) }}
            </span>
        </InfoField>

        <button
            class="
                absolute
                top-1/2 right-0
                -translate-y-1/2
                px-2
                outline-0
            "
            type="button"
            title="Продати"
            @click="sell"
        >
            <SellIcon width="24px" height="24px" color="fill-primary" />
        </button>
    </li>
</template>
