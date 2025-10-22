import './bootstrap';
import '../css/app.css';
import router from './router';
import { createApp } from 'vue';
import App from './App.vue';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App).use(Toast).use(router).mount('#app');