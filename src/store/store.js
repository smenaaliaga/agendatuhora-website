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
        select_prof: null,
        profesiones: [
            { header: 'También buscar por el nombre del profesional' },
            'Kinesiología',
            'Medicina',
            'Enfermería',
            'Técnico en enfermería',
            'Psicología',
            'Nutrición',
            'Fonoaudiología'
        ],
        // Dialogs
        login: false,
        // Loading
        loading: true,
        // Usuarios
        usuario: null,
        datosUsuario: { uid: '', email: '', telefono: '', nombre: '', comuna: '',  direccion: '' },
        error: null,
        // Profesionales
        profesionales: [],
        profesional: { id: '', nombre: '', apellido: '', profesion: '', comuna: '', avatar: '', bio: '', dias_disponibles: '', hora_inicio: '', hora_fin: ''            }
    },
    mutations: {
        // Mutaciones Comuna Seleccionada
        setSelect_comuna(state, payload){
            state.select_comuna = payload
        },
        // Mutaciones Profesion Seleccionada
        setSelect_profesion(state, payload){
            state.select_prof = payload
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
        // Mutaciones Profesion Seleccionada
        setLoading(state, payload){
            state.loading = payload
        },
        aux(){}, // Void auxiliar
    },
    actions: {
        //
        // COMUNA SELECCIONADA
        //
        setearComunaSeleccionada({commit}, abbr){
            var resultObject = null

            for (var i=0; i < this.state.ubicaciones.length; i++) {
                if (this.state.ubicaciones[i].abbr === abbr) {
                    resultObject =  this.state.ubicaciones[i];
                }
            }
            
            commit('setSelect_comuna', resultObject)
        },
        //
        // PROFESION SELECCIONADA
        //
        setearProfesionSeleccionada({commit}, arreglo_de_buscados){
            commit('setSelect_profesion', arreglo_de_buscados)

            const profesionales = []

            if(arreglo_de_buscados.length == 0){

                db.collection('profesionales').get()
                .then(res => {
                    res.forEach(doc =>{
                        let profesional = doc.data()
                        profesional.id = doc.id
                        profesionales.push(profesional)
                    })
                    commit('setProfesionales', profesionales)
                })

            }else{

                arreglo_de_buscados.forEach(element => {
                    db.collection('profesionales').where('profesion', '==',element).get()
                    .then(res => {
                        res.forEach(doc =>{
                            let profesional = doc.data()
                            profesional.id = doc.id
                            profesionales.push(profesional)
                        })
                        commit('setProfesionales', profesionales)
                    })
                })

            }
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
                    const datosUsuario = {
                        uid: res.user.uid,
                        email: res.user.email,
                        telefono: dataUser.telefono,
                        nombre: dataUser.nombre,
                        comuna: dataUser.comuna,
                        direccion: dataUser.direccion
                    }
                    db.collection('usuarios').add({
                        uid: res.user.uid,
                        email: res.user.email,
                        nombre: dataUser.nombre,
                        direccion: dataUser.direccion,
                        comuna: dataUser.comuna
                    })
                    commit('setUsuario', usuario)
                    commit('setDatosUsuario', datosUsuario)
                  }).catch(error => {
                    commit('setError',error)
                })
        },
        // Obtener usuario con Login
        getDatosUsuario({commit, state}){
            let uid = state.usuario.uid
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
                            telefono: user.telefono,
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
            commit('setDatosUsuario', { uid: '', email: '', telefono: '', nombre: '', comuna: '',  direccion: '' })
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
        getProfesionalesPorComunaSearch({commit}, search) {
            const profesionales = []
            db.collection('profesionales').where('comuna', '==',this.state.select_comuna.comuna)
            .where('nombre', 'like', search).get()
            .then(res => {
                res.forEach(doc =>{
                    let profesional = doc.data()
                    profesional.id = doc.id
                    profesionales.push(profesional)
                })
                commit('setProfesionales', profesionales)
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
            .then(() => {
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
            var today = new Date()
            db.collection('agendas').add({
                id_profesional: agenda.id_profesional,
                id_paciente: agenda.id_paciente,
                modalidad: agenda.modalidad,
                nombre_paciente: agenda.nombre_paciente,
                email_paciente: agenda.email_paciente,
                telefono_paciente: agenda.telefono_paciente,
                direccion_paciente: agenda.direccion_paciente,
                fecha: agenda.fecha,
                hora: agenda.hora,
                fecha_creacion: today,
                confirmado: false
            })
            .then(() => {
                commit('aux', agenda)
            })
        },
        //
        // COMUNA SELECCIONADA
        //
        setearLoading({commit}){           
            commit('setLoading', true)
            setTimeout(() => commit('setLoading', false), 1800)
        }
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
