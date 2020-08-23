<template>
<div>
  <!-- TOOLBAR -->
  <v-card flat tile>
    <v-toolbar height="72px" dark color="#007C92" :elevation="10">

      <!-- TITULO TOOLBAR @click="backHome()" -->

      <v-btn class="icon mx-2" text fab @click="backHome()" color="grey">
        <icon-base width="140" height="140" icon-name="SEMID"><icon-Semid /></icon-base>
      </v-btn>
      <icon-base width="120" height="120" icon-name="SEMID"><icon-SemidLetra /></icon-base>
      
      <!-- FIN: TITULO TOOLBAR -->

      <!-- SELECION DE COMUNA -->
      <!--
      <v-select
        v-model="select_comuna"
        :items="ubicaciones"
        item-text="comuna"
        item-value="abbr"
        menu-props="auto"
        hint="Selecciona tu comuna"
        persistent-hint
        :prepend-icon="!this.mobile ? 'mdi-map-marker' : ''"
        single-line
        size="1px"
        @input="setearComuna"
      ></v-select>
      -->
      <!-- FIN: SELECION DE COMUNA -->
      
      <v-spacer />

      <v-divider class="mx-2" inset vertical />
      
      <!-- BTN TU FICHA -->
      <v-btn rounded
        v-if="!existeUsuario"
        color="#f1e345"
        light 
        @click="setearLogin(true)"
      >
        <v-icon class="icon">mdi-account</v-icon>
        <span class="text mr-2">Tu Usuario</span>
      </v-btn>
      <!-- FIN: BTN TU FICHA -->

      <!-- BTN CERRAR SESION -->
      <v-btn text small color="error" 
        v-if="existeUsuario"
        @click="cerrarSesion">
        <v-icon small class="icon">mdi-logout</v-icon><span class="text">Cerrar Sesion</span>
      </v-btn>
      <v-btn rounded
        color="success" 
        v-if="existeUsuario"
        @click="sesion()">
        <v-icon small class="icon">mdi-file-document</v-icon>
        <span class="text">Tu Fichas</span>
      </v-btn>
      <!-- FIN: BTN CERRAR SESION -->

    </v-toolbar>
  </v-card>
  <!-- FIN: TOOLBAR -->

  <!-- FIN: ALERTA -->
  <div class="space-alert">
      <v-alert
        color="grey darken-4"
        dark
        dense
        height="40px"
        :elevation="7"
      >
      <span class="text">
      <v-icon class="icon">mdi-school</v-icon>
        Conoce las ventajas de tener <strong>Tu Ficha 
        <a @click.stop="dialog = true">aquí</a></strong>
      </span>
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
      <div style="height: 20px" />
      <v-card-text>
        Con tu usuario podrás acceder a tu ficha personal y a las evoluciones de tu tratamiento, además de poder ver que profesionales te han atendido con anterioridad para poder re agendar con el mismo profesional nuevamente y así no perder la continuidad del tratamiento y/o terapia.
        <div style="height: 20px" />
        Recuerda que la clave y usuario son únicos, estos podrán ser utilizados solo por el paciente o el representante legal en caso de que lo necesite.
        <div style="height: 30px" />
        <h2 class="text-center">¡Registrate!</h2>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="gray"
          text
          medium
          @click="dialog = false"
        >
          Cerrar
        </v-btn>

        <!--
        <v-btn
          color="green darken-1"
          text
          large 
          @click="dialog = false; login = true"
        >
          Registrarte
        </v-btn>
        -->
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!--  FIN: DIALOGO -->
  
  <Sesion />

</div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'

  import IconBase from './IconBase.vue'
  import IconSemidLetra from './icons/IconSemidLetra.vue'
  import IconSemid from './icons/IconSemid'
  import Sesion from './Sesion'

  export default {
    name: 'Toolbar',
    components: {
      IconBase,
      IconSemid,
      IconSemidLetra,
      Sesion
    },
    props: ['mobile'],
    data () {
      return {
        // Dialogs
        dialog: false
      }
    },
    sesion(){
      if(this.$route.name == "sesion") {
        location.reload()
      }else{
        this.$router.push({name: 'sesion'})
      }
    },
    methods: {
      ...mapActions(['cerrarSesion','setearLogin','setearLogin','setearComunaSeleccionada','getProfesionalesPorComuna']),
      backHome() {
        if(this.$route.name == "home") {
          location.reload()
        }else{
          this.$router.push('/')
        }
      },
      setearComuna(val){
        this.setearComunaSeleccionada(val)
        .then(() => {
          this.getProfesionalesPorComuna()
        })
      }
    },
    watch: {
      setearComuna (newVal) {
        console.log('item changed', newVal);
      }
    },
    computed: {
      ...mapState(['ubicaciones','select_comuna','login']),
      ...mapGetters(['existeUsuario'])
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