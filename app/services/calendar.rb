# this will probably go away
class Calendar
  class << self
    def call(options = {})
      cards = Card.all
      sonarr = cards.select(&:sonarr?)

      options   = {
        start: Date.today.beginning_of_month.strftime('%F'),
        end:   4.week.from_now.strftime('%F')
      }

      sonarr.map do |card|
        Sonarr::Calendar.call(card.settings, options).map do |episode|
          startTime = DateTime.parse(episode['airDateUtc'])
          endTime   = startTime + episode['series']['runtime'].to_i.minutes

          {
            id:     episode['id'],
            name:   episode['series']['title'],
            start:  startTime.strftime('%Y-%m-%dT%H:%M:%S.%LZ'),
            end:    endTime.strftime('%Y-%m-%dT%H:%M:%S.%LZ'),
            timed:  true,
            color:  episode['hasFile'] ? 'green' : 'primary'
          }
        end
      end.flatten
    end
  end
end