module Sonarr
  class Status < Base
    class << self
      def call(settings = {}, options = {})
        new(settings).get('system/status', options)
      end
    end
  end
end