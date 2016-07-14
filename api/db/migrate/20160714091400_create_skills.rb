class CreateSkills < ActiveRecord::Migration
  def change
    create_table :skills do |t|
      t.belongs_to :skill_name
      t.references :skillable, polymorphic: true
      t.timestamps
    end

    add_index :skills, [:skillable_id, :skillable_type]
    add_index :skills, [:skill_name_id, :skillable_id, :skillable_type], unique: true, name: :idx_uniq_skill
  end
end
