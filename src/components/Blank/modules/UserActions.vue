<template>
    <button
        class="
            fixed md:static
            right-10 bottom-10
            p-4
            flex items-center justify-center
            shadow hover:shadow-lg
            rounded-full md:rounded-md
            bg-secondary
            outline-0
            transition-all duration-300
        "
        type="submit"
        title="Зберегти"
    >
        <SaveIcon width="30px" height="30px" color="fill-white" />
    </button>

    <transition>
        <button
            v-if="isSavedUser && !saveInterval"
            class="
                fixed md:static
                left-10 bottom-10
                p-4
                flex items-center justify-center
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
            <ResetIcon width="30px" height="30px" />
        </button>
    </transition>
    <ConfirmationModal
        :show="showModal"
        text="
            Якщо ти тицьнеш 'Видалити', тебе вже нічого не врятує...
            Усі ті циферки які ти так довго вводив, зникнуть.
            І навіть найголовніший розробник не зможе їх повернути.
        "
        @confirm="reset"
        @cancel="showModal = false"
    />

    <transition>
        <button
            v-if="saveInterval"
            class="
                fixed md:static
                left-10 bottom-10
                p-4
                flex items-center justify-center
                shadow hover:shadow-lg
                rounded-full md:rounded-md
                bg-opposite
                outline-0
                transition-all duration-300
            "
            type="button"
            title="Вимкнути зберігання"
            @click="$emit('disable:storage')"
        >
            <SaveIcon width="30px" height="30px" color="fill-white" />
        </button>
    </transition>
</template>

<script setup>
import { ref } from 'vue';
import ConfirmationModal from '../plugins/ConfirmationModal.vue';
import ResetIcon from '../../icons/ResetIcon.vue';
import SaveIcon from '../../icons/SaveIcon.vue';

defineProps({
    isSavedUser: {
        type: Boolean,
        required: true,
    },
});

const showModal = ref(false);

const saveInterval = ref(true);
setInterval(() => saveInterval.value = false, 5000);

const reset = () => {
    localStorage.removeItem('user');
    location.reload();
};
</script>
