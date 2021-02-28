import axios from 'axios'

const registerUrl = 'http://localhost:5000/api/user/register'
const loginUrl = 'http://localhost:5000/api/user/login'

export const createUser = (newUser) => axios.post(registerUrl, newUser)
export const accessUser = (user) => axios.post(loginUrl, user)

