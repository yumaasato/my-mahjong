class GameGrade < ApplicationRecord
  belongs_to :game
  belongs_to :user
  belongs_to :player

  def self_grade
    # @game_grades = Game.find(params[:id]).game_grades.order(:score)
    # @game_grades.first
    # @game_grades.second
    # @game_grades.third
    # @game_grades.last


  end
end
