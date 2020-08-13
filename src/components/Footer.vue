<template>
  <div>
    <div v-show="homePage">
      <v-footer
      fixed
      class="transparent"
      >
        <v-col
        class="text-center"
        cols="12"
        >
          <v-btn @click="goProfesionales()">
            <strong>Nuestros profesionales</strong>
          </v-btn>
        </v-col>
      </v-footer>
    </div>

    <div v-show="profesionales || hora || confirmar">
      <v-footer
      fixed
      class="transparent"
      >
        <v-col
        class="text-center"
        cols="12"
        >
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
      </v-footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
      goProfesionales() {
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