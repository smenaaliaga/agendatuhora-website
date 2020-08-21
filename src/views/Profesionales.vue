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
          <v-text-field
            solo
            rounded
            append-icon="mdi-magnify"
            placeholder="Escribe aquí"
            outlined
          ></v-text-field>
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

    <TarjetaProfesional :mobile="mobile" :search="$route.params.search" />
    
    <div class="space-footer" />

  </v-container>
</template>

<script>
import IconBase from '@/components/IconBase'
import IconSemid from '@/components/icons/IconSemid'
import TarjetaProfesional from '@/components/TarjetaProfesional'
export default {
  components: {
    IconBase,
    IconSemid,
    TarjetaProfesional
  },
  props: ['mobile'],
  methods: {
    backHome() {
      this.$router.push('/');
    }
  },
} 
</script>
