<script setup>
import { ref, toRef } from 'vue'
import Input from '../../plugins/Input.vue'
import ActionAdd from '../plugins/ActionAdd.vue'
import InfoField from '../../plugins/InfoField.vue'
import Modal from '../plugins/Modal.vue'
import {
    removingSpaces,
    addingSpaces,
} from '../../../helpers/formating-values.js'

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
})

const blank = toRef(props, 'blankProp')

const emit = defineEmits(['buy'])

const showModal = ref(false)
const whimsAndFanciesName = ref('')
const whimsAndFanciesPrice = ref('')
const buy = () => {
    if (blank.value.cash < Number(removingSpaces(whimsAndFanciesPrice.value))) {
        showModal.value = true
        whimsAndFanciesName.value = ''
        whimsAndFanciesPrice.value = ''
        return
    }

    emit(
        'buy',
        new Date().valueOf(),
        whimsAndFanciesName.value,
        Number(removingSpaces(whimsAndFanciesPrice.value))
    )
    whimsAndFanciesName.value = ''
    whimsAndFanciesPrice.value = ''
}
</script>

<template>
    <h2 class="px-4 text-center text-xl font-bold text-opposite">
        Капризи та примхи
    </h2>

    <div class="mt-2 flex items-center gap-3">
        <Input
            id="whim-and-fancies-name"
            v-model:value="whimsAndFanciesName"
            type="text"
            :max-length="15"
            placeholder="Назва"
            second-bg
        />
        <Input
            id="whim-and-fancies-price"
            v-model:value="whimsAndFanciesPrice"
            placeholder="Ціна"
            second-bg
        />
        <ActionAdd :first-value="whimsAndFanciesPrice" @add="buy" />
    </div>
    <ul v-if="blank.whimsAndFancies.length > 0" class="flex flex-col gap-2">
        <li v-for="{ id, name, price } in blank.whimsAndFancies" :key="id">
            <InfoField
                wrap-classes="gap-2"
                label-classes="text-opposite"
                :label="name.length > 0 ? `${name}:` : 'Капризи та примхи:'"
            >
                <span class="text-slate-400">
                    {{ addingSpaces(price) }}
                </span>
            </InfoField>
        </li>
    </ul>

    <Modal :show="showModal" cancel="Зрозумів" @cancel="showModal = false">
        <h4 class="mx-auto text-center text-2xl font-bold text-opposite">
            Це не можливо!
        </h4>
        <p class="mx-auto mt-4 text-center text-lg font-normal text-slate-400">
            Не поспішай. Все в тебе буде. Ти вже багатий. Піднакопи ще трохи і
            приходь.
        </p>
    </Modal>
</template>
