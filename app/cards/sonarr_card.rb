class SonarrCard 
  def initialize(settings) 
    @settings = settings.symbolize_keys
  end

  def get(endpoint, query = {})
    puts url(endpoint)
    response = HTTParty.get(
      url(endpoint), 
      query: query, 
      headers: {
        'X-Api-Key': @settings[:apiKey]
      }
    )
    JSON.parse(response.body)
  end

  def url(endpoint)
    "#{@settings[:url].chomp('/')}/api/#{endpoint}"
  end
end