<template>
  <div class="app-container">
    <div class="myheader">
      <el-span>{{ this.$route.name }}</el-span>
      <el-button class="mybtn" type="primary" @click="add()">添加</el-button>
    </div>

    <el-table :data="list" stripe style="width:100%">
      <el-table-column prop="sname" label="商店名" width="180">
      </el-table-column>
      <el-table-column prop="sdesc" label="商店描述" class="mycon" show-overflow-tooltip width="200">
      </el-table-column>

      <el-table-column prop="stype" label="商店类型" width="150">
      </el-table-column>
      <el-table-column prop="img" label="商店图片" show-overflow-tooltip width="200">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click="del(scope.$index, scope.row)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>

    <div class="pages">
      <el-pagination background layout="prev, pager, next" :page-size="10" @current-change="topage" :total="all.length">
      </el-pagination>

    </div>

    <el-dialog title="商店" class="myform" :visible.sync="dialogFormVisible" center="">
      <!-- wangedit -->
      <div><el-span>商店名:</el-span><el-input placeholder="商店名" v-model="savenews.sname"></el-input></div>
      <div><el-span>商店描述:</el-span><el-input placeholder="商店描述" v-model="savenews.sdesc"></el-input></div>
      <div><el-span>商店图片:</el-span>

        <el-upload class="upload-demo" action="http://127.0.0.1:8088/upload" list-type="picture" :on-success="upload">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>


      </div>
      <div><el-span>店铺类型:</el-span><el-select v-model="savenews.stype" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
      flag: -1,
      options: [{
        value: '美食',
        label: '美食'
      }, {
        value: '礼品',
        label: '礼品'
      }],

      savenews: {
        sname: '',
        sdesc: '',
        img: '',
        stype: ''
      },



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
      console.log("pp")
      request.post('/shop/save', this.savenews).then((res) => {
        //判断当前页面是否大于10个 如果小于就添加进当前list

        let s = this.savenews
        s = JSON.parse(JSON.stringify(s));
        console.log(s)
        if (this.flag >= 0) {
          // arr.splice(2,3,"William")
          // this.$message.success("666");
          this.all.splice(this.flag, 1, s)
        } else {
          // this.$message.success("999")
          this.all.push(s);
        }
        this.flag = -1;
        console.log('666')
        this.$message.success(res.data)
        this.dialogFormVisible = false
        this.clearValue(this.savenews)
      }).catch((e) => {
        this.$message.error("添加失败稍后再试sb");
        this.dialogFormVisible = false
      })
    },
    topage(val) {
      this.curr = val;
      request.get('/project/' + val).then((res) => {
        this.list = res.data
      }).catch((e) => {
        this.$message.error("服务器异常，请稍后再试")
      })
    },
    init() {
      request.get('/shop').then((res) => {
        this.all = res.data
        // this.list = this.all.slice(this.curr,10);
      }).catch((e) => {

      })
    },
    handleEdit(index, row) {
      //更新
      this.flag = index
      this.dialogFormVisible = true
      //给对象复制
      let ss = JSON.parse(JSON.stringify(row))
      // console.log(ss)
      this.savenews = ss
    },
    add() {
      this.clearValue(this.savenews)
      this.dialogFormVisible = true

    },
    del(index, row) {
      //   console.log((this.curr-1)*10+index)

      request.post('/shop/del?id=' + row.sid).then((res) => {
        this.$message.success("删除成功");
        this.all.splice((this.curr - 1) * 10 + index, 1)
      }).catch((e) => {
        this.$message.error("删除失败,请稍后再试");
      })
    },




    /** 文件上传 */
    upload(response, file, fileList) {
      console.log(response)
      this.savenews.img = response.data
      this.$message.success("成功")

    },



  },

}
</script>
<style src="@wangeditor/editor/dist/css/style.css" ></style>
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