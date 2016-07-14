class VacanciesController < ApplicationController
  before_filter :set_vacancy, only: [:show]
  before_filter :set_employees, only: [:show]
  before_filter :prepare_params, only: [:create]

  def index
    @vacancies = Vacancy.order('created_at desc').preload(:skill_names)
  end

  def create
    @vacancy = Vacancy.new(@vacancy_params)
    if @vacancy.save
      render status: 201, json: { errors: false }
    else
      errors = {}
      @vacancy.errors.each do |error, message|
        errors[error] ||= @vacancy.errors.full_message(error, message)
      end
      render json: { errors: { vacancy: errors } }
    end
  end

  private

  def set_vacancy
    @vacancy = Vacancy.find(params[:id])
  end

  def set_employees
    @most_matched_employees = @vacancy.most_matched_employees.order('salary asc')
    @most_matched_employees = @most_matched_employees.preload(:skill_names)

    ids = @most_matched_employees.map(&:id)

    @employees = @vacancy.employees
    @employees = @employees.where('employees.id NOT IN (?)', ids) if ids.any?
    @employees = @employees.order('salary asc')
    @employees = @employees.preload(:skill_names)
  end

  def prepare_params
    @vacancy_params = params[:vacancy] || {}
    @vacancy_params.delete(:skill) # Unused parameter
  end
end
