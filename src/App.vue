<template>
  <div id="app">
    <Header :headerTitle="headerTitle" @back="back"></Header>
    <transition name="fade-transform">
      <router-view class="router-view"/>
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
      list:""
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
    }
  },
  methods: {
    ...mapActions(["getList"]),
    ...mapMutations({setLoading:"SETLOADING",setShowRetry:"SETSHOWRETRY",listEmpty:"LISTEMPTY"}),
    closeLoading(data){
      this.setLoading(data);
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
.router-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
}
.fade-transform-enter-active, .fade-transform-leave-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  transform: translateX(100%);
}

.fade-transform-leave-to {
  transform: translateX(-100%);
}
</style>
