|<template>
  <!--  DIALOGO SESION -->
  <v-dialog v-model="login" @input="setearLogin" max-width="600">
    <v-card>
      <v-card-text>
        <v-tabs fixed-tabs color="#007C92" >

          <v-tab>
           <v-icon class="icon">mdi-login</v-icon><span class="text"> Inicar Sesión</span>
          </v-tab>

           <v-tab>
            <v-icon class="icon">mdi-account-plus</v-icon><span class="text"> Registrarses</span>
          </v-tab>

          <v-tab-item>
            <form @submit.prevent="ingresar()">
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
                    @click="setearLogin(false)"
                  >
                    Cancelar
                  </v-btn>
                </span>

                <v-btn
                  color="green darken-1"
                  type="submit"
                  text
                  large 
                >
                  iniciar Sesión
                </v-btn>
              </v-card-actions>
            </form>

          </v-tab-item>
          <!-- FIN: INICAR SESION -->

          <!-- REGISTRO -->
          <v-tab-item>

            <form @submit.prevent="crear()">
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail (ejemplo555@gmail.com)"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>

              <v-text-field
                v-model="nombre"
                label="Nombre (Pedro Barrientos)"
                required
              ></v-text-field>

              <v-text-field
                v-model="direccion"
                label="Dirección (Ej. Alvarez 32 piso 3232)"
                required
              ></v-text-field>

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
                    @click="setearLogin(false)"
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
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'Sesion',
  data(){
    return{
      // Inicio Sesion
      show1: false,
      password: '',
      email: '',
      // Registro
      nombre: '',
      direccion: '',
      password_registro_1:'',
      password_registro_2: '',
      rulesPass: {
        required: value => !!value || 'Requerido.',
        min: v => v.length >= 6 || 'Min 6 caracteres',
      },
    }
  },
  props: ['mobile'],
  mixins: [validationMixin],
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
  
  sesion(){
    if(this.$route.name == "sesion") {
      location.reload()
    }else{
      this.$router.push({name: 'sesion'})
    }
  },
  computed: {
    ...mapState(['login','ubicaciones','select']),
    ...mapGetters(['existeUsuario']),
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
  },
  methods: {
    ...mapActions(['crearUsuario', 'ingresoUsuario', 'cerrarSesion','setearLogin']),
    // Metodo creación
    crear(){
    this.crearUsuario({email: this.email, password: this.password_registro_1,
                        nombre: this.nombre, direccion: this.direccion, comuna: this.select})
      .then(() => {
        /*
        if(this.$route.name == "home") {
          location.reload()
        }
        else{
          this.$router.push({name: 'home'})
        }
        */
      })
    },
    // Metodo ingreso
    ingresar(){
      this.ingresoUsuario({email: this.email, password: this.password})
      .then(() => {
        this.setearLogin(false)
      })
    },
  }
}
</script>