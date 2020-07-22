<template>
  <v-container>
        <div class="space" />
        <h2>Lista de Profesionales</h2>
        <div class="space" />
        <router-link :to="{name: 'agregarProfesional'}">
            <v-btn medium color="primary">Agregar</v-btn>
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
                <td class="text--secondary">{{ profesional.id }}</td>
                <td>{{ profesional.nombre }} {{ profesional.apellido }}</td>
                <td>{{ profesional.profesion }}</td>
                <td>{{ profesional.comuna }}</td>
                <td>
                    <v-btn color="green" dark
                    :to="{name: 'editarProfesional', params:{ id: profesional.id }}">
                        Editar
                    </v-btn>
                    <v-btn text small color="error" 
                    @click="eliminarProfesional(profesional.id)">Eliminar</v-btn>
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
        ...mapActions(['getProfesionales','eliminarProfesional'])
  }
}
</script>

<style>
.space {
    height: 20px;
}
</style>