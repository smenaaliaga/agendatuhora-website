<template>
    <div>
        <div class="space-init" />
        <v-container>
            <v-row>
                <v-col cols="3">
                    <div align="center">
                            <v-list-item-avatar :size="150">
                                <img :src="profesional.avatar">
                            </v-list-item-avatar>
                        <div class="title font-weight-regular">
                            {{ profesional.nombre }}
                        </div>
                        <div style="height: 5px" />
                        <div class="font-weight-bold">
                            {{ profesional.profesion }}
                        </div> 
                        <div class="font-weight-light">
                            {{ profesional.comuna }}
                        </div>
                    </div>
                    <div class="space-bio" />
                    <v-divider />
                    <div class="space-bio" />
                    <div align="justify" class="caption">
                        {{ profesional.bio }}
                    </div>
                </v-col>
                <v-col cols="1" />
                <v-col cols="5">

<v-card>
    <v-tabs fixed-tabs color="#007C92" >
        <v-tab>
            <v-icon>mdi-calendar</v-icon>
        </v-tab>

        <v-tab>
            <v-icon>mdi-clock</v-icon>
        </v-tab>
    

        <v-tab-item>

<v-date-picker
      v-model="date"
      full-width
      color="#007C92" 
      :landscape="$vuetify.breakpoint.smAndUp"
    ></v-date-picker>       

        </v-tab-item>

        <v-tab-item>

<v-time-picker
      v-model="time"
      color="#007C92" 
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
      :landscape="$vuetify.breakpoint.mdAndUp"
      full-width
      format="24hr"
      scrollable
      min="9:30"
      max="22:15"
    ></v-time-picker>

        </v-tab-item>

    </v-tabs>
</v-card>





                </v-col>
                <v-col cols="1" />
                <v-col cols="2">

                    <div align="center">

                        <div style="height: 50px" />

                        <div class="subtitle font-weight-regular">
                            Fecha
                        </div>

                        <div style="height: 5px" />

                        <div class="title font-weight-bold">
                            Lunes 13 de Julio
                        </div>

                        <div style="height: 30px" />

                        <div class="subtitle font-weight-regular">
                            Hora
                        </div>

                        <div style="height: 5px" />

                        <div class="title font-weight-bold">
                            13:30
                        </div>

                        <div style="height: 50px" />

                        <v-btn dark color="primary">Siguiente</v-btn>
                    </div>


                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Hora',
    data(){
        return {
            id: this.$route.params.id,

            date: new Date().toISOString().substr(0, 10),
            time: '13:30',
            timeStep: '10:10',
        }
    },
    created(){
        this.getProfesional(this.id)
    },
    methods: {
        ...mapActions(['getProfesional']),


        allowedHours: v => v % 2,
        allowedMinutes: v => v >= 10 && v <= 50,
        allowedStep: m => m % 10 === 0,
    },
    computed: {
        ...mapState(['profesional']),

    }
}
</script>

<style scoped>
.space-init {
  height: 20px;
}
.space-bio {
    height: 15px;
}
</style>