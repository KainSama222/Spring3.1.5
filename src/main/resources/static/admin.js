const url = 'http://localhost:8080/restAdmin';

getAllUsers();

async function getAllUsers() {
    setTimeout(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                fillTable(data)
            })
    }, 200)
}

function fillTable(users) {
    let result = '';
    for (let user of users) {
        result +=
            `<tr>
        <th><p>${user.id}</p></th>
        <th><p>${user.firstName}</p></th>
        <th><p>${user.lastName}</p></th>
        <th><p>${user.username}</p></th>
        <th><p>${user.roles.map(r => r.name).join(' ')}</p></th>
        <th>
            <button class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onclick="event.preventDefault(); editModal(${user.id})">
                Edit
            </button>
            <button class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#delModal"
                    onclick="event.preventDefault(); delModal(${user.id})">
                Delete
            </button>

        </th>
    </tr>`
    }
    document.getElementById('adminTableBody').innerHTML = result;
}


function editModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(u => {
            document.getElementById('editId').value = u.id;
            document.getElementById('editFirstName').value = u.firstName;
            document.getElementById('editLastName').value = u.lastName;
            document.getElementById('editEmail').value = u.username;
            document.getElementById('editPassword').value = "****";
            document.getElementById('editRoles').selectedIndex = u.roles;
        })
    });
}

async function editUser() {
    const form_ed = document.getElementById('editModalForm');
    let id = document.getElementById("editId").value;
    let firstName = document.getElementById("editFirstName").value;
    let lastName = document.getElementById("editLastName").value;
    let email = document.getElementById("editEmail").value;
    let password = document.getElementById("editPassword").value;
    let roles = [];
    for (let i = 0; i < form_ed.roles.options.length; i++) {
        if (form_ed.roles.options[i].selected) {
            let tmp = {};
            tmp["id"] = form_ed.roles.options[i].value
            roles.push(tmp);
        }
    }
    let user = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        username: email,
        password: password,
        roles: roles
    }
    await fetch(url, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(() => {

        $('#editModal').modal('hide');
        getAllUsers();
    })
}

function delModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
        .then(res => {
            res.json().then(u => {

                document.getElementById('delId').value = u.id;
                document.getElementById('delFirstName').value = u.firstName;
                document.getElementById('delLastName').value = u.lastName;
                document.getElementById('delEmail').value = u.username;
                document.getElementById('delPassword').value = "****";
                document.getElementById('delRoles').selectedIndex = u.roles;

            })
        });
}

async function deleteUser() {
    let id = document.getElementById("delId").value;
    let firstName = document.getElementById("delFirstName").value;
    let lastName = document.getElementById("delLastName").value;
    let email = document.getElementById("delEmail").value;
    let password = document.getElementById("delPassword").value;
    let roles = $('#delRoles').val();

    let user = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        username: email,
        password: password,
        roles: roles
    };

    await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(() => {

        $('#delModal').modal('hide');
        getAllUsers()
    })
}

async function addUser() {
    const form_ed = document.getElementById('addForm');
    let addFirstName = document.getElementById("addFirstName").value;
    let addLastName = document.getElementById("addLastName").value;
    let addEmail = document.getElementById("addEmail").value;
    let addPassword = document.getElementById("addPassword").value;
    let addRoles = [];
    for (let i = 0; i < form_ed.roles.options.length; i++) {
        if (form_ed.roles.options[i].selected) {
            let tmp = {};
            tmp["id"] = form_ed.roles.options[i].value
            addRoles.push(tmp);
        }
    }
    let user = {
        firstName: addFirstName,
        lastName: addLastName,
        username: addEmail,
        password: addPassword,
        roles: addRoles
    }
    await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(() => {
        clearAndHideAddForm();
        getAllUsers()
    })
}

function clearAndHideAddForm() {
    document.getElementById("addFirstName").value = "";
    document.getElementById("addLastName").value = "";
    document.getElementById("addEmail").value = "";
    document.getElementById("addPassword").value = "";
    document.getElementById("addRoles").value = "option1";
}