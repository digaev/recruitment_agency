class CreateEmployees < ActiveRecord::Migration[5.0]
  def change
    create_table :employees do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :email, null: false
      t.string :phone, null: false
      t.float :salary, null: false
      t.string :skills, array: true, default: []
      t.string :status, null: false
      t.timestamps
    end
  end
end
