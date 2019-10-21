<template>
<div>
  <div v-for="item of info" style="color:red;font-size:1.5vw"  v-show="item.goodid==goodid">{{item.msg}}</div>
</div>
</template>
<script>
export default {
    props:{
        info:Array,
        goodid:""
    }
}
</script>