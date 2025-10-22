<template>
    <nav class="bg-primary border-gray-200 py-2.5">
        <div
            class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto"
        >
            <a href="/usuarios" class="flex items-center">
                <span
                    class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
                    >Sistema de Usuarios</span
                >
            </a>
            <div class="flex items-center">
                <div class="hidden mt-2 mr-4 sm:inline-block">
                    <span></span>
                </div>
                <button
                    @click="openMenu()"
                    type="button"
                    class="inline-flex items-center p-2 ml-1 text-sm text-bg-blue-900 rounded-lg hover:bg-blue-900 focus:outline-none"
                >
                    <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
        <div
            class="items-center w-full"
            :class="visible ? 'flex flex-col' : 'hidden'"
        >
            <div class="w-full flex flex-col mt-4 font-medium text-white px-4">
                <a
                    href="/usuarios"
                    class="w-full block py-2 pl-3 pr-4 hover:bg-blue-900 rounded-lg"
                    :class="currentRouteName === '/usuarios' ? 'bg-blue-900' : ''"
                    aria-current="page"
                    >Usuarios</a
                >
                <a
                    href="/usuarios-graph"
                    class="w-full block py-2 pl-3 pr-4 mt-2 hover:bg-blue-900 rounded-lg"
                    :class="currentRouteName === '/usuarios-graph' ? 'bg-blue-900' : ''"
                    aria-current="page"
                    >Usuarios graph</a
                >
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from 'vue-router'

const route = useRoute();
const visible = ref(true);

onMounted(async () => {});

const currentRouteName = computed(() => route.path)

const openMenu = () => {
    visible.value = !visible.value;
};
</script>

<style scoped>
li:hover {
    background-color: #f0f0f0;
}
</style>
