import formatDistance from 'date-fns/formatDistance'
import { utcToZonedTime } from 'date-fns-tz'

import Series from './series'
import Episode from './episode'

export default class {
  constructor(download) {
    this.download = download
    this.series = new Series(this.download.series)
    this.episode = new Episode(this.download.episode)
  }


  get seriesTitle() {
    return this.series.title
  }

  get episodeTitle() {
    return this.episode.title
  }

  get episodeNumber() {
    return this.episode.number
  }

  get poster() {
    return this.image('poster')
  }

  image(type = 'poster') {
    return this.series.image(type)
  }

  get progress() {
    return parseInt(100 - ((this.download.sizeleft / this.download.size) * 100))
  }

  get eta() {
    return utcToZonedTime(new Date(this.download.estimatedCompletionTime))
  }

  get etaDistance() {
    return formatDistance(this.eta, new Date())
  }

  get status() {
    return this.download.status.toLowerCase()
  }

  get trackedStatus() {
    return this.download.trackedDownloadStatus.toLowerCase()
  }
}