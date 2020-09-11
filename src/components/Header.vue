<!-- 头部 -->
<template>
    <div class='header flex-items-center fs-18 flex-between'>
        <div class="pic ml-10" @click="back">
            <img src="../assets/images/ic_payment_back.png" alt="">
        </div>
        <span>{{headerTitle}}</span>
        <div class="pic">
        </div>
    </div>
</template>

<script>
export default {
props:["headerTitle"],
components: {},
data() {
    return {
        token:''
    };
},
methods: {
    back(){
        this.$emit("back")
    }
}
}
</script>
<style lang='stylus' scoped>
    .header{
        position fixed
        height 1.333333rem
        width 100%
        top 0
        left 0
        z-index 999
        background #fff
        box-shadow: 0 0 0 0 rgba(0,0,0,0.08);
        border-bottom 1px solid #f2f2f2
        img,.pic{
            width 0.277778rem
            height 0.666667rem
        }

    }
</style>