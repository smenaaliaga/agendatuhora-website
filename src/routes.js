import Home from './views/Home.vue';
import Profesionales from './views/Profesionales';
import Hora from './views/Hora';
import Confirmar from './views/Confirmar';

// Administracion
import EditarProfesional from './views/admin/EditarProfesional';
import ProfesionalesAdmin from './views/admin/ProfesionalesAdmin';
import AgregarProfesional from './views/admin/AgregarProfesional';

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
    // Administracion
    {
        path: '/admin/profesionales/editar/:id', 
        name: 'editarProfesional',
        component: EditarProfesional
    },
    {
        path: '/admin/profesionales/agregar', 
        name: 'agregarProfesional',
        component: AgregarProfesional
    },
    {
        path: '/admin/profesionales', 
        name: 'profesionalesadmin',
        component: ProfesionalesAdmin
    },
    // Usuario
    {
        path: '/sesion', 
        name: 'sesion',
        component: Sesion,
        meta: { requiresAuth: true }
    }
];
