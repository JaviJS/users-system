<template>
    <div class="rounded-lg p-6 md:p-10 max-w-full mx-auto">
        <div
            class="my-auto mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0"
        >
            <p class="text-3xl font-bold mt-2 leading-6 text-gray-800">
                Listado de usuarios
            </p>
            <button
                @click="goTo('/usuarios-graph/crear')"
                class="w-full md:w-auto bg-primary text-white px-4 py-2 mt-2 rounded-md border-2 border-primary hover:border-primary-light hover:bg-primary-light transition duration-300 cursor-pointer"
            >
                Nuevo usuario
            </button>
        </div>
        <div class="overflow-x-auto bg-white rounded-lg">
            <table class="min-w-full table-auto">
                <thead>
                    <tr class="bg-gray-200 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">ID</th>
                        <th class="py-3 px-6 text-left">Nombre</th>
                        <th class="py-3 px-6 text-left">Correo Electrónico</th>
                        <th class="py-3 px-6 text-left">Télefono</th>
                        <th class="py-3 px-6 text-left">Fecha de Creación</th>
                        <th class="py-3 px-6 text-left">Fecha de Edición</th>
                        <th class="py-3 px-6 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody class="text-sm whitespace-normal break-words">
                    <tr
                        v-for="user in users"
                        :key="user.id"
                        class="border-b border-gray-200 hover:bg-gray-100"
                    >
                        <td class="py-3 px-6 text-left">{{ user.id }}</td>
                        <td class="py-3 px-6 text-left">{{ user.name }}</td>
                        <td class="py-3 px-6 text-left">{{ user.email }}</td>
                        <td class="py-3 px-6 text-left">{{ user.phone }}</td>
                        <td class="py-3 px-6 text-left">
                            {{ formatDateTime(user.created_at) }}
                        </td>
                        <td class="py-3 px-6 text-left">
                            {{ formatDateTime(user.updated_at) }}
                        </td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center gap-2">
                                <button
                                    @click="goTo(`/usuarios-graph/${user.id}`)"
                                    class="w-4 transform hover:text-primary hover:scale-110 cursor-pointer tooltip"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-width="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                        />
                                        <path
                                            stroke-width="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                    <span
                                        class="tooltip-text tooltip-primary bg-primary"
                                        >Ver</span
                                    >
                                </button>
                                <button
                                    @click="
                                        goTo(
                                            `/usuarios-graph/${user.id}/editar`
                                        )
                                    "
                                    class="w-4 transform hover:text-primary hover:scale-110 cursor-pointer tooltip"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                    <span
                                        class="tooltip-text tooltip-primary bg-primary"
                                        >Editar</span
                                    >
                                </button>
                                <button
                                    @click="deleteUser(user)"
                                    class="w-4 transform hover:text-red-500 hover:scale-110 cursor-pointer tooltip"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    <span
                                        class="tooltip-text tooltip-error bg-primary"
                                        >Eliminar</span
                                    >
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="!users.length">
                        <td colspan="10" class="py-3 px-6 text-center">
                            No hay registros
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { handleErrorsGraph } from "../../../support/errors/handleErrors.js";
import { notifySuccess } from "../../../support/helpers/notification.js";
import Loading from "../../layout/Loading.vue";
import userGraphql from "../../../services/user.graphql.js";
import Swal from "sweetalert2";

const router = useRouter();

const users = ref([]);
const search = ref("");
const loading = ref(false);

const getUsers = async () => {
    console.log("asdasd")
    loading.value = true;
    try {
        const response = await userGraphql.getUsers();
        console.log(response)
        users.value = response || [];
    } catch (err) {
        handleErrorsGraph(err);
    } finally {
        loading.value = false;
    }
};

const goTo = (url) => {
    router.push(url);
};

const deleteUser = async (user) => {
    Swal.fire({
        title: "¿Estas seguro de eliminar a usuario?",
        html: `<div style="display:flex; flex-direction:column">
          <div style="font-weight: bold;text-decoration:underline;">Eliminar usuario:</div>
          <div style="font-weight: bold;">ID: <span style="font-weight: normal;">${user.id}</span></div>
          <div style="font-weight: bold;">Nombre: <span style="font-weight: normal;"> ${user.name}</span></div>
        </div>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DC2626",
        cancelButtonColor: "#B5B5B5",
        confirmButtonText: "Eliminar",
        reverseButtons: true,
    }).then(async (result) => {
        if (result.isConfirmed) {
            loading.value = true;
            try {
                const response = await userGraphql.deleteUser(user.id);

                if (response?.status === false) {
                    throw {
                        response: {
                            data: {
                                message:
                                    response.message || "Error desconocido",
                                code: response.code || 401,
                            },
                        },
                    };
                }

                notifySuccess(response.message);
                await getUsers();
            } catch (err) {
                handleErrorsGraph(err);
            } finally {
                loading.value = false;
            }
        }
    });
};

function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return "";

    const date = new Date(dateTimeStr.replace(" ", "T"));
    if (isNaN(date)) return dateTimeStr;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

onMounted(() => {
    getUsers();
});
</script>

<style scoped>
.chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.tooltip {
    position: relative;
}
.tooltip-text {
    visibility: hidden;
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    white-space: nowrap;
}
.tooltip:hover .tooltip-text {
    visibility: visible;
}
</style>
