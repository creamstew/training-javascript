const tasks = [];

function showTask() {
  const tableBody = document.getElementById('task_body');

  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  tasks.forEach((task, i) => {
    const tableRecord = document.createElement('tr');
    tableBody.appendChild(tableRecord);
    const trTag = tableBody.lastChild;

    const taskId = document.createElement('td');
    const taskContent = document.createElement('td');
    const tdTaskStatus = document.createElement('td');
    const tdTaskDestroy = document.createElement('td');
    const btnTaskStatus = document.createElement('button');
    const btnTaskDestroy = document.createElement('button');

    task.id = i;
    taskId.textContent = task.id;
    taskContent.textContent = task.content;
    btnTaskStatus.textContent = '作業中';
    btnTaskDestroy.textContent = '削除';

    btnTaskDestroy.addEventListener('click', () => {
      destroyTask(i);
    });

    trTag.appendChild(taskId);
    trTag.appendChild(taskContent);
    tdTaskStatus.append(btnTaskStatus);
    trTag.appendChild(tdTaskStatus);
    tdTaskDestroy.append(btnTaskDestroy);
    trTag.appendChild(tdTaskDestroy);
  });
}

function createTask() {
  const taskText = document.getElementById('task_text').value;

  if (taskText) {
    const task = { id: null, content: taskText, status: '作業中' };
    tasks.push(task);
    showTask();
    document.getElementById('task_text').value = '';
  }
}

function destroyTask(index) {
  tasks.splice(index, 1);
  showTask();
}

document.getElementById('add_task').addEventListener('click', createTask);
