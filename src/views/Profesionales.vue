<template>
  <div id="vista-prueba">
    <Stickytop top="0" :scroll-y="scrollY"></Stickytop>

    <div class="first-space" />

<div v-for="(profesional, index) in profesionales" v-bind:key="index">
  <v-card
      class="mx-auto"
      max-width="600"
      outlined
  >
    <v-container>
      <v-row justify="space-between">
        <v-col cols="2">
          <avatar username="Ivo Carvallo"
            :size="85">
          </avatar>
        </v-col>
        <v-col cols="6">
          <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{profesional.nombre}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{profesional.profesion}} - Especialista en {{profesional.especialidad}}
              </v-list-item-subtitle>
          </v-list-item-content>
        </v-col>
        <v-col cols="4">
          <v-btn
            text
            color="deep-purple accent-4"
          >
            Agendar hora
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <div class="space-cards" />
</div>

  </div>
</template>

<script>
import Stickytop from '../components/Stickytop';
import Avatar from 'vue-avatar';
export default {
  components: {
    Stickytop,
    Avatar
  },
  data() {
    return {
      scrollY: null
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollY = Math.round(window.scrollY);
    });
  },
  computed: {
    profesionales() {
      return this.$store.state.profesionales
    }
  }
} 
</script>

<style>
.first-space {
  height: 65px;
}
.space-cards {
  height: 10px;
}
</style>