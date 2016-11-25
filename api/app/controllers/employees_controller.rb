class EmployeesController < ApplicationController
  def index
    @employees = Employee.order(:name)
  end

  def show
    @employee = Employee.find(params[:id])
    @best_vacancies = @employee.best_vacancies.order('vacancies.salary desc')
    @vacancies = @employee.vacancies.order('vacancies.salary desc')
  end

  def create
    @employee = Employee.create!(employee_params)
    render status: 201, json: { id: @employee.id }
  end

  private

  def employee_params
    params.permit(
      :address, :email, :name, :phone, :salary, :status, skills: []
    )
  end

  def set_employee
    @employee = Employee.find(params[:id])
  end
end
