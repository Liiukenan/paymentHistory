import { mapMutations } from 'vuex';
<!-- 网络错误 -->
<template>
<div class='flex-items-center flex-justify-center flex-column empty'>
    <img src="../assets/images/ic_PaymentHistory_error.png" alt="">
    <span class="fc-hui4 fs-14 mt-12 sorry bold-500">{{$t('sorry')}}</span>
    <a href="javascript:void(0)" class="fs-18 bold mt-16 flex-justify-center flex-items-center" @click="retry">{{$t('refesh')}}</a>
</div>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex';
export default {
    computed:{
        ...mapState(['date']),
    },
    methods:{
         ...mapMutations({setLoading:"SETLOADING"}),
        ...mapActions(['getList']),
        retry(){
            this.setLoading(true);
            let data=this.base.getData(this.date);
            this.getList(data);
        }
    }
}
</script>
<style lang='stylus' scoped>
    .empty{
        position fixed
        left 50%
        top 50%
        transform translate(-50%,-50%)
        img{
            width 64px
            height 64px
        }
        a{  
            background: rgba(126,211,33,0.20);
            border: 1px solid #7ED321;
            border-radius: 10px;
            width 220px
            height 48px
            color #7ED321
            
        }
        .sorry{
            width 280px
            text-align center
        }
    }
</style>