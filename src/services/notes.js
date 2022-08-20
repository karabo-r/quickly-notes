import axios from 'axios'
const baseUrl = 'https://localhost:4000'

function createUser(data){
    const request =  axios.post(`${baseUrl}/api/users`, data)
    return request.data
}

function loginUser(credentials){
    
}

export default {createUser}