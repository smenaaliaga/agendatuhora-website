<template>
  <div id="vista-prueba">
    <div class="spacer"></div>
    <Stickytop top="0" :scroll-y="scrollY"></Stickytop>
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
} 
</script>

<style>
#vista-prueba {
  height: 1200px;
}

.spacer {
  height: 15px;
}
.a-box {
  display: inline-block;
  height: 5rem;
  width: 5rem;
  border: 2px solid blue;
  position: relative;
}
</style>