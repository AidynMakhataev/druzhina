import { get, post, del } from './../helpers/api'

const state = {
    userTraces: [],
    dangerUsersList: [],
    dangerTraceList: [],
    test: [],
    tracingData: []
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
        state.dangerUsersList = dangerUsersList
    },
    CLEAR_DANGER_LIST(state) {
       state.dangerUsersList = []
    },
    TEST_ACTION(state, payload) {
        let i = state.test.map(item => item[0].trace_id).indexOf(payload[0].trace_id)
            if(i === -1) {
                state.tracingData.push({
                    coords: [payload[0].trace_latitude, payload[0].trace_longitude],
                    balloon: {
                        header: payload[0].user_name + '&nbsp;' + payload[0].user_surname,
                        body: payload[0].user_email,
                        footer: payload[0].user_phone
                    }
                })
            }
            else console.log('aaaaaaaaaaaaaa', i)
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
    test({commit}, payload) {
        console.log(payload)
        // return get('/api/user/' + payload + '/trace?count=1')
        //     .then(response => {
        //         commit('TEST_ACTION', response.data)
        //     })
    },
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
            let dangerUsers = []
            let data = []
            commit('CLEAR_DANGER_LIST')
            return get('/api/user?event_type=1')
                .then(response => {
                    return dangerUsers = response.data
                })
                .then(dangerUsers => {
                    for (let i = 0; i < dangerUsers.length; i++) {
                        get('/api/user/' + dangerUsers[i].user_id + '/trace?count=1')
                            .then(response => {
                                data.push(response.data[0])
                            })
                    }
                    return data
                })
                .catch(error => console.log(error.response))
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