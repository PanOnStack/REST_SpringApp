const url = 'http://localhost:8080/users/rest/user'
let tbody = document.querySelector('tbody')

const mkTable = (user) => {
    const userRoles = user.roles.join(' ')
    tbody.innerHTML = `<tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.lastName}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.join(' ')}</td>
               </tr>`
}

const mkNavbar = (user) => {
    const nav = document.getElementById('navInfo')
    nav.innerHTML = `<b>${user.email}</b>
                     <span>&nbsp;with roles: ${user.roles.join(' ')}</span>`
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        mkTable(data)
        mkNavbar(data)

    })
    .catch(error => console.log(error))