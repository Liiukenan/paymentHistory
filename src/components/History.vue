<!-- 列表记录 -->
<template>
<div>
    <div class="history wrapper"  @scroll="listScroll($event)" ref="wrapper">
        <div ref="content">
          <div class="flex-between bg-white pt-14 pb-14 pl-16 pr-16 history-item" v-for="(item,index) in list" :key="index" @click="details(index)">
            <div class="flex-column content">
                <div class="flex-items-center coins">
                    <img :src="require(`../assets/images/ic_coins_${getQueryVariable}.png`)" v-if="item.type==2" alt=""  class="ic-coin">
                    <span class="fs-16  number bold-500" v-if="item.type==1">{{filterDays(item.coins)}}</span>
                    <span class="fs-16 ml-6 number bold-500" v-else>{{item.coins}}</span>
                </div>
                <div class="fs-12 date-time fc-hui4 mt-9" :class="mlTime">
                    {{convertUTCDateToLocalDate(item.time)}}
                </div>
            </div>
            <div class="flex-column money">
                <div class="fs-16 number" :class="textAlign"><span class="mr-5">{{item.currency}}</span>{{item.money}}</div>
                <div :class="mlMoney" class="fc-green fs-12" v-if="item.status==1">{{$t("successful")}}</div>
                <div :class="mlMoney" class="fc-red fs-12" v-if="item.status==0">{{$t("failed")}}</div>
                <div :class="mlMoney" class="fc-gray fs-12" v-if="item.status==2">{{$t("pending")}}</div>
            </div>
        </div>  
        </div>
        
        
    </div>
    <Empty v-if="list && list.length==0"/> 
    <!-- <div class="flex-justify-center mt-15 fc-hui4 mb-15 pl-24 pr-24 text-center" v-if="list && list.length>0">
        {{$t("recorded")}}
    </div> -->
    
    
    </div>


   
    
   
    

</template>

<script>
import Empty from './Empty'

import {mapState} from "vuex"
import {getQueryVariable,convertUTCDateToLocalDate,localDate,getTime} from "../api/util"
import BScroll from 'better-scroll' 
export default {
    data(){
        return{
            getQueryVariable:getQueryVariable('packageName'),
            mlTime:window.lang=='ar'?"mr-time":"ml-time",
            mlMoney:window.lang=='ar'?"ml-money":"mr-money",
            textAlign:window.lang=='ar'?"text-left":"",
            convertUTCDateToLocalDate:convertUTCDateToLocalDate

        }
    },
    watch: {
        list(){
            let wrapper = document.querySelector('.wrapper');
            this.$nextTick(()=>{
                setTimeout(() => {
                    // this.$refs.wrapper.scrollTop=this.top;
                    let scroll = new BScroll(wrapper, {
                        click:true,
                        // scrollbar:true,
                        // tap:true,
                        // preventDefault:false
                      
                    })
                   
                    

                }, 200);
            
        })
        }
    },
    methods: {
        
        details(index){
            this.$router.push({path:'/details',query:{listId:index}})
        },
        filterDays(days){
            let arr=this.base.filterDays(days);
            // 月
            if(arr[0]==1 && arr[1]==1){
                return this.$t("month").replace(/#/, "VIP");
            }
            if(arr[0]>1 && arr[1]==1){
                if(arr[0]>100){
                    return this.$t("lifeTime").replace(/#/, "VIP");
                }
                return this.$t("months").replace(/#/, "VIP").replace(/%/,arr[0]);
            }
            return this.$t("days").replace(/#/, "VIP").replace(/%/,arr[0]);

        }
    },
    components:{
        Empty
    },
    computed:{
        ...mapState(["list","top"])
    }
}
</script>
<style lang='stylus' scoped>
.history{
    height 532px
    overflow-y auto
   .history-item{
       border-bottom  0.027778rem solid rgba(0,0,0,0.08);
   }
   .content{
       position relative
       background #fff
   }
   .coins{
        .vip{
            width 1.472222rem
            height 0.5rem
        }
        .ic-coin{
            width 0.388889rem
            height 0.388889rem
        }
    } 
    .date-time{
        transform scale(0.83)
        &.ml-time{
            margin-left -0.277778rem
        }
        &.mr-time{
            margin-right -0.277778rem
        }
    }
    .money{
        text-align right 
       .number{
            font-weight 500
        } 
        .fc-green,.fc-red,.fc-gray{
            transform scale(0.83)
            &.mr-money{
                margin-right -0.2rem
            }
            &.ml-money{
                margin-left -0.2rem
            }
        }
    }
    
}
    
</style>