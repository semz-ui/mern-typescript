import axios from 'axios'
import { RegisterForm, LoginForm } from '../../model'

// const API_URL = 'https://taskapp234.herokuapp.com/api/auth/'
const API_URL = 'http://localhost:5000/api/auth/'


//register a new user 
const register = async (userData: RegisterForm) => {
    const response = await axios.post(API_URL , userData)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//login a user

    const login = async (userData: LoginForm) => {
        const response = await axios.post(API_URL + "login", userData)
        if(response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
    }

    //logout a user
    const logout = () => {
        localStorage.removeItem('user')
    }

    const authService = {
        register,
        login,
        logout
    }

    export default authService