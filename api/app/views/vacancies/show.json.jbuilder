json.partial! 'show', locals: { vacancy: @vacancy }

json.best_employees @best_employees do |employee|
  json.partial! 'employees/show', locals: { employee: employee }
end

json.employees @employees do |employee|
  json.partial! 'employees/show', locals: { employee: employee }
end
