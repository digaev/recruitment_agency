module SkillsUniquer
  extend ActiveSupport::Concern

  included do
    before_save do
      self.skills = skills.map(&:downcase).uniq
    end
  end
end
