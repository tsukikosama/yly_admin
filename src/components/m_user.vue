<template>
  <div class="app-container">
    <div class="myheader">
      <el-span>{{ this.$route.name }}</el-span>
      <el-button class="mybtn" type="primary" @click="add()">添加</el-button>
    </div>

    <el-table :data="list" stripe style="width:100%">
      <el-table-column prop="username" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" class="mycon" width="180">
      </el-table-column>

      <el-table-column prop="password" label="密码" width="180">
      </el-table-column>
      <el-table-column  label="身份" width="180">
        <template slot-scope="scope">
            <el-span v-if="scope.row.type == 0">管理员</el-span>
            <el-span v-else>普通用户</el-span>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="warning" @click="del(scope.$index, scope.row)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>

    <div class="pages">
      <el-pagination background layout="prev, pager, next" :page-size="10" @current-change="topage" :total="all.length">
      </el-pagination>

    </div>

    <el-dialog title="用户信息" class="myform" :visible.sync="dialogFormVisible" center="">

      <div><el-span>用户账号:</el-span><el-input placeholder="用户账号" v-model="item.username"></el-input></div>
      <div><el-span>用户昵称:</el-span><el-input placeholder="用户昵称" v-model="item.nickname"></el-input></div>
      <div><el-span>用户密码:</el-span><el-input placeholder="用户密码" v-model="item.password"></el-input></div>
      <div><el-span>用户邮箱:</el-span><el-input placeholder="用户邮箱" v-model="item.email"></el-input></div>
      <div><el-span>用户类型:</el-span>
        <el-select v-model="item.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" class="mybtn2" @click="submit()">添加</el-button>
    </el-dialog>

  </div>
</template>
  
<script>
import request from '@/utils/request'

// import Vue from 'vue'

export default {

  data() {
    return {
      list: {},
      all: {},
      dialogFormVisible: false,
      curr: 1,


      item: {
        username: '',
        password: '',
        nickname: '',
        email: '',
        type:''
      },
      options: [{
          value: 0,
          label: '管理员'
        }, {
          value: 1,
          label: '用户'
        }],



    }

  },
  created() {
    this.init();
    // this.topage(1)
  },
  //   computed:{
  //       list: function(){
  //           return this.all.slice(this.curr,this.curr+10);
  //       }
  //   },
  watch: {
    curr(n, o) {
      this.list = this.all.slice((this.curr - 1) * 10, (this.curr - 1) * 10 + 10);
    },
    all() {
      this.list = this.all.slice((this.curr - 1) * 10, (this.curr - 1) * 10 + 10);
    }
  },
  methods: {


    submit() {
      // var that = this;

      request.post('/user/update', this.item).then((res) => {
        //判断当前页面是否大于10个 如果小于就添加进当前list   
        let s = this.item
        s = JSON.parse(JSON.stringify(s));

        if (this.flag >= 0) {
          // arr.splice(2,3,"William")
          // this.$message.success("666");
          this.all.splice(this.flag, 1, s)
        } else {
          // this.$message.success("999")
          this.all.push(s);
        }
        this.$message.success("更新成功")
        this.dialogFormVisible = false
        this.clearValue(this.item)
      }).catch((e) => {
        this.$message.error("用户名以存在");
        this.dialogFormVisible = false
      })
    },
    topage(val) {
      this.curr = val;
      request.get('/user/' + val).then((res) => {
        this.list = res.data
      }).catch((e) => {
        this.$message.error("服务器异常，请稍后再试")
      })
    },
    init() {
      request.get('/user/list').then((res) => {
        this.all = res.data
        // this.list = this.all.slice(this.curr,10);
      }).catch((e) => {

      })
    },
    add() {
      this.clearValue(this.item)
      this.dialogFormVisible = true

    },
    handleEdit(index, row) {
      //更新
      this.flag = index
      this.dialogFormVisible = true
      //给对象复制
      let ss = JSON.parse(JSON.stringify(row))
      // console.log(ss)
      this.item = ss
    },

    del(index, row) {
      //   console.log((this.curr-1)*10+index)

      request.post('/user/delete/' + row.uid).then((res) => {
        this.$message.success("删除成功");
        this.all.splice((this.curr - 1) * 10 + index, 1)
      }).catch((e) => {
        this.$message.error("删除失败,请稍后再试");
      })
    },
  },

}
</script>
<style scoped>
.pages {
  /* display: flex;
     justify-content: center; */
  padding: 20px;
  /* display: inline-flex; */
  text-align: center;

}

.myheader {
  display: flex;
  width: 80vw !important;
  height: 30px !important;
  text-align: center;
  justify-content: space-between;
  /* padding: 5px; */
  /* padding-top: 10px ; */
}

.myheader el-span {
  font-size: 24px;
}

.myform el-span {
  padding-right: 10px;
  font-size: 24px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  margin: auto;
  line-height: 40px;
}

.myform div {
  /* text-align: center; */
}

.myform .el-input {
  width: 300px;
  /* display: block; */
  /* margin: 10px; */

  margin: 20px auto;
  /* margin: 10px; */
}

.mybtn2 {
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-top: 20px;
}
</style>