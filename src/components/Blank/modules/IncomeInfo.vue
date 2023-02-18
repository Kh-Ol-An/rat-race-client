<script setup>
import { ref } from 'vue';
import InfoField from '../../plugins/InfoField.vue';
import Modal from '../plugins/Modal.vue';
import { addingSpaces } from '../../../helpers/formating-values.js';

const props = defineProps({
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
});

const showModal = ref(false);
</script>

<template>
    <InfoField labelClasses="text-primary" label="Готівка:">
        <span class="ml-2 text-lg font-bold text-slate-200">
            {{ addingSpaces(blank.cash) }}
        </span>
    </InfoField>

    <InfoField labelClasses="text-primary" label="Активний дохід:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.salary) }}
        </span>
    </InfoField>

    <InfoField labelClasses="text-primary" label="Пасивний дохід:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(passiveIncome) }}
        </span>
    </InfoField>

    <InfoField labelClasses="text-primary" label="Загальний дохід:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(income) }}
        </span>
    </InfoField>

    <InfoField v-if="blank.deputies" labelClasses="text-primary" label="Кількість депутатів:">
        <span class="ml-2 text-slate-400">
            {{ addingSpaces(blank.deputies) }}
        </span>
        <button
            class="rotate-45 ml-4 px-2 text-3xl text-opposite font-bold leading-none outline-0"
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
            <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
                Увага!!!
            </h4>
            <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
                Ти впевнений що хочешь видалити всіх своїх депутатів?
            </p>
        </Modal>
    </InfoField>
</template>
