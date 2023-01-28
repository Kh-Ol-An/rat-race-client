<script setup>
import { ref, toRef, computed } from "vue";
import Input from '../plugins/Input.vue';
import Add from '../plugins/Add.vue';
import InfoField from '../plugins/InfoField.vue';
import MaleIcon from '../../icons/MaleIcon.vue';
import FemaleIcon from '../../icons/FemaleIcon.vue';
import SexIcon from '../../icons/SexIcon.vue';
import ApartmentIcon from '../../icons/ApartmentIcon.vue';
import CarIcon from '../../icons/CarIcon.vue';
import CottageIcon from '../../icons/CottageIcon.vue';
import YachtIcon from '../../icons/YachtIcon.vue';
import PlaneIcon from '../../icons/PlaneIcon.vue';
import TargetIcon from '../../icons/TargetIcon.vue';

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
});

const blank = toRef(props, 'blankProp');

const gender = ref('');

const havingChildren = computed(() => {
    if (blank.value.gender === 'female') {
        return !blank.value.marriage && blank.value.children.count > 0;
    }

    if (blank.value.gender === 'male') {
        return blank.value.children.count > 0;
    }
});

const profession = ref('');
</script>

<template>
    <div class="flex items-center">

        <div v-if="blank.gender.length === 0" class="mx-auto flex items-center gap-3">
            <input class="peer hidden" type="radio" id="male" name="gender" value="male" v-model="gender">
            <label class="cursor-pointer" for="male">
                <MaleIcon width="24px" height="24px" :classes="gender === 'male' ? 'fill-blue-600' : 'fill-slate-400'" />
            </label>

            <input class="peer hidden" type="radio" id="female" name="gender" value="female" v-model="gender">
            <label class="cursor-pointer" for="female">
                <FemaleIcon
                    width="24px"
                    height="24px"
                    :classes="gender === 'female' ? 'fill-opposite' : 'fill-slate-400'"
                />
            </label>
            <Add :firstValue="gender" @add="$emit('add:gender', gender)" />
        </div>
        <div
            v-if="blank.gender.length > 0"
            class="ml-4 flex items-center gap-4"
        >
            <MaleIcon
                v-if="blank.gender === 'male'"
                width="24px"
                height="24px"
                :classes="(blank.marriage && !blank.rich) ? 'fill-blue-600' : 'fill-slate-400'"
            />
            <FemaleIcon
                v-if="blank.gender === 'female'"
                width="24px"
                height="24px"
                :classes="(blank.marriage && !blank.rich) ? 'fill-opposite' : 'fill-slate-400'"
            />
            <SexIcon
                v-if="havingChildren && !blank.rich"
                width="24px"
                height="24px"
                color="fill-primary"
            />
            <ApartmentIcon
                v-if="blank.apartments.length > 0 && !blank.rich"
                width="24px"
                height="24px"
                color="fill-primary"
            />
            <CarIcon
                v-if="blank.cars.length > 0 && !blank.rich"
                width="32px"
                height="32px"
                color="fill-primary"
            />
            <CottageIcon
                v-if="blank.cottages.length > 0 && blank.rich"
                width="32px"
                height="32px"
                color="fill-primary"
            />
            <YachtIcon
                v-if="blank.yachts.length > 0 && blank.rich"
                width="26px"
                height="26px"
                color="fill-primary"
            />
            <PlaneIcon
                v-if="blank.planes.length > 0 && blank.rich"
                width="32px"
                height="32px"
                color="fill-primary"
            />
            <TargetIcon
                v-if="blank.whimsAndFancies.length > 0 && blank.rich"
                width="28px"
                height="28px"
            />
        </div>
    </div>

    <div v-if="blank.profession.length === 0" class="flex items-center gap-3">
        <Input v-model:value="profession" id="profession" type="text" placeholder="Професія" />
        <Add :firstValue="profession" @add="$emit('add:profession', profession)" />
    </div>
    <InfoField v-else labelClasses="text-slate-500" label="Професія:">
        <span class="ml-2 text-slate-400">
            {{ blank.profession }}
        </span>
    </InfoField>
</template>
