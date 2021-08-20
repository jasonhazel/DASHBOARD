module Cards
  class RadarrController < ApplicationController
    def status
      card      = Card.find(params[:card_id])
      response  = RadarrCard.new(card.settings).get('system/status')
      
      render json: response, status: :ok
    end

    def calendar
      card      = Card.find(params[:card_id])
      options   = {
        start: Date.today.strftime('%F'),
        end:   4.months.from_now.strftime('%F')
      }
      response  = RadarrCard.new(card.settings).get('calendar', options).first(15)
      
      render json: response, status: :ok
    end    

    def queue
      card      = Card.find(params[:card_id])
      response  = RadarrCard.new(card.settings).get('queue')
      
      render json: response, status: :ok
    end    
  end
end