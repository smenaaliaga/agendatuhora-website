<template>
<div id="app">
  <v-app>
    <Toolbar :mobile="this.mobile" />
    <router-view :mobile="this.mobile" />
    <Footer :mobile="this.mobile" />
  </v-app>
</div>
</template>

<script>
  import { mapActions } from 'vuex'

  import Toolbar from './components/Toolbar';
  import Footer from './components/Footer';
  export default {
    components: {
      Toolbar,
      Footer
    },
    data () {
      return {
        window: {
          width: 0,
          height: 0
        },
        mobile: false
      }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize()

        // VARIABLES DE AMBIENTE
        this.getProfesionales()
        this.getProfesiones()
        this.getUbicaciones()
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      // CREACION DE LOS SELECTORES PROFESIONALES
      ...mapActions(['getProfesionales','getProfesiones','getUbicaciones']),
      handleResize() {
          this.window.width = window.innerWidth;
          this.window.height = window.innerHeight;
          this.isMobile();
      },
      isMobile() {
        if(this.window.width < 600) {
          this.mobile = true
        } else {
          this.mobile = false
        }
      }
    },
  };
</script>

<style>

  @media (max-width: 600px) { 
    span.icon {
      font-size : x-large;
    }
    span.text {
      height   : 1px;
      width    : 1px;
      position : absolute;
      overflow : hidden;
      top      : -1000px; 
    }
  }
  .space-footer {
    height: 100px;
  }
</style>
