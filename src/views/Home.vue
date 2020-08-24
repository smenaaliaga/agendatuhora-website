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
 
                <v-combobox
                v-model="select_prof"
                :items="profesiones"
                multiple
                outlined
                rounded
                solo
                @keyup.enter="search()"
                placeholder="Escribe o selecciona aquí"
                >
                    <template v-slot:selection="data">
                        <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click:close="data.parent.selectItem(data.item)"
                        >
                        {{ data.item }}
                        </v-chip>
                    </template>
                    <!--
                    <template v-slot:append-outer>
                        <v-icon @click="search" large color="green">mdi-magnify</v-icon>
                    </template>
                    -->
                </v-combobox> 
<!--
                    <v-text-field
                        v-model="search"
                        solo
                        rounded
                        append-icon="mdi-magnify"
                        placeholder="Escribe aquí"
                        outlined
                    ></v-text-field>

                    <v-select
                        v-model="select_comuna"
                        :items="ubicaciones"
                        item-text="comuna"
                        item-value="abbr"
                        menu-props="auto"
                        hint="Selecciona tu comuna"
                        persistent-hint
                        :prepend-icon="!this.mobile ? 'mdi-map-marker' : ''"
                        dense
                        solo
                        size="1px"
                        @input="setearComuna"
                    ></v-select>
-->

            </v-col>
            <v-col cols="12" sm="2" />
        </v-row>
        <v-row>

            <v-col class="text-center" cols="12">


                <v-btn rounded color="green" dark large @click="search"> 
                    <v-icon>mdi-magnify</v-icon><div style="padding-left: 15px" /><span class="mr-2">Buscar</span>
                </v-btn>

            </v-col>
        </v-row>
        <div class="space-footer" />
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: ['mobile'],
    methods: {
        ...mapActions(['setearProfesionSeleccionada']),
        search(){
            this.$router.push({name: 'profesionales'})
        },
    },
    computed: {
        ...mapState(['profesiones','select_prof']),
        select_prof: {
            /* REVISAR!!!!!!!
            get: function () {
                return this.store.state.message
            },
            */
            set: function(val){
                this.setearProfesionSeleccionada(val)
            }
        }
    }
}
</script>

<style>
.espacio {
    height: 50px;
}
</style>
