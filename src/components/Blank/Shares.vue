<template>
    <h2 class="px-4 text-xl font-bold text-primary text-center">Акції</h2>

    <!-- GC -->
    <InputField
        label="GC"
        type="shares"
        subType="gc"
        placeholderWorth="Вартість"
        placeholderValue="Кількість"
        @add="add"
    />
    <ul v-if="gc.length > 0" class="flex flex-col gap-2">
        <li class="grid grid-cols-3 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
            <span>
                Ціна
            </span>
            <span>
                Кількість
            </span>
            <span>
                Вартість
            </span>
        </li>
        <List
            v-for="{id, worth, value, cost} in gc"
            :key="id"
            :worth="worth"
            :value="value"
            :cost="cost"
        />
    </ul>

    <!-- ЩУН -->
    <InputField
        label="ЩУН"
        type="shares"
        subType="shchun"
        placeholderWorth="Вартість"
        placeholderValue="Кількість"
        @add="add"
    />
    <ul v-if="shchun.length > 0" class="flex flex-col gap-2">
        <li class="grid grid-cols-3 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
            <span>
                Ціна
            </span>
            <span>
                Кількість
            </span>
            <span>
                Вартість
            </span>
        </li>
        <List
            v-for="{id, worth, value, cost} in shchun"
            :key="id"
            :worth="worth"
            :value="value"
            :cost="cost"
        />
    </ul>

    <!-- TO -->
    <InputField
        label="TO"
        type="shares"
        subType="to"
        placeholderWorth="Вартість"
        placeholderValue="Кількість"
        @add="add"
    />
    <ul v-if="to.length > 0" class="flex flex-col gap-2">
        <li class="grid grid-cols-3 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
            <span>
                Ціна
            </span>
            <span>
                Кількість
            </span>
            <span>
                Вартість
            </span>
        </li>
        <List
            v-for="{id, worth, value, cost} in to"
            :key="id"
            :worth="worth"
            :value="value"
            :cost="cost"
        />
    </ul>

    <!-- CST -->
    <InputField
        label="CST"
        type="shares"
        subType="cst"
        placeholderWorth="Вартість"
        placeholderValue="Кількість"
        @add="add"
    />
    <ul v-if="cst.length > 0" class="flex flex-col gap-2">
        <li class="grid grid-cols-3 gap-2 border-b-2 border-b-silver-900 text-secondary font-bold">
            <span>
                Ціна
            </span>
            <span>
                Кількість
            </span>
            <span>
                Вартість
            </span>
        </li>
        <List
            v-for="{id, worth, value, cost} in cst"
            :key="id"
            :worth="worth"
            :value="value"
            :cost="cost"
        />
    </ul>
</template>

<script setup>
import InputField from './InputField.vue';
import List from './List.vue';

defineProps({
    gc: {
        type: Array,
        required: true,
    },
    shchun: {
        type: Array,
        required: true,
    },
    to: {
        type: Array,
        required: true,
    },
    cst: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits([ 'add' ]);

const add = (type, subType, id, worth, value) => emit('add', type, subType, id, worth, value);
</script>
