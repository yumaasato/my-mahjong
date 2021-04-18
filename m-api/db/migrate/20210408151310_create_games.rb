class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :name, default: ""
      t.integer :rank_point, array: true

      t.timestamps
    end
  end
end
