json.id vacancy.id
json.address vacancy.address
json.created_at l(vacancy.created_at.to_date, format: :long)
json.expire_at l(vacancy.expire_at, format: :long)
json.salary number_to_currency(vacancy.salary)
json.skills vacancy.skills
json.title vacancy.title
