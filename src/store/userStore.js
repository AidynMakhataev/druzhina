import { get, post, del, put } from './../helpers/api'
import Flash from './../helpers/flash'
import Vue from 'vue'

const state = {
    userList: [],
    user: {},
    userPhoto: ''
}

const mutations = {
    SET_USER_LIST (state, userList) {
        state.userList = userList
    },
    REMOVE_USER (state, userId) {
        let userList = state.userList
        // Find a user with corresponding id in userList
        let i = userList.map(item => item.user_id).indexOf(userId)
        //Remove user from stack
        userList.splice(i, 1)
    },
    FETCH_SINGLE_USER(state, user) {
        state.user = user
    },
    UPDATE_USER(state, updUser) {
        let userList = state.userList
        //Find a user with corresponding id in userlist
        let i = userList.map(item => item.user_id).indexOf(updUser.user_id)
        //update it
        Vue.set(userList, i ,updUser)
    },
    ADD_USER(state, user) {
        state.userList.push(user)
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
    },
    fetchSingleUser ({commit}, payload) {
        return get('/api/user/' + payload)
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    commit('FETCH_SINGLE_USER', response.data)
                    return response.data
                }
            })
    },
    fetchUpdateUser ({commit}, payload) {

        return put('/api/user/' + payload.user_id, payload)
            .then(response => {
                console.log(response)
                    if(response.status === 200) {
                        commit('UPDATE_USER', payload)
                        return Flash.setSuccess('Данные успешно изменены!')
                    }
            })
    },
    fetchCreateUser({commit}, payload) {

        return post('/api/signup', payload)
            .then(response => {
                console.log(response);
                if(response.status === 201) {
                    commit('ADD_USER', payload)
                    return Flash.setSuccess('Пользователь успешно добавлен!')
                }
                else if(response.status === 409) {
                    return Flash.setError('Email или телефон уже существуют!')
                }
                else if(response.status === 400) {
                    return Flash.setError('Не все поля заполнены!')
                }
            }).catch(error => {
                console.log('Error', error)
            })
    }


}

export default {
    state, mutations, actions
}