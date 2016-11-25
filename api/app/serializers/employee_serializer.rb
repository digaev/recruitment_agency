class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :address, :email, :name, :phone, :salary, :status, :skills
  attributes :created_at
end
