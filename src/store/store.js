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
        // VARIABLES DE AMBIENTES
        ubicaciones: {},
        profesiones: [],
        // VARIABLES SELECCIONADAS
        profesiones_select: [],
        profesionales_select: [],
        // Dialogs
        login: false,
        // Usuarios
        usuario: null,
        datosUsuario: null,
        error: null,
        // Profesionales
        profesionales: [],
        profesional: {},
        // Variables de Ambiente
        sesion_iniciada: false,
        sesion_cerrada: false,
        sesion: false
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
        // Mutaciones Variables de ambientes
        set_sesion_iniciada(state, payload){
            state.sesion_iniciada = payload
        },
        set_sesion_cerrada(state, payload){
            state.sesion_cerrada = payload
        },
        set_sesion(state, payload){
            state.sesion = payload
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
        // Mutaciones Variables de Ambiente
        setProfesiones(state, payload){
            state.profesiones = payload
        },
        setUbicaciones(state, payload){
            state.ubicaciones = payload
        },
        // Mutaciones Variables Seleccionadas
        setProfesiones_Select(state, payload){
            state.profesiones_select = payload
        },
        setProfesionales_select(state, payload){
            state.profesionales_select = payload
        },
        aux(){}, // Void auxiliar
    },
    actions: {
        //
        // COMUNA SELECCIONADA
        //
        /*
        setearComunaSeleccionada({commit}, abbr){
            var resultObject = null

            for (var i=0; i < this.state.ubicaciones.length; i++) {
                if (this.state.ubicaciones[i].abbr === abbr) {
                    resultObject =  this.state.ubicaciones[i];
                }
            }
            
            commit('setSelect_comuna', resultObject)
        },
        */
        //
        // PROFESION SELECCIONADA
        //
        setProfesionales_select({commit}, palabras_buscadas){
            let profesionales_select = []
            for(let i=0; i < this.state.profesionales.length; i++){
                for(let j=0; j < palabras_buscadas.length; j++){
                    if(this.state.profesionales[i].profesion.match(palabras_buscadas[j])
                    || this.state.profesionales[i].nombre.match(palabras_buscadas[j])
                    || this.state.profesionales[i].apellido.match(palabras_buscadas[j])){
                        profesionales_select.push(this.state.profesionales[i]);
                    }
                }
            }
            function onlyUnique(value, index, self) { 
                return self.indexOf(value) === index;
            }
            if(profesionales_select.length > -1)
                profesionales_select = profesionales_select.filter(onlyUnique)
            commit('setProfesionales_select', profesionales_select)
        },
        //
        // VARIABLES DE AMBIENTE
        //
        setearLogin({commit}, bool){
            commit('setLogin', bool)
        },
        setear_sesion_iniciada({commit}, bool){
            commit('set_sesion_iniciada', bool)
        },
        setear_sesion_cerrada({commit}, bool){
            commit('set_sesion_cerrada', bool)
        },
        setear_sesion({commit}, bool){
            commit('set_sesion', bool)
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
                    querySnapshot.forEach( function(doc) {
                        let user = doc.data()
                        user.id =  doc.id
                        const usuario = {
                            // uid: res.user.uid,
                            // email: res.user.email,
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
            commit('setDatosUsuario', null)
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
            for(let i=0; i < this.state.profesionales.length; i++){
                if(this.state.profesionales[i].id === idProfesional){
                    commit('setProfesional', this.state.profesionales[i])
                }
            }
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
        },
        //
        // VARIABLES DE AMBIENTE
        //
        getProfesiones({commit}) {
            db.collection('selecciones').doc('nbCVBx2SBMr7mCjlnqhE').get()
            .then(res => {
                commit('setProfesiones', res.data().profesiones)
            })
        },
        getUbicaciones({commit}) {
            let ubicaciones = []
            db.collection('selecciones').doc('0TEQRfHc4Ri5OrE06Uln').get()
            .then(res => {
                ubicaciones = res.data().ubicaciones
                commit('setUbicaciones', ubicaciones)
            })
        },
        //
        // VARIABLES SELECCIONADAS
        //
        setProfesiones_Select({commit}, profesiones_select){
            commit('setProfesiones_Select', profesiones_select)
        },
    },
    getters: {
        existeUsuario(state){
            return state.sesion
        }
    }
});
