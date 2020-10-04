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
                v-model="profesiones_Select"
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
                </v-combobox> 
            </v-col>
            <v-col cols="12" sm="2" />
        </v-row>
        <v-row>

            <v-col class="text-center" cols="12">
                <v-btn rounded color="green" dark large @click="search()"> 
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
    data () {
        return {
            profesiones_Select: []
        }
    },
    methods: {
        ...mapActions(['setProfesionales_select']),
        search(){
            this.setProfesionales_select(this.profesiones_Select)
            this.$router.push({name: 'profesionales'})
        },
    },
    computed: {
        ...mapState(['profesiones'])
    }
}
</script>

<style>
.espacio {
    height: 50px;
}
</style>
