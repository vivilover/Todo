
const modal = document.getElementById('modal');
const addProjectInput = document.getElementById('new-project');

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function outsideClick(e) {
  if(e.target == modal) {
    modal.style.display = 'none';
  }
}

// first store input value somewhere
// reset input value = ''
// close modal
function extractProjectName() {
  // e.preventDefault(); // not needed anymore, not a form.
  const projectName = document.getElementById('new-project').value;
  console.log(projectName);
  addProjectInput.value = '';
  return projectName;
}


export { openModal, closeModal, outsideClick, extractProjectName };