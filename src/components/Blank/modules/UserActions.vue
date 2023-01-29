<script setup>
import { ref } from 'vue';
import Modal from '../plugins/Modal.vue';
import ResetIcon from '../../icons/ResetIcon.vue';
import SaveIcon from '../../icons/SaveIcon.vue';

const showModal = ref(false);

const saveInterval = ref(true);
setTimeout(() => saveInterval.value = false, 1000 * 5);
</script>

<template>
    <button
        class="
            fixed md:static
            right-10 bottom-10
            p-4
            flex items-center justify-center
            md:w-full
            shadow hover:shadow-lg
            rounded-full md:rounded-md
            bg-secondary
            outline-0
            transition-all duration-300
        "
        type="submit"
        title="Зберегти"
    >
        <SaveIcon width="30px" height="30px" color="fill-slate-300" />
    </button>

    <transition>
        <button
            v-if="!saveInterval"
            class="
                fixed md:static
                left-10 bottom-10
                p-4
                flex items-center justify-center
                md:w-full
                shadow hover:shadow-lg
                rounded-full md:rounded-md
                bg-opposite
                outline-0
                transition-all duration-300
            "
            type="button"
            title="Почати спочатку"
            @click="showModal = true"
        >
            <ResetIcon width="30px" height="30px" color="fill-slate-300" />
        </button>
    </transition>
    <Modal
        :show="showModal"
        confirm="Видалити"
        @confirm="$emit('restart')"
        @cancel="showModal = false"
    >
        <h4 class="mx-auto text-2xl font-bold text-opposite text-center">
            Увага!!!
        </h4>
        <p class="mx-auto mt-4 text-lg font-normal text-slate-400 text-center">
            Якщо ти тицьнеш 'Видалити', тебе вже нічого не врятує... Усі ті циферки які ти так довго вводив, зникнуть. І навіть найголовніший розробник не зможе їх повернути.
        </p>
    </Modal>

    <transition>
        <button
            v-if="saveInterval"
            class="
                fixed md:static
                left-10 bottom-10
                p-4
                flex items-center justify-center
                md:w-full
                shadow hover:shadow-lg
                rounded-full md:rounded-md
                bg-opposite
                outline-0
                transition-all duration-300
            "
            type="button"
            title="Вимкнути зберігання"
            @click="$emit('disable:submit')"
        >
            <SaveIcon width="30px" height="30px" color="fill-slate-300" />
        </button>
    </transition>
</template>
