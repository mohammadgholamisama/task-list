let $ = document

const inputElem = $.querySelector('.task-input')
const addTasKBtn = $.querySelector('.add-task-btn')
const tasksContainer = $.querySelector('.task-list')
const notFoundTask = $.querySelector('.not-task')
const taskHeaderDate = $.querySelector('.task-header__date')
const taskCount = $.querySelector('.task-header__tools-count')
const clearAllTask = $.querySelector('.clear-tasks')

let date = new Date()
taskHeaderDate.innerHTML = date.toDateString()

let taskArray = []

let isTask = (taskArray) => {
    if (taskArray.length) {
        notFoundTask.style.display = 'none'
        notFoundTask.style.display = 'none'
        clearAllTask.classList.add('active')
    } else {
        notFoundTask.style.display = 'flex'
        notFoundTask.style.display = 'flex'
        clearAllTask.classList.remove('active')
    }

    taskCount.innerHTML = taskArray.length + ' task'
}

let addTask = () => {

    if (inputElem.value) {
        taskArray.push(inputElem.value)
        inputElem.value = ''

        setLocalStorage(taskArray)
        generateTask(taskArray)
    }

}

let setLocalStorage = (taskArray) => {
    localStorage.setItem('tasks', JSON.stringify(taskArray))
}

let getLocalStorage = () => {
    let localArray = JSON.parse(localStorage.getItem('tasks'))

    localArray ? taskArray = localArray : taskArray = [];

    generateTask(taskArray)
    isTask(taskArray)
    inputElem.focus()

}

let generateTask = (taskArray) => {
    tasksContainer.innerHTML = ''
    taskArray.forEach((task, index) => {
        tasksContainer.insertAdjacentHTML('beforeend', `
        <li class="task-item">
            <span class="task-title">${task}</span>
            <i class="fas fa-remove remove-task__icon" onclick='removeTask(${index})'></i>
        </li>
        `
        )
    });
    isTask(taskArray)
}

let removeTask = index => {
    taskArray.splice(index, 1)
    generateTask(taskArray)
    setLocalStorage(taskArray)
}

clearAllTask.onclick = () => {
    let isClearTask = confirm('Clear all the tasks?')

    if (isClearTask) {
        taskArray = []
        setLocalStorage(taskArray)
        generateTask(taskArray)
    }
}

window.addEventListener('load', getLocalStorage)
addTasKBtn.addEventListener('click', addTask)
inputElem.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        addTask()
    }
})