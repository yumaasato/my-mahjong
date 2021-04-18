class CreateGameGrades < ActiveRecord::Migration[6.0]
  def change
    create_table :game_grades do |t|
      t.references :game, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :player, null: false, foreign_key: true
      t.integer :score
      t.integer :point

      t.timestamps
    end
  end
end
