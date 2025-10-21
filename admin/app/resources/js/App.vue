<template>
    <Navbar />
    <div class="min-h-screen bg-white flex justify-center items-start">
       <router-view></router-view>
    </div>
</template>

<script setup>
import Navbar from "./components/layout/Navbar.vue";
</script>
