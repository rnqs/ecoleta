import axios from 'axios'

const ibgeLocalityApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
})

export interface UFResponse {
  id: number
  nome: string
}

export interface CityResponse {
  id: number
  nome: string
}

export default ibgeLocalityApi
