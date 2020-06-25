<template>
  <div>
    <Stickytop top="1" :scroll-y="scrollY"></Stickytop>

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
          <v-avatar 
            :size="85"
            rounded
            color="grey"
            >
          </v-avatar>
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
          <v-card-actions>
          <v-spacer></v-spacer>
          <div class="space-button" />
          <v-btn
            text
            color="#b96d12"
          >
            Agendar hora
          </v-btn>
        </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <div class="space-cards" />
</div>

  <div class="space-footer" />
  </div>
</template>

<script>
import Stickytop from '../components/Stickytop';
export default {
  components: {
    Stickytop
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
.space-footer {
  height: 100px;
}
</style>