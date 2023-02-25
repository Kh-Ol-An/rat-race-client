<script setup>
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
    quantity: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
})

const emit = defineEmits(['sell'])

const sell = (price) => emit('sell', props.id, props.quantity * price)
</script>

<template>
    <li class="relative grid grid-cols-12 items-center gap-2 pr-12">
        <div class="col-span-6 flex items-center justify-center">
            <ActionSell
                :value="addingSpaces(price)"
                input-id="sell-land"
                second-bg
                @sell="sell"
            >
                <span
                    class="col-span-5 whitespace-nowrap text-center text-slate-400"
                >
                    {{
                        addingSpaces(
                            Number.isInteger(price)
                                ? Math.round(price)
                                : `~${Math.round(price)}`
                        )
                    }}
                </span>
            </ActionSell>
        </div>

        <span class="col-span-3 whitespace-nowrap text-center text-slate-400">
            {{ addingSpaces(quantity) }}
        </span>

        <span class="col-span-3 whitespace-nowrap text-center text-slate-400">
            {{ addingSpaces(cost) }}
        </span>
    </li>
</template>
