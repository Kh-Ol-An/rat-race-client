<script setup>
import { ref } from 'vue'
import InfoField from '../../plugins/InfoField.vue'
import Modal from '../plugins/Modal.vue'
import { addingSpaces } from '../../../helpers/formating-values.js'

defineProps({
    blank: {
        type: Object,
        required: true,
    },
    passiveIncome: {
        type: Number,
        required: true,
    },
    income: {
        type: Number,
        required: true,
    },
})

defineEmits(['remove:deputies'])

const showModal = ref(false)
</script>

<template>
    <InfoField label-classes="text-primary" label="Готівка:">
        <span class="ml-2 text-lg font-bold text-slate-200">
            {{ addingSpaces(blank.cash) }}
        </span>
    </InfoField>

    <InfoField label-classes="text-primary" label="Активний дохід:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.salary) }}
        </span>
    </InfoField>

    <InfoField label-classes="text-primary" label="Пасивний дохід:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(passiveIncome) }}
        </span>
    </InfoField>

    <InfoField label-classes="text-primary" label="Загальний дохід:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(income) }}
        </span>
    </InfoField>

    <InfoField
        v-if="blank.deputies"
        label-classes="text-primary"
        label="Кількість депутатів:"
    >
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.deputies) }}
        </span>
        <button
            class="ml-4 rotate-45 px-2 text-3xl font-bold leading-none text-opposite outline-0"
            type="button"
            title="Вибори :)"
            @click="showModal = true"
        >
            &#43;
        </button>

        <Modal
            :show="showModal"
            confirm="Видалити"
            @confirm="$emit('remove:deputies')"
            @cancel="showModal = false"
        >
            <h4 class="mx-auto text-center text-2xl font-bold text-opposite">
                Увага!!!
            </h4>
            <p
                class="mx-auto mt-4 text-center text-lg font-normal text-slate-400"
            >
                Ти впевнений що хочешь видалити всіх своїх депутатів?
            </p>
        </Modal>
    </InfoField>
</template>
