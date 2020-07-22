<template>
    <v-container>
        <div class="space" />
        <h2>Editar Profesional</h2>
        <div class="space" />
        <p class="text--secondary">id:  {{ profesional.id }}</p>
        <form @submit.prevent="editar">   
            <v-row>
                <v-col cols="12" sm="3">
                    <v-text-field
                        v-model="profesional.nombre"
                        label="Nombre"
                        prepend-icon="mdi-account-edit"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                    <v-text-field
                        v-model="profesional.apellido"
                        label="Apellido"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="profesional.profesion"
                        label="Profesion"
                        prepend-icon="mdi-doctor"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                        v-model="profesional.comuna"
                        :items="ubicaciones"
                        item-text="comuna"
                        item-value="comuna"
                        menu-props="auto"
                        label="Comuna"
                        persistent-hint
                        prepend-icon="mdi-map-marker"
                        single-line
                        size="1px"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="profesional.avatar"
                        label="Avatar"
                        prepend-icon="mdi-camera"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                    <v-textarea
                        v-model="profesional.bio"
                        prepend-icon="mdi-account-details"
                        label="Bio"
                        rows="2"
                        required
                    ></v-textarea>
                </v-col>
                <v-btn color="primary" type="submit">Editar</v-btn>
            
            </v-row>
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
        ...mapState(['profesional','ubicaciones'])
    }
}
</script>