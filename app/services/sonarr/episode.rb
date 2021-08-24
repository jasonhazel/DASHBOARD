module Sonarr
  module Episode



    def image(type = :poster)
      images = series[:images].select do |image|
        image[:coverType].to_sym == type
      end

      images.first[:url]
    end

    def number
      "S#{episode[:seasonNumber]}E#{episode[:episodeNumber]}"
    end

    def url
      "series/#{series[:titleSlug]}"
    end

  end
end