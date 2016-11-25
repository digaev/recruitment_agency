FactoryGirl.define do
  factory :vacancy do
    title { Faker::Lorem.sentence }
    address { "#{Faker::Address.city}, #{Faker::Address.street_address}" }
    salary { rand(1..1000) }
    skills { Faker::Lorem.words(rand(2..5)) }
    expire_at do
      Faker::Date.between(Date.today + 1.week, Date.today + 3.months)
    end
  end
end
