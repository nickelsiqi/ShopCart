import Vue from 'vue'
// import Vue from 'vue';
// import Vuex from 'vuex'

// Vue.use(Vuex)
const stores = {
    namespaced: true,
    state: {
        goodlist: []
    },
    getters: {},
    mutations: {
        updatagoods(state, goodsinfo) {
            // for (let x of goodsinfo) {
            for (let x = 0; x < goodsinfo.length; x++) {
                for (let i of state.goodlist) {
                    if (i.Id == goodsinfo[x].Id) {
                        i.Count - goodsinfo[x].Count < 0 ? Vue.set(i, "Info", "库存不足") :
                            Vue.set(i, "Count", (i.Count - goodsinfo[x].Count))
                        // goodsinfo.shift()
                        break;
                    }
                }

            }
        }
    },
    actions: {
        runupdatagoods(context, goodsinfo) {
            context.commit("updatagoods", goodsinfo)
        }
    }
}
export default stores