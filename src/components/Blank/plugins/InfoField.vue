<template>
    <div :class="['flex items-center', wrapClasses]">
        <span :class="labelClasses">
            {{ label }}
        </span>

        <slot></slot>

        <div v-if="dismissal">
            <button
                class="ml-4 outline-0"
                type="button"
                title="Звільнили"
                @click="$emit('fired')"
            >
                Звільнили
            </button>
            <button
                class="ml-4 outline-0"
                type="button"
                title="Звільнився"
                @click="$emit('quit')"
            >
                Звільнився
            </button>
        </div>

        <button
            v-if="getting"
            class="ml-4 outline-0"
            type="button"
            title="Отримати"
            @click="$emit('get')"
        >
            <MoneyIcon width="30px" height="30px" />
        </button>
    </div>
</template>

<script setup>
import MoneyIcon from '../../icons/MoneyIcon.vue';

defineProps({
    wrapClasses: {
        type: String,
        default: '',
    },
    labelClasses: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        required: true,
    },
    dismissal: {
        type: Boolean,
        default: false,
    },
    getting: {
        type: Boolean,
        default: false,
    },
});
</script>