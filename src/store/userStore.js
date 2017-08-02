import { get, post, del } from './../helpers/api'
import Flash from './../helpers/flash'

const state = {
    userList: []
}

const mutations = {
    SET_USER_LIST (state, userList) {
        state.userList = userList
    },
    REMOVE_USER (state, userId) {
        var userList = state.userList
        userList.splice(userList.indexOf(userId), 1)
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
    },
    fetchDeleteUser ({commit}, payload) {
        return del('/api/user/' + payload.user_id)
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    commit('REMOVE_USER', payload.user_id)
                    return Flash.setSuccess('Пользователь удален с базы данных!')
                }
            })
    }
}

export default {
    state, mutations, actions
}