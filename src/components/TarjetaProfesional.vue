<template>
    <div>
        <div v-for="(profesional, index) in profesionales" v-bind:key="index">
            <v-card
                class="mx-auto"
                max-width="600"
                outlined
            >
                <v-container>
                <v-row justify="space-between">
                    <v-col cols="2">
                    <v-avatar 
                        :size="85"
                        rounded
                        color="grey"
                        >
                    </v-avatar>
                    </v-col>
                    <v-col cols="6">
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">
                            {{profesional.nombre}}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{profesional.profesion}} - Especialista en {{profesional.especialidad}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    </v-col>
                    <v-col cols="4">
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="space-button" />
                    <v-btn
                        text
                        color="#0C7471"
                    >
                        Agendar hora
                    </v-btn>
                    </v-card-actions>
                    </v-col>
                </v-row>
                </v-container>
            </v-card>

            <div v-if="index == 2"><div id="trigger"></div></div>

            <div class="space-cards" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
    ...mapState(['profesionales'])
  }
}
</script>

<style scoped>
.space-cards {
  height: 10px;
}
</style>