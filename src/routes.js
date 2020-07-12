import Home from './views/Home.vue';
import Profesionales from './views/Profesionales';
import Hora from './views/Hora';

// Administracion
import EditarAdmin from './views/admin/EditarAdmin';
import ProfesionalesAdmin from './views/admin/ProfesionalesAdmin';

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
    // Administracion
    {
        path: '/admin/editar/:id', 
        name: 'editaradmin',
        component: EditarAdmin
    },
    {
        path: '/admin/profesionales', 
        name: 'profesionalesadmin',
        component: ProfesionalesAdmin
    }
];