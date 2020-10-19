<!-- 补单 -->
<template>
  <div class="purchase">
    <div class="box">
      <button class="close" @click="closePurchase" v-if="updateList!=='TXN_SUCCESS'">
        <img src="../assets/images/ic_pop_close.png" alt />
      </button>
      <div v-if="!updateList" class="pur-box flex-items-center flex-justify-center flex-column">
        <img src="../assets/images/ic_payment_loading.png" alt class="loading" />
        <div class="fs-18 mt-8">{{$t("verification")}}</div>
        <div class="mt-8 fs-18 fc-hui6">{{$t("wait")}}</div>
      </div>
      <div v-else>
        
        <div  v-if="updateList=='TXN_SUCCESS'">
          <div class="pur-box flex-items-center flex-justify-center flex-column">
            <img src="../assets/images/ic_payment_1.png" class="img-icon"/>
            <div class="fs-18 mt-8">{{$t("successful")}}</div>
            <button class="successBtn fs-18" @click="closePurchase">{{$t("ok")}}</button>
          </div>
        </div>
        <div v-else>
          <div class="pur-box flex-items-center flex-justify-center flex-column">
            <img src="../assets/images/ic_payment_unsuccessful.png" class="img-icon"/>
            <div class="fs-18 mt-8">{{$t("unsuccessful")}}</div>
            <div class="service" v-if="isAihelp">
              <div class="mt-24 fs-14 fc-hui6">{{$t("contact")}}</div>
              <div class="fs-16 flex-justify-center flex-items-center mt-8" @click="help">
                <img src="../assets/images/ic_CustomerSupport.png" alt />
                <span class="ml-4 fc-green">{{$t("support")}}</span>
              </div>
            </div>
            <div v-else>
              <div class="mt-8 fs-14 fc-hui6">{{$t("contact")}}</div>
            </div>
          </div>
        </div>
      </div>
      
      
      
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from "vuex";
export default {
  components: {},
  props:["orderId","listId"],
  data() {
    return {};
  },
  computed: {
    ...mapState(["updateList","isAihelp","list"])
  },
  methods: {
    ...mapMutations({setUpdate:"UPDATELIST"}),
    help(){
      let details=this.list[ this.listId ];
      this.base.getHelp(this.orderId,JSON.stringify(details));
    },
    closePurchase(){
      this.$emit('transClose',false);
      this.setUpdate(false);
    }
  }
};
</script>
<style lang='stylus' scoped>
.purchase
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  background rgba(0, 0, 0, 0.7)
  z-index 999
  .box
    position absolute
    left 0
    rigt 0
    bottom 0
    height 214px
    width 100%
    background #fff
  .close
    position absolute
    left 0
    top 0
    padding 0
    left 10px
    top 12px
    img
      width 24px
      height 24px
  .loading
    width 64px
    height 64px
    animation loadings 0.5s  linear infinite;
  .pur-box
    width 100%
    height 214px
    background #fff
  @keyframes loadings
    from
      transform rotate(0deg)
    to
      transform rotate(360deg)
  .img-icon
    width 64px
    height 64px
  .service
    img 
      width 18px
      height 18px
  .successBtn{
    width 344px
    height 48px
    margin 32px auto 0
    border-radius 10px
    color #fff
    background #7ED321

  }
</style>