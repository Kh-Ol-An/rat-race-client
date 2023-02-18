<script setup>
import { ref, toRef } from "vue";
import Input from '../../plugins/Input.vue';
import Add from '../plugins/Add.vue';
import InfoField from '../../plugins/InfoField.vue';
import Modal from '../plugins/Modal.vue';
import { removingSpaces, addingSpaces } from '../../../helpers/formating-values.js';

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
});

const blank = toRef(props, 'blankProp');

const emit = defineEmits([ 'buy' ]);

const showModal = ref(false);
const name = ref('');
const price = ref('');
const buy = () => {
    if (blank.value.cash < Number(removingSpaces(price.value))) {
        showModal.value = true;
        name.value = '';
        price.value = '';
        return;
    }

    emit('buy', name.value, Number(removingSpaces(price.value)));
    name.value = '';
    price.value = '';
};
</script>

<template>
    <h2 class="px-4 text-xl font-bold text-opposite text-center">Капризи та примхи</h2>

    <div class="mt-2 flex items-center gap-3">
        <Input v-model:value="name" id="whim-and-fancies-name" type="text" :maxLength="15" placeholder="Назва" />
        <Input v-model:value="price" id="whim-and-fancies-price" placeholder="Ціна" />
        <Add :firstValue="price" @add="buy" />
    </div>
    <ul v-if="blank.whimsAndFancies.length > 0" class="flex flex-col gap-2">
        <li v-for="{ name, price } in blank.whimsAndFancies">
            <InfoField
                wrapClasses="gap-2"
                labelClasses="text-opposite"
                :label="name.length > 0 ? `${name}:` : 'Капризи та примхи:'"
            >
                <span class="text-slate-400">
                    {{ addingSpaces(price) }}
                </span>
            </InfoField>
        </li>
    </ul>

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
            Не поспішай. Все в тебе буде. Ти вже багатий. Піднакопи ще трохи і приходь.
        </p>
    </Modal>
</template>
