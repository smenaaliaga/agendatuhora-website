import Home from './views/Home.vue';
import Profesionales from './views/Profesionales';
import Hora from './views/Hora';
import Confirmar from './views/Confirmar';

// Usuario
import Sesion from './views/user/Sesion';

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
    },
    {
        path: '/profesionales/confirmar/:id', 
        name: 'confirmar',
        component: Confirmar
    },
    // Usuario
    {
        path: '/sesion', 
        name: 'sesion',
        component: Sesion,
        meta: { requiresAuth: true }
    }
];
