<template>
    <v-container>
        <div class="space" />
    <h1>Añadir profesional</h1>
        <div class="space" />
        <form @submit.prevent="agregar">
            <v-text-field
                v-model="profesional.nombre"
                label="Nombre"
                required
            ></v-text-field>
            <v-text-field
                v-model="profesional.apellido"
                label="Apellido"
                required
            ></v-text-field>
            <v-text-field
                v-model="profesional.profesion"
                label="Profesion"
                required
            ></v-text-field>

            <v-btn color="primary" type="submit">Editar</v-btn>
        </form>
    </v-container>
</template>

<script>
import {  mapActions } from 'vuex'

export default {
    name: 'EditarAdmin',
    data() {
        return {
            profesional: { id: '', nombre: '', apellido: '', profesion: '', comuna: '', avatar: '', bio: ''}
        }
    },
    created() {

},
    methods: {
        ...mapActions(['getProfesional','editProfesional']),
        agregar(){

        }
    },
    computed: {

    }
}
</script>