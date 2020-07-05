<template>
    <div>
        <div class="space-init" />
        <v-container>
            <v-row>
                <v-col cols="2" />
                <v-col cols="3">
                    <v-avatar 
                        :size="150"
                        rounded
                        color="grey"
                    >
                    </v-avatar>
                    <h2>{{ getProfesional.nombre }}</h2>
                    <h2>{{ getProfesional.profesion }}</h2>
                    <h2>{{ getProfesional.comuna }}</h2>
                </v-col>
                <v-col cols="6">
                </v-col>
                <v-col cols="1" />
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Hora',
    computed: {
    getProfesional() {
        return this.$store.getters.getProfesionalById(Number.parseInt(this.$route.params.id));
    },
        ...mapGetters[{getProfesional : 'getProfesionalById'}]
    }
}
</script>

<style scoped>
.space-init {
  height: 30px;
}
</style>