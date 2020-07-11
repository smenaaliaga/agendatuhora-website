<template>
  <v-container>
    <div v-sticky sticky-offset="{top: 10}">
      <v-row>
        <v-col cols="2">
          <!--<div data-aos="fade-down" data-aos-anchor="#trigger">-->
            <v-btn class="mx-2" text fab light large @click="backHome()" color="grey">
              <icon-base width="200" height="200" icon-name="SEMID"><icon-Semid /></icon-base>
            </v-btn>
          <!--</div>-->
        </v-col>
        <v-col cols="6">
            <v-text-field
                solo
                rounded
                placeholder="Busca tu profesional o especialidad"
                outlined
            />
        </v-col>
        <v-col cols="2" style="text-align: right;">
            <v-btn rounded 
                href="#"
                color="#507F51"
                dark
                x-large
                :elevation="3"
            > 
                <v-icon class="icon-right">mdi-magnify</v-icon>
                <span class="mr-2">Buscar</span>
            </v-btn>
        </v-col>
        <v-col cols="2" style="text-align: right;">
          <!--<div data-aos="fade-down" data-aos-anchor="#trigger">-->
            <v-btn class="mx-2" fab light large color="#f1e345">
              <v-icon>mdi-file-document</v-icon>
            </v-btn>
          <!--</div>-->
        </v-col> 
      </v-row>
    </div>

    <TarjetaProfesional />
    
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
  methods: {
    backHome() {
      this.$router.push('/');
    }
  },
} 
</script>

<style scoped>
.space-footer {
  height: 100px;
}
</style>
