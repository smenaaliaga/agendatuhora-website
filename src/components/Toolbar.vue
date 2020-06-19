<template>
<v-vue>
  <!-- TOOLBAR -->
  <v-card flat tile>
    <v-toolbar height="72px" dark color="indigo" :elevation="10">

      <!-- TITULO TOOLBAR -->
      <div class="d-flex align-center">
        <v-btn
          href="#"
          target="_blank"
          text
        >
          <v-icon size="300%" class="icon-right">mdi-hospital-building</v-icon>
          <v-toolbar-title>Agenda tu hora</v-toolbar-title>
          
        </v-btn>
      </div>
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
        color="green accent-3"
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
      dark
      dense
      :elevation="10"
      >
      Conoce las ventajas de tener <strong>Tu Ficha <a href="#">aquí</a></strong> !
      </v-alert>
  </div>
  <!--  FIN: ALERTA -->
  
  </v-vue>
</template>

<script>
  export default {
    name: 'App',
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
    height: 5px;
  }
  .divider{
    width:15px;
    height:auto;
    display:inline-block;
  }
</style>