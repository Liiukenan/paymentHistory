import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import {_mylist,_refresh} from '../api/server'
import createPersistedState from "vuex-persistedstate"
export default new Vuex.Store({
  state: {
    list:null,
    loading:true,
    showRetry:false,
    date:`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}`,
    isAihelp:false,
    updateList:false
    // top:0
  },
  mutations: {
    // SETTOP(state,data){
    //   state.top=data;
    // },
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
    GETAIHELP(state,data){
      state.isAihelp=data
    },
    UPDATELIST(state,data){
      console.log(data);
      state.updateList=data
    },
    SETLIST(state,data){
      // let dd=[
      //       {
      //         coins: 239,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 0,
      //         time: "2020-09-08 08:02:40",
      //         type: 2
      //       },
      //       {
      //         coins: 239,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 1,
      //         time: "2020-09-08 08:02:30",
      //         type: 2
      //       },
      //       {
      //         coins: 239,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:50",
      //         type: 2
      //       },
      //       {
      //         coins: 3,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:10",
      //         type: 1
      //       },
      //       {
      //         coins: 7,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:25",
      //         type: 1
      //       },
      //       {
      //         coins: 30,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:40",
      //         type: 1
      //       },
      //       {
      //         coins: 360,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:40",
      //         type: 1
      //       },
      //       {
      //         coins: 3600,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:40",
      //         type: 1
      //       },
      //       {
      //         coins: 3,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:40",
      //         type: 1
      //       },
      //        {
      //         coins: 3,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:40",
      //         type: 1
      //       },
      //        {
      //         coins: 3,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:40",
      //         type: 1
      //       },
      //        {
      //         coins: 3,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:40",
      //         type: 1
      //       },
      //        {
      //         coins: 3,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:40",
      //         type: 1
      //       },
      //        {
      //         coins: 3,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:40",
      //         type: 1
      //       },
      //        {
      //         coins: 3,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:40",
      //         type: 1
      //       },
      //        {
      //         coins: 3,
      //         money: 5,
      //         orderNumber: "GPA.3389-1225-5398-12001",
      //         paymentMethod: "android",
      //         status: 2,
      //         time: "2020-09-08 08:02:40",
      //         type: 1
      //       }
      //     ]
      data.sort(function(a,b){
          return a.time < b.time ? 1 : -1
      });
      setTimeout(() => {
        
        
        // Vue.set(state,'list',dd);
        
        state.loading=false;
        state.showRetry=false;
        Vue.set(state,'list',data);
      }, 2000);
      
    }
  },
  actions: {
    getList(context,data){
      return _mylist(data).then(res=>{
          if (res.data.status!=-1) {
            context.commit("GETAIHELP",JSON.parse(res.data.is_aihelp_open));
            context.commit("SETLIST",res.data.data.list);
          }
          
      })
    },
    confirm(context,data){
      return _refresh(data).then(res=>{
          // if (res.data.status!=-1) {
          //   context.commit("GETAIHELP",JSON.parse(res.data.is_aihelp_open));
          //   context.commit("SETLIST",res.data.data.list);
          // }
          // context.commit("UPDATELIST",true);
          
          if(res.data.status==-1){
            return;
          }
          setTimeout(() => {
            context.commit("UPDATELIST",res.data);
          }, 2000);
          
      })
    }
  },
  // plugins: [createPersistedState({
  //   storage:window.sessionStorage,
  //       reducer(val)  {
  //           return {
  //               // 只储存state中的token
  //               list: val.list,
  //               loading:val.loading,
  //               showRetry:val.showRetry,
  //               date:val.date,
  //               isAihelp:val.isAihelp
  //           }
  //       }
  //   })]
});
