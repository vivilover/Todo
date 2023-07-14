import  { refreshRadioOptions } from './task';

function handleProjectDelete(e) {
  let projectsArray = JSON.parse(localStorage.getItem('todo-projects'));
  const deleteIcon = e.target;
  // name of the project we want to delete
  const deleteTargetName = deleteIcon.previousSibling.innerHTML;
  // 1. remove project from projectArray
  // ERROR COMING FROM THIS CHUNK OF CODE
  projectsArray.forEach((project) => {
    if(project.projectName === deleteTargetName) {
      const index = projectsArray.indexOf(project);
      if (index !== -1) {
        projectsArray.splice(index, 1);
      }
    }
  });
  // 2. remove project from localStorage
  // after one project is removed, run setItem() again on localStorage
  localStorage.setItem('todo-projects', JSON.stringify(projectsArray));

  // 3. remove the element from DOM
  const domRemoveElemTarget = deleteIcon.parentElement;
  domRemoveElemTarget.remove();

  // 4. refresh Add Task's radio options.
  refreshRadioOptions();
}

// assume project container is clicked
// we go down
function showProject(e) {
  const main = document.querySelector('main');
  main.innerHTML = ''; // reset main
  let parentElement;
  if(e.target.classList.contains('created-project-container')) {
    parentElement = e.target;
  } else if(!e.target.classList.contains('project-delete-icon')) {
    parentElement = e.target.parentElement;
  } else { // clicked trash icon
    return;
  }
  const pName = parentElement.children[1].innerHTML; // name only
  const pHeaderElement = displayProjectHeader(pName);
  main.append(pHeaderElement);

  const projectObj = getProjectObj(pName); // gets object from localStorage
  if (projectObj.projectTasks !== []) {
    for(let task of projectObj.projectTasks) {
      main.appendChild( generateTaskUI(task) );
    }
  }

}

function displayProjectHeader(projectName) {
  const headerContainer = document.createElement('div');
  headerContainer.innerHTML = projectName;
  headerContainer.classList.add('main-project-header');
  return headerContainer;
}
function toggleCrossOutTask(e) {
  let textElement;
  let checkBox = e.target.children[1];
  if (e.target.classList.contains('task-checkbox-container')) {
    textElement = e.target.nextElementSibling; // selecting text node
    textElement.classList.toggle('text-strike-through');
    // checkBox.classList.toggle('green-background');
    console.log(checkBox);
  }
}
function toggleContainerOpacity(e) {
  let taskContainer;
  if (e.target.classList.contains('task-checkbox-container')) {
    taskContainer = e.target.parentElement;
    taskContainer.classList.toggle('opaque');
  }
}

// Seems to work OK!
function removeTask(e) {
  const taskToBeRemoved = e.target.parentElement.children[1].innerHTML; // WORKING
  const project = e.target.parentElement.parentElement.children[0].innerHTML; // WORKING
  const parentElement = e.target.parentElement; // to be removed from DOM

  // 1. remove this task from localStorage (using forEach, index, splice)
  const projectsArr = JSON.parse(localStorage.getItem('todo-projects'));
  projectsArr.forEach((projObj) => {
    projObj.projectTasks.forEach((task, index) => {
      console.log(taskToBeRemoved);
      if (task.taskName == taskToBeRemoved) {
        projObj.projectTasks.splice(index, 1);
      }
    })
  })
  // console.log(projectsArr);
  // UPDATE LOCAL STORAGE
  localStorage.setItem('todo-projects', JSON.stringify(projectsArr));
  // console.log(JSON.parse(localStorage.getItem('todo-projects')));
  // 2. remove from UI (using DOM)
  parentElement.remove();
}

function generateTaskUI(task) {
  const taskContainer = document.createElement('div');
  const checkContainer = document.createElement('label');
  checkContainer.classList.add('task-checkbox-container');
  checkContainer.setAttribute('for', 'task-check');
  const checkInput = document.createElement('input');
  checkInput.setAttribute('type', 'checkbox');
  checkInput.classList.add('task-check-input');
  checkInput.setAttribute('id', 'task-check');
  // checkInput.setAttribute('checked', 'checked');
  const checkSpan = document.createElement('span');
  checkSpan.classList.add('task-checkmark');
  checkContainer.append(checkInput, checkSpan);
  checkContainer.addEventListener('click', (e) => {
    toggleCrossOutTask(e);
    toggleContainerOpacity(e);
  });

  // const checkBtn = document.createElement('button');
  const taskName = document.createElement('div');
  const dueDate = document.createElement('div');
  const priority = document.createElement('div');
  const deleteBtn = document.createElement('i');

  taskContainer.classList.add('main-task-container');
  taskName.classList.add('main-task-text');
  dueDate.classList.add('main-task-date');
  priority.classList.add('main-task-priority-color');
  deleteBtn.classList.add('fas', 'fa-trash', 'main-task-remove-btn');
  deleteBtn.addEventListener('click', removeTask);

  taskName.textContent = task.taskName;
  dueDate.textContent = task.dueDate;
  const taskPriorityColor = getTaskColor(task.priority)
  priority.style.backgroundColor = taskPriorityColor; // set color

  taskContainer.append(checkContainer, taskName, dueDate, priority, deleteBtn);
  return taskContainer;
}

function getTaskColor(priority) {
  if (priority == 'low') {
    return '#ACE1AF'; // green
  } else if (priority == 'medium') {
    return '#fcb045'; // orange
  } else if (priority == 'high') {
    return '#E52B50'; // red
  }
}

function getProjectObj(targetProjectName) {
  let projectsArray = JSON.parse(localStorage.getItem('todo-projects'));
  for (const proj of projectsArray) {
    if (proj.projectName === targetProjectName) {
      return proj;
    }
  }
}

export { handleProjectDelete, showProject };