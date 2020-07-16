import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase'

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
        /*
        profesionales: [
            { id: 0, nombre: 'Mariano Carvallo', profesion: 'Doctor', comuna: 'Valparaíso', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"},
            { id: 1, nombre: 'Eduardo Garcia', profesion: 'Kinesiologo', comuna: 'Viña del Mar', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"},
            { id: 2, nombre: 'Yessica Sanchez', profesion: 'Tec. Enfermeria', comuna: 'Viña del Mar', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"},
            { id: 3, nombre: 'Pedro Barrientos', profesion: 'Psicologo', comuna: 'Valparaíso', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"},
            { id: 4, nombre: 'Angelica Roman', profesion: 'Enfermera', comuna: 'Quilpué', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg', bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"},
            { id: 5, nombre: 'Veronica Olivares', profesion: 'Kinesiologa', comuna: 'Villa Alemana', avatar: 'https://cdn.vuetifyjs.com/images/lists/8.jpg', bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"},
        ],
        */
        profesionales: [],
        profesional: { id: '', nombre: '', apellido: '', profesion: '', comuna: '', avatar: '', bio: ''}
    },
    mutations: {
        setProfesionales(state, profesionales){
            state.profesionales = profesionales
        },
        setProfesional(state, profesionales){
            state.profesional = profesionales
        },
        eliminarProfesional(state, id){
            state.profesionales = state.profesionales.filter( doc => {
                return doc.id != id
            })
        },
        aux(){} // Borrar luego de pillar el problema
    },
    actions: {
        getProfesionales({commit}) {
            const profesionales = []
            db.collection('profesionales').get()
            .then(res => {
                res.forEach(doc =>{
                    //console.log(doc.id)
                    //console.log(doc.data())
                    let profesional = doc.data()
                    profesional.id = doc.id
                    profesionales.push(profesional)
                    
                })
                commit('setProfesionales', profesionales)
            })
        },
        getProfesional({commit}, idProfesional) {
            db.collection('profesionales').doc(idProfesional).get()
            .then(doc => {
                let profesional = doc.data()
                profesional.id =  doc.id
                commit('setProfesional', profesional)
            })
        },
        editProfesional({commit}, profesional){
            db.collection('profesionales').doc(profesional.id).update({
                nombre: profesional.nombre
            }).then(() => {
                commit('aux', profesional)
            })
        }
    },
    modules:{
        
    }
});
