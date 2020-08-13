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
          <v-btn dark color="success">Confirmar hora</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Confirmar',
  methods: {
    ...mapActions(['cerrarSesion','getProfesional','setearLogin','getDatosUsuario'])
  },
  computed: {
    ...mapState(['profesional','usuario','datosUsuario']),
    ...mapGetters(['existeUsuario']),
  },
  created(){
    this.getProfesional(this.$route.params.id)
  },
}
</script>