require 'rails_helper'

RSpec.describe VacanciesController, type: :controller do
  render_views

  let(:json) { JSON.parse(response.body) }

  describe '#index' do
    before do
      @vacancies = create_list(:vacancy, 3)
    end

    it 'should list vacancies' do
      get :index, params: { format: :json }
      expect(response).to have_http_status(:ok)
    end
  end

  describe '#show' do
    before do
      @vacancy = create(:vacancy)
      create_list(:employee, 1, skills: @vacancy.skills)
    end

    it 'should return vacancy' do
      get :show, params: { id: @vacancy.id, format: :json }
      expect(response).to have_http_status(:ok)

      expect(json).to have_key('best_employees')
      expect(json).to have_key('employees')
    end
  end

  describe '#create' do
    before do
      @params = { format: :json }
      @vacancy = create(:vacancy)
      allow(Vacancy).to receive(:create!).and_return(@vacancy)
    end

    it 'should create an employee' do
      permitted_params = ActionController::Parameters.new(@params).permit(
        :address, :email, :name, :phone, :salary, :status, skills: []
      )

      post :create, params: @params
      expect(Vacancy).to have_received(:create!).with(permitted_params)
      expect(response.status).to eq(201)
    end
  end
end
