import Vue from 'vue'
import VueRoute from 'vue-router'

Vue.use(VueRoute)
const router=new VueRoute({
    // mode:"history",
    routes:[
        {
            path:'/shoplist',
            name:'ShopList',
            component:resolve=>require(['@/components/shoplist'],resolve)
        },
        {
            path:'/buycart',
            name:'BuyCart',
            component:resolve=>require(['@/components/buycart'],resolve)
        },
        {
            redirect:'/shoplist',
            path:'/'
        }
    ]
})
export default router