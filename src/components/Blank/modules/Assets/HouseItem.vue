<script setup>
import InfoField from '../../../plugins/InfoField.vue'
import ActionSell from '../../plugins/ActionSell.vue'
import { addingSpaces } from '../../../../helpers/formating-values.js'

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

const emit = defineEmits(['sell'])

const sell = (price) => emit('sell', price, props.id)
</script>

<template>
    <li class="relative flex items-center gap-2 pr-12">
        <InfoField
            wrap-classes="gap-2"
            label-classes="text-primary"
            label="Будинок:"
        >
            <ActionSell
                :value="addingSpaces(price)"
                input-id="sell-price-house"
                second-bg
                @sell="sell"
            >
                <span class="ml-2 text-slate-400">
                    {{ addingSpaces(price) }}
                </span>
            </ActionSell>
        </InfoField>
    </li>
</template>
