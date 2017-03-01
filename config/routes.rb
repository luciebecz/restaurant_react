Rails.application.routes.draw do

  root 'home#index'

  namespace :api do
    resources :menus do 
      resources :menu_items
    end
  end 

  # NO ROUTES BELOW THIS!!!
  get '*unmatched_route', to: 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
