<template>
    <nav class="border-gray-200 py-2.5 bg-primary">
        <div
            class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto"
        >
            <a href="#" class="flex items-center">
                <img
                    src="https://www.svgrepo.com/show/499962/music.svg"
                    class="h-6 mr-3 sm:h-9"
                    alt="Landwind Logo"
                />
                <span
                    class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
                    >Sistema de Usuarios</span
                >
            </a>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";

const users = ref([]);

onMounted(async () => {});
</script>

<style scoped>
li:hover {
    background-color: #f0f0f0;
}
</style>
