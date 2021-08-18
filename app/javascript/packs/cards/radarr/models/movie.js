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

  get releaseType() {

  }

  get downloaded() {
    return 'movieFile' in this.movie
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