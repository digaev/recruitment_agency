class Employee < ApplicationRecord
  STATUS = %w(free busy).freeze

  before_save :prettify_name!

  validates :address, length: { minimum: 10 }
  validates :email, presence: true, email: true
  validates :name, length: { minimum: 5 }
  validates :phone, presence: true
  validates :salary, numericality: { greater_than: 0 }
  validates :skills, presence: true
  validates :status, inclusion: { in: STATUS }

  validate :validate_name

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
