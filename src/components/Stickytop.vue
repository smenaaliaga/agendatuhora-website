<template>
    <div class="a-box" :style="myStyle"></div>
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