<script setup>
import { toRef } from 'vue'
import MarriageStatus from './MarriageStatus.vue'
import ChildrenCount from './ChildrenCount.vue'

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
})

const blank = toRef(props, 'blankProp')

const emit = defineEmits(['change:marriage', 'have:baby'])

const changeMarriage = (checked) => emit('change:marriage', checked)
</script>

<template>
    <h2 class="px-4 text-center text-xl font-bold text-opposite">
        Сімейний стан
    </h2>
    <MarriageStatus
        label="Шлюб:"
        :checked="blank.marriage"
        :disabled="blank.gender.length === 0"
        @change="changeMarriage"
    />
    <ChildrenCount
        label="Діти:"
        :count="blank.children.count"
        :expense="blank.children.expense"
        :disabled="
            blank.gender.length === 0 ||
            (blank.gender === 'male' && !blank.marriage)
        "
        @have:baby="$emit('have:baby')"
    />
</template>
