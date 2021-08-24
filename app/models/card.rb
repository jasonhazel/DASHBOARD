class Card < ApplicationRecord
  serialize :settings, Hash

  def service
    settings.fetch('application', {})
            .fetch('id', nil)
  end

  def sonarr?
    service === 'sonarr'
  end
end
