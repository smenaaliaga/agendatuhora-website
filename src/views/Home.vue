<template>
    <v-container>
        <div class="space"></div>
        <v-row>
            <v-col cols="2" />

            <v-col cols="8">
                <v-container fluid>

                    <v-row>
                        <v-col cols="12">

                            <div class="display-2 font-weight-thin text-center">
                                Encuentra al profesional o especialidad que necesitas
                            </div>
                        
                        </v-col>
                    </v-row>
                    
                    <div class="space-search"/>

                    <v-row>
                        <v-col cols="9">

                            <v-text-field
                                solo
                                rounded
                                placeholder="Escribe aquí"
                                outlined
                            ></v-text-field>
                            
                        </v-col>
                        <v-col cols="3">

                            <v-btn rounded 
                                href="#"
                                color="#80982A"
                                dark
                                x-large
                                :elevation="3"
                            > 
                                <v-icon class="icon-right">mdi-magnify</v-icon>
                                <span class="mr-2">Buscar</span>
                            </v-btn>
                        
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="text-center" cols="12">

                            <v-btn rounded 
                                href="#"
                                color="#b96d12"
                                dark
                                medium 
                            > 
                                <span class="mr-2">¿Necesitas Ayuda?</span>
                            </v-btn>

                        </v-col>
                    </v-row>
                </v-container>
            </v-col>

            <v-col cols="2" />
        
        </v-row>
    </v-container>
</template>

<script>

</script>

<style>
.space {
    height: 50px;
}
</style>
