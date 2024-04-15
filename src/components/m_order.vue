<template>
    <div class="app-container" >
      <div class="myheader">
         <el-span>{{this.$route.name}}</el-span>
         <!-- <el-button class="mybtn" type="primary" @click="add()">添加</el-button> -->
      </div>
      
       <el-table
      :data="list"
      stripe
    
      style="width:100%"
     >
      <el-table-column
        prop="oid"
        label="订单id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        class ="mycon"
        show-overflow-tooltip
        width="180">
      </el-table-column>
      
      <el-table-column
        prop="ctime"
        label="订单时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="state"
        label="订单状态"
        width="180"
      >
    </el-table-column>
      <el-table-column
        prop="ptime"
        label="支付时间"
        
       
      >
      </el-table-column>
      <!-- <el-table-column
       
        label="操作"
        >
        <template slot-scope="scope">
          <el-button 
            size="mini"
            disabled
            v-if="scope.row.state != '支付'" 
            @click="handleEdit(scope.$index, scope.row)">退款</el-button>
            <el-button 
            size="mini"
            v-else
            @click="handleEdit(scope.$index, scope.row)">退款</el-button>  
          
        </template>
      </el-table-column> -->
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
                <div><el-span>商店名:</el-span><el-input placeholder="新闻标题" v-model="savenews.sname"></el-input></div>
                <div><el-span>商店描述:</el-span><el-input placeholder="商店描述" v-model="savenews.sdesc"></el-input></div>
                <div><el-span>商店图片:</el-span>
                   
                      <el-upload
                      class="upload-demo"
                      action="http://127.0.0.1:8088/upload"
                      list-type="picture"
                      :on-success="upload"
                      :file-list="savenews.img"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                 
                    
                 </div>
                <div><el-span>店铺类型:</el-span><el-select v-model="savenews.stype" placeholder="请选择">
                      <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
  
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
       
        
      
      topage(val){
          this.curr = val;
         request.get('/order/'+val).then((res) =>{
          this.list = res.data
        }).catch((e) =>{
            this.$message.error("服务器异常，请稍后再试")
        })
      },
      init(){
          request.get('/order').then((res) =>{
              this.all = res.data
              // this.list = this.all.slice(this.curr,10);
          }).catch((e) =>{
              this.$message.error("服务器异常，请稍后再试")
          })
      },
      handleEdit(index,row){
        request.get('/alipay/return?oid='+row.oid).then((res) =>{
            if(res.data != null){
                this.$message.success(res.data)
            }else{
                this.$message.info(res.errorMsg)
            }
            
        }).catch((e) =>{
            this.$message.error("退款失败");
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