Rails.application.routes.draw do
  resources :employees,
            defaults: { format: :json },
            only: [:index, :show, :create]

  resources :vacancies,
            defaults: { format: :json },
            only: [:index, :show, :create]

  resources :skills, only: :index
end
