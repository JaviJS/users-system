import { createRouter, createWebHistory } from "vue-router";
import ListUser from "../components/pages/ListUser.vue";
import FormUser from "../components/pages/FormUser.vue";

const routes = [
    { path: "/usuarios", component: ListUser },
    { path: "/usuarios/crear", component: FormUser, props: { title: "Crear" } },
    {
        path: "/usuarios/:id",
        component: FormUser,
        props: (route) => ({
            id: route.params.id,
            title: "Ver",
            disabled: true
        }),
    },
    {
        path: "/usuarios/:id/editar",
        component: FormUser,
        props: (route) => ({
            id: route.params.id,
            title: "Editar",
        }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
