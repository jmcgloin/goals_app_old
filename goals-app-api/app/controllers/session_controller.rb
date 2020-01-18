class SessionController < ApplicationController
	def show
		binding.pry()
		# session[:username] = 'Jason'
		# reset_session
		if session[:username]
			render json: {logged: 'true', username: session[:username], id: session[:id]}, status: 200
		else
			render json: {logged: 'false'}, status: 200
		end
	end

	def create #log in
		user = User.find_by(username: session_params[:username])
		if user
			session[:username] = user.username
			session[:id] = user.id
			render json: user, status: 200
		else
			render json: {error: 'user dne'}, status: 450
		end
	end

	def destroy
		reset_session
		render json: {logged: 'false'}, status: 200
	end

	def session_params
		params.require(:session).permit(:username, :password, :email)
	end
end
