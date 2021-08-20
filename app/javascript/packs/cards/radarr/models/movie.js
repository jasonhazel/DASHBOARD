import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'

export default class {
  constructor(movie) {
    this.movie = movie
  }

  get title() {
    return this.movie.title
  }

  get poster() {
    return this.image()
  }

  get title() {
    return this.movie.title
  }

  get dates() {
    return [
      { type: 'digitalRelease',   value: this.movie.digitalRelease },
      { type: 'inCinemas',        value: this.movie.inCinemas },
      { type: 'physicalRelease',  value: this.movie.physicalRelease }
    ]
  }

  get downloaded() {
    return this.movie.hasFile
  }

  airDate(display = 'EEEE K:mmaaaaa') {
    let airDate = utcToZonedTime(new Date(this.movie.airDateUtc))
    return format(airDate, display)
  }

  get url() {
    return `movie/${this.movie.titleSlug}`
  }

  image(type = 'poster') {
    return this.movie.images.find(i => i.coverType == type).url
  }
}