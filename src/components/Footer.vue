<template>
  <div>
    <div v-show="homePage">
      <v-footer fixed class="transparent">
        <v-row no-gutters>
          <v-col class="text-center" cols="12">
            <v-btn @click="goProfesionales()"><strong>Nuestros profesionales</strong></v-btn>
          </v-col>
          <v-col v-show="mobile" class="text-center" cols="12" style="color:white"> ~ </v-col>
          <v-col class="text-left" cols="6">
            <v-btn text small @click="dialog=!dialog">Sobre nosotros</v-btn>
          </v-col>
          <v-col class="text-right" cols="6">
            <v-btn text small href="https://github.com/smenaaliaga" target="_blank">Diseño smenaaliaga</v-btn>
          </v-col>
        </v-row>
      </v-footer>
    </div>

    <div v-show="profesionales || hora || confirmar">
      <v-footer fixed class="transparent">
        <v-row no-gutters>
          <v-col :hidden="!mobile ? false : true" class="text-left" cols="6">
            <v-btn text small @click="dialog=!dialog">Sobre nosotros</v-btn>
          </v-col>  
          <v-col :hidden="!mobile ? false : true" class="text-right" cols="6">
            <v-btn text small href="https://github.com/smenaaliaga" target="_blank">Diseño smenaaliaga</v-btn>
          </v-col>
          <v-col class="text-center" cols="12">
            <v-stepper v-model="completeStep">
              <v-stepper-header>
                <v-stepper-step :complete="completeStep > 1" color="green" step="1">Escoge tu profesional</v-stepper-step>
                
                <v-divider></v-divider>

                <v-stepper-step :complete="completeStep > 2" color="green" step="2">Agenda tu hora</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="completeStep > 3" color="green" step="3">Confirma tu visita</v-stepper-step>
              </v-stepper-header>
            </v-stepper>
          </v-col>
        </v-row>
      </v-footer>
    </div>

  <!--  DIALOGO -->
  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-card-text>
        <div class="text-center">
          <icon-base width="280" height="120" icon-name="SEMID"><icon-Semid /></icon-base>
        </div>
        <h2>Propósito</h2>
        <div style="height: 10px" />
        Nuestro propósito es abarcar las distintas problemáticas de salud que surgen a lo largo de todo el ciclo vital, con un enfoque transdiscplinario que busca dar solución de manera conjunta a estas problemáticas, para así mejorar la calidad de vida de nuestros usuarios.

        <div style="height: 20px" />
        <h2>Misión</h2>
        <div style="height: 10px" />
        Somos una empresa que busca prestar variados servicios de salud de manera domiciliaria, de la mano de soluciones tecnológicas dentro de la V región.
        <div style="height: 5px" />
        En SEMID entendemos que los problemas de salud impactan directamente en la calidad de vida de las personas, más allá de los signos y síntomas que presenten. Es por esto que surge la necesidad de conformar un equipo de profesionales de la salud, que abarque la mayor cantidad de áreas posibles, para así poder buscar soluciones a los problemas de salud de nuestros usuarios, ya sean niños, jóvenes y adultos mayores, desde todas las perspectivas posibles.
        <div style="height: 5px" />
        Mediante la articulación de este amplio equipo de salud buscamos dar respuesta a estos problemas de manera personalizada, eficaz en el tiempo y en la comodidad de tu hogar.

        <div style="height: 20px" />
        <h2>Visión</h2>
        <div style="height: 10px" />
        En SEMID buscamos ir creciendo tanto en cantidad de profesionales como en la cantidad de prestaciones, para poder dar mejores soluciones a todos los problemas de salud que se presentan en nuestra comunidad, para así poder generar eventualmente un equipo multidisciplinario completo que realice atenciones domiciliarias sectorizadas en una mayor cantidad de comunas en la V región, mejorando así la calidad de vida de más personas.
        
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer> 
        <v-btn color="gray" text medium @click="dialog = false">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!--  FIN: DIALOGO -->

  </div>
</template>

<script>
import { mapActions } from 'vuex'

import IconBase from './IconBase.vue'
import IconSemid from './icons/IconSemid.vue'
  
export default {
  name: 'Footer',
  data () {
    return {
      // Dialogs
      dialog: false
    }
  },
  props: ['mobile'],
  components: {
    IconBase,
    IconSemid,
  },
  methods: {
    ...mapActions(['setearProfesionSeleccionada']),
    goProfesionales() {
        this.setearProfesionSeleccionada('')
        this.$router.push('/profesionales');
    }
  },
  computed: {
    homePage() {
      if(this.$route.name == "home") {
        return true
      } else {
        return false
      }
    },
    profesionales() {
      if(this.$route.name == "profesionales") {
        return true
      } else {
        return false
      }
    },
    hora() {
      if(this.$route.name == "hora") {
        return true
      } else {
        return false
      }
    },
    confirmar() {
      if(this.$route.name == "confirmar") {
        return true
      } else {
        return false
      }
    },
    completeStep() {
      if(this.profesionales){
        return 1
      }
      if(this.hora){
        return 2
      }else{
        return 3
      }
    }
  }
}
</script>

<style scoped>
.transparent {
  background-color: transparent!important;
  border-color: transparent!important;
 }
</style>