require 'rails_helper'

RSpec.describe Employee, :type => :model do
  describe 'validations' do
    it { should validate_presence_of(:address) }
    it { should validate_length_of(:address).is_at_least(10) }
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_least(5) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:phone) }
    it { should validate_numericality_of(:salary) }
    it { should_not allow_value(0).for(:salary) }

    describe 'name' do
      it 'must consist of three cyrillic words' do
        expect(FactoryGirl.build :employee_with_salary, name: 'Иванов').not_to be_valid
        expect(FactoryGirl.build :employee_with_salary, name: 'Ivanov Иван').not_to be_valid
        expect(FactoryGirl.build :employee_with_salary, name: 'Ivanov Ivan Ivanovich').not_to be_valid
        expect(FactoryGirl.build :employee_with_salary, name: 'Раз Два Три Четыре').not_to be_valid

        expect(FactoryGirl.build :employee_with_salary, name: 'Иванов Иван Иванович').to be_valid
      end
    end

    describe 'salary' do
      it 'must be greater than zero' do
        expect(FactoryGirl.build :employee_with_cyrillic_name).not_to be_valid
        expect(FactoryGirl.build :employee_with_cyrillic_name, salary: -1).not_to be_valid
        expect(FactoryGirl.build :employee_with_cyrillic_name, salary: 0).not_to be_valid

        expect(FactoryGirl.build :employee_with_cyrillic_name, salary: 1).to be_valid
      end
    end
  end
end
