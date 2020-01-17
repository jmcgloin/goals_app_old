document.addEventListener('DOMContentLoaded', () => {
	isLoggedIn().then(rj => rj.logged == 'false' ? logIn() : u = new User(rj.username))
})

const getUser = () => {
	fetch('http://localhost:3000/users/2')
		.then(r => r.json())
		.then(rj => displayUserInfo(rj))
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

const logIn = () => {
	const logInDiv = document.getElementById('login')
	logInDiv.classList.remove('hidden')
}

const isLoggedIn = () => {
	return fetch('http://localhost:3000/session')
		.then(r => r.json())
}

class User {
	constructor(username) {
		this.username = username
	}

}

class Session {
	constructor(user) {
		this.user = user
	}
}