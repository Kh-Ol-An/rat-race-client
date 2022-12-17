<template>
    <button
        class="
            fixed left-10 bottom-10
            p-4
            shadow hover:shadow-lg
            rounded-full
            bg-opposite
            outline-0
            transition-all duration-300
        "
        type="button"
        title="Почати спочатку"
        @click="showModal = true"
    >
        <ResetIcon width="30px" height="30px" />
    </button>
    <ConfirmationModal
        :show="showModal"
        text="
            Якщо ти тицнешь 'Видалити', тебе вже нічого не врятує...
            Усі ті циферки які ти так довго вводив, зникнуть.
            І навіть самий головний розробник не зможе їх повернути.
        "
        @confirm="reset"
        @cansel="showModal = false"
    />

    <button
        class="
            fixed right-10 bottom-10
            p-4
            shadow hover:shadow-lg
            rounded-full
            bg-secondary
            outline-0
            transition-all duration-300
        "
        type="submit"
        title="Зберегти"
    >
        <SaveIcon width="30px" height="30px" color="fill-white" />
    </button>
</template>

<script setup>
import { ref } from 'vue';
import ConfirmationModal from '../plugins/ConfirmationModal.vue';
import ResetIcon from '../../icons/ResetIcon.vue';
import SaveIcon from '../../icons/SaveIcon.vue';

const showModal = ref(false);

const reset = () => {
    localStorage.removeItem('user');
    location.reload();
};
</script>
