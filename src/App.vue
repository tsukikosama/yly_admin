<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>


export default {
  name: 'App',
  // created: function () {
  //   // 在页面加载时读取sessionStorage里的状态信息
  //   sessionStorage.getItem('umeetCloudVuex') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(sessionStorage.getItem('umeetCloudVuex'))));
  //   // 在页面刷新时将vuex里的信息保存到sessionStorage里
  //   window.addEventListener('beforeunload', () => {
  //     sessionStorage.setItem('umeetCloudVuex', JSON.stringify(this.$store.state))
  //   })
  // }
}
</script>

<style scoped>
  #app{
    border: 0px !important;
   margin: 0px !important;
   width: 100% !important;
  }
</style>
