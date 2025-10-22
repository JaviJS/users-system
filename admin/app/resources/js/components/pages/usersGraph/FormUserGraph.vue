<template>
    <div class="w-full p-6 md:p-10 mx-10">
        <!-- Header -->
        <div class="flex flex-row justify-start items-center mb-6 my-auto">
            <button
                @click="goTo('/usuarios-graph')"
                class="mr-2 px-3 py-3 rounded-full bg-primary text-white transform hover:bg-primary-light cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                </svg>
            </button>
            <p class="text-3xl font-bold leading-6 text-gray-800">
                {{ title }} Usuario
            </p>
        </div>

        <form @submit.prevent="handleSubmit" class="w-full py-4">
            <div class="mb-4 mt-4 w-full">
                <label class="block font-medium"
                    >Nombre(s) <span class="text-red-500">*</span></label
                >
                <input
                    type="text"
                    v-model="name"
                    name="name"
                    id="name"
                    :disabled="disabled"
                    class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none"
                    :class="
                        disabled
                            ? 'bg-gray-100 cursor-not-allowed'
                            : 'hover:border-primary hover:ring hover:ring-primary focus:ring focus:ring-primary focus:border-primary'
                    "
                    placeholder="Escriba los nombres de usuario"
                />
                <div
                    v-for="error in errorsName"
                    :key="error"
                    class="text-red-500 mt-1"
                >
                    {{ error }}
                </div>
            </div>
            <div class="mb-4 mt-4 w-full">
                <label class="block font-medium"
                    >Correo Electrónico
                    <span class="text-red-500">*</span></label
                >
                <input
                    type="text"
                    v-model="email"
                    name="email"
                    id="email"
                    :disabled="disabled"
                    class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none"
                    :class="
                        disabled
                            ? 'bg-gray-100 cursor-not-allowed'
                            : 'hover:border-primary hover:ring hover:ring-primary focus:ring focus:ring-primary focus:border-primary'
                    "
                    placeholder="Escriba los nombres de usuario"
                />
                <div
                    v-for="error in errorsEmail"
                    :key="error"
                    class="text-red-500 mt-1"
                >
                    {{ error }}
                </div>
            </div>
            <div class="mb-4 mt-4 w-full">
                <label class="block font-medium"
                    >Teléfono Celular <span class="text-red-500">*</span></label
                >
                <input
                    type="text"
                    v-model="phone"
                    name="name"
                    id="name"
                    :disabled="disabled"
                    class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none"
                    :class="
                        disabled
                            ? 'bg-gray-100 cursor-not-allowed'
                            : 'hover:border-primary hover:ring hover:ring-primary focus:ring focus:ring-primary focus:border-primary'
                    "
                    placeholder="Escriba los nombres de usuario"
                />
                <div
                    v-for="error in errorsPhone"
                    :key="error"
                    class="text-red-500 mt-1"
                >
                    {{ error }}
                </div>
            </div>
            <div v-if="!disabled" class="flex justify-center">
                <button
                    type="submit"
                    class="bg-primary text-white px-4 py-2 mt-2 rounded-md hover:bg-primary-light transition duration-300 cursor-pointer"
                >
                    Guardar
                </button>
            </div>
        </form>

        <div
            v-if="loading"
            class="flex absolute inset-0 bg-white/50 z-50 items-center justify-center"
        >
            <svg
                class="animate-spin text-primary h-10 w-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                ></circle>
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>
        <Loading :show="loading" />
    </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import rules from "../../../support/rules/fieldRules.js";
import { notifySuccess } from "../../../support/helpers/notification.js";
import { handleErrorsGraph } from "../../../support/errors/handleErrors.js";
import Loading from "../../layout/Loading.vue";
import userGraphql from '../../../services/user.graphql.js';

const router = useRouter();
const props = defineProps({
    disabled: { type: Boolean, default: false },
    id: { type: Boolean },
    title: { type: String, default: "Editar" },
});

const emit = defineEmits(["submit", "back"]);

const name = ref("");
const email = ref("");
const phone = ref("");

const errorsName = ref([]);
const errorsEmail = ref([]);
const errorsPhone = ref([]);

onMounted(() => {
    if (props.id) {
        getUser();
    }
});

const goTo = (url) => {
    router.push(url);
};

const loading = ref(false);

const validName = () => {
    errorsName.value = [];
    const isRequired = rules.required(name.value);
    const isLetters = rules.letters(name.value);
    const isMaxLength = rules.maxLength(255)(name.value);

    if (isRequired !== true) errorsName.value.push(isRequired);
    if (isLetters !== true) errorsName.value.push(isLetters);
    if (isMaxLength !== true) errorsName.value.push(isMaxLength);

    if (errorsName.value.length) {
        return false;
    }

    return true;
};

const validEmail = () => {
    errorsEmail.value = [];
    const isRequired = rules.required(email.value);
    const isEmail = rules.email(email.value);
    const isMaxLength = rules.maxLength(255)(email.value);

    if (isRequired !== true) errorsEmail.value.push(isRequired);
    if (isEmail !== true) errorsEmail.value.push(isEmail);
    if (isMaxLength !== true) errorsEmail.value.push(isMaxLength);

    if (errorsEmail.value.length) {
        return false;
    }

    return true;
};

const validPhone = () => {
    errorsPhone.value = [];
    const isRequired = rules.required(phone.value);
    const isPhone = rules.phone(phone.value);

    if (isRequired !== true) errorsPhone.value.push(isRequired);
    if (isPhone !== true) errorsPhone.value.push(isPhone);

    if (errorsPhone.value.length) {
        return false;
    }

    return true;
};

const handleSubmit = async () => {
    loading.value = true;
    try {
        // const isValidName = validName();
        // const isValidEmail = validEmail();
        // const isValidPhone = validPhone();
        const isValidName = true;
        const isValidEmail = true;
        const isValidPhone = true;

        if (isValidName && isValidEmail && isValidPhone) {
            const data = {
                name: name.value,
                email: email.value,
                phone: phone.value,
            };
            const response = await selectMethod(data);

            if (response?.status === false) {
                throw {
                    response: {
                        data: {
                            message: response.message || "Error desconocido",
                            code: response.code || 401,
                        },
                    },
                };
            }

            notifySuccess(response.message);
            goTo("/usuarios-graph");
        }
    } catch (err) {
        handleErrorsGraph(err);
    } finally {
        loading.value = false;
    }
};

const selectMethod = (data) => {
    if (props.title === "Crear") {
        return userGraphql.createUser(data);
    } else if (props.title === "Editar") {
        return userGraphql.updateUser(props.id, data);
    }
};

const getUser = async () => {
    loading.value = true;
    try {
        const response = await userGraphql.getUser(props.id);
        name.value = response.name;
        email.value = response.email;
        phone.value = response.phone;
    } catch (err) {
        handleErrorsGraph(err);
        goTo("/usuarios-graph");
    } finally {
        loading.value = false;
    }
};
</script>
