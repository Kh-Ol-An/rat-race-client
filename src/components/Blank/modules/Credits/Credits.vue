<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Виплати за кредитами</h2>
    <Input @add="add" />

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-800 text-center">
            На жаль кредит не схвалений службою безпеки банку. Нас не цікавить хто Ви і що робите. Нас хвилює як Ви будете віддавати наші гроші.
        </p>
    </Modal>

    <ul v-if="credits.length > 0">
        <li class="grid grid-cols-4 gap-2 border-b-2 border-b-silver-900 text-opposite font-bold">
            <span>
                Назва
            </span>
            <span>
                Загалом
            </span>
            <span>
                Платіж
            </span>
            <span>
                Термін
            </span>
        </li>
        <Info
            v-for="{ id, name, body, payment, quantity } in credits"
            :key="id"
            :name="name"
            :body="body"
            :payment="payment"
            :quantity="quantity"
        />
    </ul>
</template>

<script setup>
import { ref, toRef } from "vue";
import Input from './Input.vue';
import Info from './Info.vue';
import Modal from '../../plugins/Modal.vue';

const props = defineProps({
    credits: {
        type: Array,
        required: true,
    },
    cashFlow: {
        type: Number,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits(['add']);

const showModal = ref(false);

const add = (id, name, payment, quantity) => {
    if (props.cashFlow < payment) return showModal.value = true;
    emit('add', id, name, payment, quantity);
};
</script>
