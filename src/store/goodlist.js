// import Vuex from 'vuex'
// import Vue from 'vue'

// Vue.use(Vuex)
const goods = {
    // namespaced:true,
    state: {
        goodlist: []
    },
    getters: {
        allprice(state) {
            return state.goodlist.length > 1 ?
                state.goodlist.reduce((prev, curr) => curr.Count * curr.Price + prev,0)
                : state.goodlist.length > 0 ? state.goodlist[0].Count * state.goodlist[0].Price : 0
        },
        
    },
    mutations: {
        addgoods(state, newgoods) {
            state.goodlist=newgoods
            // console.log(newgoods)
            // state.goodlist = Array.prototype.concat.apply(state.goodlist, newgoods)

        },
        removegoods(state, goodsIndex) {
            // let _idx = state.goodlist.indexOf(oldgoods);
            // let _idx=state.goodlist.findIndex(item=>item.Id==oldgoods.Id?item:-1);
            state.goodlist.splice(goodsIndex, 1);
        },
        updatagoods(state, goodsInfo) {
            // state,goodlist.find(item=>item.Id==goods.Id?item.Count=goods.Count:false)
            for (let i of state.goodlist.keys()) {
                if (i == goodsInfo.Id) {
                    Vue.set(state.goodlist[i], 'Count', goodsInfo.Count)
                    return false;
                }
            }
        }
    },
    actions: {
        runaddgoods(context, newgoods) {

            context.commit("addgoods", newgoods);
        },
        runremovegoods(context, goodsIndex) {
            context.commit("removegoods", goodsIndex)
        },
        runupdatagoods(context, goodsInfo) {
            context.commit("updatagoods", goodsInfo)
        }

    }
}
export default goods