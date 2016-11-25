class VacancySerializer < ActiveModel::Serializer
  attributes :id, :title, :address, :salary, :skills, :created_at, :expire_at
end
