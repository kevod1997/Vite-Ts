import './style.css'
import {v4} from 'uuid'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const taskForm = document.querySelector<HTMLFormElement>('#taskForm')
const taskList = document.querySelector<HTMLDivElement>('#tasksList')

interface Task {
  id: string,
  title: string,
  description: string
}

let tasks: Task[] = []

taskForm?.addEventListener('submit', e => {
  e.preventDefault()
  
   const title = taskForm['title'] as unknown as HTMLInputElement

   const description = taskForm['description'] as unknown as HTMLTextAreaElement

    tasks.push({
      title: title.value,
      description: description.value,
      id: v4()
    })

localStorage.setItem('tasks', JSON.stringify(tasks))

Toastify({
  text: 'Task saved',
  duration: 3000,
  close: true,
  gravity: 'top',
  position: 'center',
  backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
}).showToast()

renderTask(tasks)

taskForm.reset()
title.focus()

})

document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  renderTask(tasks)
  // console.log(tasks)
})

function renderTask(tasks: Task[]){

  taskList!.innerHTML = ''

  tasks.forEach(task => {
    const taskElement = document.createElement('div')
    taskElement.className = 'bg-zinc-800 mb-1 p-4 rounder-lg hover:cursor-pointer'
    const header = document.createElement('header')
    header.className = 'flex justify-between'

    const title = document.createElement('span')
    title.innerText = task.title

    const btnDelete = document.createElement('button')
    btnDelete.innerText = 'Delete'
    btnDelete.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md float-right'

    btnDelete.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      renderTask(tasks)
    })

    header.append(title)
    header.append(btnDelete)
    
    
    const description = document.createElement('p')
    description.innerText = task.description

    taskElement.append(header)
    taskElement.append(description)

    const id = document.createElement('p')
    id.innerText = task.id
    id.className = 'text-gray-400 text-xs'
    taskElement.append(id)

    taskList?.append(taskElement)
})
}


