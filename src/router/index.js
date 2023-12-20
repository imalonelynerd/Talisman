import {createRouter, createWebHistory} from 'vue-router'
import Setup from "@/views/Setup.vue";
import Duel from "@/views/Duel.vue";
import Results from "@/views/Results.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            name: 'Setup',
            component: Setup,
        },
        {
            path: '/duel',
            name: 'Duel',
            component: Duel,
        },
        {
            path: '/results',
            name: 'Results',
            component: Results,
        }
    ]
})