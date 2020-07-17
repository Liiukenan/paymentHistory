<template>
 <div class="hello">
   <div class="box" ref="box">

   </div>
 </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted(){
    console.log(this.$refs.box.getBoundingClientRect())
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .hello{
    .box{
      width 100px
      height 100px
      background red
    }
  }
</style>
