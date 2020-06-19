<template>
  <v-app>
      <Toolbar />
      <router-view></router-view>
      <Footer />
  </v-app>
</template>

<script>
  import Toolbar from './components/Toolbar';
  import Footer from './components/Footer';

  export default {
    name: 'App',
    components: {
      Toolbar,
      Footer
    }
  };
</script>
