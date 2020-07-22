import Vue from 'vue'
import Vuex from 'vuex'
import { db, auth } from '../firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        select: { comuna: 'Viña del Mar', abbr: 'VDM' },
        ubicaciones: [
            { comuna: 'Valparaíso', abbr: 'VLP' },
            { comuna: 'Viña del Mar', abbr: 'VDM' },
            { comuna: 'Reñaca', abbr: 'RÑC' },
            { comuna: 'Con Con', abbr: 'CNCN' },
            { comuna: 'Quilpué', abbr: 'QLP' },
            { comuna: 'Villa Alemana', abbr: 'VLN' },
        ],
        // Usuarios
        usuario: { email: '', nombre: '', password: '' },
        error: null,
        // Profesionales
        profesionales: [],
        profesional: { id: '', nombre: '', apellido: '', profesion: '', comuna: '', avatar: '', bio: ''}
    },
    mutations: {
        // Mutaciones de Usuarios
        setUsuario(state, payload){
            state.usuario =payload
        },
        setError(state, payload){
            state.error = payload
        },
        // Mutaciones de Profesionales
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
        setEliminarProfesional(state, payload){
            state.profesionales = state.profesionales.filter(item => item.id !== payload)
        },
        aux(){} // Void auxiliar
    },
    actions: {
        // Actions Usuarios
        crearUsuario({commit}, usuario){
            auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
                .then(res => {
                    console.log(res)
                    const usuario = {
                        email: res.user.email,
                        uid: res.user.uid
                    }
                    commit('setUsuario', usuario)
                }).catch(error => {
                    console.log(error)
                    commit('setError',error)
                })
        },
        // Actions Profesionaes
        getProfesionales({commit}) {
            const profesionales = []
            db.collection('profesionales').get()
            .then(res => {
                res.forEach(doc =>{
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
                nombre: profesional.nombre,
                apellido: profesional.apellido,
                profesion: profesional.profesion,
                comuna: profesional.comuna,
                avatar: profesional.avatar,
                bio: profesional.bio
            }).then(() => {
                commit('aux', profesional)
            })
        },
        agregarProfesional({commit}, profesional){
            db.collection('profesionales').add({
                nombre: profesional.nombre,
                apellido: profesional.apellido,
                profesion: profesional.profesion,
                comuna: profesional.comuna,
                avatar: profesional.avatar,
                bio: profesional.bio
            })
            .then(doc => {
                console.log(doc.id)
                commit('aux', profesional)
            })
        },
        eliminarProfesional({commit}, id){
            db.collection('profesionales').doc(id).delete()
            .then(() => {
                commit('setEliminarProfesional', id)
            })
        }
    },
    modules:{
        
    }
});
