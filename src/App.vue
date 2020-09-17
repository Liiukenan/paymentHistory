<template>
  <div id="app" :class="ar">
    <Header :headerTitle="headerTitle" @back="back"></Header>
   <transition :name="transitionName">
          <keep-alive>
              <router-view class="transitionBody"></router-view>
          </keep-alive>
        </transition>
    <Loading v-if="loading" @closeLoading="closeLoading"/>
    <Retry v-if="showRetry"/>
  </div>
</template>
<script>
import Header from "./components/Header";
import {_mylist} from './api/server'
import Loading from './components/Loading';
import Retry from './components/Retry';
import { mapState,mapMutations,mapActions} from 'vuex';
export default {
  data() {
    return {
      headerTitle: "",
      list:"",
      transitionName: 'transitionLeft',
      ar:window.lang=="ar"?'ar':false
    };
  },
  components: {
    Header,
    Loading,
    Retry
  },
  watch: {
    $route(to, from) {
      this.title();
      const arr = ['/details'];
      const compare = arr.indexOf(to.path)>arr.indexOf(from.path);
      if(window.lang=="ar"){
        this.transitionName = compare ? 'transitionRight' : 'transitionLeft';
        return;
      }
      this.transitionName = compare ? 'transitionLeft' : 'transitionRight';

      
    }
  },
  methods: {
    ...mapActions(["getList"]),
    ...mapMutations({setLoading:"SETLOADING",setShowRetry:"SETSHOWRETRY",listEmpty:"LISTEMPTY"}),
    closeLoading(data){
      // 三秒后关闭loading
      this.setLoading(data);
      console.log(13424);
      // 显示异常页
      this.setShowRetry(true);
      this.listEmpty(null);
    },
    back() {
      if (this.$route.path == "/") {
        this.base.close();
      }
      if (this.$route.path == "/details") {
        this.$router.go(-1);
      }
    },
    title() {
      if (this.$route.path == "/") {
        this.headerTitle = this.$t("payment"); 
        // this.headerTitle = this.base.getToken()
      }
      if (this.$route.path == "/details") {
        this.headerTitle = this.$t("details");
      }
    }
  },
  computed:{
      ...mapState(['loading','showRetry'])
  },
  created(){
    let date=`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}`;
    let data=this.base.getData(date);
    this.getList(data);
  },
  mounted() {
    this.title();
  }
};
</script>
<style lang="stylus">
#app{
  min-height 100vh
}
.transitionBody{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
  transition: all 0.4s ease-out;
}
.transitionLeft-enter,
.transitionRight-leave-active {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
   /*当左滑进入右滑进入过渡动画*/
}
.transitionLeft-leave-active,
.transitionRight-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

</style>
