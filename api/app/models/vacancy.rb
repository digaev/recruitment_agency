class Vacancy < ActiveRecord::Base
  attr_accessible :address, :expire_at, :salary, :title, :skill_list

  after_create :create_skills!

  has_many :skills, as: :skillable
  has_many :skill_names, through: :skills

  validates :address, length: { minimum: 10 }
  validates :address, presence: true
  validates :expire_at, presence: true
  validates :salary, numericality: { greater_than: 0 }
  validates :title, length: { minimum: 10 }
  validates :title, presence: true

  validate :validate_expire_at
  validate :validate_skills

  def skill_list
    @skill_list ||= skill_names.pluck(:name)
  end

  def skill_list=(list)
    raise TypeError if list.present? && !list.is_a?(Array)
    @skill_list = list || []
  end

  def employees
    skills = Skill.select(:skillable_id)
    skills = skills.joins(:skill_name)
    skills = skills.where(skillable_type: Employee)
    skills = skills.where('skill_names.name = ANY (ARRAY[?])', self.skill_list)
    Employee.where("id IN (#{ skills.to_sql })") # skills.pluck(:skillable_id)
  end

  def most_matched_employees
    skills = Skill.select('skillable_id, array_agg(skill_names.name) AS vacancy_skills')
    skills = skills.joins(:skill_name)
    skills = skills.where(skillable_type: Employee)
    skills = skills.group(:skillable_id)

    skills = Skill.from("(#{ skills.to_sql }) AS skills")
    skills = skills.where(
      "vacancy_skills::text[] @> ARRAY[?]", self.skill_list
    )

    skills = Skill.select(:skillable_id).from("(#{ skills.to_sql }) AS skills")
    Employee.where("id IN (#{ skills.to_sql })")
  end

  private

  def create_skills!
    Skill.create_skills_for(self)
  end

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
