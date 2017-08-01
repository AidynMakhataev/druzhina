import { get, post} from './../helpers/api'

const state = {
    userList: []
}

const mutations = {
    SET_USER_LIST (state, userList) {
        state.userList = userList
    }
}

const actions = {
    setUserList: ({commit}, userList) => {
        return get('/api/user?role=1&count=100')
            .then(response => {
                console.log(response)
                if(response.status === 200) {
                    commit('SET_USER_LIST', response.data)
                    return response.data
                }
            })
    }
}

export default {
    state, mutations, actions
}