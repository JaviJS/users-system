<template>
  <div class="rounded-lg p-6 md:p-10 max-w-full mx-auto">
    <!-- Header -->
    <div class="my-auto mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
      <p class="text-3xl font-bold mt-2 leading-6 text-gray-800">Listado de usuarios</p>
      <button
        @click="goTo('/usuarios/crear')"
        class="w-full md:w-auto bg-primary text-white px-4 py-2 mt-2 rounded-md border-2 border-primary hover:border-primary-light hover:bg-primary-light transition duration-300 cursor-pointer"
      >
        Nuevo usuario
      </button>
    </div>

    <!-- Search -->
    <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div class="w-full mb-4 md:mb-0 flex items-center space-x-2">
        <input
          v-model="search"
          type="text"
          placeholder="Buscar usuarios..."
          class="w-full px-4 py-2 rounded-md border border-gray-300 bg-white outline-none hover:ring-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>

    <!-- Table -->
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
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-3 px-6 text-left">{{ user.id }}</td>
            <td class="py-3 px-6 text-left">{{ user.name }}</td>
            <td class="py-3 px-6 text-left">{{ user.email }}</td>
            <td class="py-3 px-6 text-left">{{ user.phone }}</td>
            <td class="py-3 px-6 text-left">{{ formatDateTime(user.created_at) }}</td>
            <td class="py-3 px-6 text-left">{{ formatDateTime(user.updated_at) }}</td>
            <td class="py-3 px-6 text-center">
              <div class="flex item-center justify-center gap-2">
                <button @click="goTo(`/usuarios/${user.id}`)" class="w-4 transform hover:text-primary hover:scale-110 cursor-pointer tooltip">
                  👁️
                  <span class="tooltip-text tooltip-primary bg-primary">Ver</span>
                </button>
                <button @click="goTo(`/usuarios/${user.id}/editar`)" class="w-4 transform hover:text-primary hover:scale-110 cursor-pointer tooltip">
                  ✏️
                  <span class="tooltip-text tooltip-primary bg-primary">Editar</span>
                </button>
                <button
                  v-if="user.id !== authUserId"
                  @click="deleteUser(user.id)"
                  class="w-4 transform hover:text-red-500 hover:scale-110 cursor-pointer tooltip"
                >
                  🗑️
                  <span class="tooltip-text tooltip-error bg-primary">Eliminar</span>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="!filteredUsers.length">
            <td colspan="10" class="py-3 px-6 text-center">No hay registros</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex absolute inset-0 bg-white/50 z-50 items-center justify-center">
      <svg class="animate-spin text-primary h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import userService from '../../services/user.service.js'

const router = useRouter()

const users = ref([])
const search = ref('')
const loading = ref(false)
const authUserId = ref(1) // reemplazar con id del usuario autenticado

// Fetch users
const fetchUsers = async () => {
  loading.value = true
  try {
    // const res = await axios.get('/users')
    const response = await userService.getUsers();
    users.value = response.data
    console.log(users.value);
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Computed filtered users
const filteredUsers = computed(() => {
  if (!search.value) return users.value
  return users.value.filter(user =>
    user.name.toLowerCase().includes(search.value.toLowerCase()) ||
    user.email.toLowerCase().includes(search.value.toLowerCase()) ||
    user.phone.toLowerCase().includes(search.value.toLowerCase())
  )
})

// Navigation helper
const goTo = (url) => {
  router.push(url)
}

// Delete user
const deleteUser = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este usuario?')) return
  loading.value = true
  try {
    await axios.delete(`/api/users/${id}`)
    users.value = users.value.filter(u => u.id !== id)
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return ''

  const date = new Date(dateTimeStr.replace(' ', 'T')) // convertimos a formato ISO
  if (isNaN(date)) return dateTimeStr

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // los meses van de 0 a 11
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}-${month}-${year} ${hours}:${minutes}`
}

onMounted(() => {
  fetchUsers()
})
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
