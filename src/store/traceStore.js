import { get, post, del } from './../helpers/api'

const state = {
    userTraces: [],
    dangerUsersList: [],
    dangerTraceList: []
}

const mutations = {
    FETCH_USER_TRACES (state, traces) {
        state.userTraces = [];
        for(let i = 0; i<traces.length; i ++) {
            state.userTraces.push({
                position: {
                    lat: traces[i].trace_latitude,
                    lng: traces[i].trace_longitude
                }
            })
        }
    },
    CLEAR_ARRAY (state) {
        state.userTraces = [];
    },
    DANGER_USER_LIST(state, dangerUsersList) {
        state.dangerUsersList = dangerUsersList;
    },
    DANGER_TRACE_LIST(state, dangerTraceList) {
        state.dangerTraceList = [];
        for( let i = 0; i < dangerTraceList.length; i ++ ) {
            state.dangerTraceList.push({
                position: {
                    lat: dangerTraceList[i].trace_latitude,
                    lng: dangerTraceList[i].trace_longitude
                }
            })
        }
    }
}

const actions = {
    fetchUserTraces({commit}, payload) {
        return get('/api/user/' + payload + '/trace?count=10')
            .then(response => {
                if(response.status === 200) {
                    commit('FETCH_USER_TRACES', response.data)
                    return response.data
                }
            })
            .catch(error => {
                commit('CLEAR_ARRAY')
                console.log(error)
            })
    },
    fetchDangerUsers({commit}) {
        return get('/api/user?event_type=1')
            .then(response => {
                 if(response.status === 200) {
                     commit('DANGER_USER_LIST', response.data)
                 }
            })

    },
    fetchDangerTraces({commit, state} ) {
        const data = [...state.dangerUsersList];
        const traces = [];
        console.log(data)
        for(let i = 0; i < data.length; i ++) {
            get('/api/user/' + data[i].user_id + '/trace?count=1')
                .then(response => {
                    if(response.status === 200) {
                        traces.push(response.data[0])
                    }
                })
        }
        commit('DANGER_TRACE_LIST', traces)
    }
}

export default {
    state, mutations, actions
}