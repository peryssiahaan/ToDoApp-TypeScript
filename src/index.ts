const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")

type Task = {
  id : string,
  title : string,
  isCompleted : boolean,
  createdAt : Date
}

const tasks : Task[] = getTasks()
tasks.forEach(addItemTask)


form?.addEventListener("submit", (e) => {
  e.preventDefault()
  if(input?.value == "" || input?.value == null) return

  const task : Task= {
    id  : randomId(),
    title : input.value,
    isCompleted : false,
    createdAt : new Date()
  }
  tasks.push(task)
  saveTasks()
  addItemTask(task)
  input.value = ""
})

function randomId() : string {
  return "" + Date.now() + Math.floor(Math.random() * 10)
}

function addItemTask(task : Task) : void {
  const item = document.createElement("li")
  item.classList.add("list-group-item")
  const checkBox = document.createElement("input")
  const label = document.createElement("label")
  label.classList.add("form-check-label")
  checkBox.classList.add("form-check-input")
  checkBox.type = "checkbox"
  checkBox.checked = task.isCompleted
  checkBox.addEventListener("change", () => {
    task.isCompleted = checkBox.checked
    saveTasks()
  })
  label.append(checkBox,task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks(){
  localStorage.setItem("TASKS",JSON.stringify(tasks))
}

function getTasks() : Task[]{
  const preLoad = localStorage.getItem("TASKS")
  if(preLoad == null) return []
  return JSON.parse(preLoad)
}