module Cards
  class SonarrController < ApplicationController
    def status
      card      = Card.find(params[:card_id])
      response  = SonarrCard.new(card.settings).get('system/status')
      
      render json: response, status: :ok
    end

    def calendar
      
      card      = Card.find(params[:card_id])
      options   = {
        start: Date.today.strftime('%F'),
        end:   1.week.from_now.strftime('%F')
      }


      response  = SonarrCard.new(card.settings).get('calendar', options).first(6)
      
      render json: response, status: :ok
    end    

    def queue
      card      = Card.find(params[:card_id])
      response  = SonarrCard.new(card.settings).get('queue')
      
      render json: response, status: :ok
    end    
  end
end