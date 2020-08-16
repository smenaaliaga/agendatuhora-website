import Vue from 'vue'
import Vuex from 'vuex'
import { db, auth } from '../firebase'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex);

export const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        select_comuna: { comuna: 'Viña del Mar', abbr: 'VDM' },
        ubicaciones: [
            { comuna: 'Viña del Mar', abbr: 'VDM' },
            { comuna: 'Reñaca', abbr: 'RÑC' },
            { comuna: 'Con Con', abbr: 'CNCN' },
            { comuna: 'Quilpué', abbr: 'QLP' },
            { comuna: 'Villa Alemana', abbr: 'VLN' },
        ],
        // Dialogs
        login: false,
        // Usuarios
        usuario: null,
        datosUsuario: {  uid: '', email: '', nombre: '', comuna: '',  direccion: ''},
        error: null,
        // Profesionales
        profesionales: [],
        profesional: { id: '', nombre: '', apellido: '', profesion: '', comuna: '', avatar: '', bio: '', dias_disponibles: '', hora_inicio: '', hora_fin: ''}
    },
    mutations: {
        // Mutaciones Comuna Seleccionada
        setComunaSeleccionada(state, payload){
            state.select_comuna = payload
        },
        // Mutaciones Login
        setLogin(state, payload){
            state.login = payload
        },
        // Mutaciones de Usuarios
        setUsuario(state, usuario){
            state.usuario = usuario
        },
        setDatosUsuario(state, datosUsuario){
            state.datosUsuario = datosUsuario
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
        //
        // COMUNA SELECCIONADA
        //
        setearComunaSeleccionada({commit}, select_comuna){
            commit('setComunaSeleccionada', select_comuna)
        },
        //
        // USUARIOS
        //
        setearLogin({commit}, bool){
            commit('setLogin', bool)
        },
        //
        // USUARIOS
        //
        // Actions Crear Usuarios
        crearUsuario({commit}, dataUser){
            auth.createUserWithEmailAndPassword(dataUser.email, dataUser.password)
                .then(res => {
                    const usuario = {
                        uid: res.user.uid,
                        email: res.user.email
                    }
                    db.collection('usuarios').add({
                        uid: res.user.uid,
                        email: res.user.email,
                        nombre: dataUser.nombre,
                        direccion: dataUser.direccion,
                        comuna: dataUser.comuna
                    })
                    commit('setUsuario', usuario)
                  }).catch(error => {
                    commit('setError',error)
                })
        },
        // Obtener usuario con Login
        getDatosUsuario({commit, state}){
            let uid = state.usuario.uid
            console.log(uid)
            const datos = null
            db.collection('usuarios').where("uid", "==", uid).get()
            .then(res => {
                res.forEach(doc => {
                    let user = doc.data()
                    user.id =  doc.id
                    datos.push(user)
                })
                commit('setDatosUsuario', datos)
            })
        },
        // Action Ingresar Usuario
        ingresoUsuario({commit}, user){
            auth.signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                db.collection('usuarios').where("uid", "==", res.user.uid).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(function(doc) {
                        let user = doc.data()
                        user.id =  doc.id
                        const usuario = {
                            uid: res.user.uid,
                            email: res.user.email,
                            nombre: user.nombre,
                            comuna: user.comuna,
                            direccion: user.direccion
                        }
                        commit('setDatosUsuario', usuario)
                    })
                })
                .catch(error => {
                    commit('setError',error)
                })
            })
            .catch(error => {
                commit('setError', error)
            })
        },
        // Action Cerrar Sesion
        cerrarSesion({commit}){
            auth.signOut()
            sessionStorage.clear()
            commit('setDatosUsuario', { uid: '', email: '', nombre: '', comuna: '',  direccion: '' })
        },
        detectarUsuario({commit}, usuario){
            commit('setUsuario', usuario)
        },
        //
        // PROFESIONALES
        //
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
                bio: profesional.bio,
                dias_disponibles: profesional.dias_disponibles,
                hora_inicio: profesional.hora_inicio,
                hora_fin: profesional.hora_fin
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
                bio: profesional.bio,
                dias_disponibles: profesional.dias_disponibles,
                hora_inicio: profesional.hora_inicio,
                hora_fin: profesional.hora_fin
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
        },
        //
        // AGENDAR
        //
        // Agregar Agenda Medica
        agregarAgenda({commit}, agenda){
            db.collection('agendas').add({
                id_profesional: agenda.id_profesional,
                id_paciente: agenda.id_paciente,
                nombre_paciente: agenda.nombre_paciente,
                email_paciente: agenda.email_paciente,
                direccion_paciente: agenda.direccion_paciente,
                fecha: agenda.fecha,
                hora: agenda.hora
            })
            .then(() => {
                commit('aux', agenda)
            })
        },
    },
    getters: {
        existeUsuario(state){
            if(state.usuario === null){
                return false
            }else{
                return true
            }
        }
    }
});
