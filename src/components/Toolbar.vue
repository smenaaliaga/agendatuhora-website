<template>
<div>
  <!-- TOOLBAR -->
  <v-card flat tile>
    <v-toolbar height="72px" dark color="#007C92" :elevation="10">

      <!-- TITULO TOOLBAR @click="backHome()" -->
      <v-btn class="icon mx-2" text fab @click="backHome()" color="grey">
        <icon-base width="140" height="140" icon-name="SEMID"><icon-Semid /></icon-base>
      </v-btn>
      <icon-base width="120" height="120" @click="backHome()" icon-name="SEMID"><icon-SemidLetra /></icon-base>
      
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
        <v-row no-gutters>
          <v-col v-show="!this.mobile ? true : false" cols="6">
            <v-icon class="icon">mdi-school</v-icon>
            Conoce las ventajas de tener Tu Ficha 
            <a @click.stop="dialog = true"> aquí</a>
          </v-col>
          <v-col v-show="!this.mobile ? true : false"  cols="6" class="text-right">
            <v-btn text small @click="contacto=!contacto">
              <v-icon>mdi-card-account-phone</v-icon>
              <div style="padding-left: 10px" />
              Contactanos aquí
            </v-btn>
          </v-col>
          <v-col v-show="!this.mobile ? false : true" cols="12" class="text-center">
            <v-btn text small @click="contacto=!contacto">
              Contactanos aquí
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
  </div>
  <!--  FIN: ALERTA -->

  <!--  DIALOGO -->
  <v-dialog v-model="dialog" max-width="600">
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


    <!--  DIALOGO -->
  <v-dialog v-model="contacto" max-width="600">
    <v-card>
      <v-card-text>
        <div class="text-center">
          <icon-base :width="mobile ? 270 : 500" :height="mobile ? 120 : 200" icon-name="SEMID"><icon-SemidAlrededor /></icon-base>
        </div>

        <v-row>
          <v-col cols="12" sm="6">
            <h3>TELEFONO
              <div style="height: 10px" />
              <ul style="list-style-type:none;">
                <li>
                  <v-icon class="icon" style="color: green">mdi-whatsapp</v-icon>
                  <a href="tel:+56 9 3927 3175" style="color: green; padding-left: 10px;">+56 9 3927 3175</a>
                </li>
                <div style="height: 10px" />
                <li>
                  <v-icon class="icon" style="color: green">mdi-whatsapp</v-icon> 
                  <a href="tel:+56 9 3927 3176" style="color: green; padding-left: 10px;">+56 9 3927 3176</a>
                </li>
              </ul>
            </h3>

          </v-col>

          <v-col cols="12" sm="6">
            
            <h3>
              CORREO
              <div style="height: 10px" />
          
              <ul>
              <v-icon class="icon">mdi-email</v-icon>
              <a href = "mailto: semidsalud@gmail.com" style="padding-left: 10px;">semidsalud@gmail.com </a> 
              </ul>
            </h3>
          
          </v-col>

          <v-col cols="12">

            <h3>REDES SOCIALES</h3>
            <div style="height: 10px" />
            <ul>
              <div class="text-center">
                <a href="https://www.instagram.com/semid.salud/" target="_blank" style="text-decoration: none; background-color: none;">
                  <v-icon class="icon" size="100" style="color: red;">mdi-instagram</v-icon>
                </a>
                <a href="https://www.facebook.com/semidsalud" target="_blank" style="text-decoration: none; background-color: none;">
                  <v-icon class="icon" size="100" style="color: #3b5998; padding-left: 25px;">mdi-facebook</v-icon>
                </a>
              </div>
            </ul>

          </v-col>
        
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer> 
        <v-btn color="gray" text medium @click="contacto = false">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!--  FIN: DIALOGO -->
  
  <Sesion />

  <v-snackbar v-model="sesion_iniciada" @input="setear_sesion_iniciada(false)" timeout="5000">
      Sesión iniciada
    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="setear_sesion_iniciada(false)"
      >
      Cerrar
      </v-btn>
    </template>
  </v-snackbar>

  <v-snackbar v-model="sesion_cerrada" @input="setear_sesion_cerrada(false)" timeout="5000">
      Sesión cerrada
    <template v-slot:action="{ attrs }">
      <v-btn
        color="red"
        text
        v-bind="attrs"
        @click="setear_sesion_cerrada(false)"
      >
      Cerrar
      </v-btn>
    </template>
  </v-snackbar>

</div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'

  import IconBase from './IconBase'
  import IconSemidLetra from './icons/IconSemidLetra'
  import IconSemidAlrededor from './icons/IconSemidAlrededor'
  import IconSemid from './icons/IconSemid'
  import Sesion from './Sesion'

  export default {
    name: 'Toolbar',
    components: {
      IconBase,
      IconSemid,
      IconSemidLetra,
      IconSemidAlrededor,
      Sesion
    },
    props: ['mobile'],
    data () {
      return {
        // Dialogs
        dialog: false,
        contacto: false,
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
      ...mapActions(['cerrarSesion','setearLogin','setear_sesion_iniciada','setear_sesion_cerrada']),
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
      ...mapState(['ubicaciones','select_comuna','sesion_iniciada','sesion_cerrada']),
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