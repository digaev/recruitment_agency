class EmployeesController < ApplicationController
  before_filter :set_employee, only: [:show]
  before_filter :set_vacancies, only: [:show]
  before_filter :prepare_params, only: [:create]

  def index
    @employees = Employee.order('created_at desc')
  end

  def create
    @employee = Employee.new(@employee_params)
    if @employee.save
      render status: 201, json: { errors: false }
    else
      errors = {}
      @employee.errors.each do |error, message|
        errors[error] ||= @employee.errors.full_message(error, message)
      end
      render json: { errors: { employee: errors } }
    end
  end

  private

  def set_employee
    @employee = Employee.find(params[:id])
  end

  def set_vacancies
    @most_matched_vacancies = @employee.most_matched_vacancies.order('salary desc')

    ids = @most_matched_vacancies.map(&:id)

    @vacancies = @employee.vacancies
    @vacancies = @vacancies.where('vacancies.id NOT IN (?)', ids) if ids.any?
    @vacancies = @vacancies.order('salary asc')
  end

  def prepare_params
    @employee_params = params[:employee] || {}
    @employee_params.delete(:skill) # Unused parameter
  end
end
