import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import goods from './goodlist'
import stores from './storegood'
const store =new Vuex.Store({
    modules:{
        goods,
        stores
    }
})
export default store