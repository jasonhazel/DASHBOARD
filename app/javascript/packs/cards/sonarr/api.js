const axios = require('axios')
import { Episode, Download } from './models'
export default class {
  constructor(url, apiKey) {
    this.url = url.replace(/\/$/, '')
    this.apiKey = apiKey

    this.axios = axios.create({
      baseURL: `${this.url}/api/`,
      headers: {
        'X-Api-Key': this.apiKey
      }
    })
  }

  buildURL(endpoint) {
    return `${endpoint}?apikey=${this.apiKey}`
  }

  get(endpoint, options = {}) {
    return this.axios.get(endpoint, { params: options })
  }

  async systemStatus() {
    try {
      const response = await this.get('system/status')
      return response
    } catch (error) {
      return { data: { message: error, version: null } }
    }
  }

  async calendar(options = {}) {
    try {
      const response = await this.get('calendar', options)
      return response.data.map(episode => new Episode(episode))
    } catch (error) {
      return { data: { message: error, version: null } }
    }
  }

  async queue() {
    try {
      const response = await this.get('queue')
      return response.data.map(download => new Download(download))
    } catch (error) {
      console.log(error)
      return { data: { message: error, version: null } }
    }
  }
}