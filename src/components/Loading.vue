<!-- loading -->
<template>
<div class='loading flex-justify-center flex-items-center' @touchmove.prevent>
    <lottie :options="defaultOptions" :height="72" :width="72" v-on:animCreated="handleAnimation" />
</div>
</template>

<script>
import animationData from "../assets/lottie/loading.json";

export default {
components: {},
data() {
return {
    defaultOptions: { animationData: animationData },
    animationSpeed: 1,
    anim: {},
    width:72,
    height:72
};
},
computed: {},
watch: {},
methods: {
    handleAnimation: function(anim) {
        this.anim = anim;
        // console.log(anim); //这里可以看到 lottie 对象的全部属性
    },
},
mounted() {
    setTimeout(() => {
        this.$emit('closeLoading',false);
    }, 3000);
},
}
</script>
<style lang='stylus' scoped>
    .loading{
        position fixed
        left 0
        top 0
        bottom 0
        right 0
        z-index 999

    }
</style>