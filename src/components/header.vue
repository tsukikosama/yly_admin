<template>
  <div class="mycontent">
      <div class="bread">
       
      </div>
      <div class="ava">
          <el-dropdown>
            <span class="el-dropdown-link">
                {{this.$store.state.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >
                  <el-span @click="logout()">退出</el-span>
                </el-dropdown-item>
                
            </el-dropdown-menu>
            </el-dropdown>
          <img src="../assets/image/avator.jpg" alt="">
      </div>
  </div>
</template>

<script>

export default {
  
   
     data () {
    return {
      breadList: [] // 路由集合
    }
  },
  watch: {
    // 监听路由的变化
  
  },
  methods: {
    
     logout(){
      console.log("666")
        this.$router.push({ path: '/' })
         this.$store.commit('logout')
         localStorage.removeItem('user')
         
      },
  },
  
    watch:{
        //路由改变时监听
       
    }
}
</script>

<style scoped>
    .mycontent{
        width: 80vw !important;
        height: 60px !important;
        /* padding: 10px; */
        display: flex;
        justify-content: space-between;
    }
    .bread{
        max-width: 50vw;
        overflow: hidden;
        padding-left:10px ;
    }
    
    .ava img{
        width: 50px;
        height: 50px;
        /* padding-right: 10px ; */
        /* padding-top: 10px; */
        margin-right: 10px;
        margin-top: 10px;
        overflow: hidden;
        border-radius: 100px;
    }
    .ava span{
       color: #606266;
        cursor: text;
            display: inline-block;
        height: 48px;
        vertical-align: bottom;
        line-height: 48px;
        font-size: 24px;
        padding-right: 24px ;
    }

    .bread  /deep/ .el-breadcrumb{
        display: inline-block;
        display: inline-block;
        height: 48px;
        vertical-align: top;
        line-height: 48px;
       
    }
    .bread /deep/ .is-link{
        font-weight: normal;
    }
    
</style>