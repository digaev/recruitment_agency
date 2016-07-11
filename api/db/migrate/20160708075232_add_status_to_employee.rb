class AddStatusToEmployee < ActiveRecord::Migration
  def up
    add_column :employees, :status, :string
  end

  def down
    remove_column :employees, :status
  end
end
