FactoryGirl.define do
  factory :employee do
    address { "#{Faker::Address.city}, #{Faker::Address.street_address}" }
    email { Faker::Internet.email }
    phone { Faker::PhoneNumber.cell_phone }
    salary { rand(1..1000) }
    skills { Faker::Lorem.words(rand(2..5)) }
    status { Employee::STATUS.sample }

    name do
      loop do
        name = Faker::Name.name
        break name if name.count(' ') == 2
      end
    end
  end
end
