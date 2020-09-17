<!-- 时间插件 -->
<template>
<div class='my-date flex-justify-center flex-items-center'>
    <button @click="openPicker" class="date-btn flex-justify-center flex-items-center">
        <span class="fs-14">{{newDate}}</span>  
        <img src="../assets/images/ic_date_arrow.png" alt="" :class="ml">  
    </button>
    <mt-datetime-picker
           v-model="pickerVisible"   
           ref="pickerData"             
           type="date"              
           :cancelText="cancel"    
           :confirmText="confirm"
           month-format="{value}"
           date-format="{value}"
           year-format="{value}"
           :startDate="new Date('2020/1/1')"
           :endDate="new Date()"
           @confirm="handleConfirm"     
           @visible-change = "visbleChange"
         >
         </mt-datetime-picker>
</div>
</template>

<script>
import {_mylist} from '../api/server'
import {mapActions,mapMutations, mapState} from "vuex";
export default {
components: {},
data() {
    return {
        pickerVisible:new Date(),
        ml:window.lang=="ar"?'mr-4':'ml-4',
        time:'',
        handler:function(e){e.preventDefault()},
        cancel:this.$t("cancel"),
        confirm:this.$t("confirm"),
        newDate:'',
        
    };
},
computed: {
    ...mapState(['date'])
},
watch: {
    visible(val) {
        this.$emit('visible-change', val);
    }
},
methods: {
     ...mapActions(["getList"]),
     ...mapMutations({setloading:"SETLOADING",setShowRetry:"SETSHOWRETRY",setDate:"SETDATE"}),
      /*解决iphone页面层级相互影响滑动的问题*/
      closeTouch () {
          document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {passive:false})//阻止默认事件
      },
      openTouch () {
          document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {passive:false})//打开默认事件
      },
      openPicker(){
        this.$refs.pickerData.open();   // 触发
        // this.$refs.pickerData.close() ; // 关闭

      },
      handleConfirm(val){
        // this.pickerVisible=new Date(this.date);
        
        this.setloading(true);
        let year=val.getFullYear();
        let month=val.getMonth()+1;
        let day=val.getDate();
        let date=`${year}/${month}/${day}`;
        this.setDate(date);
        let data=this.base.getData(date);
        
        this.changeDate(date);
        
        this.getList(data);
      },
      changeDate(d){
          let now=`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}`;
          if(now!=d){
            this.newDate=d;
            return;
        }
        this.newDate=this.$t('today');
      },
      visbleChange (val) {
        if(val) {
            this.closeTouch()
        } else {
            this.openTouch()
        }
      }
},
mounted() {
    this.pickerVisible=new Date(this.date);
    this.changeDate(this.date);
},
}
</script>
<style lang='stylus' scoped>
    .my-date{
        height 1.666667rem
        .date-btn{
            padding-left 15px
            padding-right 15px
            height 0.888889rem
            background #fff
            border-radius 0.444444rem
            img{
                width 0.277778rem
                height 0.166667rem
                
            }
        }
        /deep/.mint-datetime .picker-toolbar{
            display flex
            justify-content: space-between;
            padding-left 0.444444rem
            padding-right 0.444444rem

        }
        /deep/ .mint-datetime-action{
            text-align left 
            font-size 0.444444rem
            color: rgba(0,0,0,0.40);
            width auto

        }
        /deep/ .mint-datetime-confirm{
            color: #7ED321;
        }
    }
    
</style>