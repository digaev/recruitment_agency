class AddAddreessToVacancies < ActiveRecord::Migration
  def up
    add_column :vacancies, :address, :string
  end

  def down
    remove_column :vacancies, :address
  end
end
