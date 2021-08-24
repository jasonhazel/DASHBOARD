module Sonarr
  class Calendar < Base
    class Record
      include Episode

      attr_accessor :source

      def initialize(source = {})
        @source = source.deep_symbolize_keys!
      end

      def episode
        source
      end

      def series
        episode[:series]
      end





      def to_json
        {
          id:         source[:id],
          date:       source[:airDateUtc], 
          downloaded: source[:hasFile] ? 100 : 0,
          image:      image,
          title:      source[:title],
          series:     source[:series][:title],
          number:     number,
          url:        url
        }
      end
    end
    

    class << self
      def call(settings = {}, options = {})
        new(settings).get('calendar', options) do 
          body.map { |ep| Record.new(ep) }.map(&:to_json)
        end
      end
    end
  end
end