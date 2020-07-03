import Home from './views/Home.vue';
import Profesionales from './views/Profesionales';
import Hora from './views/Hora';

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
    },
    {
        path: '/profesionales/hora/:id', 
        name: 'hora',
        component: Hora
    }
];