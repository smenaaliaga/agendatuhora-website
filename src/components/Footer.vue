<template>
    <v-vue>
        <div v-show="homePage">
            <v-footer
            fixed
            class="transparent"
            >
                <v-col
                class="text-center"
                cols="12"
                >
                    <v-btn :to="{name: 'profesionales'}">
                        <strong>Encuentra a todos nuestros profesionales aquí</strong>
                    </v-btn>
                </v-col>
            </v-footer>
        </div>

        <div v-show="profesionales">
            <v-footer
            fixed
            class="transparent"
            >
                <v-col
                class="text-center"
                cols="12"
                >
                    <v-stepper>
                        <v-stepper-header>
                            <v-stepper-step color="#b96d12" step="1">Escoge tu profesional</v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step step="2">Agenda tu hora</v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step step="3">Confirma tu visita</v-stepper-step>
                        </v-stepper-header>
                    </v-stepper>
                </v-col>
            </v-footer>
        </div>
    </v-vue>
</template>

<script>
export default {
    computed: {
      homePage() {
        if(this.$route.path == "/") {
          return true
        } else {
          return false
        }
      },
      profesionales() {
        if(this.$route.path == "/profesionales") {
          return true
        } else {
          return false
        }
      }
    }
}
</script>

<style>
.transparent {
  background-color: transparent!important;
  border-color: transparent!important;
 }
</style>