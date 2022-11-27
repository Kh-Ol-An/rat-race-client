<template>
    <div class="relative w-full">
        <input
            class="
                peer
                py-1 px-3
                w-full
                shadow
                border-2 rounded-md
                text-secondary
                placeholder-transparent
                focus:border-secondary focus:outline-none
                transition-all duration-300
            "
            :id="id"
            :type="type"
            :placeholder="placeholder"
            :value="value"
            @input="$emit('update:value', $event.target.value)"
        />
        <label
            :class="[
                'absolute',
                'top-0 left-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4',
                '-translate-y-1/2',
                'px-1 peer-placeholder-shown:px-0',
                'bg-white',
                'text-xs text-secondary peer-placeholder-shown:text-slate-500',
                'transition-all duration-300',
                 smallLabel ? 'peer-placeholder-shown:text-sm' : 'peer-placeholder-shown:text-base'
            ]"
            :for="id"
        >
            {{ placeholder }}
        </label>
    </div>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'number'
    },
    value: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    smallLabel: {
        type: Boolean,
        default: false
    },
});
</script>
