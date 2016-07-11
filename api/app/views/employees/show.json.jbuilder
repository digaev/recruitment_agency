json.id @employee.id
json.name @employee.name
json.address @employee.address
json.phone @employee.phone
json.email @employee.email
json.status @employee.status
json.salary number_to_currency(@employee.salary)
json.skills @employee.skill_list

json.vacancies do
  json.matched do
    json.array! @most_matched_vacancies do |vacancy|
      json.id vacancy.id
      json.title vacancy.title
      json.address vacancy.address
      json.salary number_to_currency(vacancy.salary)
      json.created l(vacancy.created_at.to_date, format: :long)
      json.expire l(vacancy.expire_at, format: :long)
      json.skills vacancy.skill_list
    end
  end

  json.others do
    json.array! @vacancies do |vacancy|
      json.id vacancy.id
      json.title vacancy.title
      json.address vacancy.address
      json.salary number_to_currency(vacancy.salary)
      json.created l(vacancy.created_at.to_date, format: :long)
      json.expire l(vacancy.expire_at, format: :long)
      json.skills vacancy.skill_list
    end
  end
end
