<template>

<v-container>
    <v-row>
        <v-col cols="1" />
        <v-col cols="7">
            <v-text-field
                solo
                rounded
                placeholder="Busca tu profesional o especialidad"
                outlined
                :style="myStyle"
            ></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-btn rounded 
                href="#"
                color="green accent-4"
                dark
                x-large
                :elevation="5"
                :style="myStyle"
            > 
                <v-icon class="icon-right">mdi-magnify</v-icon>
                <span class="mr-2">Buscar</span>
            </v-btn>
        </v-col>
        <v-col cols="1" />   
    </v-row>
</v-container>

</template>

<script>
export default {
    props: ['top', 'scrollY'],
    data() {
        return {
            myStyle: {},
            originalTop: 0
        }
    },
    mounted() {
        this.originalTop = this.$el.getBoundingClientRect().top;
    },
    watch: {
        scrollY() {
            //const rect = this.$el.getBoundingClientRect();
            const newTop = this.scrollY + +this.top - this.originalTop;

            if (newTop > 0) {
                this.$set(this.myStyle, 'top', `${newTop}px`);
            } else {
                this.$delete(this.myStyle, 'top');
            }
        }
    }
}
</script>

<style>
.a-box {
  display: inline-block;
  height: 5rem;
  width: 5rem;
  border: 2px solid blue;
  position: relative;
}
</style>