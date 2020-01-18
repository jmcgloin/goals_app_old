/*

1. replace/accompany page-action with class for each role
a. login
b. register
c. user
d. goal
e. step
2. rewrite showOnly to hide/show based on these

*/

document.addEventListener('DOMContentLoaded', () => {
	let user = undefined
	document.getElementById('register-form').addEventListener('submit', registerUser)
	document.getElementById('login-form').addEventListener('submit', logInUser)
	document.querySelectorAll(["[name=existing-or-new]"])
		.forEach(sel => sel.addEventListener('click', showForm))
	document.getElementById('logout').addEventListener('click', logOutUser)
	isLoggedIn()
})

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
				// showOnly([(document.getElementById('login-register')).id])
				showOnly('login-register')
				// document.getElementById('logout').classList.add('hidden')
			} else {
				// document.getElementById('logout').classList.remove('hidden')
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
	showOnly('user-home')
	const userInfoDiv = document.getElementById('user-home')
	const username = info.username
	const goals = info.goals
	let displayHTML = `<h1>Hello, ${username}!</h1><h2>Here are your goals:</h2><ul>`
	if(goals > 0) {
		goals.forEach(goal => displayHTML += `<li>${goal.goalname}</li>`)
		displayHTML += '</ul>'
	} else {
		displayHTML += '<li>Add a new goal!</li></ul>'
	}
	userInfoDiv.innerHTML = displayHTML
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

const logOutUser = (e) => {
	e.preventDefault()
	console.log('logging out...')
	if(sessionStorage.getItem('user')) {
		console.log('still logging...')
		fetch('http://localhost:3000/session', {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
	      "Accept": "application/json"
			}
		})
		.then(r => r.json())
		.then(rj => console.log(rj.logout))
	}
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