<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="3">
                    <div align="center">
                        <v-row>
                            <v-col cols="4" sm="12">
                                <v-list-item-avatar :size="!this.mobile ? 120 : 90">
                                    <img :src="profesional.avatar">
                                </v-list-item-avatar>
                            </v-col>
                            <v-col cols="8" sm="12">
                                <div class="display-1 font-weight-regular">
                                    {{ profesional.nombre }}
                                </div>
                                <div style="height: 5px" />
                                <div class="font-weight-bold">
                                    {{ profesional.profesion }}
                                    <div class="font-weight-light" style="display:inline;"> - {{ profesional.comuna }} </div>
                                </div> 
                            </v-col>
                        </v-row>
                    </div>
                    <div class="space-bio" />
                    <v-divider />
                    <div class="space-bio" />
                    <div align="justify" class="caption">
                        {{ profesional.bio }}
                    </div>
                </v-col>
                <v-col cols="12" sm="1" />
                <v-col cols="12" sm="5">

                    <v-card>
                        <v-tabs fixed-tabs color="#007C92" v-model='tab'>
                            <v-tab ripple href='#tab-1'>
                                <v-icon>mdi-calendar</v-icon><span class="text"> Fecha</span>
                            </v-tab>

                            <v-tab ripple href='#tab-2'>
                                <v-icon>mdi-clock</v-icon><span class="text"> Hora</span>
                            </v-tab>

                            <v-tab-item value='tab-1'>
                                <v-date-picker
                                    v-model="date"
                                    full-width
                                    color="#007C92" 
                                    locale="es"
                                    :allowed-dates="allowedWeeks"
                                    :min="minDate"
                                    :max="maxDate"
                                    @change="changeTab()"
                                ></v-date-picker>       
                            </v-tab-item>

                            <v-tab-item value='tab-2'>
                                <v-time-picker
                                    v-model="time"
                                    color="#007C92" 
                                    full-width
                                    format="24hr"
                                    scrollable
                                    :min="horaMinima()"
                                    :max="horaMaxima()"
                                    :allowed-minutes="allowedStep"
                                    @change="disabledFun()"
                                ></v-time-picker>
                            </v-tab-item>

                        </v-tabs>
                    </v-card>

                </v-col>
                <v-col cols="12" sm="1" />
                <v-col cols="12" sm="2">

                    <div align="center">

                        

                        <div v-if="disabled">
                            <div style="height: 10px" />
                            <h4>Selecciona hora y fecha</h4>
                        </div>

                        <div style="height: 30px" />

                        <div class="subtitle font-weight-regular">
                            Fecha
                        </div>

                        <div style="height: 5px" />

                        <div class="title font-weight-bold">
                            {{ date }}
                        </div>

                        <div style="height: 30px" />

                        <div class="subtitle font-weight-regular">
                            Hora
                        </div>

                        <div style="height: 5px" />

                        <div class="title font-weight-bold">
                            {{ time }}
                        </div>

                        <div style="height: 50px" />

                        <v-btn @click="goConfirmar(profesional.id, date, time)" :disabled="disabled" dark color="success">Agendar</v-btn>
                    </div>

                    <div class="space-footer" />

                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Hora',
    props: ['mobile'],
    data(){
        return {
            id: this.$route.params.id,

            disabled: true,

            tab: 'tab-1',
            
            // HORA
            time: '',
            minDate: '',
            maxDate: '',
            
            // FECHA
            date: ''
        }
    },
    created(){

        this.getProfesional(this.id)

        // FECHAS
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate()+1);
        
        this.minDate = currentDate.toISOString().substr(0, 10);

        currentDate.setDate(currentDate.getDate() + 60);
        this.maxDate = currentDate.toISOString().substr(0, 10);
    },
    methods: {
        ...mapActions(['getProfesional']),

        disabledFun(){
            if(this.time != '' && this.date != '')
                this.disabled = false
            else
                this.disabled = true
        },
        
        allowedWeeks: function(val){
            return this.profesional.dias_disponibles[(new Date(val)).getDay()]
        },

        changeTab(){
            setTimeout(() => { this.tab='tab-2'; }, 500)
            this.disabledFun()
        },

        horaMinima() {
            //this.time = this.profesional.hora_inicio[(new Date(this.date)).getDay()]
            return this.profesional.hora_inicio[(new Date(this.date)).getDay()]
        },
        horaMaxima() {
            return this.profesional.hora_fin[(new Date(this.date)).getDay()]
        },
        allowedStep: m => m % 5 === 0,

        // BOTON CONFIRMAR
        goConfirmar(id, fecha, hora) {
            this.$router.push({name: 'confirmar', params: {id: id, fecha: fecha, hora: hora} });
        }
        
    },
    computed: {
        ...mapState(['profesional'])
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
.space-footer {
  height: 100px;
}
</style>