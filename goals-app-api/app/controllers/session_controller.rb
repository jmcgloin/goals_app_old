class SessionController < ApplicationController
	def show
		# session[:username] = 'Jason'
		if session[:username]
			render json: {logged: 'true', username: session[:username], id: session[:id]}, status: 200
		else
			render json: {logged: 'false'}, status: 200
		end
	end

	def create
		# here i want to log the user in if they exist
		binding.pry()
		session[:username] = params[:username]
		session[:id] = params[:id]
		render json: {message: 'success'}, status: 200
	end

	def destroy
		reset_session
		render json: {logged: 'false'}, status: 200
	end
end
