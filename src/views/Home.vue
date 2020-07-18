<template>
    <v-container>
        <div class="espacio" />
        <v-row>
            
            <v-col cols="12" sm="2" />
            <v-col cols="12" sm="8">
                <div :class="!this.mobile ? 
                'display-2 font-weight-thin text-center' : 
                'display-1 font-weight-thin text-center'">
                    Encuentra al profesional o especialidad que necesitas
                </div>
            </v-col>
            <v-col cols="12" sm="2" />
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" sm="2" />
            <v-col cols="8" sm="6">

                <v-text-field
                    solo
                    rounded
                    placeholder="Escribe aquí"
                    outlined
                ></v-text-field>
                
            </v-col>
            <v-col cols="4" sm="2">

                <v-btn rounded 
                    href="#"
                    color="#507F51"
                    dark
                    x-large
                    :elevation="3"
                > 
                    <v-icon class="icon-right">mdi-magnify</v-icon>
                    <span class="text">Buscar</span>
                </v-btn>
            
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
    </v-container>
</template>

<script>
  export default {
    props: ['mobile']
  }
</script>

<style>
.espacio {
    height: 70px;
}
.espacio-search {
    height: 20px;
}
</style>
