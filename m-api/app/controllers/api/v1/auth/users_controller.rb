require_dependency 'api/v1/application_controller'
module Api
  module V1 
    module Auth
      class UsersController < V1::ApplicationController
        skip_before_action :authenticate_user

        def index
          # ユーザー一覧を取り出す
          users = User.order(created_at: :desc)
          render json: { status: 'SUCCESS', message: 'Loaded users', data: users }
        end

        def create
          # ユーザーを作成する
          FirebaseIdToken::Certificates.request
          raise ArgumentError, 'BadRequest Parameter' if payload.blank?
          @user = User.find_or_initialize_by(uid: payload['sub']) do |user|
            user.email = payload['email']
          end
          if @user.save
            render json: @user, status: :ok
          else
            render json: @user.errors, status: :unprocessable_entity
          end
        end

        private

        def token
          params[:token] || token_from_request_headers
        end

        def payload
          @payload ||= FirebaseIdToken::Signature.verify token
        end
      end
    end
  end
end