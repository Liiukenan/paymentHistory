<!-- 详情页 -->
<template>
  <div class="details" v-cloak>
    <div class="details-box" v-if="list[this.$route.query.listId]">
      <div class="coins flex-justify-center flex-items-center flex-column">
          <img :src="require(`../assets/images/ic_payment_${list[this.$route.query.listId].status}.png`)" alt class="result-icon" />
          <span class="coin-icon flex-items-center mt-14">
            <img  v-if="list[this.$route.query.listId].type==2" :src="require(`../assets/images/ic_coins_${getQueryVariable}.png`)" alt />
            <i class="fs-24 bold-500" v-if="list[this.$route.query.listId].type==1">{{filterDays(list[this.$route.query.listId].coins)}}</i>
            <i class="fs-24 bold-500" v-else>{{list[this.$route.query.listId].coins}}</i>
          </span>        
      </div>
      <div class="content pt-24 pb-24 pl-16 pr-16 fs-14 bg-white fc-hui4">
        <div class="flex-between mb-24">
          <span>{{$t("status")}}</span>
          <span class="fc-green" v-if="list[this.$route.query.listId].status==1">{{$t("successful")}}</span>
          <span class="fc-red" v-if="list[this.$route.query.listId].status==0">{{$t("failed")}}</span>
          <span class="fc-gray" v-if="list[this.$route.query.listId].status==2">{{$t("pending")}}</span>
        </div>
        <div class="flex-between mb-24">
          <span>{{$t("time")}}</span>
          <span class="fc-hui6">{{list[this.$route.query.listId].time}}</span>
        </div>
        <div class="flex-between mb-24">
          <span>{{$t("price")}}</span>
          <span class="fc-hui6"><i class="mr-4">{{list[this.$route.query.listId].currency}}</i>{{list[this.$route.query.listId].money}}</span>
        </div>
        <div class="flex-between mb-24">
          <span>{{$t("method")}}</span>
          <span class="fc-hui6">{{list[this.$route.query.listId].paymentMethod}}</span>
        </div>
        <div class="flex-left">
          <span class="order-number">{{$t("number")}}</span>
        </div>
        <div class="flex-right mt-8">
           <span class="fc-hui6">{{list[this.$route.query.listId].orderNumber}}</span>
        </div>
      </div>
      <div
        class="mt-16 flex-justify-center flex-items-center fc-hui4 fs-12  pl-24 pr-24 text-center"
      >{{$t("problems")}}</div>
      <div class="fs-16 flex-justify-center service mt-6 flex-items-center" @click="help" v-if="isAihelp">
        <img src="../assets/images/ic_CustomerSupport.png" alt />
        <span class="ml-4 fc-green">{{$t("support")}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {getQueryVariable} from "../api/util"
export default {
  data(){
    return{
      // details:'',
      getQueryVariable:getQueryVariable('packageName')

    }
  },
  computed: {
    ...mapState(["list","isAihelp"])
  },
  watch: {},
  beforeRouteLeave(to,from,next){
    to.meta.keepAlive=true;
    next();
  },
  methods: {
    help() {
      this.base.getHelp();
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
  created() {
    // this.details=this.list[this.$route.query.listId];
    // console.log(this.list);
  }
};
</script>
<style lang='stylus' scoped>
.details-box{
  padding-top 48px
  position absolute
  width 100%
  top 0
  .coins {
    height: 4.888889rem;
    .result-icon {
      width: 1.777778rem;
      height: 1.777778rem;
      border-radius: 50%;
    }

    .coin-icon {
      img {
        width: 0.416667rem;
        height: 0.416667rem;
        margin-right: 0.222222rem;
      }
    }
  }
  .order-number{
    width 140px

  }
  .order-cont{
    width 140px
    word-break:break-all
    word-wrap:break-word
    // text-align 
    font-size 13px
  }
  .service {
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
</style>