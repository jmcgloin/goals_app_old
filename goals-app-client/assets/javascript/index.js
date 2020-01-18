/*
local storage/session storage for saving user info
look into google's js oauth
TODO:
1. user crud
X	a. create user
	aa. save user to cookies
	b. show existing user
	c. update user info
	d. delete user
2. link to create goals and steps
3. after this, move on to the goals controller


*/

document.addEventListener('DOMContentLoaded', () => {
	let user = undefined
	document.getElementById('register-form').addEventListener('submit', registerUser)
	document.getElementById('login-form').addEventListener('submit', logInUser)
	document.querySelectorAll(["[name=existing-or-new]"])
		.forEach(sel => sel.addEventListener('click', showForm))
	document.getElementById('logout').addEventListener('submit', logOutUser)
	isLoggedIn()
})

// class User { //look into getting rid of this and do it for goals
// 	constructor(info) {
// 		this.username = info.username
// 		this.email = info.email
// 		this.password = info.password
// 		this.goals = info.goals || undefined
// 	}
// 	showInfo() {

// 	}
// 	static createUser(info, e = undefined) {
// 		if(e) clearFields(e.target);
// 		//store the user in the cookies
// 		return new User(info)
// 	}

// }

// const User = (info) => {
// 	return {

// 	}
// }

const isLoggedIn = () => { //look into putting this in an adapter
	console.log('checking log')
	fetch('http://localhost:3000/session', {
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
      "Accept": "application/json"
		}
	})
		.then(r => r.json())
		.then(rj => {
			console.log('rj is: ',rj)
			if(rj.logged === 'false') {
				showOnly([(document.getElementById('login-register')).id])
			} else {
				sessionStorage.setItem('user', JSON.stringify(rj))
				console.log(sessionStorage.getItem('user'))
				// how to use local storage to log out (expiration)
			}
		})
}

const registerUser = (e) => { //look into putting this in an adapter
	e.preventDefault()
	const user = {
		username: e.target[name='reg-username'].value,
		email: e.target[name='reg-email'].value,
		password: e.target[name='reg-password'].value
	}
	console.log(user)
	clearFields(e.target)
	fetch('http://localhost:3000/users', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
      "Accept": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then(r => r.json())
		.then(rj => {
			sessionStorage.setItem('user', JSON.stringify(rj))
			showUserInfo(rj)
		})
}

const logInUser = (e) => {
	e.preventDefault()
	const user = {
		username: e.target[name='log-username'].value,
		password: e.target[name='log-password'].value
	}
	console.log(user)
	clearFields(e.target)
	//post this to session#create
	fetch('http://localhost:3000/login', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
      "Accept": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then(r => r.json())
		.then(rj => {
			console.log(rj)
			sessionStorage.setItem('user', JSON.stringify(rj))
			showUserInfo(rj)
		})
}

const showUserInfo = (info) => {
	// show the user info
}

const updateUser = (newInfo) => {
	fetch('http://localhost:3000/users/1', {
		method: 'PATCH',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
      "Accept": "application/json"
		},
		body: JSON.stringify(newInfo)
	})
		.then(r => r.json())
		.then(rj => console.log(rj))
}


//helpers
const clearFields = (target) => {
	Array.from(target.getElementsByTagName('input'))
		.forEach(input => input.value = input.type != 'submit' ? '' : input.value)
}

const showForm = (e) => {
	const form = document.getElementById(`${e.target.id}-form`)
	const parentId = form.parentElement.id
	showOnly([form.id, parentId])
}

const showOnly = (elementsIds) => {
	Array.from(document.getElementsByClassName('page-action'))
		.forEach(el => {
			elementsIds.includes(el.id) ? el.classList.remove('hidden') : el.classList.add('hidden')
		})
}