class AddUsersToPlayer < ActiveRecord::Migration[6.0]
  def change
    add_reference :players, :user, null: false, foreign_key: true
  end
end
