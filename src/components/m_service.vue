<template>
    <div class="mycontent">
     
     <div class="chat">
       
        <div class="left">
            <div class="xxlb">
                <h2>消息列表</h2>
            </div>
            <ul>
               <li v-for="item,index in listUser" @click="chatuser(item)" :class="[user===item?'a':'b']"  :key="index" >
                   <div >{{item}}</div>
                </li> 
                
            </ul>
        </div>
         <div class="right">
             <div class="title">客服</div>
             <hr/>
                 <div class="chatC">
                     <div class="chat-container">
                     <div class="chat-messages">
                     <div v-for="message,index in chat" :key="index" class="chat-message">
                         
 
                         <div v-if="message.type === 'SPEAK'" class="message class2">
                             <div v-if="message.fromUser == user.username" class="myself">
                                  <el-span>{{message.msg }}</el-span><el-span>{{ message.fromUser }}</el-span>
                             </div>
                             <div v-else class="other">
                                <el-span>{{ message.fromUser }}</el-span> <el-span>{{message.msg }}</el-span>
                             </div> 
                         </div>
                         <div v-else class=" class1 other1">
                              <el-span>{{message.msg }}</el-span>:<el-span>{{ message.fromUser }}</el-span>
                         </div>
                     </div>
                     </div>
                     <div class="chat-input">
                         <!-- <el-button class="el-icon-position cicon" type="success" @click="sendMessage">发送</el-button> -->
                     </div>
                 </div>
             </div>
             
             <div class="chatSend">
                 <el-input type="textarea" class="neirong"  :autosize="{ minRows: 5, maxRows: 6}" clearable  placeholder="回复消息"
                 v-model="msg" 
                 @keyup.enter.native="webSokcetSend()"
                 >
                 </el-input>
                 <el-button class="el-icon-position cicon button" type="success" @click="webSokcetSend()">发送</el-button>
             </div>
         </div>
     </div>
   </div>
</template>

<script>
export default {
     name: "index",
         data() {
           return {
             //消息
             msg: '',
             //当前连接ws的全部对象
             listUser: [],
             //ws对象
             webSocket : null,
             //要回复的用户
             user:'',
             // msg:'',
             //聊天的记录 刷新会清空
             msgs:[
             
             ],
             chat:[]
           }
         },
         watch:{
            msgs(n,o){
                if(n.list !== undefined){
                    let s =  JSON.parse(JSON.stringify(n))               
                    this.listUser = s.list
                }
                
             },
             immediate: true
         },
         // 在渲染的时候会运行这个方法的内容
         mounted(){
            //  this.user = JSON.parse(localStorage.getItem('user')).user;
             // console.log(JSON.parse(localStorage.getItem('user')).user.username);
             // 本地
             this.webSocket = new WebSocket('ws://127.0.0.1:8088/chat/' + this.$store.state.user.username);
             this.initWebSocket();
         },
        
         methods: {
            chatuser(user){
                //先把消息存入缓存
                if(this.user != ''){
                    localStorage.setItem(this.user,JSON.stringify(this.chat))
                }
                this.user = user
                //切换了用户之后判断用户是否有缓存消息 有就存入chat
                if(localStorage.getItem(user) != null){
                    this.chat = JSON.parse(localStorage.getItem(user));
                }
            },
           //初始化ws的一些方法
           initWebSocket() {
             this.webSocket.onerror = this.onError;  // 通讯异常
             this.webSocket.onopen = this.onOpen;  // 连接成功
             this.webSocket.onmessage = this.onMessage;  // 收到消息时回调
             this.webSocket.onclose = this.onClose;  // 连接关闭时回调
           },
           onError() {
             /*
             * 通讯异常
             * */
             this.$message.success("连接聊天室失败请稍后再试")
           },
           onOpen(event) {
             /*
             * 连接成功
             * */
            this.$message.success("连接聊天室成功可以开始聊天拉")
            
           },
           onMessage(event) {
            // console.log(event)
             if(this.user == null){
               // this.$message.error("你还没有登录不能进行聊天，快去登录吧。")  
               return;
             }
             
             /*
             * 收到消息时回调函数
             * */
            //发消息的对象
             let data = JSON.parse(event.data);
             if(data.fromUser === '系统通知'){
                 this.listUser = data.list;
             }
             // console.log("66666")
             console.log(data);
            //  获取的用户的集合
            console.log(data.toUser)
             if (this.user !== undefined) {
               let list = this.listUser;
               for (let i=0; i<list.length; i++) {
                 if (list[i] === this.user) {
                 
                    // list.splice(i, 1);
                    this.addmsg(event.data)
                    
                 }
               }
            //    this.listUser = list;
             }
             //添加消息
            //  this.addmsg(event.data);
           },
           addmsg(msg){
             // JSON.parse(msg)
             console.log("66")
             if(msg.fromUser !== "系统通知"){
                console.log("fason")
                this.msgs = JSON.parse(msg);
                // let ttt ;
                // ttt.user = this.msgs.toUser;
                // ttt.msg = this.msgs.msg;
                console.log(this.msgs)
                if(this.msgs.fromUser !== '系统通知'){
                    this.chat.push(this.msgs)
                }
                // console.log(this.chat.push(this.msgs))
                // this.chat.push(ttt)
                // console.log(ttt)
             }
           },
           onClose() {
             /*
             * 关闭连接时回调函数
             * */
             this.$message.success("")
           },
           webSokcetSend() {
            
             if(this.$store.state.user.username == undefined){
               this.$message.error("你还没有登录不能进行聊天，快去登录吧。")  
               return;
             }
             let message = JSON.stringify({'fromUser': this.$store.state.user.username,'msg':this.msg,'toUser':this.user})
            //  console.log(JSON.parse(message))
             this.webSocket.send(message);
             this.chat.push(JSON.parse(message))
             this.msg = '';

             /*
             * 发送消息
             * */
             // let message = JSON.stringify({'fromUser': this.fromUser, 'toUser': this.toUser, 'msg': this.input,});
             // this.webSocket.send(message);
             // this.input = '';
             // this.messageDiv(message)
           },
           webSokcetClose(e) {
                if(this.user != ''){
                    localStorage.setItem(this.user,this.chat)
                }
             /*
             * 关闭连接
             * */
            console.log(e)
             this.webSocket.close();
             
           },
        }
}
</script>

