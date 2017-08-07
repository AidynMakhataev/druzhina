import Vue from 'vue'
import Vuex from 'vuex'

import userStore from './../store/userStore'
import traceStore from './../store/traceStore'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        userStore, traceStore
    },
    strict: debug
})
