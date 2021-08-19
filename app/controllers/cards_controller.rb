class CardsController < ApplicationController
  def index
    render json: Card.all, status: :ok
  end

  def create
    card = Card.new(permitted_params)
    if card.save
      render json: card, status: :ok
    else
      render json: { errors: card.errors }, status: :unprocessable_entity
    end
  end

  def update
    card = Card.find(params[:id])

    if card.update(permitted_params)
      render json: card, status: :ok
    else
      render json: { errors: card.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    card = Card.find(params[:id])
    if card.destroy
      render json: card, status: :ok
    else
      render json: { errors: card.errors }, status: :unprocessable_entity
    end
  end

  private
  def permitted_params
    params.require(:card).permit(settings: {})
  end

end