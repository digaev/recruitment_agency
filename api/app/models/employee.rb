class Employee < ActiveRecord::Base
  acts_as_taggable_on :skills

  STATUS = ['free', 'busy']

  attr_accessible :address, :email, :name, :phone, :salary, :status, :skill_list

  before_save :prettify_name!

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

  def vacancies
    Vacancy.tagged_with(self.skills, on: :skills, any: true)
  end

  def most_matched_vacancies
    Vacancy.tagged_with(self.skills, on: :skills, match: true)
  end

  private

  def prettify_name!
    self.name = self.name.split(' ').join(' ') if name_changed?
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
