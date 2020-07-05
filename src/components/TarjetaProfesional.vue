<template>
    <div>
        <div v-for="(profesional, index) in profesionales" v-bind:key="index">
            <v-card
                class="mx-auto"
                max-width="650"
                outlined
            >
                <v-container>
                    <v-row justify="space-between">
                        <v-col cols="2">
                            <v-avatar 
                                :size="100"
                                rounded
                                color="grey"
                            >
                            </v-avatar>
                        </v-col>
                        <v-col cols="4">
                            <div align="right">
                                <div class="title font-weight-regular">
                                    {{ profesional.nombre }}
                                </div>
                                <div class="font-weight-bold">
                                    {{ profesional.profesion }}
                                </div> 
                                <div class="font-weight-light">
                                    {{ profesional.comuna }}
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <div class="caption">
                                {{profesional.bio}}
                            </div>
                        </v-col>
                    </v-row>
                    <div align="right">
                        <v-btn text small color="primary">Agenda tu hora</v-btn>
                    </div>
                </v-container>
            </v-card>

            <div v-if="index == 2"><div id="trigger"></div></div>

            <div class="space-cards" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
    ...mapState(['profesionales']),
  },
  methods: {
      goProfesionales() {
          this.$router.push('/profesionales/hora');
      }
  }
}
</script>

<style scoped>
.space-cards {
  height: 10px;
}
</style>