json.id @vacancy.id
json.title @vacancy.title
json.address @vacancy.address
json.salary number_to_currency(@vacancy.salary)
json.created l(@vacancy.created_at.to_date, format: :long)
json.expire l(@vacancy.expire_at, format: :long)
json.skills @vacancy.skill_list

json.employees do
  json.matched do
    json.array! @most_matched_employees do |employee|
      json.id employee.id
      json.address employee.address
      json.email employee.email
      json.name employee.name
      json.phone employee.phone
      json.salary number_to_currency(employee.salary)
      json.skills employee.skill_list
    end
  end

  json.others do
    json.array! @employees do |employee|
      json.id employee.id
      json.address employee.address
      json.email employee.email
      json.name employee.name
      json.phone employee.phone
      json.salary number_to_currency(employee.salary)
      json.skills employee.skill_list
    end
  end
end

