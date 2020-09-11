<template>
  <transition name="slider" mode="out-in">
    <div class="list-box" v-cloak>
      <Date />
      <History/>
  </div>
</transition>
</template>

<script>
import {_mylist} from '../api/server'
import Date from "./Date"
import History from "./History"
export default {
  name: "list",
  components:{
    Date,
    History
  }
};
</script>
<style scoped lang="stylus">
.list-box{
  padding-top 48px
}
</style>
