<script setup>
import InfoField from '../plugins/InfoField.vue'
import FemaleIcon from '../../assets/images/icons/FemaleIcon.vue'

defineProps({
    right: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    user: {
        type: Object,
        required: true,
    },
    expenses: {
        type: Number,
        required: true,
    },
})

defineEmits(['choice:gender'])
</script>

<template>
    <div
        :style="{ right, width, height }"
        class="absolute top-1/2 -translate-y-1/2"
    >
        <button
            v-if="user.gender.length === 0"
            class="flex h-full w-full items-center"
            type="button"
            @click="$emit('choice:gender')"
        >
            <FemaleIcon width="50%" height="37.5%" />
        </button>
        <div v-else class="p-4 shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
            <InfoField label-classes="text-opposite" label="Оренда житла:">
                <span class="ml-2 text-slate-400">
                    {{ user.rent }}
                </span>
            </InfoField>
            <InfoField
                label-classes="text-opposite"
                label="Витрати на харчування:"
            >
                <span class="ml-2 text-slate-400">
                    {{ user.food }}
                </span>
            </InfoField>
            <InfoField label-classes="text-opposite" label="Витрати на одяг:">
                <span class="ml-2 text-slate-400">
                    {{ user.clothes }}
                </span>
            </InfoField>
            <InfoField label-classes="text-opposite" label="Витрати на проїзд:">
                <span class="ml-2 text-slate-400">
                    {{ user.fare }}
                </span>
            </InfoField>
            <InfoField
                label-classes="text-opposite"
                label="Комунальні платежі:"
            >
                <span class="ml-2 text-slate-400">
                    {{ user.utilities }}
                </span>
            </InfoField>
            <div class="my-2 w-full h-px bg-slate-400"></div>
            <InfoField label-classes="text-opposite" label="Загальні витрати:">
                <span class="ml-2 text-slate-400">
                    {{ expenses }}
                </span>
            </InfoField>
        </div>
    </div>
</template>
