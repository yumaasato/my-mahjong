class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :password_digest
      t.string :name, default: ""
      t.string :email, default: ""
      t.string :uid, null: false, default: ""

      t.timestamps

      t.index :uid, unique: true
    end
  end
end
