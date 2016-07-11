FactoryGirl.define do
  factory :employee do
    address { "#{ Faker::Address.city }, #{ Faker::Address.street_address }" }
    email { Faker::Internet.email }
    phone { Faker::PhoneNumber.cell_phone }

    factory :employee_with_salary do
      salary { rand(1..1000) }
    end

    factory :employee_with_cyrillic_name do
      name { 'Иванов Иван Иванович' }
    end
  end
end
