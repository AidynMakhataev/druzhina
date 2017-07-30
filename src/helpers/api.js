import axios from 'axios'
import Auth from '../store/auth'

export function post(url, payload) {
    var baseUrl = 'https://brigade.kz';
    return axios({
        method: 'POST',
        url: baseUrl + url,
        data: payload,
        withCredentials: true
    })
}