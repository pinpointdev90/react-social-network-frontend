import axios from 'axios'
const apiUri = process.env.REACT_APP_API_URI;

export const getRequest = async (url: string, headers?: {}) => {
    try {
        console.log(apiUri + url)
        const {data, status} = await axios.get( apiUri + url, {headers: headers})
        return {data, status}
    }catch (e) {
        const {status} = e.response;
        const {message} = e.response.data
        return {status, message}
    }
}

export const postRequest = async (url: string, body: {}, headers?: {}) => {
    try {
        const {data, status} = await axios.post(apiUri + url, body, {headers: headers})
        return {data, status}
    }catch (e) {
        const {status} = e.response;
        const {message} = e.response.data
        return {status, message}
    }
}

export const deleteRequest = async (url: string, header: {}) => {
    try {
        const {data, status} = await axios.delete(apiUri + url, {headers: header})
        return {data, status}
    }catch (e){
        const {status} = e.response;
        const {message} = e.response.data
        console.log(message)
        return {status, message}
    }
}