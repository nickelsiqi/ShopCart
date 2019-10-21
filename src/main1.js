import Vue from 'vue'
// import Store from './store/goodlist'
// import ShopList from './components/shoplist' 
import router from '@/router/shop'
// import store from '@/store/goodlist'
// import stores from '@/store/storegood'
import store from '@/store/allstore'
// import VueSocketio from 'vue-socket.io'
// Vue.use(new VueSocketio({ debug: true, connection: "http://localhost:8088" }));
new Vue({
    el:'#demo',
    router,
    store,
    // components:{ShopList},
    template:'<div><router-link :to="{name:\'BuyCart\'}">购物车</router-link><router-view/></div>'
})