<template>
<div>
  <!-- TOOLBAR -->
  <v-card flat tile>
    <v-toolbar height="72px" dark color="#007C92" :elevation="10">

      <!-- TITULO TOOLBAR @click="backHome()" -->

      <v-btn class="icon mx-2" text fab @click="backHome()" color="grey">
        <icon-base width="140" height="140" icon-name="SEMID"><icon-Semid /></icon-base>
      </v-btn>

      <span class="text">
        <icon-base width="120" height="120" icon-name="SEMID"><icon-SemidLetra /></icon-base>
      </span>
      <!-- FIN: TITULO TOOLBAR -->

      <v-divider class="mx-2" inset vertical />

      <!-- SELECION DE COMUNA -->
      <v-select
          v-model="select"
          :items="ubicaciones"
          item-text="comuna"
          item-value="abbr"
          menu-props="auto"
          hint="Selecciona tu comuna"
          persistent-hint
          :prepend-icon="!this.mobile ? 'mdi-map-marker' : ''"
          single-line
          size="1px"
      ></v-select>
      <!-- FIN: SELECION DE COMUNA -->
      
      <v-spacer />

      <v-divider class="mx-2" inset vertical />
      
      <!-- BTN TU FICHA -->
      <v-btn rounded
        href="#"
        color="#f1e345"
        light 
        @click="login = true"
      >
        <v-icon class="icon">mdi-account</v-icon>
        <span class="text mr-2">Tu Usuario</span>
      </v-btn>
      <!-- FIN: BTN TU FICHA -->

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
          @click="dialog = false; login = true"
        >
          Registrarte
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!--  FIN: DIALOGO -->

  <!--  DIALOGO SESION -->
  <v-dialog
    v-model="login"
    max-width="600"
  >
    <v-card>
    
      <v-card-text>

        <v-tabs fixed-tabs color="#007C92" >

          <v-tab>
           <v-icon class="icon">mdi-login</v-icon><span class="text"> &nbsp; Inicar Sesión</span>
          </v-tab>

          <v-tab>
            <v-icon class="icon">mdi-account-plus</v-icon><span class="text"> Registrarses</span>
          </v-tab>

          
          <v-tab-item>

            <v-container>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rulesPass.required, rulesPass.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                hint="Al menos 6 carácteres"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-container>

            <v-card-actions>

              <v-spacer></v-spacer>

              <span class="text">
                <v-btn
                  color="gray"
                  text
                  small
                  @click="login = false"
                >
                  Cancelar
                </v-btn>
              </span>

              <v-btn
                color="green darken-1"
                text
                large 
                @click="login = false"
              >
                iniciar Sesión
              </v-btn>
            </v-card-actions>

          </v-tab-item>
          <!-- FIN: INICAR SESION -->

          <!-- REGISTRO -->
          <v-tab-item>

            <form @submit.prevent="crear">
            
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>

              <v-text-field
                v-model="nombre"
                label="Nombre"
                required
              ></v-text-field>

              <v-text-field
                v-model="password_registro_1"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rulesPass.required, rulesPass.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                hint="Al menos 6 carácteres"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-text-field
                v-model="password_registro_2"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rulesPass.required, rulesPass.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirmar Contraseña"
                hint="Al menos 6 carácteres"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-card-actions>
                <v-spacer></v-spacer>

                <span class="text">
                  <v-btn
                    color="gray"
                    text
                    medium
                    @click="login = false"
                  >
                    Cancelar
                  </v-btn>
                </span>

                <v-btn
                  color="green darken-1"
                  type="submit"
                  text
                  large 
                  :disabled='!desactivar'
                >
                  Registrar
                </v-btn>
              </v-card-actions>
            
            </form>

          </v-tab-item>
          <!-- FIN: REGISTRO -->

        </v-tabs>

      </v-card-text>

    </v-card>
  </v-dialog>
  <!--  FIN: INICIO SESION -->
  
</div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import IconBase from './IconBase.vue'
  import IconSemidLetra from './icons/IconSemidLetra.vue'
  import IconSemid from '@/components/icons/IconSemid'

  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  
  export default {
    name: 'Toolbar',
    mixins: [validationMixin],
    components: {
      IconBase,
      IconSemid,
      IconSemidLetra
    },
    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },
    props: ['mobile'],
    data () {
      return {
        // Dialogs
        dialog: false,
        login: false,
        // Inicio Sesion
        show1: false,
        password: '',
        email: '',
        // Registro
        nombre: '',
        password_registro_1:'',
        password_registro_2: '',
        rulesPass: {
          required: value => !!value || 'Requerido.',
          min: v => v.length >= 6 || 'Min 6 caracteres',
        },
      }
    },
    methods: {
      backHome() {
        if(this.$route.name == "hora") {
          location.reload()
        }else{
          this.$router.push('/')
        }
      },
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
      ...mapActions(['crearUsuario']),
      // Metodo creación
      crear(){
        this.crearUsuario({email: this.email, password: this.password_registro_1})
          .then(() => {
            if(this.$route.name == "hora") {
              location.reload()
            }else{
              this.$router.push('/')
            }
          })
      }
    },
    computed: {
      ...mapState(['ubicaciones','select','erro']),
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      desactivar(){
          return this.password_registro_1 === this.password_registro_2 && this.password_registro_1.trim() !== ''
      }
    }
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