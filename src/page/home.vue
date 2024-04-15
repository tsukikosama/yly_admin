<template>
    <div class="content">
       <div class="left">
           <left/>
       </div>
       <div class="right">
           <m_header/>
       </div>
    </div>
</template>

<script >
import left from '@/components/left.vue'
import m_header from '@/components/header.vue'
export default {
    components: {
        left,
        m_header
    }
}
</script>

<style scoped>
    .content{
        display: flex;
        width: 100vw;
        height: 100vh;
    }
    .left{
        height: 100vh;
        width: 15vw;
        /* background: aqua; */
    }
    .right{
        height: 100vh;
        width: 85vw;
        /* background: orange; */
    }
</style>