<script setup>
import { computed, ref } from 'vue'
import Input from '../components/plugins/Input.vue'
import CloseEyeIcon from '../assets/images/icons/CloseEyeIcon.vue'
import OpenEyeIcon from '../assets/images/icons/OpenEyeIcon.vue'
import { mapActions, mapGetters } from '../store/helpers.js'

const isRegistration = ref(false)
const showPassword = ref(true)
const showRepeatPassword = ref(true)

const name = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')

const disabledRegistration = computed(
    () =>
        email.value.length === 0 ||
        password.value.length === 0 ||
        password.value !== repeatPassword.value
)
const disabledLogin = computed(
    () => email.value.length === 0 || password.value.length === 0
)

const { registration, login } = mapActions()
const { getLoading } = mapGetters()
</script>

<template>
    <div class="flex h-screen w-full flex-col items-center justify-center">
        <div v-if="getLoading">getLoading...</div>
        <div
            v-else
            class="flex flex-col items-center justify-center gap-4 rounded-md bg-slate-800 py-6 px-8 shadow-lg"
        >
            <Input
                v-if="isRegistration"
                id="name"
                v-model:value="name"
                type="text"
                placeholder="Ім'я"
            />
            <Input
                id="email"
                v-model:value="email"
                type="text"
                placeholder="Пошта"
            />
            <div class="relative w-full">
                <Input
                    id="password"
                    v-model:value="password"
                    :type="showPassword ? 'password' : 'text'"
                    placeholder="Пароль"
                />
                <button
                    class="absolute top-1/2 right-2 -translate-y-1/2 text-white"
                    type="button"
                    @click="showPassword = !showPassword"
                >
                    <CloseEyeIcon
                        v-if="showPassword"
                        :color="
                            password.length > 0
                                ? 'stroke-primary'
                                : 'stroke-slate-400'
                        "
                    />
                    <OpenEyeIcon v-else color="stroke-primary" />
                </button>
            </div>
            <div v-if="isRegistration" class="relative w-full">
                <Input
                    id="repeat-password"
                    v-model:value="repeatPassword"
                    :type="showRepeatPassword ? 'password' : 'text'"
                    placeholder="Пароль ще раз"
                />
                <button
                    class="absolute top-1/2 right-2 -translate-y-1/2 text-white"
                    type="button"
                    @click="showRepeatPassword = !showRepeatPassword"
                >
                    <CloseEyeIcon
                        v-if="showRepeatPassword"
                        :color="
                            repeatPassword.length > 0
                                ? 'stroke-primary'
                                : 'stroke-slate-400'
                        "
                    />
                    <OpenEyeIcon v-else color="stroke-primary" />
                </button>
            </div>
            <p class="text-center text-sm text-slate-400">
                {{
                    isRegistration
                        ? 'В мене вже є обліковий запис.'
                        : 'В мене ще немає облікового запису.'
                }}<br />Хочу
                <button
                    class="font-bold text-primary"
                    type="button"
                    @click="isRegistration = !isRegistration"
                >
                    {{ isRegistration ? 'увійти' : 'зареєструватися' }}
                </button>
            </p>
            <button
                v-if="isRegistration"
                :class="[
                    'h-8 w-full rounded bg-gradient-to-b text-slate-100 transition-all duration-300',
                    disabledRegistration
                        ? 'cursor-not-allowed from-gray-300 to-gray-600'
                        : 'from-primaryLight to-primary',
                ]"
                type="button"
                :disabled="disabledRegistration"
                @click="registration({ name, email, password })"
            >
                Зареєструватися
            </button>
            <button
                v-else
                :class="[
                    'h-8 w-full rounded bg-gradient-to-b text-slate-100 transition-all duration-300',
                    disabledLogin
                        ? 'cursor-not-allowed from-gray-300 to-gray-600'
                        : 'from-primaryLight to-primary',
                ]"
                type="button"
                :disabled="disabledLogin"
                @click="login({ email, password })"
            >
                Увійти
            </button>
        </div>
    </div>
</template>
