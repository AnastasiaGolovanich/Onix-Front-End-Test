import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: 'https://bubenchik.getsandbox.com:443/',
  timeout: 1000
})
instance.interceptors.response.use(
  (response) => {
    return response.data
  }
)
export const ApiService = {
  get (resource: any, config?: AxiosRequestConfig) {
    return instance.get(resource, config)
  },
  post (resource: any, data: any, config?: AxiosRequestConfig) {
    return instance.post(resource, data, config)
  },
  put (resource: any, data: any, config?: AxiosRequestConfig) {
    return instance.put(resource, data, config)
  },
  patch (resource: any, data: any, config?: AxiosRequestConfig) {
    return instance.patch(resource, data, config)
  },
  delete (resource: any, config?: AxiosRequestConfig) {
    return instance.delete(resource, config)
  }
}
