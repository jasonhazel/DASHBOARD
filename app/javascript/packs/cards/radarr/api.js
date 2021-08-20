const axios = require('axios')
import { Movie, Download } from './models'
export default class {
  constructor(card) {
    this.card = card
  }

  get id() {
    return this.card.id
  }

  post(endpoint, options = {}) {
    return axios.post(`/cards/${this.id}/radarr/${endpoint}`, { params: options })
  }

  async systemStatus() {
    try {
      const response = await this.post('status')
      return response
    } catch (error) {
      return { data: { message: error, version: null } }
    }
  }

  async calendar(options = {}) {
    try {
      const response = await this.post('calendar', options)
      return response.data.map(movie => new Movie(movie))
    } catch (error) {
      return { data: { message: error, version: null } }
    }
  }

  async queue() {
    try {
      const response = await this.post('queue')
      return response.data.map(download => new Download(download))
    } catch (error) {
      return { data: { message: error, version: null } }
    }
  }
}