<template>
    <label class="flex items-center justify-between gap-2 text-opposite cursor-pointer">
        {{ label }}

        <input
            class="peer hidden"
            type="checkbox"
            :checked="checked"
            @change="change"
        >
        <div
            class="
                relative
                mr-2
                w-4 h-4
                flex items-center justify-center
                rounded-sm
                border border-slate-800 peer-checked:border-primary
                peer-checked:bg-primary
                transition-all duration-300
            "
        >
            <div class="w-1.5 h-3 border-r-2 border-b-2 border-white -translate-y-px rotate-45"></div>
        </div>
    </label>
</template>

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
});

const emit = defineEmits([ 'change' ]);

const change = () => emit('change', !props.checked);
</script>
