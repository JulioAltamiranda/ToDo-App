// ================ VARIABLES ================
let csrfToken = document.querySelector("input[name='_token']").value
let modalContainer = document.querySelector('.modal-container')
let todoList = document.querySelector('.todo-list')
let formTodo = document.querySelector('.form-todo')
let loaderContainer = document.querySelector('.loader-container')
let alert = document.querySelector('.alert');
let alertMessage = alert.querySelector('.alert-message')
let alertIcon = alert.querySelector('.alert-icon')
let icon = alertIcon.querySelector('i')
let showBy = ''
let currentPage = 1
let statusTodo = ''
let url = `/todos?page=${currentPage}&status=${statusTodo}`


// ================ ADD EVENT LISTENERS ================
document.addEventListener("DOMContentLoaded", getTodos(url));

document.addEventListener('click', async function (e) {
    let btnTag;
    let btnEditTodo;
    let btnDeleteTodo;
    let todoIconPending;
    let todoIconCompleted;
    //open modal
    if (e.target.closest('.btn-open-modal')) {
        openModal('create')
    }
    //close modal
    if (e.target.closest('.btn-close-modal')) {
        closeModal()
    }
    //open modal for edit todo
    if (btnEditTodo = e.target.closest('.btn-edit-todo')) {
        let data = {
            'id': btnEditTodo.dataset.id,
            'name': btnEditTodo.dataset.name,
            'description': btnEditTodo.dataset.description
        }
        openModal('edit', data)
    }
    //delete todo
    if (btnDeleteTodo = e.target.closest('.btn-delete-todo')) {
        deleteTodo(btnDeleteTodo.dataset.id)
    }


    //=== PAGINATION ===

    //prev page
    if (e.target.closest('.btn-prev.enabled')) {
        currentPage--
        setUrl(currentPage, statusTodo)
        getTodos(url)
    }
    //next page
    if (e.target.closest('.btn-next.enabled')) {
        currentPage++
        setUrl(currentPage, statusTodo)
        getTodos(url)
    }
    //=== PAGINATION END ===

    //remove tag
    if (btnTag = e.target.closest('.tag')) {
        removeTag(btnTag)
    }
    //change status todo
    if (todoIconPending = e.target.closest('.todo-icon-pending')) {
        changeStatus(todoIconPending.dataset.id)
    }
    if (todoIconCompleted = e.target.closest('.todo-icon-completed')) {
        changeStatus(todoIconCompleted.dataset.id)
    }
    //close alert
    if (e.target.closest('.alert-btn-close i')) {
        closeAlert()
    }

})

document.addEventListener('submit', async function (e) {
    e.preventDefault()
    let todoId = formTodo.querySelector("input[name='todo-id']").value
    let name = formTodo.querySelector("input[name='name']").value
    let description = formTodo.querySelector("textarea[name='description']").value
    let data = {
        'name': name,
        'description': description
    }
    if (name == '' || description == '') {
        openAlert('danger', 'Name and description is required!')
        return false
    }

    if (!todoId) {
        addTodo(data)
    } else {
        editTodo(data, todoId)
    }
})

document.addEventListener('change', async function (e) {
    let selectShowBy;
    if (selectShowBy = e.target.closest('#showby')) {
        setShowBy(selectShowBy.value)
        setStatusTodo(selectShowBy.value)
        setUrl(currentPage, statusTodo)
        updateTag(statusTodo)
        getTodos(url)
    }
})



