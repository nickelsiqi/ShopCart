<template>
    <div>
        商品名称{{info.Name}}
        购买数量{{info.Count}}
        商品单价{{info.Price}}
        <slot></slot>
    </div>
</template>
<script>
export default {
    props:{
        info:Object
    }
}
</script>

