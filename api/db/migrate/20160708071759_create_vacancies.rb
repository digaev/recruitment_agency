class CreateVacancies < ActiveRecord::Migration
  def up
    create_table :vacancies do |t|
      t.string :title
      t.float :salary
      t.date :expire_at
      t.timestamps
    end
  end

  def down
    drop_table :vacancies
  end
end
