<template>
  <v-container>
    <div style="height: 20px;" />
    <v-row>
      <v-col cols="12" sm="4">
        <h2 class="text-center">¡Último paso!</h2>
        <div style="height: 30px;"/>
          Te atenderás con
          <div style="height: 15px;"/>
          <ul>
            <strong>Nombre:</strong> {{ profesional.nombre }} {{ profesional.apellido }}
            <div style="height: 3px;"/>
            <strong>Profesión:</strong> {{ profesional.profesion }}
          </ul>
          <div style="height: 15px;"/>
          El día y la hora
          <div style="height: 15px;"/>
          <ul>
            <strong>Fecha:</strong> {{ $route.params.fecha }}
            <div style="height: 3px;"/>
            <strong>Hora:</strong> {{ $route.params.hora }}
          </ul>
      </v-col>
      <v-col cols="12" sm="4">
        <h3 v-if="!existeUsuario">Confirma tu hora solo iniciando sesión</h3>
        <h3 v-if="existeUsuario" class="text-center">Ha iniciado sesión</h3>
        <div class="text-center">
          <div style="height: 20px;"/>
          <v-btn rounded
            v-if="!existeUsuario"
            color="#f1e345"
            light 
            @click="setearLogin(true)"
          >
            <v-icon class="icon">mdi-account</v-icon>
            <span class="mr-2">Tu Usuario</span>
          </v-btn>
          <v-btn text small color="error" 
            v-if="existeUsuario"
            @click="cerrarSesion">
            <v-icon small class="icon">mdi-logout</v-icon><span class="text">Cerrar Sesion</span>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <h3>Confirma tu hora ingresando tus datos</h3>
        <form @submit.prevent="agendar()">
          <v-select
            v-model="modalidad_select"
            :items="modalidad"
            :disabled="['Técnico en enfermería','Kinesiología','Enfermería','Psicología'].indexOf(profesional.profesion) > -1 ? true : false"
            label="Selecciona tu modalidad"
            :rules="[(v) => !!v || 'Modalidad requerida']"
            required
            @change="selectOnline()"
          >
          </v-select>
          <v-text-field
              v-model="datosUsuario.nombre"
              label="Nombre"
              required
          ></v-text-field>
          <v-text-field
              v-model="datosUsuario.email"
              label="Email"
              required
          ></v-text-field>
          <v-text-field
              v-model="datosUsuario.telefono"
              label="Telefono"
              required
          ></v-text-field>
          <v-text-field
              :disabled="modalidad_select != 'Online (Videollamada)' ? false : true"
              v-show="modalidad_select != 'Online (Videollamada)' ? true : false"
              v-model="datosUsuario.direccion"
              label="Direccion"
              required
          ></v-text-field>
          <div align="center">
            <v-btn type="submit" color="success" :disabled="!online ? true : false">Confirmar hora</v-btn>
            <div style="height: 20px" />
            <v-btn @click="$router.go(-1) " text color="error"><v-icon small class="icon">mdi-arrow-left</v-icon> Voler</v-btn>
            <div style="height: 80px" />
          </div>
        </form>
      </v-col>
    </v-row>


    <v-dialog v-model="fin" persistent overlay-opacity=".95" max-width="600">
      <v-card>
        <v-card-title class="headline">
        </v-card-title>
        <div class="text-center">
          <icon-base width="250" height="80" icon-name="SEMID"><icon-Semid /></icon-base>
        </div>
          <div style="height:10px;" />
          <h3 class="text-center">¡Felicidades!</h3>
          <h3 class="text-center">Hora procesada</h3>
          <div style="height:20px;" />
          <ul>
            Has agendado con: <strong>{{ profesional.nombre }} {{ profesional.apellido }} </strong>
            <div style="height:12px;" />
            De profesión: <strong>{{ profesional.profesion }}</strong>
            <div style="height:12px;" />
            Fecha de visita: <strong>{{ $route.params.fecha }} </strong>
            <div style="height:12px;" />
            Hora de visita: <strong>{{ $route.params.hora }} </strong>
            <div style="height:12px;" />
            Modalidad de visita: <strong>{{ modalidad_select }}</strong>
            <div v-if="modalidad_select == 'Visita a domicilio'"> 
              <div style="height:12px;" />
              Dirección de visita: <strong>{{ this.datosUsuario.direccion }}</strong>
            </div>
          </ul>
          <div style="height:30px;" />
          <div class="text-center">
            <strong>¡Pronto te contactaremos!</strong>
          </div>
          <div style="height:20px;" />
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="inicio()">Volver al inicio</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import IconBase from '../components/IconBase'
import IconSemid from '../components/icons/IconSemid'

export default {
  name: 'Confirmar',
  components: {
    IconBase,
    IconSemid
  },
  data(){
    return{
      fin: false,
      modalidad: ['Online (Videollamada)', 'Visita a domicilio'],
      modalidad_select: null,
      online: false
    }
  },  
  methods: {
    ...mapActions(['cerrarSesion','getProfesional','setearLogin','getDatosUsuario','agregarAgenda']),
    agendar(){
      this.agregarAgenda({
        id_profesional: this.$route.params.id,
        id_paciente: this.datosUsuario.uid,
        modalidad: this.modalidad_select,
        nombre_paciente: this.datosUsuario.nombre,
        email_paciente: this.datosUsuario.email,
        telefono_paciente: this.datosUsuario.telefono,
        direccion_paciente: this.datosUsuario.direccion,
        comuna_paciente: this.ubicaciones.comuna,
        fecha: this.$route.params.fecha,
        hora: this.$route.params.hora
      })
      .then(() => {
        this.fin = true
      })
    },
    inicio(){
      this.fin = false
      this.$router.push({name: 'home'})
    },
    selectOnline(){
      if(this.modalidad_select == 'Online (Videollamada)'){
        this.datosUsuario.direccion = null
        this.online = true
      }else{
        this.online = true
      }
    }
  },
  computed: {
    ...mapState(['profesional','usuario','datosUsuario','ubicaciones']),
    ...mapGetters(['existeUsuario'])
  },
  created(){
    this.getProfesional(this.$route.params.id)
    if(this.profesional.profesion ==  'Psicología'){
      this.modalidad_select = 'Online (Videollamada)'
    }
    if(['Técnico en enfermería','Kinesiología','Enfermería'].indexOf(this.profesional.profesion) > -1){
      this.modalidad_select = 'Visita a domicilio'
    }
    if(['Técnico en enfermería','Kinesiología','Enfermería','Psicología'].indexOf(this.profesional.profesion) > -1){
      this.online = true
    }
  },
}
</script>