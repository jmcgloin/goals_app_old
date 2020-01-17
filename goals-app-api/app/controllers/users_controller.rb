class UsersController < ApplicationController

		before_action :set_user, only: [:show, :update, :destroy]
	
		def create
			@user = User.create(user_params)
		end

		def update
			if @user.update(user_params)
				render json: @user, status: 200
			else
				render json: { error: @user.errors.full_messages, status: 400 } #set code for user update failed
			end
		end
	
		def show
			if  @user
				render json: @user, status: 200
			else
				render json: { error: @user.errors.full_messages, status: 400 } #set code for user dne
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
