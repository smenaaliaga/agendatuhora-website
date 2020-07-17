<template>
<div id="app">
  <v-app>
    <Toolbar :mobile="this.mobile" />
    <router-view :mobile="this.mobile" />
    <Footer />
  </v-app>
</div>
</template>

<script>
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
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
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
    }
  };
</script>

<style>
  span {
    font-size : medium;
  }

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
    .display-2 {
        font-size: 1px;
    }
  }
</style>
