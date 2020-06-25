import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        select: { state: 'Viña del Mar', abbr: 'VDM' },
        items: [
            { comuna: 'Valparaíso', abbr: 'VLP' },
            { comuna: 'Viña del Mar', abbr: 'VDM' },
            { comuna: 'Reñaca', abbr: 'RÑC' },
            { comuna: 'Con Con', abbr: 'CNCN' },
            { comuna: 'Quilpué', abbr: 'QLP' },
            { comuna: 'Villa Alemana', abbr: 'VLN' },
        ],
        profesionales: [
            { nombre: 'Ivo Carvallo', profesion: 'Veterinario', especialidad: 'Caballos'},
            { nombre: 'Eduardo Garcia', profesion: 'Kinesiologo', especialidad: 'Algo'},
            { nombre: 'Yessica Sanchez', profesion: 'Tec. Enfermeria', especialidad: 'Algo'},
            { nombre: 'Pedro Barrientos', profesion: 'Psicologo', especialidad: 'Algo'},
            { nombre: 'Angelica Roman', profesion: 'Enfermera', especialidad: 'Algo'},
            { nombre: 'Veronica Olivares', profesion: 'Kinesiologa', especialidad: 'Algo'},
        ]
    },
});
