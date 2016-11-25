class SkillsController < ApplicationController
  def index
    result = ActiveRecord::Base.connection.execute(
      'SELECT unnest(skills) skill FROM employees
      UNION SELECT unnest(skills) skill FROM vacancies
      ORDER BY skill;'
    )
    render json: result.map { |row| row['skill'] }
  end
end
