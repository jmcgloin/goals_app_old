Rails.application.routes.draw do
  resources :steps
  resources :goals
  resources :users

  get '/session', to: 'session#show'
  delete '/session', to: 'session#destroy'

  post '/login', to: 'session#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
