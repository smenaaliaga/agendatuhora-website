<template>
  <v-container>
        <div class="space" />
        <h1>Lista de Profesionales</h1>
        <div class="space" />
        <router-link :to="{name: 'agregar'}">
            <v-btn medium color="primary">Agregar Profesional</v-btn>
        </router-link>
        <div class="space" />
        <v-simple-table>
            <thead>
            <tr>
                <th class="text-left">id</th>
                <th class="text-left">Nombre</th>
                <th class="text-left">Profesión</th>
                <th class="text-left">Comuna</th>
                <th class="text-left">Acciones</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="profesional in profesionales" :key="profesional.id">
                <td>{{ profesional.id }}</td>
                <td>{{ profesional.nombre }} {{ profesional.apellido }}</td>
                <td>{{ profesional.profesion }}</td>
                <td>{{ profesional.comuna }}</td>
                <td>
                    <v-btn color="warning" dark
                    :to="{name: 'editaradmin', params:{ id: profesional.id }}">
                        Editar
                    </v-btn>
                    <v-btn text small color="error" @click="eliminarTarea(profesional.id)">Eliminar</v-btn>
                </td>
            </tr>
            </tbody>
        </v-simple-table>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
name: 'ProfesionalesAdmin',
created(){
    this.getProfesionales()
},
computed: {
    ...mapState(['profesionales']),
},
methods: {
    ...mapActions(['getProfesionales'])
  }
}
</script>

<style>
.space {
    height: 20px;
}
</style>