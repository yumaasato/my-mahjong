module Api
  module V1
    class GameGradeController < ApplicationController
      belongs_to : game

      def index
        @game_grades  = GameGrade.where(game_id : game.id)

        @game_grades.each_with_index(1) do |grade, index|
          "#{index} #{grade.user_name}: #{grade.point}"
        end
      end

      def create
        game_grades = GameGrade.create(game_grade_params)
        if game_grades.save
          render json: { status: 'SUCCESS', data: game_grades }
        else
          render json: { status: 'ERROR', data: game_grades.errors }
        end
      end

      def destroy
        @game_grades.destroy
        render json: { status: 'SUCCESS', message: 'Deleted the game_grade', data: @game_grades }
      end

      def update
        if @game_grades.update(game_grade_params)
          render json: { status: 'SUCCESS', message: 'Updated the game_grade', data: @game_grades }
        else
          render json: { status: 'SUCCESS', message: 'Not updated', data: @game_grades.errors }
        end
      end

      def set_game_grade
        @game_grades = GameGrade.find(params[:id])
      end

      def game_grade_params
        params.require(:game_grade).permit(:point)
      end
    end
  end
end