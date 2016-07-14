class SkillsController < ApplicationController
  def index
    skills = SkillName.order(:name).pluck(:name)
    render json: skills
  end
end
