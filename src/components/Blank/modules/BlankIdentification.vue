<script setup>
import { ref, toRef, computed } from "vue";
import { mapGetters } from '../../../store/helpers.js';
import Input from '../../plugins/Input.vue';
import Add from '../plugins/Add.vue';
import InfoField from '../plugins/InfoField.vue';
import MaleIcon from '../../../assets/images/icons/MaleIcon.vue';
import FemaleIcon from '../../../assets/images/icons/FemaleIcon.vue';
import BabyIcon from '../../../assets/images/icons/BabyIcon.vue';
import ApartmentIcon from '../../../assets/images/icons/ApartmentIcon.vue';
import CarIcon from '../../../assets/images/icons/CarIcon.vue';
import CottageIcon from '../../../assets/images/icons/CottageIcon.vue';
import YachtIcon from '../../../assets/images/icons/YachtIcon.vue';
import PlaneIcon from '../../../assets/images/icons/PlaneIcon.vue';
import TargetIcon from '../../../assets/images/icons/TargetIcon.vue';

const props = defineProps({
    blankProp: {
        type: Object,
        required: true,
    },
});

const blank = toRef(props, 'blankProp');

const { getUser } = mapGetters();

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
        <InfoField labelClasses="text-slate-500" label="Ім'я:">
            <span class="ml-2 text-slate-400">
                {{ getUser.name || 'Безіменько' }}
            </span>
        </InfoField>

        <div v-if="blank.gender.length === 0" class="ml-auto flex items-center gap-3">
            <input class="peer hidden" type="radio" id="male" name="gender" value="male" v-model="gender">
            <label class="cursor-pointer" for="male">
                <MaleIcon :color="gender === 'male' ? 'fill-blue-600' : 'fill-slate-400'" />
            </label>

            <input class="peer hidden" type="radio" id="female" name="gender" value="female" v-model="gender">
            <label class="cursor-pointer" for="female">
                <FemaleIcon :color="gender === 'female' ? 'fill-opposite' : 'fill-slate-400'" />
            </label>
            <Add :firstValue="gender" @add="$emit('add:gender', gender)" />
        </div>
        <div
            v-if="blank.gender.length > 0"
            class="ml-4 flex items-center gap-4"
        >
            <MaleIcon
                v-if="blank.gender === 'male'"
                :color="(blank.marriage && !blank.rich) ? 'fill-blue-600' : 'fill-slate-400'"
            />
            <FemaleIcon
                v-if="blank.gender === 'female'"
                :color="(blank.marriage && !blank.rich) ? 'fill-opposite' : 'fill-slate-400'"
            />
            <BabyIcon v-if="havingChildren && !blank.rich" color="fill-primary" />
            <ApartmentIcon v-if="blank.apartments.length > 0 && !blank.rich" color="fill-primary" />
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
            <TargetIcon v-if="blank.whimsAndFancies.length > 0 && blank.rich" width="28px" height="28px" />
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
