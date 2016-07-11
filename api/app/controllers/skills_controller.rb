class SkillsController < ApplicationController
  def index
    skills = ActsAsTaggableOn::Tag.order('name asc').pluck(:name)
    render json: skills
  end
end
