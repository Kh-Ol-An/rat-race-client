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
        @click="reset"
    >
        <ResetIcon width="30px" height="30px" />
    </button>

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
import ResetIcon from '../icons/ResetIcon.vue';
import SaveIcon from '../icons/SaveIcon.vue';

const reset = () => {
    localStorage.removeItem('user');
    location.reload();
};
</script>
