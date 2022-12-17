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
    <ul v-if="user.shares.gc.length > 0" class="flex flex-col gap-2">
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
            v-for="{id, worth, value, cost} in user.shares.gc"
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
    <ul v-if="user.shares.shchun.length > 0" class="flex flex-col gap-2">
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
            v-for="{id, worth, value, cost} in user.shares.shchun"
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
    <ul v-if="user.shares.to.length > 0" class="flex flex-col gap-2">
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
            v-for="{id, worth, value, cost} in user.shares.to"
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
    <ul v-if="user.shares.cst.length > 0" class="flex flex-col gap-2">
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
            v-for="{id, worth, value, cost} in user.shares.cst"
            :key="id"
            :worth="worth"
            :value="value"
            :cost="cost"
        />
    </ul>
</template>

<script setup>
import { toRef } from "vue";
import InputField from '../plugins/InputField.vue';
import List from '../plugins/List.vue';

const props = defineProps({
    userProp: {
        type: Object,
        required: true,
    },
});

const user = toRef(props, 'userProp');

const emit = defineEmits([ 'add' ]);

const add = (subType, id, worth, value) => emit('add', subType, id, worth, value);
</script>