<style scoped>
     .mycontent{
     /* max-height: 100vh; */
     /* height: 100vh; */
     /* margin-top: 15px; */
     /* margin-top:10% ; */
 }
 
 .chat{
     background: #dbeef1;
     opacity: 0.9;
     position: absolute;
     width: 75%;
     /* background: red; */
     /* left: 15%; */
     display: flex;
     /* height: 500px; */
     /* border: solid 3px orange; */
     border-radius: 10px;
 }
 .left{
    height: 700px;
 }
 .right{
     width: 100%;
     height: 700px;
     /* background: aqua; */
     /* padding:0% 10%; */
     position: relative;
 }
 .item{
     display: flex;
     height: 50px;
     justify-content: space-around;
     align-items: center;
     margin: 0px;
     
 }
 .title{
     display: flex;
     justify-content: space-around;
     height: 50px;
     align-items: center;
     font-size: 24px;
     margin: 0px;
     color: rgb(0, 0, 0);
 }
 .chatC{
     min-height: 500px;
 }
 .chatSend{
     height: 100px;
     /* background: orange; */
     width: 100%;
     position: absolute;
     background: white;
     bottom: 0px;
 }
 .cicon{
     /* display: flex; */
     position: absolute;
     /* z-index: 22; */
     /* right: 5%; */
     /* height: 100%; */
     /* font-size:15px; */
     /* top: 5px; */
     cursor: pointer;
     bottom: 0;
     right: 50px;
 }
 .el-input{
   
     /* height: 100px; */
     padding-right:100px !important;
 }
 
 
 
 
    .chat-container {
     height: 500px;
     display: flex;
     flex-wrap:wrap;
     flex-direction: column;
     }
 
     .chat-messages {
     flex: 1;
     overflow-y: auto;
     height: 400px;
     }
 
     .chat-message {
     margin: 5px;
     /* max-width: 300px; */
     }
 
     .chat-sender {
     /* font-weight: bold; */
         font-size:12px ;
     }
     .message{
         display: flex;
         width: 100%;
     }
    .chat-input {
    margin-top: 10px;
    }
    .chat-content{
    /* display: flex; */
    max-width: 500px;
    /* flex-wrap:nowrap; */
    
    border-radius: 5px;
    /* background: ; */
    /* padding: 8px; */
    /* margin: 5px; */
    /* flex-direction: column; */
    }
  .class1{
     display: flex;
     font-size: 12px ;
     text-align: center;
     color: orange;
     justify-content: flex-end;
     margin-right: 50px ;
 } 
 
 .class2{
     /* display: block; */
     display: flex;
     font-size: 24px;
     
     /* max-width: 300px; */
     /* display: inline; */
 }
 .other1{
     border-radius: 5px;
     color: black;
     padding: 5px;
     font-size: 24px;
     /* max-width: 300px;  */
     padding: 10px;
     /* background-color: greenyellow; */
     display: flex;
     align-items: center;
 }
 .other1:first-child{
     margin-right: 10px;
     /* color: orange; */
     /* background-color: greenyellow; */
     background-color: #DFF0F2;
 }
 .other1 el-span:nth-child(2){
     /* background-color: greenyellow; */
     
     border-radius: 5px;
     color: black;
     padding: 5px;
     
     
 }
 .other{
     font-size: 24px;
     max-width: 300px; 
     padding: 10px;
     display: flex;
     align-items: center;
 }
 .other:first-child{
    
     margin-right: 10px;
     /* color: orange; */
     /* background-color: greenyellow; */
 }
 .other el-span:nth-child(2){
     /* background-color: greenyellow; */
     
     border-radius: 5px;
     color: black;
     padding: 5px;
     
     background-color: #DFF0F2;
 }
 .myself{
     width: 100%;
     /* display: flex; */
     /* flex-direction: row-reverse; */
     /* text-align: right; */
     /* float: right; */
     display: flex;
     flex-direction: row-reverse;
 }
 .myself:first-child{
     margin-right: 10px;
     /* color: orange; */
     /* background-color: greenyellow; */
 }
 .myself el-span:nth-child(2){
     /* background-color: greenyellow; */
     
     border-radius: 5px;
     color: black;
     margin-right:10px ;
     padding: 6px;
     
     background-color: rgb(239, 239, 239);
 }
 .left{
    padding-top: 10px;
    border-right: 1px solid rgb(77, 75, 75);
    width: 250px
 }
 .left ul{
    padding: 0px;
 }
 .left li{
    display: block;
    width: 150px;
    /* height: 100px; */
    /* background: #989991; */
    text-align: center;
    border: solid 1px rgb(123, 120, 120);
    border-radius: 10px;
    padding: 20px 0px;
 }
 .left li:hover{
    cursor: pointer;
 }
.neirong{
   min-height: 100px;
}
 .xxlb{
    text-align: center;
 }
 .a{
     background-color: orange;
     color: white;

 }
 .b{
     background: white;
 }
</style>