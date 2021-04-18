class Game < ApplicationRecord
  validates :players, presence: true, length: { is: 3 }
  validates :score, presence: true, dependent: destroy
  validates :point, presence: true, dependent: destroy
  has_many :game_grades

  # def self_point
  #   @score = [20000, 30000, 10000, 40000]
  #   top = @score.max
  #   last = @score.min

  #   if top
  #     return (@score / 1000) + 50
  #   else last
  #     return (@score / 1000) - 30
  #   else
  #     return (@score / 1000) + 10
  #   end

  # end

end


