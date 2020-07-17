<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    let data={
      title:1234,
      body:567
    }
    this.http({
      method: "post",
      url: "/addpost",
      data:JSON.stringify(data)
      
    }).then(res=>{
      console.log(res)
    });
  }
};
</script>
