json.partial! 'show', locals: { employee: @employee }

json.best_vacancies @best_vacancies do |vacancy|
  json.partial! 'vacancies/show', locals: { vacancy: vacancy }
end

json.vacancies @vacancies do |vacancy|
  json.partial! 'vacancies/show', locals: { vacancy: vacancy }
end
