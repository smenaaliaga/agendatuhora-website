<template>
    <div>
        <div style="margin-top: -25px;" />
        <h4 class="text-center">Escoge un profesional</h4>
        <div style="height:10px" />
        <div v-for="profesional in profesionales_mostrar" v-bind:key="profesional.id">
            <v-card class="mx-auto" max-width="700">
                <v-container>
                    <v-row justify="space-between">
                        <v-col cols="4" sm="2">
                            <v-avatar :size="!mobile ? 100 : 60">
                                <img :src="profesional.avatar">
                            </v-avatar>
                        </v-col>
                        <v-col cols="8" sm="4">
                            <div align="right">
                                <div :class="!mobile ? 
                                    'title font-weight-regular' : 
                                    'body-1 font-weight-regular'">
                                    {{ profesional.nombre }} {{ profesional.apellido }}
                                </div>
                                <div :class="!mobile ? 
                                    'font-weight-bold' : 
                                    'body-2 font-weight-bold'">
                                    {{ profesional.profesion }} 
                                </div> 
                                <div :class="!mobile ? 
                                    'font-weight-bold' : 
                                    'body-2 font-weight-light'">
                                    {{ profesional.comuna }}
                                </div>
                            </div>
                        </v-col>
                        <v-col :hidden="!mobile ? false : true" cols="12" sm="6">
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
            <div class="space-cards" />
        </div>

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'TarjetaProfesionales',
    props: ['mobile','search'],
    inject: ['theme'],
    data: () => ({
      profesionales_mostrar: []
    }),
    created(){
        if(this.profesionales_select.length > 0){
            this.profesionales_mostrar = this.profesionales_select
        }else{
            this.profesionales_mostrar = this.profesionales
        }
    },
    computed: {
        ...mapState(['profesionales','profesionales_select']),
    },
    methods: {
        ...mapActions(['getProfesionales','getProfesionalesPorComuna']),
        goProfesional(id) {
            this.$router.push({name: 'hora', params: {id: id} })
        }
    }
}
</script>

<style scoped>
.space-cards {
  height: 10px;
}
div.inline { float:left; }
.clearBoth { clear:both; }
</style>