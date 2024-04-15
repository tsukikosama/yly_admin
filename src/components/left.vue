<template>
    <div class="content">
       <el-row class="tac">
  <el-col :span="12">
    <!-- <h5>默认颜色</h5> -->
    <el-menu
      :router="true"
      class="el-menu-vertical-demo"
      :default-active="this.$route.path"
      >
       <el-menu-item index="/item" >
        <i class="el-icon-menu"></i>
        <span slot="title" >项目</span>
      </el-menu-item>
      <el-menu-item index="/shop" >
        <i class="el-icon-menu"></i>
        <span slot="title">商店</span>
      </el-menu-item>
      <el-menu-item index="/news" >
        <i class="el-icon-document"></i>
        <span slot="title">新闻</span>
      </el-menu-item>
      <el-menu-item index="/order" >
        <i class="el-icon-setting"></i>
        <span slot="title">订单</span>
      </el-menu-item>
      <el-menu-item index="/review" >
        <i class="el-icon-setting"></i>
        <span slot="title">评论</span>
      </el-menu-item>
      <el-menu-item index="/user" >
        <i class="el-icon-setting"></i>
        <span slot="title">用户</span>
      </el-menu-item>
      <el-menu-item index="/service" >
        <i class="el-icon-setting"></i>
        <span slot="title">客服</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  
</el-row>
    </div>
</template>




<script>
import router from '@/router';
  export default {
     methods: {
      
      
    }
  }
</script>

<style>
  .content{
      width: 15vw;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 14vw;
    min-height: 100vh;
    
  }
</style>