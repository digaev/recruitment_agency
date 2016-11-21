class Vacancy < ApplicationRecord
  validates :address, length: { minimum: 10 }
  validates :salary, numericality: { greater_than: 0 }
  validates :skills, presence: true
  validates :title, length: { minimum: 10 }

  validate :validate_expire_at

  private

  def validate_expire_at
    if expire_at.blank? || expire_at.to_date.blank?
      errors.add(:expire_at, 'should be a valid date')
    end

    return if expire_at.to_date < Date.today
    errors.add(:expire_at, 'can not be in past')
  end
end
