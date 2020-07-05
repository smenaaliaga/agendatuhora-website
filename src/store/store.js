import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '@/firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        select: { comuna: 'Viña del Mar', abbr: 'VDM' },
        items: [
            { comuna: 'Valparaíso', abbr: 'VLP' },
            { comuna: 'Viña del Mar', abbr: 'VDM' },
            { comuna: 'Reñaca', abbr: 'RÑC' },
            { comuna: 'Con Con', abbr: 'CNCN' },
            { comuna: 'Quilpué', abbr: 'QLP' },
            { comuna: 'Villa Alemana', abbr: 'VLN' },
        ],
        profesionales: [
            { id: 0, nombre: 'Ivo Carvallo', profesion: 'Veterinario', comuna: 'Valparaíso', bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"},
            { id: 1, nombre: 'Eduardo Garcia', profesion: 'Kinesiologo', comuna: 'Viña del Mar', bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"},
            { id: 2, nombre: 'Yessica Sanchez', profesion: 'Tec. Enfermeria', comuna: 'Viña del Mar', bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"},
            { id: 3, nombre: 'Pedro Barrientos', profesion: 'Psicologo', comuna: 'Valparaíso', bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"},
            { id: 4, nombre: 'Angelica Roman', profesion: 'Enfermera', comuna: 'Quilpué', bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"},
            { id: 5, nombre: 'Veronica Olivares', profesion: 'Kinesiologa', comuna: 'Villa Alemana', bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"},
        ],
        ubicaciones: []
    },
    mutations: {
        setUbicaciones(state, payload) {
            state.ubicaciones = payload
        }
    },
    actions: {
        getUbicaciones({commit}) {
            const ubicaciones = []
            db.collection('ubicaciones').get()
            .then(res => {
                res.forEach(doc =>{
                    let ubicacion = doc.data()
                    ubicacion.region  =doc.region
                    ubicacion.comuna = doc.comuna
                    ubicaciones.push(ubicacion)
                })
                commit('setUbicaciones', ubicaciones)
            })
        }
    },
    getters: {
        getProfesionalById: (state) => (id) => {
          return state.profesionales.find(profesionales => profesionales.id === id)
        }
    }
});
