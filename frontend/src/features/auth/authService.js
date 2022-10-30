import axios from 'axios'

const API_URL = '/api/users'

const register = async (userData) => {
  return await userPost(API_URL, userData)
}

const login = async (userData) => {
  return await userPost(`${ API_URL }/login`, userData)
}

const userPost = async (url, userData) => {
  const response = await axios.post(url, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  login,
  logout,
}

export default authService
