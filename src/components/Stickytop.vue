<template>
<v-container>
    <v-row style="position: absolute; width: 100%; z-index: 100;">
        <v-col cols="1" />
        <v-col cols="7">
            <v-text-field
                solo
                rounded
                placeholder="Busca tu profesional o especialidad"
                outlined
                :style="myStyle"
            />
        </v-col>
        <v-col cols="3">
            <v-btn rounded 
                href="#"
                color="#507F51"
                dark
                x-large
                :elevation="3"
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

</style>