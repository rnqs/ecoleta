import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.1.168:3030',
})

export interface Item {
  id: number
  title: string
  imageUrl: string
}

export default api
