import { format } from 'date-fns';

const windowPlusIcon = document.querySelector('.add-task-icon');
const addTaskIcon = document.querySelector('#task-add-btn');
const cancelTaskIcon = document.querySelector('#task-cancel-btn');
const taskModal = document.querySelector('#task-modal');

// open task modal
function openTaskModal() {
  taskModal.style.display = 'block';
}

// close task modal
function closeTaskModal() {
  taskModal.style.display = 'none';
}

// close task modal if "outside of task modal" is clicked
function outsideTaskModalClick(e) {
  if (e.target == taskModal) {
    taskModal.style.display = 'none';
  }
}

// this function needs to be called when Add Task form is opened.
function refreshRadioOptions() {
  const projects = JSON.parse(localStorage.getItem('todo-projects'));
  const taskSelectContainer = document.querySelector('#task-project');

  taskSelectContainer.innerHTML = ''; // empty previous options
  if (projects) {
    for (const proj of projects) {
      const option = document.createElement('option');
      option.innerHTML = proj.projectName;
      option.setAttribute('value', proj.projectName);
      taskSelectContainer.appendChild(option);
    }
  }
}

// create task obj, used in assTask() function
// ASSUME we know the correct project.
function createTaskObj(name, date, priority) {
  // projectName needed to know which project we are pushing this task
  let taskObj = {};
  taskObj.taskName = name;
  taskObj.dueDate = date;
  taskObj.priority = priority;
  taskObj.completed = false; // when task is created, it's not done by default
  return taskObj;
}

// reset task modal
function resetTaskForm() {
  const task = document.querySelector('#task-name');
  const date = document.querySelector('#task-due-date');
  const priorities = document.querySelectorAll('input[name="priority"]');
  const selectedDropDown = document.querySelectorAll('#task-project');

  task.value = ''; // reset task name
  date.value = ''; // reset date
  for (const p of priorities) { // uncheck radio buttons
    p.checked = false;
  }
  for (const dropdown of selectedDropDown) { // unselect the selected dropdown
    dropdown.selectedIndex = 0;
  }
}

// Add task form Info into localStorage
function addTask() {
  const taskName = document.querySelector('#task-name').value;
  const date = document.querySelector('#task-due-date').value;
  const priority = document.querySelector('input[name="priority"]:checked').value;

  // pName not used for task object creation
  const pName = document.querySelector('#task-project').value;
  const task = createTaskObj(taskName, date, priority); // CREATE TASK OBJECT

  const projects = JSON.parse(window.localStorage.getItem('todo-projects'));
  if ( projects ) { // if projects exists!!
    for (const proj of projects) {
      // proj ex: {projectName: "cook a meal", projectTasks: []}
      if (proj.projectName == pName) { // find the right project
        // push task into proj.projectTasks array
        proj.projectTasks.push(task);
      }
    }
  }
  localStorage.setItem('todo-projects', JSON.stringify(projects)); // update localStorage
}



export { openTaskModal, closeTaskModal, outsideTaskModalClick, addTask, refreshRadioOptions,
  resetTaskForm };