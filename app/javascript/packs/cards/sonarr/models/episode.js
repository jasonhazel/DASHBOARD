import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'

import Series from './series'

export default class {
  constructor(episode) {
    this.episode = episode
    
    if (this.episode.series)
      this.series = new Series(this.episode.series)
  }

  get title() {
    return this.episode.title
  }

  get poster() {
    return this.series.poster
  }

  get shortAirDate() {
    return this.airDate()
  }

  get downloaded() {
    return this.episode.hasFile
  }

  get number() {
    return `S${this.episode.seasonNumber}E${this.episode.episodeNumber}`
  }

  get seriesTitle() {
    return this.series.title
  }

  airDate(display = 'EEEE K:mmaaaaa') {
    let airDate = utcToZonedTime(new Date(this.episode.airDateUtc))
    return format(airDate, display)
  }

  get url() {
    return `${this.series.url}`
  }

  image(type = 'poster') {
    return this.series.image(type)
  }
}