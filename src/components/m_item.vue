<template>
  <div class="app-container">
    <div class="myheader">
      <el-span>{{ this.$route.name }}</el-span>
      <el-button class="mybtn" type="primary" @click="add()">添加</el-button>
    </div>

    <el-table :data="list.records" stripe width="100%">

      <el-table-column prop="xname" label="项目名" width="200">
      </el-table-column>
      <el-table-column prop="descript" label="项目描述" show-overflow-tooltip width="180">
      </el-table-column>

      <el-table-column prop="score1" label="娱乐评分" width="100">
      </el-table-column>
      <el-table-column prop="score2" label="刺激评分" width="100">
      </el-table-column>
      <el-table-column prop="online" label="运行情况" width="100">

      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.online == '运行'"
            @click="fix(scope.$index, scope.row)">维护</el-button>
          <el-button size="mini" type="success" v-if="scope.row.online == '维护'"
            @click="fix(scope.$index, scope.row)">运行</el-button>
          <!-- <el-button 
          size="mini"
          type="danger"
          @click="del(scope.$index,scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="pages">
      <el-pagination background layout="prev, pager, next" page-size="10" @current-change="topage" :total="list.total">
      </el-pagination>

    </div>

    <div>
      <div>

        <el-dialog title="添加项目" :visible.sync="dialogFormVisible" width="600px" center>
          <el-form :model="project" class="myform">
            <div><el-span>项目名称:</el-span><el-input placeholder="项目名称" v-model="project.xname"></el-input></div>
            <div><el-span>项目描述:</el-span><el-input placeholder="项目描述" v-model="project.descript"></el-input></div>

            <div><el-span>娱乐评分:</el-span><el-input placeholder="娱乐评分" type="number" v-model="project.score1"></el-input>
            </div>
            <div><el-span>刺激评分:</el-span><el-input placeholder="刺激评分" type="number" v-model="project.score2"></el-input>
            </div>
            <div>
              <el-span>项目图片:</el-span>
              <el-upload class="upload-demo" action="http://127.0.0.1:8088/upload" list-type="picture"
                :on-success="upload">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'


export default {

  data() {
    return {
      list: {},
      listLoading: true,
      dialogFormVisible: false,
      project: {
        xname: '',
        descript: '',
        url: '',
        score1: '',
        score2: '',
      },
    }
  },
  created() {
    this.topage(1)
  },
  methods: {
    fix(index, row) {
      // console.log(index,row)
      let t = ''
      const that = this;
      if (row.online == '维护') {
        t = '运行'
      } else {
        t = '维护'
      }
      console.log(t)
      request.post('/project/fix?online=' + t + '&xid=' + row.xid).then((res) => {
        this.$message.success("更新成功");
        // console.log(this.list)
        that.$set(this.list.records[index], 'online', t)
      }).catch((e) => {
        this.$message.error("更新失败,请稍后再试");
      })
    },

    submit() {
      var that = this;
      request.post('/project/submit', this.project).then((res) => {
        //判断当前页面是否大于10个 如果小于就添加进当前list
        console.log(that)
        if (this.list.length < 10) {
          this.list.push(this.project)
        }
        this.$message.success(res.data)
        this.dialogFormVisible = false
      }).catch((e) => {
        this.$message.error("添加失败稍后再试");
        this.dialogFormVisible = false
      })
    },
    topage(val) {
      request.get('/project/' + val).then((res) => {
        this.list = res.data
      }).catch((e) => {
        this.$message.error("服务器异常，请稍后再试")
      })
    },
    handleEdit(index, row) {

      //更新
      this.dialogFormVisible = true
      //给对象复制
      this.project = row
    },
    add() {
      this.dialogFormVisible = true
      this.clearValue(this.project)
    },
    upload(response, file, fileList) {




      this.project.url = response.data
      this.$message.success("成功")

    },
    // del(index,row){
    //   request.post('/project/xid='+row.xid).then((res) =>{

    //   }).catch((e)=>{

    //   })
    // }
  }
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
  text-align: center;
}

.myform .el-input {
  width: 300px;
  /* display: block; */
  /* margin: 10px; */

  margin: 20px auto;
  /* margin: 10px; */
}
</style>