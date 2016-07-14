class Skill < ActiveRecord::Base
  belongs_to :skill_name
  belongs_to :skillable, polymorphic: true

  def self.create_skills_for(skillable)
    ActiveRecord::Base.transaction do
      skill_names = SkillName.where('name IN (?)', skillable.skill_list).to_a
      existing_names = skill_names.map(&:name)

      (skillable.skill_list - existing_names).each do |s|
         skill_names << SkillName.create(name: s)
      end

      skill_names.each do |skill_name|
        unless Skill.where(
          skill_name_id: skill_name.id,
          skillable_id: skillable.id,
          skillable_type: skillable.class
        ).exists?
          skill = Skill.create
          skill.skill_name = skill_name
          skill.skillable = skillable
          skill.save!
        end
      end
    end
  end
end
