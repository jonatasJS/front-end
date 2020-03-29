// ''
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://be-the-heroback-end.herokuapp.com'
})

export default api;
