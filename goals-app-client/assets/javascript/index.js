/*
TODO:

x1. on load, check if there is an active session (only work with no active session for now)
X2. after verifying no session, show the register/login screen
(register done, work with login)
create login form
X3. show login form
4. upon completion of form, post to session#create to auth user (check that exists for now)

*/

document.addEventListener('DOMContentLoaded', () => {
	let user = undefined
	document.getElementById('register-form').addEventListener('submit', registerUser)
	document.getElementById('login-form').addEventListener('submit', logInUser)
	document.querySelectorAll(["[name=existing-or-new]"])
		.forEach(sel => sel.addEventListener('click', showForm))
	isLoggedIn()
})

class User {
	constructor(info) {
		this.username = info.username
		this.email = info.email
		this.password = info.password
		this.goals = info.goals || undefined
	}
	showInfo() {
	}
	static createUser(info, e = undefined) {
		if(e) clearFields(e.target);
		return new User(info)
	}
}

const isLoggedIn = () => {
	fetch('http://localhost:3000/session')
		.then(r => r.json())
		.then(rj => {
			if(rj.logged == 'false') {
				showOnly([(document.getElementById('login-register')).id])
			} else {
				//stuff to do if logged in
			}
		})
}

const registerUser = (e) => {
	e.preventDefault()
	const user = User.createUser({
		username: e.target[name='reg-username'].value,
		email: e.target[name='reg-email'].value,
		password: e.target[name='reg-password'].value,
	})
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

const logInUser = (e) => {
	e.preventDefault()
	const user = new User({
		username: e.target[name='reg-username'].value,
		email: e.target[name='reg-email'].value,
		password: e.target[name='reg-password'].value,
	})
	clearFields(e.target.getElementsByTagName('input'))
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


//helpers
const clearFields = (target) => {
	Array.from(target.getElementsByTagName('input'))
		.forEach(input => input.value = input.type != 'submit' ? '' : 'Register')
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