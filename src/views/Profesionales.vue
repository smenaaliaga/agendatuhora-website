<template>
  <div sticky-container>
    <div v-sticky sticky-offset="{top: -10}" sticky-z-index="20">
      <v-container>
          <v-row style="position: absolute; width: 100%; z-index: 100;">
            <v-col cols="2">
              <div data-aos="fade-down" data-aos-anchor="#trigger">
                <v-btn class="mx-2" text fab light large @click="backHome()" color="grey">
                  <icon-base width="200" height="200" icon-name="SEMID"><icon-Semid /></icon-base>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="5">
                <v-text-field
                    solo
                    rounded
                    placeholder="Busca tu profesional o especialidad"
                    outlined
                />
            </v-col>
            <v-col cols="3">
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
            <div data-aos="fade-down" data-aos-anchor="#trigger">
              <v-col cols="2">
                <v-btn class="mx-2" fab light large color="#f1e345">
                  <v-icon>mdi-file-document</v-icon>
                </v-btn>
              </v-col> 
            </div>
          </v-row>
      </v-container>
    </div>

    <div class="first-space" />

    <TarjetaProfesional />
    
    <div class="space-footer" />

  </div>
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
.first-space {
  height: 70px;
}
.space-footer {
  height: 100px;
}
</style>
