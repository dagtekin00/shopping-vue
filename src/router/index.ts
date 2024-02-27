import { createRouter, createWebHistory } from "vue-router"
import Home from "../pages/HomePage.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// router.beforeEach((to, from, next) => {
//     // Render öncesi olacak kontroller
//     next()
// })

export default router
