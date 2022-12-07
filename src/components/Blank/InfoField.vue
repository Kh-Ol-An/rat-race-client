<template>
    <div class="flex items-center gap-2">
        <span class="text-additional">
            {{ label }}
        </span>
        <span class="text-silver-800">
            {{ value }}
        </span>
        <button
            v-if="editable"
            class="text-slate-800"
            type="button"
            @click="$emit('edit')"
        >
            edit
        </button>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    editable: {
        type: Boolean,
        default: false,
    },
});
</script>