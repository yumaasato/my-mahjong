module Api
  module V1
    module IndexUserConcern
      extend ActiveSupport::Concern

      def list_user(auth)
        users = User.order(created_at: :desc)
        unless auth[:data]
          return render json: auth, status: :unauthorized 
        end
        uid = auth[:data][:uid]
      end
    end
  end
end