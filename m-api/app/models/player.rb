class Player < ApplicationRecord
  has_many :game, dependent: :destroy
  validates :name, presence: true
end
