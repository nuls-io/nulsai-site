import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import './Buffer'
import { message } from 'antd'
// import download from 'downloadjs'
import { APP_SERVER_URL } from '../constants'
import EventEmitter from 'eventemitter3'
import { NewsData, StatsData } from './types'

export default class SystemAPI extends EventEmitter {
  protected caller: AxiosInstance
  jwtToken: string | null = null

  constructor() {
    super()
    const ax = axios.create({
      baseURL: APP_SERVER_URL.endsWith('/')
        ? APP_SERVER_URL + 'rest'
        : APP_SERVER_URL + '/rest',
    })
    this.caller = ax
    ax.interceptors.request.use((config) => {
      // console.log(
      //   `%c!!!! You're calling dev data of: ${config.url ?? ''}`,
      //   'background: #292929; color: yellow'
      // )
      const token = this.jwtToken
      // console.log(token)
      config.headers['referrer'] = window.location.href
      if (token) {
        config.headers['x-access-token'] = token
      }
      //加入语言
      try {
        const lang = localStorage.getItem('i18nextLng') || 'en'
        config.headers['lang'] = lang
      } catch (error) {
        console.log(error)
      }
      return config
    })
    ax.interceptors.response.use(
      (res) => {
        if (res.data.token) {
          this.jwtToken = res.data.token
        }
        return res
      },
      (error) => {
        if (error.response?.data?.error?.message) {
          message.error(error.response.data.error.message)
        }
        if (error.response?.status === 401) {
          this.cleanJWTToken()
        }
        return Promise.reject(error)
      }
    )
  }

  cleanJWTToken(): void {
    this.jwtToken = null
    this.emit('cleanToken')
  }

  setJWTToken(token: string): void {
    this.jwtToken = token
  }

  private requestEmmitters: Record<string, EventEmitter> = {}

  private async post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any>> {
    const key = url + JSON.stringify(data)
    if (this.requestEmmitters[key]) {
      return new Promise((resolve, reject) => {
        this.requestEmmitters[key].on('response', resolve)
        this.requestEmmitters[key].on('error', reject)
      })
    }
    const emmitter = new EventEmitter()

    return new Promise((resolve, reject) => {
      this.requestEmmitters[key] = emmitter
      this.caller
        .post(url, data, config)
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

  private getRequestEmmitters: Record<string, EventEmitter> = {}

  private async get(
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any>> {
    const key = url + JSON.stringify(config)
    if (this.getRequestEmmitters[key]) {
      return new Promise((resolve, reject) => {
        this.getRequestEmmitters[key].on('response', resolve)
        this.getRequestEmmitters[key].on('error', reject)
      })
    }
    const emmitter = new EventEmitter()

    return new Promise((resolve, reject) => {
      this.getRequestEmmitters[key] = emmitter
      this.caller
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
          delete this.getRequestEmmitters[key]
        })
    })
  }

  // normal api
  async getLatestNews(): Promise<NewsData[]> {
    const resp = await this.get('/media/medium')
    const news = resp.data.data
    return news
  }

  async getStats(): Promise<StatsData> {
    const resp = await this.get('/stat')
    const news = resp.data.data
    return news
  }
}
