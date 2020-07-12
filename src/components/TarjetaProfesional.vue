<template>
    <div>
        
        <div v-for="profesional in profesionales" v-bind:key="profesional.id">
            <v-card
                class="mx-auto"
                max-width="600"
                outlined
            >
                <v-container>
                    <v-row justify="space-between">
                        <v-col cols="2">
                            <v-list-item-avatar :size="100">
                                <img :src="profesional.avatar">
                            </v-list-item-avatar>
                        </v-col>
                        <v-col cols="4">
                            <div align="right">
                                <div class="title font-weight-regular">
                                    {{ profesional.nombre }} {{ profesional.apellido }}
                                </div>
                                <div class="font-weight-bold">
                                    {{ profesional.profesion }}
                                </div> 
                                <div class="font-weight-light">
                                    {{ profesional.comuna }}
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <div class="caption">
                                {{profesional.bio}}
                            </div>
                        </v-col>
                    </v-row>
                    
                    <div align="right">
                        <v-divider></v-divider>
                        <v-btn @click="goProfesional(profesional.id)" text small color="primary"><strong>Agenda tu hora</strong></v-btn>
                    </div>
                </v-container>
            </v-card>

            <!--<div v-if="index == 2"><div id="trigger"></div></div>-->

            <div class="space-cards" />
        </div>
        
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
name: 'TarjetaProfesionales',
created(){
    this.getProfesionales()
},
computed: {
    ...mapState(['profesionales']),
},
methods: {
    ...mapActions(['getProfesionales']),
    goProfesional(id) {
        this.$router.push({name: 'hora', params: {id: id} });
    }
  }
}
</script>

<style scoped>
.space-cards {
  height: 10px;
}
</style>