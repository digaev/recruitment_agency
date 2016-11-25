require 'rails_helper'

RSpec.describe EmployeesController, type: :controller do
  render_views

  let(:json) { JSON.parse(response.body) }

  describe '#index' do
    before do
      @employees = create_list(:employee, 3)
    end

    it 'should list employees' do
      get :index, params: { format: :json }
      expect(response).to have_http_status(:ok)
    end
  end

  describe '#show' do
    before do
      @employee = create(:employee)
      create_list(:vacancy, 1, skills: @employee.skills)
    end

    it 'should return an employee' do
      get :show, params: { id: @employee.id, format: :json }
      expect(response).to have_http_status(:ok)

      expect(json).to have_key('best_vacancies')
      expect(json).to have_key('vacancies')
    end
  end

  describe '#create' do
    before do
      @params = { format: :json }
      @employee = create(:employee)
      allow(Employee).to receive(:create!).and_return(@employee)
    end

    it 'should create an employee' do
      permitted_params = ActionController::Parameters.new(@params).permit(
        :address, :email, :name, :phone, :salary, :status, skills: []
      )

      post :create, params: @params
      expect(Employee).to have_received(:create!).with(permitted_params)
      expect(response.status).to eq(201)
    end
  end
end
