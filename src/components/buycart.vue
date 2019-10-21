<template>
  <div>
    <ul>
      <li v-for="(item,iid) in this.$store.state.goods.goodlist" :key="item.Id">
        {{item.Name}}
        <p>
          数量：{{item.Count}}
          <span @click="updatagoods({Id:iid,Count:item.Count*1+1})">+</span>
          <span @click="updatagoods({Id:iid,Count:item.Count*1-1})">-</span>
        </p>
        <p>单价：{{item.Price}}</p>
        <input type="button" value="删除" @click="delgoods(iid)" />
       <store-info :info="msg" :goodid="item.Id"></store-info>
      </li>
      <li>
        <p>总价：{{allprice}}</p>
        <button @click="postorder">提交订单</button>
        <!-- <button @click="socket1">emit</button> -->
      </li>
    </ul>
  </div>
</template>
<script>
// import store from "@/store/goodlist";
import ax from "@/request/http";
import VueSocketio from "vue-socket.io";
import StoreInfo from "./StoreInfo"
import Vue from "vue";
Vue.use(new VueSocketio({ debug: true, connection: "http://localhost:8088" }));

export default {
  name: "BuyCart",
  components:{StoreInfo},
  data() {
    return {
      msg: []
    };
  },
  
  mounted() {
    // console.log(12221113);
    this.$socket.emit("qingqiu", this.$store.state.goods.goodlist);
    // this.socket1()
  },
  computed: {
    allprice() {
      return this.$store.getters.allprice;
    }
  },
  methods: {
    delgoods(ev) {
      // console.log(ev)
      this.$store.dispatch("runremovegoods", ev);
    },
    updatagoods(goodInfo) {
      if (goodInfo.Count < 1) {
        this.delgoods(goodInfo.Id);
        this.$store.dispatch("runremovegoods", goodInfo.Id);
        return;
      }

      this.$store.dispatch("runupdatagoods", goodInfo);
    },
    postorder() {
      let goodlist = this.$store.state.goods.goodlist;
      let stroelist = this.$store.state.stores.goodlist;
      this.$store.dispatch("stores/runupdatagoods", goodlist);
      let _storelist = { data: stroelist, total: 6, success: true };
      // var img = new Image();
      // let blob1;
      // var canvas = document.createElement("canvas");
      // var ctx = canvas.getContext("2d");
      // img.crossOrigin = "Anonymous";
      // img.onload = function() {
      //   canvas.height = img.height * 2;
      //   canvas.width = img.width * 2;
      //   ctx.drawImage(img, 0, 0);
      //   ctx.drawImage(img, img.width + 1, 0);
      //   ctx.drawImage(img, 0, img.height + 1);
      //   ctx.drawImage(img, img.width + 1, img.height + 1);
      //   var dataurl = canvas.toDataURL("image/jpeg");
      //   canvas = null;

      //   var arr = dataurl.split(","),
      //     mime = arr[0].match(/:(.*?);/)[1],
      //     bstr = arr[1],
      //     n = bstr.length,
      //     arraybuffer = new ArrayBuffer(n),
      //     u8arr = new Uint8Array(arraybuffer);
      //   while (n--) {
      //     u8arr[n] = bstr.charCodeAt(n);
      //   }
      //   // u8arr=bstr
      //   // console.log(u8arr.length)
      //   blob1 = new Blob([u8arr], { type: mime });
      //   ax.post("abc/shop?po=1", blob1, succ => console.log(succ));
      // };
      // img.src = "../../static/3.jpg";
      var bstr = JSON.stringify(_storelist)
      var n=bstr.length;
      // var arrbuf=new ArrayBuffer(n)
      var uint8=new Uint32Array()
      while(n--){
        uint8[n] = bstr.charCodeAt(n)
      }
      // let blob=new Blob([uint8],{type:"application/json"})
      // let blob = new Blob([JSON.stringify(_storelist)], {
      //   type: "application/json"
      //   // type:"image/jpeg"
      // });
      ax.post("abc/shop2?po=1", uint8, succ => console.log(succ));
    },
    // socket1() {
    //   // this.$socket.emit("qingqiu", 10);
    //   this.$socket.on("fanhui", function(msg) {
    //     console.log(msg);
    //   });
    // }
    tostr(msg, f) {
      var blob = new Blob([msg]);
      var r = new FileReader();
      r.readAsText(blob, "utf-8");
      r.onload = function() {
        if (f) f.call(null, r.result);
        // console.log(r.result)
      };
    }
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    fanhui(msg) {
      this.msg=msg
  
      // console.log(msg)
      // console.log(btoa(msg))
      // this.tostr(msg, a => {
      //   console.log(a);
      // });
      // console.log(String.fromCharCode.apply(null, new Int8Array(msg)));
    }
  }
};
</script>

