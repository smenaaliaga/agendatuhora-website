<template>
    <v-container>
        <div class="espacio" />
        <v-row no-gutters>
            <v-col cols="12" sm="2" />
            <v-col cols="12" sm="8">
                <h2 :class="!this.mobile ? 
                'display-2 font-weight-light text-center' : 
                'title font-weight-medium text-center'">
                    Encuentra al profesional o especialidad que necesitas
                </h2>
            </v-col>
            <v-col cols="12" sm="2" />
        </v-row>
        <div class="espacio" />
        <v-row no-gutters>
            <v-col cols="12" sm="2" />
            <v-col cols="12" sm="8">

                <v-text-field
                    solo
                    rounded
                    append-icon="mdi-magnify"
                    placeholder="Escribe aquí"
                    outlined
                ></v-text-field>
                
            </v-col>
            <v-col cols="12" sm="2" />
        </v-row>
        <v-row>

            <v-col class="text-center" cols="12">

                <v-btn rounded 
                    href="#"
                    color="#BF0811"
                    dark
                    medium 
                > 
                    <span class="mr-2">¿Necesitas Ayuda?</span>
                </v-btn>
            </v-col>
        </v-row>
        <div class="space-footer" />
    </v-container>
</template>

<script>
  export default {
    props: ['mobile']
  }
</script>

<style>
.espacio {
    height: 50px;
}
</style>
