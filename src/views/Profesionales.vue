<template>
  <v-container>
    <div v-sticky sticky-offset="{top: 10}">
      <v-row>
        <v-col :hidden="!mobile ? false : true" cols="3" sm="2">
          <div data-aos="fade-down" data-aos-anchor="#trigger">
            <v-btn class="mx-2" fab text large @click="backHome()" color="white">
              <icon-base width="200" height="200" icon-name="SEMID"><icon-Semid /></icon-base>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="8">
          <v-combobox
            v-model="profesiones_Select"
            :items="profesiones"
            multiple
            outlined
            rounded
            solo
            placeholder="Escribe o selecciona aquí"
            @change="search"
            hide-no-data
            :menu-props="{value: autoselectMenu}"
            @click="toggle"
            @keyup.enter="toggle"
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
        <v-col :hidden="!mobile ? false : true" cols="3" sm="2" style="text-align: right;">
          <div data-aos="fade-down" data-aos-anchor="#trigger">
            <v-btn class="mx-2" fab light color="#f1e345">
              <v-icon>mdi-file-document</v-icon>
            </v-btn>
          </div>
        </v-col> 
      </v-row>
    </div>

    <TarjetaProfesional :mobile="mobile"/>
    
    <div class="space-footer" />

  </v-container>
</template>

<script>
import IconBase from '@/components/IconBase'
import IconSemid from '@/components/icons/IconSemid'
import TarjetaProfesional from '@/components/TarjetaProfesional'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    IconBase,
    IconSemid,
    TarjetaProfesional
  },
  data(){
    return{
      autoselectMenu: false,
    }
  },
  props: ['mobile'],
  created(){
    this.setearLoading()
  },
  methods: {
    ...mapActions(['setearProfesionSeleccionada','setearLoading']),
    backHome() {
      this.$router.push('/');
    },
    search: function(val){
      this.setearProfesionSeleccionada(val)
      this.setearLoading()
    },
    toggle() {
      this.autoselectMenu = !this.autoselectMenu
    }
  },
  computed: {
    ...mapState(['profesiones','profesiones_Select']),
  }
} 
</script>
