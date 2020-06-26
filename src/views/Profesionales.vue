<template>
  <div sticky-container>

    <div v-sticky sticky-offset="{top: -10}" sticky-z-index="20">
      <v-container>
          <v-row style="position: absolute; width: 100%; z-index: 100;">
              <v-col cols="1" />
              <v-col cols="7">
                  <v-text-field
                      solo
                      rounded
                      placeholder="Busca tu profesional o especialidad"
                      outlined
                      :style="myStyle"
                  />
              </v-col>
              <v-col cols="3">
                  <v-btn rounded 
                      href="#"
                      color="#507F51"
                      dark
                      x-large
                      :elevation="3"
                      :style="myStyle"
                  > 
                      <v-icon class="icon-right">mdi-magnify</v-icon>
                      <span class="mr-2">Buscar</span>
                  </v-btn>
              </v-col>
              <v-col cols="1" />   
          </v-row>
      </v-container>
    </div>

    <div class="first-space" />

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
      <div class="space-cards" />
    </div>
    <div class="space-footer" />
  </div>
</template>

<script>
export default {
  computed: {
    profesionales() {
      return this.$store.state.profesionales
    }
  }
} 
</script>

<style>
.first-space {
  height: 70px;
}
.space-cards {
  height: 10px;
}
.space-footer {
  height: 100px;
}
</style>