module Api
  module V1
    class PlayersController < ApplicationController
      before_action :set_player, only: %i[show update destroy]

      def index
        players = Player.order(created_at: :desc)
        render json: { status: 'SUCCESS', message: 'Loaded players', data: players }
      end

      def show
        render json: { status: 'SUCCESS', message: 'Loaded the player', data: @player }
      end

      def create
        @player = Player.new(player_params)
        # playerにはuser_idが必要なのでcurrent_user.idを振り当てる
        @player.user_id = current_user.id
        if @player.save
          render json: { status: 'SUCCESS', data: @player }
        else
          render json: { status: 'ERROR', data: @player.errors }
        end
      end

      def destroy
        # binding.irb
        if @player.destroy
          render json: { status: 'SUCCESS', message: 'Deleted the player', data: @player }
        else
          render json: { status: 'ERROR', message: 'Not deleted', data: @player.errors }
        end
      end

      def update
        if @player.update(player_params)
          render json: { status: 'SUCCESS', message: 'Updated the player', data: @player }
        else
          render json: { status: 'ERROR', message: 'Not updated', data: @player.errors }
        end
      end

      def set_player
        @player = Player.find(params[:id])
      end

      def player_params
        params.require(:player).permit(:name)
      end
    end
  end
end
