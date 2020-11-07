import axios from 'axios';
import { store } from '../../reducers';

axios.defaults.baseURL = 'https://my-api-expery.herokuapp.com/user'
axios.interceptors.response.use(res=> res.data, err=> Promise.reject(err.response))

const getAuthHeader = () => ({Authorization: `Bearer ${store.getState().token}`})

export const ApiService = {

    login(item) {
        return axios.post('login', item)  
    },

    signup(item) {
        return axios.post('register', item)  
    },

    editMyProfile(id, item) {
        return axios.put(`users/${id}/info`, item, {headers: getAuthHeader()})  
    },

    getUser(id) {
        return axios.get(`users/${id}`, {headers: getAuthHeader()})  
    }
}

