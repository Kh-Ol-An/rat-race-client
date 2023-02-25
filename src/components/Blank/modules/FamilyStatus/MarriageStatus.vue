<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['change'])

const change = () => emit('change', !props.checked)
</script>

<template>
    <label
        :class="[
            'flex items-center justify-between gap-2 text-slate-500',
            disabled ? 'cursor-not-allowed opacity-20' : 'cursor-pointer',
        ]"
    >
        {{ label }}

        <input
            class="peer hidden"
            type="checkbox"
            :checked="checked"
            :disabled="disabled"
            @change="change"
        />
        <div
            class="relative mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-slate-400 transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary"
        >
            <div
                class="h-3 w-1.5 -translate-y-px rotate-45 border-r-2 border-b-2 border-slate-800 md:border-slate-900"
            ></div>
        </div>
    </label>
</template>
