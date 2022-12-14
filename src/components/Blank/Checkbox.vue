<template>
    <div class="flex items-center justify-between gap-2">
        <label class="text-opposite cursor-pointer" :for="id">
            {{ label }}
        </label>

        <input
            class="text-silver-800 cursor-pointer"
            :id="id"
            type="checkbox"
            :checked="checked"
            @change="change"
        >
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits([ 'change' ]);

const change = () => emit('change', !props.checked);
</script>
