<template>
  <v-container>
    <div style="height: 20px;" />
    <v-row>
      <v-col cols="12" sm="4">
        <h2 class="text-center">¡Estas a un paso!</h2>
        <div style="height: 30px;"/>

        Te atenderás con
        <div style="height: 15px;"/>

        <strong>Nombre:</strong> {{ profesional.nombre }} {{ profesional.apellido }}
        <div style="height: 3px;"/>
        <strong>Profesión:</strong> {{ profesional.profesion }}
        <div style="height: 15px;"/>
        El día y la hora
        <div style="height: 15px;"/>
        <strong>Fecha:</strong> {{ $route.params.fecha }}
        <div style="height: 3px;"/>
        <strong>Hora:</strong> {{ $route.params.hora }}
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
              v-model="datosUsuario.direccion"
              label="Direccion"
              required
          ></v-text-field>
          <div align="center">
            <v-btn type="submit" dark color="success">Confirmar hora</v-btn>
          </div>
        </form>
      </v-col>
    </v-row>


    <v-dialog v-model="fin" persistent max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
        </v-card-title>
        <div class="text-center">
          <v-icon x-large class="icon" style="color: green;">mdi-check-all</v-icon>
          <div style="height:10px;" />
          <h3>¡Felicidades, se ha procesado tu hora médica a domicilio!</h3>
          <div style="height:20px;" />
          Has agendado con {{ profesional.nombre }} {{ profesional.apellido }} 
          <div style="height:5px;" />
          De profesión {{ profesional.profesion }}
          <div style="height:15px;" />
          Te visitará la fecha de {{ $route.params.fecha }} y hora {{ $route.params.hora }} 
          <div style="height:15px;" />
          La visita se realizará en la dirección {{ this.datosUsuario.direccion }}
          <div style="height:20px;" />
          <strong>¡Pronto te contactaremos!</strong>
          <div style="height:20px;" />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="fin = false">btn</v-btn>
          <v-btn color="blue darken-1" text @click="inicio()">Volver al inicio</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Confirmar',
  data(){
    return{
      fin: false
    }
  },  
  methods: {
    ...mapActions(['cerrarSesion','getProfesional','setearLogin','getDatosUsuario','agregarAgenda']),
    agendar(){
      /*
      this.agregarAgenda({
        id_profesional: this.$route.params.id,
        id_paciente: this.datosUsuario.uid,
        nombre_paciente: this.datosUsuario.nombre,
        email_paciente: this.datosUsuario.email,
        direccion_paciente: this.datosUsuario.direccion,
        comuna_paciente: this.ubicaciones.comuna,
        fecha: this.$route.params.fecha,
        hora: this.$route.params.hora
      })
      .then(() => {
        this.fin = true
      })
      */
      this.fin = true
    }
  },
  inicio(){
    this.fin = true
    this.$router.push({name: 'home'})
  },
  computed: {
    ...mapState(['profesional','usuario','datosUsuario','ubicaciones']),
    ...mapGetters(['existeUsuario']),
  },
  created(){
    this.getProfesional(this.$route.params.id)
  },
}
</script>