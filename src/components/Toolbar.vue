<template>
<div>
  <!-- TOOLBAR -->
  <v-card flat tile>
    <v-toolbar height="72px" dark color="#007C92" :elevation="10">

      <!-- TITULO TOOLBAR -->
      <v-btn text large @click="backHome()">
        <icon-base width="180" height="180" icon-name="SEMID"><icon-SemidConjunto /></icon-base>
      </v-btn>
      <!-- FIN: TITULO TOOLBAR -->

      <v-divider class="mx-4" inset vertical />

      <!-- SELECION DE COMUNA -->
      <v-select
          v-model="select"
          :items="ubicaciones"
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
        height="40px"
        :elevation="7"
      >
      Conoce las ventajas de tener <strong>Tu Ficha 
        <a @click.stop="dialog = true">aquí</a></strong> !
      </v-alert>
  </div>
  <!--  FIN: ALERTA -->

  <!--  DIALOGO -->
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <v-card>
      <v-card-title class="headline"><v-icon color="green" class="icon-right">mdi-file-document</v-icon> Ventajas de tener Tu Ficha</v-card-title>
    
      <v-card-text>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at rutrum enim. Aenean eu lacus sagittis, volutpat tortor vel, aliquam tortor. Donec vel erat in metus tincidunt semper sit amet id magna. Nam fringilla felis odio, in luctus ex tincidunt pulvinar. Sed at nunc auctor, mollis massa eleifend, mollis nisi. Nulla in urna varius, pulvinar mi sed, lobortis mi. Cras rutrum sollicitudin magna a vehicula. Proin vel quam sed ex molestie tincidunt. In imperdiet mi scelerisque ligula tincidunt, ut accumsan massa dapibus. Aliquam condimentum vitae risus eget volutpat. Nunc sed lectus non massa suscipit ullamcorper in sit amet ipsum. Duis elit justo, congue a consequat nec, facilisis sit amet ex. Quisque scelerisque urna et magna varius, quis ultricies lorem finibus. Nam eu tempus sapien.

Maecenas dui ante, varius in justo sed, volutpat ullamcorper augue. Mauris cursus congue ex a porta. Suspendisse sed scelerisque sem, quis aliquam ante. Curabitur posuere, sapien id rutrum facilisis, lacus dui egestas tellus, a pulvinar enim sapien id erat. Mauris ac massa at massa malesuada eleifend sed vel nunc. Nullam sagittis et elit dapibus tristique. Vestibulum at libero sodales magna dictum auctor id a quam. Maecenas sagittis metus a turpis feugiat, consequat sagittis lacus laoreet. Cras facilisis laoreet tincidunt. Nunc convallis neque nec odio tempus, eu blandit metus feugiat. Nam vulputate pharetra condimentum. Aliquam molestie velit quis nisl ullamcorper, at gravida orci egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="gray"
          text
          medium
          @click="dialog = false"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          large 
          @click="dialog = false"
        >
          Registrarte
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!--  FIN: DIALOGO -->
  
</div>
</template>

<script>
  import { mapState } from 'vuex'
  import IconBase from './IconBase.vue'
  import IconSemidConjunto from './icons/IconSemidConjunto.vue'
  export default {
    name: 'Toolbar',
    components: {
      IconBase,
      IconSemidConjunto
    },
    data () {
      return {
        alert: true,
        dialog: false,
      }
    },
    methods: {
      backHome() {
        this.$router.push('/');
      }
    },
    computed: {
      ...mapState(['ubicaciones','select'])
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