<!-- 详情页 -->
<template>
  <div class="details" v-cloak id="details">
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
          <span class="fc-hui6">{{convertUTCDateToLocalDate(list[this.$route.query.listId].time)}}</span>
        </div>
        <div class="flex-between mb-24">
          <span>{{$t("price")}}</span>
          <span class="fc-hui6"><i class="mr-4">{{list[this.$route.query.listId].currency}}</i>{{list[this.$route.query.listId].money}}</span>
        </div>
        <div class="flex-between mb-24" v-if="list[this.$route.query.listId].paymentMethod!=''">
          <span>{{$t("method")}}</span>
          <span class="fc-hui6">{{list[this.$route.query.listId].paymentMethod}}</span>
        </div>
        <div class="flex-left">
          <span class="order-number">{{$t("number")}}</span>
        </div>
        <div class="flex-right mt-8">
           <span class="fc-hui6">{{list[this.$route.query.listId].orderNumber}}</span>
        </div>
        <div class="flex-justify-center refresh-payment fs-14" v-if="list[this.$route.query.listId].is_pay_repair_open">
          <button v-fb="{cls:'buttonActive'}" @click="purchaseActive" v-if="btn">{{$t("refreshBtn")}}</button>
          <!-- <a class="disBtn" v-else>Refresh payment status ({{time}}s)</a> -->
          <a class="disBtn" v-else>{{$t("refreshBtns").replace(/@/, time)}}</a>
        </div>
      </div>
      <div v-if="isAihelp">
        <div
          class="mt-50 flex-justify-center flex-items-center fc-hui4 fs-12  pl-24 pr-24 text-center" 
        >{{$t("problems")}}</div>
        <div class="fs-16 flex-justify-center service mt-6 flex-items-center pb-32" @click="help">
          <img src="../assets/images/ic_CustomerSupport.png" alt />
          <span class="ml-4 fc-green">{{$t("support")}}</span>
        </div>
      </div>
      
    </div>
    <Purchase v-if="isPurchase" @transClose="close" :orderId="list[this.$route.query.listId].orderNumber" :listId="this.$route.query.listId"/>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from "vuex";
import {getQueryVariable,convertUTCDateToLocalDate} from "../api/util"
import Purchase from './Purchase'
import { lock, unlock } from 'tua-body-scroll-lock'
const details = document.querySelector("#details");
export default {
  data(){
    return{
      getQueryVariable:getQueryVariable('packageName'),
      isPurchase:false,
      time:10,
      btn:true,
      convertUTCDateToLocalDate:convertUTCDateToLocalDate
    }
  },
  components:{
    Purchase
  },
  computed: {
    ...mapState(["list","isAihelp","date","updateList"])
  },
  beforeRouteLeave(to,from,next){
    to.meta.keepAlive=true;
    next();
  },
  methods: {
    ...mapActions(["confirm"]),
    ...mapMutations({listEmpty:"LISTEMPTY"}),
    close(data){
      this.isPurchase=data;
      unlock(details);
      let list=[];
      if(this.updateList=="TXN_SUCCESS"){
        list=JSON.parse(JSON.stringify(this.list));
        list[this.$route.query.listId].status=1;
        list[this.$route.query.listId].is_pay_repair_open=false;
        this.listEmpty(list);
      }
    },
    purchaseActive(){
      this.isPurchase=true
      lock(details)
      this.btn=false
      let timeBtn=setInterval(() => {
        this.time--
        if(this.time<=0){
          this.btn=true
          this.time=10
          clearInterval(timeBtn)
        }
      }, 1000)
      let data=this.base.refresh(this.list[this.$route.query.listId].orderNumber);
      this.confirm(data);

      

    },
    help() {
      let details=this.$store.state.list[ this.$route.query.listId ];
      this.base.getHelp(details.orderNumber,JSON.stringify(details));
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
  }
};
</script>
<style lang='stylus' scoped>
.details-box{
  padding-top 48px
  position absolute
  width 100%
  top 0
  .refresh-payment{
    button,a{
      border: 1px solid #FFAD5C;
      border-radius: 24px;
      color #FFAD5C
      width 288px
      height 44px
      margin-top 32px
      display inline-block
      line-height 42px
      text-align center
    }
    .disBtn{
      border: 1px solid #DADADA;
      color: #DADADA;
    }
    
  }
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
  .buttonActive{
    background: rgba(255,173,92,0.20);
  }
}
</style>