// ================ FUNCTIONS ================
function loadTodos(json) {
    let row = ``
    json.data.forEach(todoItem => {
        row += todoItemTemplate(todoItem)
    })
    todoList.innerHTML = ''
    todoList.innerHTML = row

    if (row == '') {
        let newDiv = document.createElement("div");
        newDiv.style.fontSize = '15px'
        let text = document.createTextNode("(0) results");
        newDiv.appendChild(text);
        todoList.appendChild(newDiv)
    }
}
function openModal(action, data) {
    formReset()
    switch (action) {
        case 'create':
            modalContainer.classList.add('active')
            modalContainer.querySelector('.modal-title').innerHTML = 'Add todo'
            break;
        case 'edit':
            if (!data) {
                return false
            }
            modalContainer.querySelector('.modal-title').innerHTML = 'Edit todo'
            modalContainer.classList.add('active')
            formTodo.querySelector("input[name='todo-id']").value = data.id
            formTodo.querySelector("input[name='name']").value = data.name
            formTodo.querySelector("textarea[name='description']").value = data.description
            break;
        default:
            return false;
    }

}
function closeModal() {
    modalContainer.classList.remove('active')
}
function openLoader() {
    loaderContainer.style.display = 'flex'
}
function closeLoader() {
    loaderContainer.style.display = 'none'
}
function todoItemTemplate(todoItem) {
    return `
    <div class="todo-item">
        <div class="todo-item-content">
            <div class="todo-icon ${todoItem.status ? 'todo-icon-completed' : 'todo-icon-pending'}" data-id='${todoItem.id}'>
                <i class="fas ${todoItem.status ? 'fa-check' : 'fa-times'}"></i>                                                                        
            </div>
            <div class="todo-item-description">
                <h4>${todoItem.name}</h4>
                <p>${todoItem.description}</p>
            </div>
        </div>
        <div class="todo-icons">
            <a href="javascript:void(0)" class='btn-edit-todo' data-id='${todoItem.id}'
                data-name='${todoItem.name}' data-description='${todoItem.description}'>
                <i class="far fa-edit"></i>
            </a>
            <a href="javascript:void(0)" class='btn-delete-todo' data-id='${todoItem.id}'>
                <i class="fas fa-trash"></i>
            </a>
        </div>
    </div> `
}

function formReset() {
    formTodo.querySelector("input[name='todo-id']").value = ''
    formTodo.querySelector("input[name='name']").value = ''
    formTodo.querySelector("textarea[name='description']").value = ''
}
async function addTodo(data) {
    try {
        const res = await fetch('/todos/store', {
            method: 'post',
            headers: {
                'content-type': 'aplication/json',
                'x-csrf-token': csrfToken
            },
            body: JSON.stringify(data)
        })
        if (!res.ok) {
            throw { status: res.status, statusText: res.statusText }
        }
        getTodos(url)
        openAlert('success', 'successfully added!')
        closeModal()
    } catch (error) {
        console.log(error)
    }

}
async function editTodo(data, todoId) {
    try {
        const res = await fetch(`/todos/edit/${todoId}`, {
            method: 'put',
            headers: {
                'content-type': 'aplication/json',
                'x-csrf-token': csrfToken
            },
            body: JSON.stringify(data)
        })
        if (!res.ok) {
            throw { status: res.status, statusText: res.statusText }
        }
        getTodos(url)
        openAlert('success', 'successfully updated!')
        closeModal()
    } catch (error) {
        console.log(error)
    }
}
async function deleteTodo(todoId) {
    try {
        const res = await fetch(`/todos/delete/${todoId}`, {
            method: 'delete',
            headers: {
                'x-csrf-token': csrfToken
            }
        })
        if (!res.ok) {
            throw {
                status: res.status,
                statusText: res.statusText
            }
        }
        getTodos(url)
        openAlert('success', 'successfully deleted!')
    } catch (error) {
        console.log(error)
    }
}

