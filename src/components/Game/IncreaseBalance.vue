<script setup>
import InfoField from '../plugins/InfoField.vue'
import MaleIcon from '../../assets/images/icons/MaleIcon.vue'
import FemaleIcon from '../../assets/images/icons/FemaleIcon.vue'
import { addingSpaces } from '../../helpers/formating-values.js'

defineProps({
    left: {
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
    passiveIncome: {
        type: Number,
        default: null,
    },
    cashFlow: {
        type: Number,
        default: null,
    },
})

defineEmits(['choice:gender'])
</script>

<template>
    <div
        :style="{ left, width, height }"
        class="absolute top-1/2 -translate-y-1/2"
    >
        <button
            v-if="user.gender.length === 0"
            class="flex h-full w-full items-center justify-end"
            type="button"
            @click="$emit('choice:gender')"
        >
            <MaleIcon width="50%" height="37.5%" />
        </button>
        <div v-else class="p-4 shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
            <div class="flex items-center gap-3">
                <InfoField label-classes="text-slate-500" label="Ім'я:">
                    <span class="ml-2 text-slate-400">
                        {{ user.name || 'Безіменько' }}
                    </span>
                </InfoField>
                <InfoField label-classes="mr-2 text-slate-500" label="Стать:">
                    <MaleIcon
                        v-if="user.gender === 'male'"
                        width="24px"
                        height="24px"
                    />
                    <FemaleIcon
                        v-if="user.gender === 'female'"
                        width="24px"
                        height="24px"
                    />
                </InfoField>
            </div>
            <InfoField label-classes="text-slate-500" label="Професія:">
                <span class="ml-2 text-slate-400">
                    {{ user.profession }}
                </span>
            </InfoField>
            <InfoField label-classes="text-lg font-bold text-primary" label="Готівка:">
                <span class="ml-2 text-lg font-bold text-slate-400">
                    {{ addingSpaces(user.cash) }}
                </span>
            </InfoField>
            <InfoField label-classes="text-primary" label="Активний дохід:">
                <span class="ml-2 text-slate-400">
                    {{ addingSpaces(user.salary) }}
                </span>
            </InfoField>
            <InfoField v-if="passiveIncome > 0" label-classes="text-primary" label="Пасивний дохід:">
                <span class="ml-2 text-slate-400">
                    {{ addingSpaces(passiveIncome) }}
                </span>
            </InfoField>
            <div class="my-2 w-full h-px bg-slate-400"></div>
            <InfoField label-classes="text-primary" label="Грошовий потік:">
                <span class="ml-2 text-slate-400">
                    {{ addingSpaces(cashFlow) }}
                </span>
            </InfoField>
        </div>
    </div>
</template>
