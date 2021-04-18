Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :players
      resources :games, only: %i(index)
        namespace 'auth' do
          post 'users' => 'users#create'
          get 'users' => 'users#index'
        end
    end
  end
end
