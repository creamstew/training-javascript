const tasks = [];

function showTask() {
  const tableBody = document.getElementById('task_body');

  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  tasks.forEach((task, i) => {
    const tableRecord = document.createElement('tr');
    tableBody.appendChild(tableRecord);

    const taskId = document.createElement('td');
    const taskContent = document.createElement('td');
    const taskStatus = document.createElement('button');
    const taskDestroy = document.createElement('button');

    task.id = i;
    taskId.textContent = task.id;
    taskContent.textContent = task.content;
    taskStatus.textContent = '作業中';
    taskDestroy.textContent = '削除';

    tableBody.appendChild(taskId);
    tableBody.appendChild(taskContent);
    tableBody.appendChild(taskStatus);
    tableBody.appendChild(taskDestroy);
  });
}

function createTask() {
  const taskText = document.getElementById('task_text').value;

  if (taskText) {
    const task = { id: null, content: taskText, status: '作業中' };
    tasks.push(task);
    showTask(tasks);
    document.getElementById('task_text').value = '';
  }
}

document.getElementById('add_task').addEventListener('click', createTask);
