class SessionController < ApplicationController
	def show
		# session[:username] = 'Jason'
		if session[:username]
			render json: {logged: 'true', username: session[:username]}, status: 200
		else
			render json: {logged: 'false'}, status: 200
		end
	end

	def create
		session[:username] = params[:username] # check what to do here
		render json: {message: 'success'}, status: 200
	end
end
