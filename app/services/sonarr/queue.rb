module Sonarr
  class Queue < Base
    class Record
      include Episode

      attr_accessor :source

      def initialize(source = {})
        @source = source.deep_symbolize_keys!
      end

      def episode
        source[:episode]
      end

      def series
        source[:series]
      end

      def progress
        ((1 - source[:sizeleft].to_f / source[:size].to_f) * 100).round(2)
      end


      def to_json
        {
          id:           episode[:id],
          date:         episode[:airDateUtc],
          downloaded:   episode[:hasFile] ? 100 : progress,
          image:        image,
          title:        episode[:title],
          series:       series[:title],
          number:       number,
          url:          url
        }
        # source
      end
    end

    class << self
      def call(settings = {}, options = {})
        new(settings).get('queue', options) do
          body.map { |ep| Record.new(ep) }.map(&:to_json)
        end
      end
    end
  end
end