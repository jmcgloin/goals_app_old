document.addEventListener('DOMContentLoaded', () => {
	isLoggedIn()
	// updateUser({username: 'Jason', id: 1})
})

const getUser = () => {
	fetch('http://localhost:3000/users/2')
		.then(r => r.json())
		.then(rj => displayUserInfo(rj))
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

const showLogIn = () => {
	const logInDiv = document.getElementById('login')
	logInDiv.classList.remove('hidden')
}

const isLoggedIn = () => {
	fetch('http://localhost:3000/session')
		.then(r => r.json())
		.then(rj => {
			if(rj.logged == 'false') {
				showLogIn()
			} else {
				console.log(rj)
				createUser(rj)
			}
		})
}

const createUser = (info) => {
	const user = new User(info.username, info.goals)
}

class User {
	constructor(username, goals) {
		this.username = username
		this.goals = goals
	}

	showInfo() {

	}

}