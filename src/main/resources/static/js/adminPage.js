const url = 'http://localhost:8080/admin/rest/users'
const tbody = document.querySelector('tbody')
const newUserTab = document.getElementById('newUserTab')
let result = ''
const modal = new bootstrap.Modal(document.getElementById('userModal'))
const header = document.querySelector('.modal-header')
const body = document.querySelector('.modal-body')
const footer = document.querySelector('.modal-footer')

const mkTable = (users) => {
    users.forEach(user => {
        const userRoles = user.roles.join(' ')
        result += `<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.lastName}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.roles.join(' ')}</td>
                        <td><button type="button" id='edit-${user.id}' class="btn btn-info text-white" 
                                    data-bs-toggle="modal">Edit</button>
                        </td>
                        <td><button type="button" id='delete-${user.id}' class="btn btn-danger" 
                        data-bs-toggle="modal">Delete</button>
                        </td>
                   </tr>`
    });
    tbody.innerHTML = result
    result = ''

    users.forEach(user => {
        initEditModal(user)
        initDeleteModal(user)
    })
}

const newUser = () => {
    newUserTab.innerHTML = `<form id="newUserForm" class="mx-auto text-center fw-bold">
                                <label for="firstName">First Name</label>
                                <input class="form-control mb-3" name="name" type="text" id="firstName"/>
                                <label for="lastName">Last Name</label>
                                <input class="form-control mb-3" name="lastName" type="text" id="lastName"/>
                                <label for="username">Username</label>
                                <input class="form-control mb-3" name="username" type="text" id="username"/>
                                <label for="email">Email</label>
                                <input class="form-control mb-3" name="email" type="email" id="email"/>
                                <label for="password">Password</label>
                                <input class="form-control mb-3" name="password" type="password" id="password"/>
                                <label for="roles">Role</label>
                                <select class="form-select mb-3" name="roles" size="2" id="roles" multiple>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="USER">USER</option>
                                </select>
                                <button type="submit" class="btn btn-success btn-lg mb-3">Add new user</button>
                            </form>`
    const form = document.getElementById('newUserForm')
    form.addEventListener('submit', saveUser)
    const rolesSelect = document.getElementById('roles')

    async function saveUser(event) {
        event.preventDefault()
        const user = {
            id: '',
            name: form.name.value,
            username: form.username.value,
            lastName: form.lastName.value,
            email: form.email.value,
            password: form.password.value,
            roles: Array.from(rolesSelect.selectedOptions).map(option => option.value)
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (response.ok) {
            initUsersTable()
            newUser()
            const someTabTriggerEl = document.querySelector('[data-bs-target="#usersTable"]')
            let tab = new bootstrap.Tab(someTabTriggerEl)
            tab.show()
        } else {
            console.error('Failed to create user')
        }
    }
}

function initEditModal(user) {
    const btnEdit = document.getElementById(`edit-${user.id}`)
    btnEdit.onclick = function () {
        header.innerHTML = `<h1 class="modal-title fs-5">Edit user</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>`
        body.innerHTML = `<form class="w-50 mx-auto fw-bold" id="editForm">
                                <label for="id">ID</label>
                                <input class="form-control mb-3" name="id" type="text" id="id" 
                                       value="${user.id}" disabled readonly/>
                                <label for="firstName">First Name</label>
                                <input class="form-control mb-3" name="name" type="text" id="firstName" 
                                       value='${user.name}'/>
                                <label for="lastName">Last Name</label>
                                <input class="form-control mb-3" name="lastName" type="text" id="lastName" 
                                       value='${user.lastName}'/>
                                <label for="username">Username</label>
                                <input class="form-control mb-3" name="username" type="text" id="username" 
                                       value='${user.username}'/>
                                <label for="email">Email</label>
                                <input class="form-control mb-3" name="email" type="email" id="email" 
                                       value='${user.email}'/>
                                <label for="password">Password</label>
                                <input class="form-control mb-3" name="password" type="password" id="password"/>
                                <label for="roles">Role</label>
                                <select class="form-select mb-3" name="roles" size="2" id="roles" multiple>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="USER">USER</option>
                                </select>`
        footer.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" form="editForm" class="btn btn-primary">Edit</button>`
        const form = document.getElementById('editForm')
        const rolesSelect = document.getElementById('roles')
        form.addEventListener('submit', editUser)
        modal.show()

        async function editUser(event) {
            event.preventDefault()
            const user = {
                id: form.id.value,
                name: form.name.value,
                username: form.username.value,
                lastName: form.lastName.value,
                email: form.email.value,
                password: form.password.value,
                roles: Array.from(rolesSelect.selectedOptions).map(option => option.value)
            }
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                modal.hide()
                initUsersTable()
            } else {
                console.error('Failed to update user')
            }
        }
    }
}

function initDeleteModal(user) {
    const btnDelete = document.getElementById(`delete-${user.id}`)
    btnDelete.onclick = function () {
        header.innerHTML = `<h1 class="modal-title fs-5">Delete user</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>`
        body.innerHTML = `<form class="w-50 mx-auto fw-bold" id="deleteForm">
                                <label for="id">ID</label>
                                <input class="form-control mb-3" name="id" type="text" id="id" 
                                       value="${user.id}" disabled/>
                                <label for="firstName">First Name</label>
                                <input class="form-control mb-3" name="name" type="text" id="firstName" 
                                       value='${user.name}' disabled/>
                                <label for="lastName">Last Name</label>
                                <input class="form-control mb-3" name="lastName" type="text" id="lastName" 
                                       value='${user.lastName}' disabled/>
                                <label for="username">Username</label>
                                <input class="form-control mb-3" name="username" type="text" id="username" 
                                       value='${user.username}' disabled/>
                                <label for="email">Email</label>
                                <input class="form-control mb-3" name="email" type="email" id="email" 
                                       value='${user.email}' disabled/>
                                <label for="roles">Role</label>
                                <select class="form-select mb-3" name="roles" size="2" id="roles" disabled>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="USER">USER</option>
                                </select>`
        footer.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" form="deleteForm" class="btn btn-danger">Delete</button>`
        const form = document.getElementById('deleteForm')
        form.addEventListener('submit', deleteUser)
        modal.show()

        async function deleteUser(event) {
            event.preventDefault()
            const response = await fetch(url + `/${user.id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                modal.hide()
                initUsersTable()
            } else {
                console.error('Failed to delete user')
            }
        }
    }
}


const initUsersTable = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            mkTable(data)
        })
        .catch(error => console.log(error))
}

document.addEventListener('DOMContentLoaded', () => {
                            newUser()
                            initUsersTable()
})