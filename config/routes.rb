Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'application#index'

  resources :cards do
    namespace :cards, path: 'sonarr' do
      post :status,   to: 'sonarr#status'
      post :calendar, to: 'sonarr#calendar'
      post :queue,    to: 'sonarr#queue'
    end

  end

  # get '/*path', to: 'application#index'
end
