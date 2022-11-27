<template>
    <button
        class="
            py-2 px-4
            w-full
            shadow hover:shadow-lg
            rounded-md
            bg-secondary text-white
            transition-all duration-300
        "
        type="submit"
        @click="save"
    >
        Зберегти
    </button>
</template>

<script setup>
const save = () => {
    console.log('save');
};
</script>
