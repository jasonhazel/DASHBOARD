module Sonarr
  class Base 
    attr_accessor :response

    def initialize(settings) 
      @settings = settings.symbolize_keys
    end

    def get(endpoint, query = {}, &block)
      @response = HTTParty.get(
        url(endpoint), 
        query: query, 
        headers: { 'X-Api-Key': @settings[:apiKey] }
      )
      if block_given? 
        instance_eval(&block)
      else
        body
      end
    end

    def body
      JSON.parse(response&.body)
    end

    def url(endpoint)
      "#{@settings[:url].chomp('/')}/api/#{endpoint}"
    end
  end
end