import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import EventEmitter from 'eventemitter3'

export class RequestSimpleCache extends EventEmitter {
  private requestEmmitters: Record<string, EventEmitter> = {}

  async get(
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any>> {
    const key = url
    if (this.requestEmmitters[key]) {
      return new Promise((resolve, reject) => {
        this.requestEmmitters[key].on('response', resolve)
        this.requestEmmitters[key].on('error', reject)
      })
    }
    const emmitter = new EventEmitter()

    return new Promise((resolve, reject) => {
      this.requestEmmitters[key] = emmitter
      axios
        .get(url, config)
        .then((resp) => {
          emmitter.emit('response', resp)
          resolve(resp)
        })
        .catch((err) => {
          emmitter.emit('error', err)
          reject(err)
        })
        .finally(() => {
          emmitter.removeAllListeners()
          delete this.requestEmmitters[key]
        })
    })
  }
}

const requestSimpleCache = new RequestSimpleCache()

export default requestSimpleCache
