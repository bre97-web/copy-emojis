import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import HomePage from '@/views/HomePage.vue'
import Favorites from '@/views/Favorites.vue'


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/favorites',
        component: Favorites,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

export default router
