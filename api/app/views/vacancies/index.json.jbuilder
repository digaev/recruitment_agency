json.array! @vacancies do |vacancy|
  json.partial! 'show', locals: { vacancy: vacancy }
end
