# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

SKILLS = %w[ruby java swift php python javascript crystal linux mac bash]

def fake_address
  "#{ Faker::Address.city }, #{ Faker::Address.street_address }"
end

def fake_salary
  rand(100..10_000)
end

def fake_vacancy_title
  loop do
    title = Faker::Company.name
    return title if title.length >= 10
  end
end

def fake_employee_name
  [
    'Иванов Иван Иванович',
    'Петров Адрей Владимирович',
    'Сидоров Петр Алексеевич',
    'Степанов Николай Сергеевич',
    'Потапов Дмитрий Анатольевич'
  ].sample
end

ActiveRecord::Base.transaction do
  9.times do
    vacancy = Vacancy.create(
      title: fake_vacancy_title,
      salary: fake_salary,
      address: fake_address,
      expire_at: Faker::Date.between(Date.today, Date.today + 2.months)
    )
    vacancy.skill_list = SKILLS.sample(rand(1..5)).join(',')
    vacancy.save!

    employee = Employee.create(
      address: fake_address,
      email: Faker::Internet.email,
      name: fake_employee_name,
      phone: Faker::PhoneNumber.cell_phone,
      salary: fake_salary,
      status: Employee::STATUS.sample
    )
    employee.skill_list = SKILLS.sample(rand(1..5)).join(',')
    employee.save!
  end
end
