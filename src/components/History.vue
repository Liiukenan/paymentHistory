<!-- 列表记录 -->
<template>
<div class="wrapper" ref="wrapper">
    <div class="history content" v-if="list && list.length>0">
        <div class="flex-between bg-white pt-14 pb-14 pl-16 pr-16 history-item" v-for="(item,index) in list" :key="index" @click="details(index)">
            <div class="flex-column content">
                <div class="flex-items-center coins">
                    <!-- <img src="../assets/images/ic_VIP_com.fachat.freechat.png" alt="" v-if="item.type==1" class="vip">  -->
                    <img :src="require(`../assets/images/ic_coins_${getQueryVariable}.png`)" v-if="item.type==2" alt=""  class="ic-coin">
                    <span class="fs-16  number bold-500" v-if="item.type==1">{{filterDays(item.coins)}}</span>
                    <span class="fs-16 ml-6 number bold-500" v-else>{{item.coins}}</span>
                </div>
                <div class="fs-12 date-time fc-hui4 mt-9">
                    {{item.time}}
                </div>
            </div>
            <div class="flex-column money">
                <div class="fs-16 number">{{item.money}}</div>
                <div class="fc-green fs-12" v-if="item.status==1">{{$t("successful")}}</div>
                <div class="fc-red fs-12" v-if="item.status==0">{{$t("failed")}}</div>
                <div class="fc-gray fs-12" v-if="item.status==2">{{$t("pending")}}</div>
            </div>
        </div>
        <div class="flex-justify-center mt-15 fc-hui4 mb-15">
            {{$t("recorded")}}
        </div>
    </div>
    <Empty v-if="list && list.length==0"/> 
    </div>
    
   
    

</template>

<script>
import Empty from './Empty'
import {mapState} from "vuex"
import {getQueryVariable} from "../api/util"
export default {
    data(){
        return{
            getQueryVariable:getQueryVariable('packageName')
        }
    },
    watch: {},
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
        ...mapState(["list"])
    }
}
</script>
<style lang='stylus' scoped>
.history{
    padding-bottom 0.416667rem
   .history-item{
       border-bottom  0.027778rem solid rgba(0,0,0,0.08);
   }
   .content{
       position relative
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
        margin-left -0.277778rem
    }
    .money{
        text-align right 
       .number{
            font-weight 500
        } 
        .fc-green{
            transform scale(0.83)
            margin-right -0.25rem
        }
    }
    
}
    
</style>