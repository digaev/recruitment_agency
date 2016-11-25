class Vacancy < ApplicationRecord
  include SkillsUniquer

  validates :address, presence: true
  validates :salary, numericality: { greater_than: 0 }
  validates :skills, presence: true
  validates :title, presence: true
  validate :validate_expire_at

  scope :employees, (lambda do
    joins('INNER JOIN employees ON
          employees.skills && vacancies.skills AND NOT
          employees.skills @> vacancies.skills')
  end)

  scope :best_employees, (lambda do
    joins('INNER JOIN employees ON employees.skills @> vacancies.skills')
  end)

  def employees
    Employee.vacancies.where('vacancies.id = ?', id)
  end

  def best_employees
    Employee.best_vacancies.where('vacancies.id = ?', id)
  end

  private

  def validate_expire_at
    if expire_at.blank? || expire_at.to_date.blank?
      errors.add(:expire_at, 'should be a valid date')
      return
    end

    return if expire_at.to_date > Date.today
    errors.add(:expire_at, 'can not be in past')
  end
end
