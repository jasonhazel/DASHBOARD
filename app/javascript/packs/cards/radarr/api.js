const axios = require('axios')
import { Movie, Download } from './models'
export default class {
  constructor(url, apiKey) {
    this.url = url.replace(/\/$/, '')
    this.apiKey = apiKey

    this.axios = axios.create({
      baseURL: `${this.url}/api/v3`,
      headers: {
        'X-Api-Key': this.apiKey
      }
    })
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
      return response.data.map(movie => new Movie(movie))
    } catch (error) {
      return { data: { message: error, version: null } }
    }
  }

  async queue() {
    try {
      const response = await this.get('queue')
      return response.data.map(download => new Download(download))
    } catch (error) {
      return { data: { message: error, version: null } }
    }
  }
}