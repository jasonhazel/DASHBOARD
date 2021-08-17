export default class {
  constructor(series) {
    this.series = series
  }

  get title() {
    return this.series.title
  }

  get slug() {
    return this.series.titleSlug
  }

  get poster() {
    return this.image('poster')
  }

  image(type = 'poster') {
    return this.series.images.find(i => i.coverType == type).url
  }

  get url() {
    return `series/${this.slug}`
  }

}