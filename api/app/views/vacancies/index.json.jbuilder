json.array! @vacancies do |vacancy|
  json.id vacancy.id
  json.title vacancy.title
  json.address vacancy.address
  json.salary number_to_currency(vacancy.salary)
  json.created l(vacancy.created_at.to_date, format: :long)
  json.expire l(vacancy.expire_at, format: :long)
  json.skills vacancy.skill_list
end
