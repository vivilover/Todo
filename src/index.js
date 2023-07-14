import { compareAsc, format } from 'date-fns';
import { openModal, closeModal, outsideClick, extractProjectName } from './modal';
import  { openTaskModal, closeTaskModal, outsideTaskModalClick, addTask,
  refreshRadioOptions, resetTaskForm } from './task';
import { handleProjectDelete, showProject } from './project';

const result = format(new Date(2023, 7, 3), 'yyyy-MM-dd'); // testing out 'date-fns'

// Add Project variables
const addProjectBtn = document.getElementById('project-add-btn');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const modalAddBtn = document.getElementById('modal-add-btn');
let newProjectName = '';

// Add Task variables
const windowPlusIcon = document.querySelector('.add-task-icon');
const addTaskIcon = document.querySelector('#task-add-btn');
const cancelTaskIcon = document.querySelector('#task-cancel-btn');
const taskModal = document.querySelector('#task-modal');

// task form select container (for options)
const taskFormSelect = document.querySelector('#task-project');

// showing selected projects
// don't think i can do this, because this is a dynamically created element.
// attach event Listener on project.js

taskFormSelect.innerHTML = '';
// Add Project Event Listener
addProjectBtn.addEventListener('click', openModal);

// Add Task Event Listener
windowPlusIcon.addEventListener('click', openTaskModal);
cancelTaskIcon.addEventListener('click', closeTaskModal);
addTaskIcon.addEventListener('click', () => {
  addTask();
  resetTaskForm();
  closeTaskModal();
});

// some code that needs to be here
const projectContainer = document.getElementById('projects');

let projectsArray = localStorage.getItem('todo-projects') ?
        JSON.parse(localStorage.getItem('todo-projects')) : [];

// Adding existing projects in LocalStorage to the UI
projectsArray.forEach((project) => {
  createProject(project.projectName);
});

refreshRadioOptions(); // refresh radio options

// MORE CODE
// create Project object
function createProjObj(name) {
  let projObj = {};
  projObj.projectName = name;
  projObj.projectTasks = [];
  return projObj;
}

// Handle Show Project here (INDICATED BELOW WHERE IT SHOULD BE DONE)
function createProject(projectName) {
  const container = document.createElement('div');
  container.classList.add('created-project-container');
  container.addEventListener('click', showProject);

  const listIcon = document.createElement('i');
  listIcon.classList.add('fas', 'fa-list');
  const name = document.createElement('div');
  name.classList.add('created-project-name');
  name.textContent = projectName;
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fas', 'fa-trash-alt', 'project-delete-icon');

  deleteIcon.addEventListener('click', handleProjectDelete);
  // HANDLE SHOW PROJECT HERE, WHEN IT IS CLICKED.
  // container.addEventListener('click', showProject);
  container.append(listIcon, name, deleteIcon);
  projectContainer.appendChild(container);
}

function add(pName) {
  const projectsArr = JSON.parse(localStorage.getItem('todo-projects')); // check existing project
  // let projectsArray = localStorage.getItem('todo-projects') ?
  //       JSON.parse(localStorage.getItem('todo-projects')) : [];
  if (projectsArr) {
    for(let p of projectsArr) {
      if (p.projectName == pName) {
        alert(`Project '${pName}' already exists. Try different name`);
        return;
      }
    }
  }
  const newProjectObject = createProjObj(pName);
  projectsArr.push(newProjectObject);
  localStorage.setItem('todo-projects', JSON.stringify(projectsArr));
  createProject(pName);
}
// normal flow
modalCloseBtn.addEventListener('click', closeModal);
modalCancelBtn.addEventListener('click', closeModal);
modalAddBtn.addEventListener('click', () => {
  newProjectName = extractProjectName();
  closeModal();
  add(newProjectName);
  refreshRadioOptions();
}); // IS THIS TOO MANY responsibilites for one click event?

// for Project Add and Task Add, if outside is clicked
window.addEventListener('click', (e) => {
  outsideClick(e);
  outsideTaskModalClick(e);
});

// playing with Date
const testObject ={name:"test", time:"Date 2017-02-03T08:38:04.449Z"};
localStorage.setItem('testObject', JSON.stringify(testObject));
let rObj = localStorage.getItem('testObject');


