<template>
    <div class="flex space-x-4">
        <div class="group relative">
            <input
                class="
                    peer
                    py-1 px-3
                    border-2 rounded-md
                    placeholder-transparent
                    focus:border-secondary focus:outline-none
                    transition-all duration-300
                "
                id="name"
                type="text"
                placeholder="Ім'я"
                :value="name"
                @input="$emit('update:name', $event.target.value)"
            />
            <label
                class="
                    absolute
                    top-0 left-2
                    -translate-y-1/2
                    px-1
                    bg-white
                    text-xs text-secondary
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4
                    peer-placeholder-shown:px-0
                    peer-placeholder-shown:text-slate-300 peer-placeholder-shown:text-base
                    transition-all duration-300
                "
                for="name"
            >
                Ім'я
            </label>
        </div>

        <div class="relative">
            <input
                class="
                    peer
                    py-1 px-3
                    border-2 rounded-md
                    placeholder-transparent
                    focus:border-secondary focus:outline-none
                    transition-all duration-300
                "
                id="profession"
                type="text"
                placeholder="Професія"
                :value="profession"
                @input="$emit('update:profession', $event.target.value)"
            />
            <label
                class="
                    absolute
                    top-0 left-2
                    -translate-y-1/2
                    px-1
                    bg-white
                    text-xs text-secondary
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4
                    peer-placeholder-shown:px-0
                    peer-placeholder-shown:text-slate-300 peer-placeholder-shown:text-base
                    transition-all duration-300
                "
                for="profession"
            >
                Професія
            </label>
        </div>
    </div>
</template>

<script setup>
defineProps({
    name: {
        type: String,
        default: ''
    },
    profession: {
        type: String,
        default: ''
    }
});
</script>
