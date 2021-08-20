class RadarrCard 
  def initialize(settings) 
    @settings = settings.symbolize_keys
  end

  def get(endpoint, query = {})
    response = HTTParty.get(
      url(endpoint), 
      query: query, 
      headers: { 'X-Api-Key': @settings[:apiKey] }
    )
    JSON.parse(response.body)
  end

  def url(endpoint)
    "#{@settings[:url].chomp('/')}/api/v3/#{endpoint}"
  end
end