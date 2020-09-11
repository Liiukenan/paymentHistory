import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import {_mylist,_getList,_info} from '../api/server'
import createPersistedState from "vuex-persistedstate"
export default new Vuex.Store({
  state: {
    list:null,
    loading:true,
    showRetry:false,
    date:`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}`
  },
  mutations: {
    SETLOADING(state,data){
      state.loading=data;
    },
    SETSHOWRETRY(state,data){
      state.showRetry=data;
    },
    LISTEMPTY(state,data){
      state.list=data;
    },
    SETDATE(state,date){
      state.date=date
    },
    SETLIST(state,data){
      // let dd=[
          //   {
          //     coins: 239,
          //     money: 5,
          //     orderNumber: "GPA.3389-1225-5398-12001",
          //     paymentMethod: "android",
          //     status: 0,
          //     time: "2020-09-08 08:02:40",
          //     type: 2
          //   },
          //   {
          //     coins: 239,
          //     money: 5,
          //     orderNumber: "GPA.3389-1225-5398-12001",
          //     paymentMethod: "android",
          //     status: 1,
          //     time: "2020-09-08 08:02:40",
          //     type: 2
          //   },
          //   {
          //     coins: 239,
          //     money: 5,
          //     orderNumber: "GPA.3389-1225-5398-12001",
          //     paymentMethod: "android",
          //     status: 2,
          //     time: "2020-09-08 08:02:40",
          //     type: 2
          //   },
          //   {
          //     coins: 3,
          //     money: 5,
          //     orderNumber: "GPA.3389-1225-5398-12001",
          //     paymentMethod: "android",
          //     status: 2,
          //     time: "2020-09-08 08:02:40",
          //     type: 1
          //   },
          //   {
          //     coins: 7,
          //     money: 5,
          //     orderNumber: "GPA.3389-1225-5398-12001",
          //     paymentMethod: "android",
          //     status: 2,
          //     time: "2020-09-08 08:02:40",
          //     type: 1
          //   },
          //   {
          //     coins: 30,
          //     money: 5,
          //     orderNumber: "GPA.3389-1225-5398-12001",
          //     paymentMethod: "android",
          //     status: 2,
          //     time: "2020-09-08 08:02:40",
          //     type: 1
          //   },
          //   {
          //     coins: 360,
          //     money: 5,
          //     orderNumber: "GPA.3389-1225-5398-12001",
          //     paymentMethod: "android",
          //     status: 2,
          //     time: "2020-09-08 08:02:40",
          //     type: 1
          //   },
          //   {
          //     coins: 3600,
          //     money: 5,
          //     orderNumber: "GPA.3389-1225-5398-12001",
          //     paymentMethod: "android",
          //     status: 2,
          //     time: "2020-09-08 08:02:40",
          //     type: 1
          //   },
          //   {
          //     coins: 3,
          //     money: 5,
          //     orderNumber: "GPA.3389-1225-5398-12001",
          //     paymentMethod: "android",
          //     status: 2,
          //     time: "2020-09-08 08:02:40",
          //     type: 1
          //   },
          // ]
      setTimeout(() => {
        Vue.set(state,'list',data);
        state.loading=false;
        state.showRetry=false;
      }, 1000);
      
    }
  },
  actions: {
    getList(context,data){
      return _mylist(data).then(res=>{
          if (res.data.status!=-1) {
            return context.commit("SETLIST",res.data.data.list);
          }
          
      })
    }
  },
  // plugins: [createPersistedState({
  //   storage:window.sessionStorage,
  //       reducer(val)  {
  //           return {
  //               // 只储存state中的token
  //               list: val.list,
  //               loading:val.loading
  //           }
  //       }
  //   })]
});
