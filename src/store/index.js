import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex);

const state = {
    showHeader:true,
    showFooter:true,
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
    search:''
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
})