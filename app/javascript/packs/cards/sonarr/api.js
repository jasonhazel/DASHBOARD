const axios = require('axios')
export default class {
  constructor(card) {
    this.card = card
  }

  get id() {
    return this.card.id
  }

  post(endpoint, options = {}) {
    return axios.post(`/cards/${this.id}/sonarr/${endpoint}`, options )
  }

  async systemStatus() {
    try {
      const response = await this.post('status')
      return response
    } catch (error) {
      return { data: { message: error, version: null } }
    }
  }

  async calendar() {
    try {
      const response = await this.post('calendar')
      return response.data
    } catch (error) {
      return { data: { message: error, version: null } }
    }
  }

  async queue() {
    try {
      const response = await this.post('queue')
      return response.data
    } catch (error) {
      console.log(error)
      return { data: { message: error, version: null } }
    }
  }
}