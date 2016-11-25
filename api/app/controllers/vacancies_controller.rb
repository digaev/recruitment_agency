class VacanciesController < ApplicationController
  def index
    @vacancies = Vacancy.order(:title)
  end

  def show
    @vacancy = Vacancy.find(params[:id])
    @best_employees = @vacancy.best_employees.order('employees.salary')
    @employees = @vacancy.employees.order('employees.salary')
  end

  def create
    @vacancy = Vacancy.create!(vacancy_params)
    render status: 201, json: { id: @vacancy.id }
  end

  private

  def vacancy_params
    params.permit(
      :address, :expire_at, :salary, :title, skills: []
    )
  end
end
