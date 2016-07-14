class Employee < ActiveRecord::Base
  STATUS = ['free', 'busy']

  attr_accessible :address, :email, :name, :phone, :salary, :status, :skill_list

  before_save :prettify_name!
  after_create :create_skills!

  has_many :skills, as: :skillable
  has_many :skill_names, through: :skills

  validates :address, length: { minimum: 10 }
  validates :address, presence: true
  validates :email, presence: true, email: true
  validates :name, length: { minimum: 5 }
  validates :name, presence: true
  validates :phone, presence: true
  validates :salary, numericality: { greater_than: 0 }
  validates :status, inclusion: { in: STATUS }

  validate :validate_name
  validate :validate_skills

  def skill_list
    @skill_list ||= self.skill_names.map(&:name)
  end

  def skill_list=(list)
    raise TypeError if list.present? && !list.is_a?(Array)
    @skill_list = list || []
  end

  def vacancies
    skills = Skill.select(:skillable_id)
    skills = skills.joins(:skill_name)
    skills = skills.where(skillable_type: Vacancy)
    skills = skills.where('skill_names.name = ANY (ARRAY[?])', self.skill_list)
    Vacancy.where("id IN (#{ skills.to_sql })") # skills.pluck(:skillable_id)
  end

  def most_matched_vacancies
    skills = Skill.select('skillable_id, array_agg(skill_names.name) AS employee_skills')
    skills = skills.joins(:skill_name)
    skills = skills.where(skillable_type: Vacancy)
    skills = skills.group(:skillable_id)

    skills = Skill.from("(#{ skills.to_sql }) AS skills")
    skills = skills.where(
      "employee_skills::text[] @> ARRAY[?]", self.skill_list
    )

    skills = Skill.select(:skillable_id).from("(#{ skills.to_sql }) AS skills")
    Vacancy.where("id IN (#{ skills.to_sql })")
  end

  private

  def prettify_name!
    self.name = self.name.split(' ').join(' ') if name_changed?
  end

  def create_skills!
    Skill.create_skills_for(self)
  end

  def validate_name
    errors.add(
      :name,
      'must contains only cyrillic letters and spaces'
    ) and return unless self.name.to_s.match(/^[а-яА-ЯёЁ ]+$/)

    errors.add(
      :name,
      'must consist of three words'
    ) and return unless self.name.to_s.split(' ').length == 3
  end

  # FIXME DRY
  def validate_skills
    errors.add(
      :skill,
      'must be at least one'
    ) and return if self.skill_list.length.zero?
  end
end
