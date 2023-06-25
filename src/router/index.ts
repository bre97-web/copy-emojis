import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";



const routes: RouteRecordRaw[] = [
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'class'
})

export default router
