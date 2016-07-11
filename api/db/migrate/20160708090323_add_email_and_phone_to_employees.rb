class AddEmailAndPhoneToEmployees < ActiveRecord::Migration
  def up
    add_column :employees, :email, :string
    add_column :employees, :phone, :string
  end

  def down
    remove_column :employees, :email
    remove_column :employees, :phone
  end
end
