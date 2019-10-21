import Vue from 'vue'
import VueRoute from 'vue-router'

Vue.use(VueRoute)

export default new VueRoute({
    routes:[{
        path:'/shoplist/:Id',
        name:'ShopDetail',
        component:resolve=>require([''])
    }]
})