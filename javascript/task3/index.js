const tasks = [];
let checkedStatus = 'all';

function showTask(statusFilter) {
  const tableBody = document.getElementById('task_body');

  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  const visibleTasks = statusFilter || tasks;
  visibleTasks.forEach((task) => {
    const tableRecord = document.createElement('tr');
    tableBody.appendChild(tableRecord);
    const trTag = tableBody.lastChild;

    const taskId = document.createElement('td');
    const taskContent = document.createElement('td');
    const tdTaskStatus = document.createElement('td');
    const tdTaskDestroy = document.createElement('td');
    const btnTaskStatus = document.createElement('button');
    const btnTaskDestroy = document.createElement('button');

    taskId.textContent = task.id;
    taskContent.textContent = task.content;
    btnTaskStatus.textContent = task.status;
    btnTaskDestroy.textContent = '削除';

    btnTaskDestroy.addEventListener('click', () => {
      destroyTask(task.id);
    });
    btnTaskStatus.addEventListener('click', () => {
      changeStatus(btnTaskStatus, task);
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
    const task = { id: tasks.length, content: taskText, status: '作業中' };
    tasks.push(task);
    filterTasks(checkedStatus);
    document.getElementById('task_text').value = '';
  }
}

function destroyTask(index) {
  tasks.splice(index, 1);
  tasks.forEach((task, i) => {
    task.id = i;
  });
  filterTasks(checkedStatus);
}

function changeStatus(btnTaskStatus, task) {
  if (btnTaskStatus.textContent === '作業中') {
    btnTaskStatus.textContent = '完了';
    task.status = '完了';
  } else {
    btnTaskStatus.textContent = '作業中';
    task.status = '作業中';
  }
  filterTasks(checkedStatus);
}

function filterTasks(status) {
  switch (status) {
    case 'wip': {
      const wipTasks = tasks.filter((task) => {
        return task.status === '作業中';
      });
      showTask(wipTasks);
      break;
    }
    case 'done': {
      const doneTasks = tasks.filter((todo) => {
        return todo.status === '完了';
      });
      showTask(doneTasks);
      break;
    }
    default: {
      showTask();
      break;
    }
  }
}

const radioButton = document.getElementsByName('taskStatus');
radioButton.forEach((status, index) => {
  radioButton[index].addEventListener('click', () => {
    checkedStatus = status.value;
    filterTasks(status.value);
  });
});

document.getElementById('add_task').addEventListener('click', createTask);
