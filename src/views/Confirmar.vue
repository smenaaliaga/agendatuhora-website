<template>
    <v-container>
        <div style="height: 20px;" />
        <v-row>
            <v-col cols="12" sm="4">
                <div align="center">
                    <h2>¡Estas a un paso!</h2>
                        {{ $route.params.id }}
                    <h3>Fecha</h3>
                        {{ $route.params.fecha }}
                    <h3>Hora</h3>
                        {{ $route.params.hora }}
                </div>

            </v-col>
            <v-col cols="12" sm="4">
                <h3>Confirma tu hora solo iniciando sesión</h3>
                <v-text-field
                    v-model="email"
                    label="email"
                    required
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
                <v-btn
                  color="green darken-1"
                  type="submit"
                  text
                  large 
                >
                  iniciar Sesión
                </v-btn>
            </v-col>
            <v-col cols="12" sm="4">
                <h3>Confirma tu hora ingresando tus datos</h3>
                <v-text-field
                    v-model="nombre"
                    label="Nombre"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="rut"
                    label="RUT"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="email"
                    label="Email"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="direccion"
                    label="Direccion"
                    required
                ></v-text-field>
                <div align="center">
                    <v-btn dark color="success">Confirmar hora</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'Confirmar',
    data () {
      return {
        password: '',
        email: '',
        show1: false,
        rulesPass: {
          required: value => !!value || 'Requerido.',
          min: v => v.length >= 6 || 'Min 6 caracteres',
        },
      }
    },
    mixins: [validationMixin],
    validations: {
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },
}
</script>