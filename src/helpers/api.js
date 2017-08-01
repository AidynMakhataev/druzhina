import axios from 'axios'

const baseUrl = 'https://brigade.kz';
export function post(url, payload) {

    return axios({
        method: 'POST',
        url: baseUrl + url,
        data: payload,
        withCredentials: true
    })
}

export function get(url) {
    return axios({
        method: 'GET',
        url: baseUrl + url,
        withCredentials: true
    })
}
