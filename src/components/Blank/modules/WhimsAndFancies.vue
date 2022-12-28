<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Капризи та примхи</h2>

    <div class="mt-2 flex items-center gap-3">
        <Input v-model:value="price" id="whim-and-fancies" placeholder="Ціна" secondBg />
        <Add :firstValue="price" @add="buy" />
    </div>
    <InfoField
        v-if="user.whimsAndFancies > 0"
        wrapClasses="gap-2"
        labelClasses="text-opposite"
        label="Капризи та примхи:"
    >
        <span class="text-slate-800">
            {{ user.whimsAndFancies }}
        </span>
    </InfoField>

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-800 text-center">
            Не поспішай. Все в тебе буде. Ти вже багатий. Піднакопи ще трохи і приходь.
        </p>
    </Modal>
</template>

<script setup>
import { ref, toRef } from "vue";
import Input from '../plugins/Input.vue';
import Add from '../plugins/Add.vue';
import InfoField from '../plugins/InfoField.vue';
import Modal from '../plugins/Modal.vue';

const props = defineProps({
    userProp: {
        type: Number,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([ 'buy' ]);

const showModal = ref(false);
const price = ref('');
const buy = () => {
    if (user.value.cash < Number(price.value)) {
        showModal.value = true;
        return price.value = '';
    }

    emit('buy', Number(price.value));
    price.value = '';
};
</script>
