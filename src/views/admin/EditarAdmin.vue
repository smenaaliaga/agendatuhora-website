<template>
    <v-container>
        <div class="space" />
        <h1>Editar</h1>
        <div class="space" />
        <p>id:  {{ profesional.id }}</p>
        <form @submit.prevent="editar">
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
import { mapState, mapActions } from 'vuex'

export default {
    name: 'EditarAdmin',
    data() {
        return {
            id: this.$route.params.id,
        }
    },
    created() {
        this.getProfesional(this.id)
    },
    methods: {
        ...mapActions(['getProfesional','editProfesional']),
        editar(){
            this.editProfesional(this.profesional).then(() => {
                this.$router.push({name: 'profesionalesadmin'})
            })
        }
    },
    computed: {
        ...mapState(['profesional'])
    }
}
</script>