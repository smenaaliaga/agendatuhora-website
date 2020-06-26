import Home from '@/views/Home.vue';
import Profesionales from '@/views/Profesionales';

export const routes = [
    {
        path: '/', 
        name: 'home',
        component: Home
    },
    {
        path: '/profesionales', 
        name: 'profesionales',
        component: Profesionales
    }
];