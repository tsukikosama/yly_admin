<template>
    <div class="app-container" >
      <div class="myheader">
         <el-span>{{this.$route.name}}</el-span>
        
      </div>
      
       <el-table
        :data="list"
        stripe
        
        style="width:100%"
      >
      <el-table-column
        prop="username"
        label="用户"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        class ="mycon"
        show-overflow-tooltip
        width="180">
      </el-table-column>
      
      <el-table-column
        prop="ctime"
        label="回复时间"
        width="180">
      </el-table-column>
      <el-table-column
       
        label="操作"
        >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">回复</el-button>
          <el-button 
            size="mini"
            type="warning"
            
            @click="del(scope.$index,scope.row)">删除</el-button>
          
        </template>
      </el-table-column>
    </el-table>
      
        <div class="pages">
            <el-pagination
            background
            layout="prev, pager, next"
            :page-size="10"
            @current-change="topage"
            :total="all.length">
          </el-pagination>
         
        </div>
  
          <el-dialog title="新闻" class="myform" :visible.sync="dialogFormVisible" center="">
              <!-- wangedit -->
                <div><el-span>用户:</el-span><el-span>{{savenews.username}}</el-span></div>
                <div><el-span>内容:</el-span><el-span>{{savenews.content}}</el-span></div>
                <div><el-span>回复内容:</el-span>
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="savenews.msg"
                        maxlength="30"
                        show-word-limit
                        >
                        </el-input>
              </div>
                <el-button type="primary" class="mybtn2" @click="submit()" >添加</el-button>
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
        all:{},
        dialogFormVisible: false,
        curr:1,
       
          options: [{
            value: '美食',
            label: '美食'
          }, {
            value: '礼品',
            label: '礼品'
          }],
          
          savenews:{
              sname:'',
              sdesc:'',
              img:'',
              stype:''
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
    watch:{
        curr(n,o){
            this.list = this.all.slice((this.curr-1)*10,(this.curr-1)*10+10);
        },
        all(){
            this.list = this.all.slice((this.curr-1)*10,(this.curr-1)*10+10);
        }
    },
    methods: {
       
        
      submit(){
        // var that = this;
        let s = {};
        s.content = this.savenews.msg;
        s.reply = 1;
        s.username = this.$store.state.user.username;
        s.rid = this.savenews.id;
        s.ctime = new Date().toLocaleString();
        request.post('/review/backreview',s).then((res) =>{
            //判断当前页面是否大于10个 如果小于就添加进当前list
            
            
            s = JSON.parse(JSON.stringify(s));
            this.all.push(s);
            this.$message.success(res.data)
            this.dialogFormVisible = false
            this.clearValue(this.savenews)
        }).catch((e) =>{
            this.$message.error("添加失败稍后再试");
            this.dialogFormVisible = false
        })
      },
      topage(val){
          this.curr = val;
         request.get('/project/'+val).then((res) =>{
          this.list = res.data
        }).catch((e) =>{
            this.$message.error("服务器异常，请稍后再试")
        })
      },
      init(){
          request.get('/review/all').then((res) =>{
              this.all = res.data
              // this.list = this.all.slice(this.curr,10);
          }).catch((e) =>{
  
          })
      },
      handleEdit(index,row){
       //更新
        
        this.dialogFormVisible = true
        //给对象复制
        let ss = JSON.parse(JSON.stringify(row))
        // console.log(ss)
        this.savenews = ss
      },
     
      del(index,row){
      //   console.log((this.curr-1)*10+index)
        
        request.post('/review/delreview?rid='+row.id).then((res) =>{
            this.$message.success("删除成功");
            this.all.splice((this.curr-1)*10+index,1)
        }).catch((e) =>{
            this.$message.error("删除失败,请稍后再试");
        })
      },        
    },
    
  }
  </script>
  <style src="@wangeditor/editor/dist/css/style.css" ></style>
  <style scoped>
  .pages{
     /* display: flex;
     justify-content: center; */
     padding: 20px;
     /* display: inline-flex; */
     text-align: center;
     
   }
   .myheader{
     display: flex;
     width: 83vw !important;
     height: 30px !important;
     text-align: center;
     justify-content: space-between;
     padding: 5px;
     padding-top: 10px ;
   }
   .myheader el-span{
     font-size: 24px;
   }
   
   .myform el-span{
     padding-right: 10px;
     font-size: 24px;
     height: 40px;
     line-height: 40px;
     display: inline-block;
     margin: auto;
     line-height: 40px;
   }
   .myform div{
     /* text-align: center; */
   }
   .myform .el-input{
      width: 300px;
      /* display: block; */
      /* margin: 10px; */
      
      margin: 20px auto;
      /* margin: 10px; */
   }
   .mybtn2{
    display: block;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px ;
   }
  </style>