<!-- 详情页 -->
<template>
  <div class="details" v-cloak>
    <div class="details-box">
      <div class="coins flex-justify-center flex-items-center flex-column">
          <img src="../assets/images/ic_payment_successful.png" alt class="result-icon" />
          <span class="coin-icon flex-items-center mt-14">
            <img  v-if="details.type==2" :src="require(`../assets/images/ic_coins_${getQueryVariable}.png`)" alt />
            <i class="fs-24 bold-500" v-if="details.type==1">{{filterDays(details.coins)}}</i>
            <i class="fs-24 bold-500" v-else>{{details.coins}}</i>
          </span>        
      </div>
      <div class="content pt-24 pb-24 pl-16 pr-16 fs-14 bg-white fc-hui4">
        <div class="flex-between mb-24">
          <span>{{$t("status")}}</span>
          <span class="fc-green" v-if="details.status==1">{{$t("successful")}}</span>
          <span class="fc-red" v-if="details.status==0">{{$t("failed")}}</span>
          <span class="fc-gray" v-if="details.status==2">{{$t("pending")}}</span>
        </div>
        <div class="flex-between mb-24">
          <span>{{$t("time")}}</span>
          <span class="fc-hui6">{{details.time}}</span>
        </div>
        <div class="flex-between mb-24">
          <span>{{$t("price")}}</span>
          <span class="fc-hui6">{{details.money}}</span>
        </div>
        <div class="flex-between mb-24">
          <span>{{$t("method")}}</span>
          <span class="fc-hui6">{{details.paymentMethod}}</span>
        </div>
        <div class="flex-between">
          <span>{{$t("number")}}</span>
          <span class="fc-hui6">{{details.orderNumber}}</span>
        </div>
      </div>
      <div
        class="mt-16 flex-justify-center flex-items-center fc-hui4 fs-12"
      >{{$t("problems")}}</div>
      <div class="fs-16 flex-justify-center service mt-6 flex-items-center" @click="help">
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
      details:'',
      getQueryVariable:getQueryVariable('packageName')

    }
  },
  computed: {
    ...mapState(["list"])
  },
  watch: {},
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
    this.details=this.list[this.$route.query.listId];
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

  .service {
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
</style>