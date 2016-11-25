class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound do
    render status: 404, json: { message: 'Record not found.' }
  end

  rescue_from ActiveRecord::RecordInvalid do |error|
    render status: 422, json: error.record.errors.messages
  end
end
