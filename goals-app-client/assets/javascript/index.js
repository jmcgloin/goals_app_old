/*
TODO:

x1. on load, check if there is an active session (only work with no active session for now)
2. after verifying no session, show the register/login screen (register done, work with login)
create login form
3. show login form
4. upon completion of form, post to session#create to auth user (check that exists for now)

*/

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('register-form').addEventListener('submit', registerUser)
	isLoggedIn()
})

class User {
	constructor(username, email) {
		this.username = username
		this.email = email
		this.password = null
	}

	showInfo() {

	}

}

const isLoggedIn = () => {
	fetch('http://localhost:3000/session')
		.then(r => r.json())
		.then(rj => {
			if(rj.logged == 'false') {
				showLogInRegister()
			} else {
				//stuff to do if logged in
			}
		})
}

const showLogInRegister = () => {
	const logInRegisterDiv = document.getElementById('login-register')
	logInRegisterDiv.classList.remove('hidden')
}

const registerUser = (e) => {
	e.preventDefault()
	const user = new User(e.target[name='username'].value, e.target[name='email'].value)
	user.password = e.target[name='password'].value
	clearFields(e.target.getElementsByTagName('input'))
	fetch('http://localhost:3000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(r => r.json())
		.then(rj => console.log(rj))
}

const displayUserInfo = (info) => {
	if(info.error) {
		console.log('Problem!')
		return
	}
	const infoDiv = document.getElementById('user-info')
	const userDiv = document.getElementById('user-home')
	userDiv.classList.remove('hidden')
	infoDiv.innerHTML = `<h1>Welcome, ${info.username}</h1>`
	// console.log(info)
}



const createUser = (info) => {
	const user = new User(info.username, info.goals)
}

const updateUser = (newInfo) => {
	fetch('http://localhost:3000/users/1', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newInfo)
	})
		.then(r => r.json())
		.then(rj => console.log(rj))
}

const clearFields = (collection) => {
	Array.from(collection).forEach(input => input.value = input.type != 'submit' ? '' : 'Register')
}