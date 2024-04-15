<template>
  <!-- entry -->
  <div class="chat_commento">
        <!-- top -->
        <div class="chat_top">
            是兄弟就来砍我
        </div>
        <!-- line -->
        <div class="line"></div>
        <!-- middle -->
        <div class="chat_middle" id="chat_middle_item">
             <!-- 左边 -->
            <div class="chat_left clearfix">
                <div class="chat_left_item_1 ">天乐</div>
                <div class="chat_left_item_2">
                    <div class="chat_time">18:57</div>
                    <div class="chat_left_content">
                        今天吃点啥？
                    </div>
                </div>
            </div>
            <!--右边 -->
            <div class="chat_right">
                <div class="chat_right_item_1 ">热巴</div>
                <div class="chat_right_item_2 ">
                    <div class="chat_right_time">18:59</div>
                    <div class="chat_right_content">
                        最近八合里周年庆店，咱们去薅羊毛呀
                    </div>
                </div>
            </div>
            <!-- l_2 -->
            <div class="chat_left clearfix">
                <div class="chat_left_item_1 ">天乐</div>
                <div class="chat_left_item_2">
                    <div class="chat_time">18:57</div>
                    <div class="chat_left_content">
                        行收拾一下走吧，早点去排个号
                    </div>
                </div>
            </div>
        </div>
        <!-- line -->
        <div class="line"></div>
        <!-- foot -->
        <div class="chat_foot">
            <!-- context -->
            <textarea class="chat_context" id="chat_context_item" cols="30" rows="10" placeholder="请输入" v-model="msg"></textarea>
            <div class="chat_commit" id="button" @click="webSokcetSend()"> 发送</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            msg:''
        }
    },
    mounted(){
            //  this.user = JSON.parse(localStorage.getItem('user')).user;
             // console.log(JSON.parse(localStorage.getItem('user')).user.username);
             // 本地
             this.webSocket = new WebSocket('ws://127.0.0.1:8088/chat/test');
             this.initWebSocket();
         },
     methods: {
           
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
           onOpen() {
             /*
             * 连接成功
             * */
            this.$message.success("连接聊天室成功可以开始聊天拉")
             
           },
           onMessage(event) {
            // console.log(event)
            //  if(this.user == null){
            //    // this.$message.error("你还没有登录不能进行聊天，快去登录吧。")  
            //    return;
            //  }
             /*
             * 收到消息时回调函数
             * */
            //发消息的对象
             let data = JSON.parse(event.data);
             // console.log("66666")
            //  console.log(data);
            //  获取的用户的集合
            // console.log(data.toUser)
             if (data.toUser !== undefined) {
               let list = this.listUser;
               for (let i=0; i<list.length; i++) {
                 if (list[i] === data.toUser) {
                   
                    // list.splice(i, 1);
                    console.log(event.data)
                    
                 }
               }
               this.listUser = list;
             }
             //添加消息
             this.addmsg(event.data);
           },
           addmsg(msg){
             // JSON.parse(msg)
             if(msg.fromUser !== "系统通知"){
                
                this.msgs = JSON.parse(msg);
                // let ttt ;
                // ttt.user = this.msgs.toUser;
                // ttt.msg = this.msgs.msg;
                if(this.msgs.fromUser !== '系统通知'){
                    this.list.push(this.msgs)
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
            //  if(this.$store.state.user.username == undefined){
            //    this.$message.error("你还没有登录不能进行聊天，快去登录吧。")  
            //    return;
            //  }
             let message = JSON.stringify({'fromUser': this.$store.state.user.username,'msg':this.msg,'toUser':user})
             this.webSocket.send(message);
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
*{
    padding: 0;
    margin: 0;
}
.chat_commento{
    width: 450px;
    height: 650px;
    margin: auto;
    border-radius: 10px;
    border: 2px solid #f4f5f7;
}
.clearfix::after{
    content: "";
    display: block;
    clear: both;
    width: 0;
    height: 0;
    line-height: 0;
    visibility: hidden;
}
/* top */
.chat_top{
    width: 100%;
    height: 50px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-left: 20px;
    font-size: 20px;
    line-height: 50px;
    box-sizing: border-box;
    font-weight: 550;
    border-width: 0px;
}
/* middle */
/* 左边 */
.chat_middle{
    width: 450px;
    height: 455px;
    position: relative;
    box-sizing: border-box;
    overflow: auto;
    border-width: 0px;
}
.chat_left{
    width: 100%;
    height: 120px;
    margin-top: 20px;
}
.chat_left_item_1{
    width: 50px;
    height: 50px;
    background-color: #4459AB;
    float: left;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    line-height: 50px;
    color: white;
    border-radius: 25px;
}
.chat_left_item_2{
    width: 55%;
    height: 100px;
    float: left;
    margin-top: 10px;
}
.chat_left_item_2 .chat_left_chat{
    float: left;
}
.chat_left_item_2 .chat_left_content{
    padding: 15px;
    margin-top: 10px;
    background-color: #f4f5f7;
    display: inline-block;
    border-radius: 10px;
    border-top-left-radius: 0px;
}
/* 右边 */
.chat_right{
    width: 100%;
    height: 120px;
    margin-top: 20px;
}
.chat_right_item_1{
    width: 50px;
    height: 50px;
    background-color: #4459AB;
    float: right;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    line-height: 50px;
    color: white;
    border-radius: 25px;
}
.chat_right_item_2{
    width: 55%;
    height: 100px;
    float: right;
    margin-top: 10px;
}
.chat_right_time{
    width: 100%;
    text-align: right;
}
.chat_right_content{
    float: right;
    padding: 15px;
    border-radius: 10px;
    margin-top: 10px;
    border-top-right-radius: 0px;
    background-color: #4F7cff;
    color: white;
}
/* foot */
.chat_foot{
    width: 450px;
    height: 130px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    position: relative;
}
.chat_context{
    width: 100%;
    height: 100%;
    font-size: 17px;
    box-sizing: border-box;
    outline: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-width: 0px;
    padding: 16px;
}
.chat_commit{
    width: 80px;
    height: 30px;
    color: white;
    background-color: #4F7cff;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    position: absolute;
    right: 10px;
    bottom: 20px;
    margin-right: 10px;
}
.chat_context{
    resize: none;
}
.chat_context::placeholder{
    color: black;
    font-weight: 500k;
}
.line{
    width: 100%;
    border-top: 1px;
    border-color: #f4f5f7;
    border-style: solid;
}
</style>