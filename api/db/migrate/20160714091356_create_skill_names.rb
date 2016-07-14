class CreateSkillNames < ActiveRecord::Migration
  def change
    create_table :skill_names do |t|
      t.string :name
      t.timestamps
    end
    add_index :skill_names, :name, unique: true
  end
end
