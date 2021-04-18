module Api
  module V1
    class GamesController < Api::V1::ApplicationController

      def index
        render json: current_user.games, status: 200
      end
    end
  end
end