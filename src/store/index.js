import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex);

const state = {
    loginFlag:false,
    userIfo:{},
    friendsList:[],
    photoCollection:[],
    streetCollection:[],
    result:{
        article:[],
        photo:[],
        user:[],
        news:[],
    },
    search:'',
    totalMsg:[],
    unRead:0,
    socket:null,
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
})