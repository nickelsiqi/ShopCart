<template>
  <div>
    <ul>
      <li
        v-for="(item,iid) in goodlist"
        :key="item.Id"
        @mouseover="pop(item,$event)"
        @mouseout="pop1"
        v-mydir="item.Count"
      >
        <span>
          <input type="checkbox" :value="item.Id" @change="updataOrder($event.target)" ref="chk" />
          {{item.Name}}
        </span>
        <input type="text" @input="val($event.target,iid,item.Count)" ref="a" />
      </li>
      <shop-detail :info="a" ref="sd">
        <div>目前售出100件</div>
      </shop-detail>
    </ul>
    <input type="button" @click="add" value="购买商品" />
    <div>
      购买清单：
      <ul>
        <li v-for="item in orderlist" :key="item.Id">{{item.Name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
// import Axios from 'axios'
import ax from "@/request/http";
import vl from "@/validata/v";
import ShopDetail from "./ShopDetail";
// import store from "@/store/goodlist";
export default {
  //   store,
  components: { ShopDetail },
  data() {
    return {
      goodlist: [],
      a: {},
      orderlist: [],
      p: ""
    };
  },
  created() {
    this.query();
    this.$store.state.goods.goodlist.length
      ? (this.orderlist = this.$store.state.goods.goodlist)
      : (this.orderlist = []);
  },
  mounted() {},
  methods: {
    query() {
      //   console.log(this.goodlist)
      ax.get(
        "abc/shop1",
        data => {
          if (data.success) {
            let results = data.data.results;
            // let results = data;
            this.goodlist = this.goodlist.concat(results);
            //   console.log(results)
            //    Vue.set(this.goodlist,0,results)
          }

          //  console.log(this.goodlist)
        },
        ""
      );

      //   ax.get(
      //     "shop.json",
      //     (function(data){
      //         console.log(this.goodlist)
      //     }).bind(this),

      //     ""
      //   );
    },
    val(o, d, c) {
      //   console.log(o.value)
      let o1 = vl.isNum(o.value);
      //   console.log(o1)
      if (o1 != "OK") {
        o.value = "";
        this.$refs.chk[d].checked = false;
        alert(o1);
        return;
      }
      let o2 = vl.isRightRange(o.value, c);
      this.$refs.chk[d].checked = true;
      if (o2 != "OK") {
        // this.$refs.chk[d].checked = true;
        if (typeof o2 == "object" && o2["lev"] == 2) {
          o.value = c;
          alert(o2["mes"]);
        } else if (o2["lev"] == 3) {
          o.value = String(o.value).replace(/\./, "");
        } else {
          this.$refs.chk[d].checked = false;
          this.updataOrder(this.$refs.chk[d]);
        }
        return;
      }
      o.value > 0
        ? ((this.$refs.chk[d].checked = true),
          this.updataOrder(this.$refs.chk[d]))
        : (this.$refs.chk[d].checked = false);
      //    console.log(this.$refs.chk[d])
      // console.log(o);
    },
    updataOrder(o) {
      //   if (o.checked) {
      let gl = this.querygl(o.value);
      if (!gl) return;
      // let _n = -1;
      //    console.log(this.$refs)
      for (let [i, item] of this.orderlist.entries()) {
        // _n++;
        if (item.Id == o.value) {
          if (o.checked) {
            // this.$refs.a[_n].value = 1;
            // this.a = 1;
            gl.val.Count = this.$refs.a[gl.idx].value;
            Vue.set(this.orderlist, i, gl.val);
          } else {
            // this.a = "";
            this.$refs.a[gl.idx].value = "";
            this.orderlist.splice(i, 1);
          }
          return false;
        }
      }
      //   this.a = 1;

      this.$refs.a[gl.idx].value
        ? this.$refs.a[gl.idx].value
        : (this.$refs.a[gl.idx].value = 1);
      gl.val.Count = this.$refs.a[gl.idx].value;
      Vue.set(this.orderlist, this.orderlist.length, gl.val);
      // ? item.Count : Vue.set(this.orderlist, o.value, gl)
      //   }
      // console.log(o.checked)
    },
    querygl(Id) {
      //   return this.goodlist.filter(item => (item.Id == Id ? item : false));
      for (let [idx, val] of this.goodlist.entries()) {
        if (val.Id == Id) return { idx, val: Object.assign({}, val) };
      }
      return false;
    },
    add() {
      //   let _store =
      this.$store.dispatch("runaddgoods", this.orderlist);
      this.$router.push({name:'BuyCart'})
    },
    pop(goods, ev) {
      ev.target.tagName == "LI" ? (ev.target.style.background = " red") : "";

      this.a = goods;
      // this.$refs.sd.info=goods;
    },
    pop1() {
      event.target.style = "";
    }
  },
  directives: {
    mydir: {
      bind(el, binding) {
        // console.log(el);
        // console.log(binding)
        binding.value < 20 ? (console.log(123), (el.classList = "kc")) : "";
      }
    }
  },
  watch: {
    goodlist(oldvalue, newvalue) {
      this.$store.state.stores.goodlist = oldvalue;
    }
  }
};
</script>
<style >


li {
  list-style: none;
}
input[type="text"] {
  width: 8vw;
  font-size: 3.4vw;
  border:.2vw solid;
}
input[type="checkbox"]{
  width:4vw;
  height: 4vw;
}
/* input[type="checkbox"]:after{
content: "\8597"
} */
span {
  display: inline-block;
  width: 26.7vw;
}
.kc:after {
  content: "库存告急";
  width: 10px;
  height: 20px;
}
</style>


