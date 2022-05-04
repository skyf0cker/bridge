import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/home.vue';
import Login from '@/views/login.vue';
import Articles from '@/views/articles.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: "",
        name: "home",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/articles",
        name: "articles",
        component: Articles,
    }
]

export default routes 
