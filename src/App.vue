<template>
  <v-app>
      <Toolbar />
      <Home />
      <Footer />
  </v-app>
</template>

<script>
  import Toolbar from './components/Toolbar';
  import Home from './components/Home';
  import Footer from './components/Footer';

  export default {
    name: 'App',
    components: {
      Toolbar,
      Home,
      Footer
    }
  };
</script>
