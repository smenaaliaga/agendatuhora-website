<template>
<v-vue>
  <!-- TOOLBAR -->
  <v-card flat tile>
    <v-toolbar height="72px" dark color="#007C92" :elevation="10">

      <!-- TITULO TOOLBAR -->
      <div class="icon-right" />

      <icon-base width="180" height="180" icon-name="SEMID"><icon-SemidConjunto /></icon-base>
      <!-- FIN: TITULO TOOLBAR -->

      <v-divider class="mx-4" inset vertical />

      <!-- SELECION DE COMUNA -->
      <v-select
          v-model="select"
          :items="items"
          item-text="comuna"
          item-value="abbr"
          menu-props="auto"
          hint="Selecciona tu comuna"
          persistent-hint
          prepend-icon="mdi-map-marker"
          single-line
          size="1px"
      ></v-select>
      <!-- FIN: SELECION DE COMUNA -->
      
      <v-spacer />

      <v-divider class="mx-4" inset vertical />
      
      <!-- BTN TU FICHA -->
      <v-btn rounded
        href="#"
        color="#f1e345"
        light 
      >
        <v-icon class="icon-right">mdi-file-document</v-icon>
        <span class="mr-2">Tu Ficha</span>
      </v-btn>
      <!-- FIN: BTN TU FICHA -->

    </v-toolbar>
  </v-card>
  <!-- FIN: TOOLBAR -->

  <!-- FIN: ALERTA -->
  <div class="space-alert">
      <v-alert
        dismissible
        icon="mdi-school"
        color="grey darken-4"
        dark
        dense
        :elevation="7"
      >
      Conoce las ventajas de tener <strong>Tu Ficha <a href="#">aquí</a></strong> !
      </v-alert>
  </div>
  <!--  FIN: ALERTA -->
  
  </v-vue>
</template>

<script>
  import IconBase from './IconBase.vue'
  import IconSemidConjunto from './icons/IconSemidConjunto.vue'
  export default {
    components: {
      IconBase,
      IconSemidConjunto
    },
    data () {
      return {
        alert: true,
      }
    },
    computed: {
      items() {
        return this.$store.state.items;
      },
      select() {
        return this.$store.state.select;
      }
    }, 
  }
</script>

<style>
  .icon-right {
    margin-right: 20px;
  }
  .space-alert {
    height: 35px;
  }
  .divider{
    width:15px;
    height:auto;
    display:inline-block;
  }
</style>