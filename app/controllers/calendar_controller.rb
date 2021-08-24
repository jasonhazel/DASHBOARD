# this will probably go away
class CalendarController < ApplicationController
  def index
    respond_to do |format|
      format.html { }
      format.json { render json: Calendar.call, status: :ok }
    end
  end
end