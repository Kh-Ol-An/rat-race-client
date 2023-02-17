<script setup>
import MaleIcon from '../../assets/images/icons/MaleIcon.vue';

defineProps({
    left: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    user: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div
        :style="{ left, width, height }"
        class="absolute top-1/2 -translate-y-1/2 p-4 flex items-center justify-center"
    >
        <button
            v-if="user.gender.length === 0"
            class="w-1/2 h-1/2"
            type="button"
            @click="$emit('choice:gender')"
        >
            <MaleIcon width="100%" height="100%" />
        </button>
        <p v-else>{{ user }}</p>
    </div>
</template>
