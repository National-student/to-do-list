let elForm = document.querySelector('.form')
let elInput = document.querySelector('.form_input')
let elList = document.querySelector('.section_list')
let elAllBtn = document.querySelector('.btnAll')
let elComplatedBtn = document.querySelector('.btnComplated')
let elUnComplatedBtn = document.querySelector('.btnUncomplated')
let elControlBtn = document.querySelector('.btn_controls')
let elTemplate = document.querySelector('#template').content

let storage = window.localStorage
let todoStorage = JSON.parse(storage.getItem('todosArray'))
let counterStorage = JSON.parse(storage.getItem('todoCounter'))

let arrayList = todoStorage || []
let count = counterStorage || 0

function allResultFunction() {
    renderTodos(arrayList, elList)
    storage.setItem('todosArray', JSON.stringify(arrayList))
    calculateTodos(arrayList)
}
elForm.addEventListener('submit', evt => {
    evt.preventDefault();

    let todoList = elInput.value.trim()

    if (todoList) {
        let newTodos = {
            id: ++count,
            text: todoList,
            isComplated: false
        }
        storage.setItem('todoCounter', JSON.stringify(count))
        arrayList.unshift(newTodos)
        elInput.value = null
    }
   allResultFunction();

})

function renderTodos(array, wrapper) {
    wrapper.innerHTML = null

    let todoFragment = document.createDocumentFragment()

    array.forEach(item => {
        let todoTemplate = elTemplate.cloneNode(true)

        todoTemplate.querySelector('.todo_text').textContent = item.text
        todoTemplate.querySelector('.checkbox').dataset.todoId = item.id
        todoTemplate.querySelector('.delete_button').dataset.todoId = item.id
        
        if (item.isComplated === true) {
            todoTemplate.querySelector('.checkbox').checked = true
            
        }

        todoFragment.appendChild(todoTemplate)
    })

    wrapper.appendChild(todoFragment)
}
allResultFunction()

elList.addEventListener('click', evt => {
    let checkBoxId = evt.target.matches('.checkbox')
    
    if (checkBoxId) {
        let checkedId = evt.target.dataset.todoId
        
        let foundTodo = arrayList.find(item => item.id == checkedId)
        let foundTodoIndex = arrayList.findIndex(item => item.id == checkedId)
        
        if (!foundTodo.isComplated) {
            foundTodo.isComplated = true
            arrayList[foundTodoIndex].isComplated = true
        } else {
            foundTodo.isComplated = false
            arrayList[foundTodoIndex].isComplated = false
        }

        storage.setItem('todosArray', JSON.stringify(arrayList))
        
    }

    let checkBtn = evt.target.matches('.delete_button')

    if (checkBtn) {
        let checkedId = evt.target.dataset.todoId
        
        let foundTodoIndex = arrayList.findIndex(item => {
            return item.id == checkedId
        })

        arrayList.splice(foundTodoIndex, 1)
       allResultFunction()
    }

})

function calculateTodos(array) {
    let complateTodos = array.filter(item => item.isComplated === true)
    let notComplateTodos = array.filter(item => item.isComplated === false)
    let allTodoList = array.length
    let complateTodoNumber = allTodoList - notComplateTodos.length
    let notComplateTodoNumber = allTodoList - complateTodoNumber

    elAllBtn.textContent = allTodoList
    elComplatedBtn.textContent = complateTodoNumber
    elUnComplatedBtn.textContent = notComplateTodoNumber
}
allResultFunction()