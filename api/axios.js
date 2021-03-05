import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://sugoku.herokuapp.com'
})

export default axiosInstance