<template>
    <li :class="[
        'grid gap-2 text-secondary font-bold text-center',
        thirdTitle.length > 0 ? 'grid-cols-3' : 'grid-cols-2',
    ]">
        <span>
            {{ firstTitle }}
        </span>
        <span class="pr-8">
            {{ secondTitle }}
        </span>
        <span v-if="thirdTitle.length > 0" class="pr-8">
            {{ thirdTitle }}
        </span>
    </li>
</template>

<script setup>
defineProps({
    firstTitle: {
        type: String,
        required: true,
    },
    secondTitle: {
        type: String,
        required: true,
    },
    thirdTitle: {
        type: String,
        default: '',
    },
});
</script>
