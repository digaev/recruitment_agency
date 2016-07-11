RecruitmentAgency::Application.routes.draw do
  resources :vacancies,
    defaults: { format: :json },
    only: [:index, :show, :create]

  resources :employees,
    defaults: { format: :json },
    only: [:index, :show, :create]

  resources :skills,
    defaults: { format: :json },
    only: [:index]
end
