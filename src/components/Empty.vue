<!-- 空 -->
<template>
<div class='flex-items-center flex-justify-center flex-column empty'>
    <img src="../assets/images/ic_PaymentHistory_ParaMe.png" alt="">
    <span class="fc-hui4 fs-14 mt-12">{{$t('noPayment')}}</span>
</div>
</template>
<style lang='stylus' scoped>
    .empty{
        position fixed
        left 50%
        top 50%
        transform translate(-50%,-50%)
        img{
            width 1.777778rem
            height 1.777778rem
        }
    }
</style>