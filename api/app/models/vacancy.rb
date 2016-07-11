class Vacancy < ActiveRecord::Base
  acts_as_taggable_on :skills

  attr_accessible :address, :expire_at, :salary, :title, :skill_list

  validates :address, length: { minimum: 10 }
  validates :address, presence: true
  validates :expire_at, presence: true
  validates :salary, numericality: { greater_than: 0 }
  validates :title, length: { minimum: 10 }
  validates :title, presence: true

  validate :validate_expire_at
  validate :validate_skills

  def employees
    Employee.tagged_with(self.skills, on: :skills, any: true)
  end

  def most_matched_employees
    Employee.tagged_with(self.skills, on: :skills, match: true)
  end

  private

  def validate_expire_at
    errors.add(
      :expire_at,
      'should be a valid date (YYYY-MM-DD)'
    ) and return if self.expire_at.blank? || self.expire_at.to_date.nil?

    errors.add(
      :expire_at,
      'can not be in past'
    ) and return if self.expire_at.to_date < Date.today
  end

  # FIXME DRY
  def validate_skills
    errors.add(
      :skill,
      'must be at least one'
    ) and return if self.skill_list.length.zero?
  end
end
