json.array! @employees do |employee|
  json.id employee.id
  json.name employee.name
  json.address employee.address
  json.phone employee.phone
  json.email employee.email
  json.status employee.status
  json.salary number_to_currency(employee.salary)
  json.skills employee.skill_list
end
