import { createRouter, createWebHistory } from "vue-router";
import ListUser from "../components/pages/users/ListUser.vue";
import FormUser from "../components/pages/users/FormUser.vue";
import ListUserGraph from "../components/pages/usersGraph/ListUser.vue";
import FormUserGraph from "../components/pages/usersGraph/FormUser.vue";

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
    { path: "/usuarios-graph", component: ListUserGraph },
    { path: "/usuarios-graph/crear", component: FormUserGraph, props: { title: "Crear" } },
    {
        path: "/usuarios-graph/:id",
        component: FormUser,
        props: (route) => ({
            id: route.params.id,
            title: "Ver",
            disabled: true
        }),
    },
    {
        path: "/usuarios-graph/:id/editar",
        component: FormUserGraph,
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
