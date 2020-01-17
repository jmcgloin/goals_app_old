class User < ApplicationRecord

	has_many :goals
	has_many :steps, through: :goals

	validates :username, :email, presence: true #finish the bcrypt stuff
end
