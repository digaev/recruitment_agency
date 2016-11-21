class CreateVacancies < ActiveRecord::Migration[5.0]
  def change
    create_table :vacancies do |t|
      t.string :title, null: false
      t.string :address, null: false
      t.float :salary, null: false
      t.date :expire_at, null: false
      t.string :skills, array: true, default: []
      t.timestamps
    end
  end
end