function pagination(json) {
    let paginationContainer = document.querySelector('.pagination-container')
    let pagination = ``
    if (json.prev_page_url && json.next_page_url) {
        pagination = `
        <div class="pagination">
            <button class="btn-primary btn-icon btn-sm btn-prev enabled">                        
                <i class="fas fa-angle-left right"></i>
                <span>Prev</span>                        
            </button>
            <button class="btn-primary btn-icon btn-sm btn-next enabled">                        
                <span>Next</span>                        
                <i class="fas fa-angle-right left"></i>
            </button>
        </div>
    `
    }
    if (json.prev_page_url && !json.next_page_url) {
        pagination = `
        <div class="pagination">
            <button class="btn-primary btn-icon btn-sm btn-prev enabled">                        
                <i class="fas fa-angle-left right"></i>
                <span>Prev</span>                        
            </button>
            <button class="btn-primary btn-icon btn-sm btn-next disabled">                        
                <span>Next</span>                        
                <i class="fas fa-angle-right left"></i>
            </button>
        </div>
    `}
    if (!json.prev_page_url && json.next_page_url) {
        pagination = `
        <div class="pagination">
            <button class="btn-primary btn-icon btn-sm btn-prev disabled">                        
                <i class="fas fa-angle-left right"></i>
                <span>Prev</span>                        
            </button>
            <button class="btn-primary btn-icon btn-sm btn-next enabled">                        
                <span>Next</span>                        
                <i class="fas fa-angle-right left"></i>
            </button>
        </div>
    `
    }
    paginationContainer.innerHTML = ''
    paginationContainer.innerHTML = pagination
}

async function getTodos(url) {
    openLoader()
    try {
        const res = await fetch(url)
        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        const json = await res.json()
        loadTodos(json)
        pagination(json)
        closeLoader()
    } catch (error) {
        console.log(error)
    }
}
function setUrl(currentPage, statusTodo) {
    url = `/todos?page=${currentPage}&status=${statusTodo}`
}
function removeTag(btnTag) {
    let btnPending = document.querySelector('.tag-pending');
    let btnCompleted = document.querySelector('.tag-completed');
    //check that the two buttons are previously active
    if (btnPending.classList.contains('active') && btnCompleted.classList.contains('active')) {
        btnTag.classList.remove('active')
        setShowBy(btnTag.dataset.status == 0 ? 1 : 0)
        setUrl(currentPage, btnTag.dataset.status == 0 ? 1 : 0)
        getTodos(url)
    }
}
function setShowBy(selectShowBy) {
    document.getElementById('showby').value = selectShowBy
    showBy = selectShowBy
}
function setStatusTodo(status) {
    statusTodo = status
}
function updateTag(status) {
    let btnPending = document.querySelector('.tag-pending');
    let btnCompleted = document.querySelector('.tag-completed');
    if (status == 0) {
        btnCompleted.classList.remove('active')
        btnPending.classList.add('active')
    }
    if (status == 1) {
        btnPending.classList.remove('active')
        btnCompleted.classList.add('active')
    }
    if (status == '') {
        btnCompleted.classList.add('active')
        btnPending.classList.add('active')
    }
}
async function changeStatus(id) {
    try {
        const res = await fetch(`/todos/changeStatus/${id}`)
        if (!res.ok) { throw { status: res.status, statusText: res.statusText } }
        getTodos(url)
        openAlert('success', 'Changes saved!')
    } catch (error) {
        console.log(error)
    }

}
function openAlert(type, message) {
    resetAlert();
    switch (type) {
        case 'success':
            alert.classList.add('active')
            alert.classList.add('alert-success')
            alertIcon.classList.add('icon-success')
            icon.classList.add('fa-check')
            alertMessage.innerHTML = message
            setTimeout(closeAlert, 1500)
            break;
        case 'danger':
            alert.classList.add('active')
            alert.classList.add('alert-danger')
            alertIcon.classList.add('icon-danger')
            icon.classList.add('fa-times')
            alertMessage.innerHTML = message
            setTimeout(closeAlert, 1500)
            break;
        default:
            return false;
    }
}

function closeAlert() {
    alert.classList.remove('active')
}
function resetAlert() {
    alertMessage.innerHTML = ''
    alertIcon.classList.remove('icon-success')
    icon.classList.remove('fa-check')
    alertIcon.classList.remove('icon-danger')
    icon.classList.remove('fa-times')
    alert.classList.remove('alert-danger')
    alert.classList.remove('alert-success')
}

