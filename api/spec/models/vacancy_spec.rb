require 'rails_helper'

RSpec.describe Vacancy, :type => :model do
  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_length_of(:title).is_at_least(10) }
    it { should validate_presence_of(:address) }
    it { should validate_length_of(:address).is_at_least(10) }
    it { should validate_presence_of(:expire_at) }
    it { should validate_numericality_of(:salary) }
    it { should_not allow_value(0).for(:salary) }

    describe 'salary' do
      it 'must be greater than zero' do
        expect(FactoryGirl.build :vacancy).not_to be_valid
        expect(FactoryGirl.build :vacancy, salary: -1).not_to be_valid
        expect(FactoryGirl.build :vacancy, salary: 0).not_to be_valid

        expect(FactoryGirl.build :vacancy, salary: 1).to be_valid
      end
    end
  end
end
