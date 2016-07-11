FactoryGirl.define do
  factory :vacancy do
    title { Faker::Lorem.sentence }
    address { "#{ Faker::Address.city }, #{ Faker::Address.street_address }" }
    expire_at { Faker::Date.between(Date.today, Date.today + 2.months) }
  end
end
