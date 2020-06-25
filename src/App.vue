<template>
<div id="app">
  <v-app>
    <Toolbar />
    <router-view />
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
      return {}
    }
  };
</script>
