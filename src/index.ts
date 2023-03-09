const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
};

const tasks: Task[] = getTasks();
render();

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null) return;

  const task: Task = {
    id: randomId(),
    title: input.value,
    isCompleted: false,
    createdAt: new Date(),
  };
  tasks.push(task);
  saveTasks();
  render();
  input.value = "";
});

function randomId(): string {
  return "" + Date.now() + Math.floor(Math.random() * 10);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function getTasks(): Task[] {
  const preLoad = localStorage.getItem("TASKS");
  if (preLoad == null) return [];
  return JSON.parse(preLoad);
}

list?.addEventListener("click", (e) => {
  const clickedEl = e.target as HTMLElement;
  if(clickedEl.tagName !== "INDEX") return
  render()
});

function clearList(element:HTMLElement) : void{
  while(element.firstChild){
    element.removeChild(element.firstChild)
  }
}

function render(): void {
  if(list!= null) clearList(list)
  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
      );
      const checkBox = document.createElement("input");
      checkBox.id = task.id;
      const label = document.createElement("label");
      label.classList.add("form-check-label", "flex-fill");
      label.htmlFor = task.id;
      
      const itemDate = document.createElement("small");
      itemDate.classList.add("mx-5");
      itemDate.innerText = new Date(task.createdAt).toLocaleDateString("id-ID", {
        dateStyle: "medium",
      });
      checkBox.classList.add("form-check-input");
      checkBox.type = "checkbox";
      checkBox.checked = task.isCompleted;
      checkBox.addEventListener("change", () => {
        task.isCompleted = checkBox.checked;
        item.style.backgroundColor = (task.isCompleted) ? "lime" : ""
        saveTasks();
    });
    label.append(task.title);
    item.append(label, itemDate, checkBox);
    list?.append(item);
  });
}
