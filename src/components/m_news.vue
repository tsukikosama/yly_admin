<template>
  <div class="app-container">
    <div class="myheader">
      <el-span>{{ this.$route.name }}</el-span>
      <el-button class="mybtn" type="primary" @click="add()">添加</el-button>
    </div>

    <el-table :data="list" stripe style="width:100%">
      <el-table-column prop="title" label="新闻标题" width="180">
      </el-table-column>
      <el-table-column prop="content" label="新闻内容" class="mycon" show-overflow-tooltip width="180">
      </el-table-column>

      <el-table-column prop="ctime" label="发布时间" width="180">
      </el-table-column>
      <el-table-column prop="ntype" label="新闻类型" width="180">
          <template slot-scope="scope">
              <el-span v-if="scope.row.ntype == 1">媒体新闻</el-span>
              <el-span v-else>乐园新闻</el-span>
          </template>
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

    <el-dialog title="新闻" class="myform" :visible.sync="dialogFormVisible">
      <!-- wangedit -->
      <el-span>新闻标题:</el-span><el-input placeholder="新闻标题" v-model="savenews.title"></el-input>&emsp;&emsp;
      <el-select v-model="savenews.ntype" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <div style="border: 1px solid #ccc;">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="savenews.content" :defaultConfig="editorConfig"
          :mode="mode" @onCreated="onCreated" />

        <el-button type="primary" class="mybtn2" @click="submit()">发布</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import request from '@/utils/request'

// import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  components: { Editor, Toolbar },
  data() {
    return {
      list: {},
      all: {},
      dialogFormVisible: false,
      curr: 1,

      options: [{
        value: 1,
        label: '媒体报道'
      }, {
        value: 2,
        label: '乐园动态'
      }],

      savenews: {
        title: '',
        content: '',
        ntype: ''
      },
      flag: -1,
      editor: null,
      html: '',
      toolbarConfig: {},
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            fieldName: 'file',
            maxFileSize: 10 * 1024 * 1024, // 10M
            withCredentials: true,
            // 本地地址
            server: "http://127.0.0.1:8088/upload/edit/upload",
            // 服务器地知
            // server: "http://139.159.252.234:9000/upload/edit/upload"
            onSuccess(file, res) {          // JS 语法
              console.log(file)
            },
            customBrowseAndUpload(insertFn) {              // JS 语法
              // 自己选择文件
              // 自己上传文件，并得到图片 url alt href
              // 最后插入图片
              insertFn(url, alt, href)
            }
          },
          // customBrowseAndUpload(insertFn: InsertFnType) {   // TS 语法
          // customBrowseAndUpload(insertFn) {              // JS 语法
          //     // 自己选择文件
          //     // 自己上传文件，并得到图片 url alt href
          //     // 最后插入图片
          //     insertFn(url, alt, href)

          // },
          // onSuccess(file: File, res: any) {  // TS 语法
          // onSuccess(file, res) {          // JS 语法
          //     let s = document.getElementById(file.id);

          //     console.log(`${file.name} 上传成功`, res)
          // },

        }

      },
      mode: 'default', // or 'simple'
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
    all(n, o) {
      console.log(n)
      console.log(o)
      this.list = this.all.slice((this.curr - 1) * 10, (this.curr - 1) * 10 + 10);
    }
  },
  methods: {


    submit() {
      // var that = this;
      request.post('/news/add', this.savenews).then((res) => {
        // this.$message.success("33")
        //判断当前页面是否大于10个 如果小于就添加进当前list  
        let s = this.savenews
        s = JSON.parse(JSON.stringify(s));
        if (this.flag >= 0) {
          // arr.splice(2,3,"William")
          // this.$message.success("666");
          this.all.splice(this.flag, 1, s)
        } else {
          // this.$message.success("999")
          this.all.push(s);
        }

        this.flag = -1;
        this.$message.success(res.data)
        this.dialogFormVisible = false
        this.clearValue(this.savenews)
      }).catch((e) => {
        this.$message.error("添加失败稍后再试");
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
      request.get('/news/all').then((res) => {
        this.all = res.data
        // this.list = this.all.slice(this.curr,10);
      }).catch((e) => {

      })
    },
    handleEdit(index, row) {
      //更新

      this.dialogFormVisible = true
      //给对象复制
      let ss = JSON.parse(JSON.stringify(row))

      this.savenews = ss
      this.flag = index;
      // this.all[index] = this.savenews;
    },
    add() {
      this.clearValue(this.savenews)
      this.dialogFormVisible = true

    },
    del(index, row) {
      //   console.log((this.curr-1)*10+index)

      request.post('/news/del?nid=' + row.nid).then((res) => {
        this.$message.success("删除成功");
        this.all.splice((this.curr - 1) * 10 + index, 1)
      }).catch((e) => {
        this.$message.error("删除失败,请稍后再试");
      })
    },

    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    upload(response, file, fileList) {
      console.log(file)
      console.log(response)
      // request.post('/img',)
      console.log(response.data)
      this.blog.picture = response.data

      this.$message.success("上传成功")
      var that = this;
      that.$forceUpdate();
    },



  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
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