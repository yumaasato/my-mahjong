class AddPlayersToGame < ActiveRecord::Migration[6.1]
  def change
    add_reference :games, :player, null: false, foreign_key: true
  end
end
