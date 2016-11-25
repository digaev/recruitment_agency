json.array! @employees do |employee|
  json.partial! 'show', locals: { employee: employee }
end
