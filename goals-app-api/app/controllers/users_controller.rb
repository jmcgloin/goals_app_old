class UsersController < ApplicationController

		before_action :set_user, only: [:show, :update, :destroy]
	
		def create #register
			user = User.new(user_params)
			if user.save
				session[:username] = user.name
				session[:id] = user.id
				render json: user, status: 200
			else
				render json: {error: user.errors.full_message}, status: 460
			end

		end

		def update
			if @user.update(user_params)
				session[:user] = @user
				render json: @user, status: 200
			else
				render json: {error: 'update failed'}, status: 470
			end
		end
	
		def show
			if  @user
				render json: @user, include: :goals, status: 200
			else
				render json: {error: 'user dne'}, status: 450
			end
		end
	
		def destroy
			@user.destroy
		end
	
		private
	
		def user_params
			params.require(:user).permit(:username, :password, :email)
		end
	
		def set_user
			@user = User.find_by_id(params[:id])
		end
	
end
