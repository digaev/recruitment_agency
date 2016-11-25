class Employee < ApplicationRecord
  include SkillsUniquer

  STATUS = %w(free busy).freeze

  validates :address, presence: true
  validates :email, presence: true, email: true
  validates :name, presence: true
  validates :phone, presence: true
  validates :salary, numericality: { greater_than: 0 }
  validates :skills, presence: true
  validates :status, inclusion: { in: STATUS }
  validate :validate_name

  before_save :prettify_name!

  scope :vacancies, (lambda do
    joins('INNER JOIN vacancies ON
          vacancies.skills && employees.skills AND NOT
          vacancies.skills @> employees.skills')
  end)

  scope :best_vacancies, (lambda do
    joins('INNER JOIN vacancies ON vacancies.skills @> employees.skills')
  end)

  def vacancies
    Vacancy.employees.where('employees.id = ?', id)
  end

  def best_vacancies
    Vacancy.best_employees.where('employees.id = ?', id)
  end

  private

  def prettify_name!
    self.name = name.split(' ').join(' ') if name_changed?
  end

  def validate_name
    unless name.to_s =~ /^[а-яА-ЯёЁ ]+$/
      errors.add(:name, 'must contains only cyrillic letters and spaces')
    end

    return if name.to_s.split(' ').length == 3
    errors.add(:name, 'must consist of three words')
  end
end
