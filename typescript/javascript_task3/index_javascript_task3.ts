interface task {
  id: number,
  content: string,
  status: string,
};

const tasks: task[] = [];
let checkedStatus: string = 'all'

function showTask(statusFilter?: task[]) {
  const tableBody = document.getElementById('task_body') as HTMLInputElement;

  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  const visibleTasks: task[] | boolean = statusFilter || tasks
  visibleTasks.forEach((task: task) => {
    const tableRecord = document.createElement('tr');
    tableBody.appendChild(tableRecord);
    const trTag = tableBody.lastChild as HTMLInputElement; 

    const taskId = document.createElement('td');
    const taskContent = document.createElement('td');
    const tdTaskStatus = document.createElement('td');
    const tdTaskDestroy = document.createElement('td');
    const btnTaskStatus = document.createElement('button');
    const btnTaskDestroy = document.createElement('button');

    taskId.textContent = String(task.id);
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
    tdTaskStatus.append(btnTaskStatus)
    trTag.appendChild(tdTaskStatus);
    tdTaskDestroy.append(btnTaskDestroy)
    trTag.appendChild(tdTaskDestroy);
  });
}

function createTask() {
  const form = document.getElementById('task_text') as HTMLInputElement;
  const formValue: string = form.value

  if (formValue) {
    const task: task = { id: tasks.length, content: formValue, status: '作業中' };
    tasks.push(task);
    filterTasks(checkedStatus);
    form.value = '';
  }
}

function destroyTask(index: number) {
  tasks.splice(index, 1);
  tasks.forEach((task, i) => {
    task.id = i;
  });
  filterTasks(checkedStatus);
}

function changeStatus(btnTaskStatus: HTMLButtonElement, task: task) {
  if (btnTaskStatus.textContent === '作業中') {
    btnTaskStatus.textContent = '完了';
    task.status = '完了';
  } else {
    btnTaskStatus.textContent = '作業中';
    task.status = '作業中';
  }
  filterTasks(checkedStatus);
}

function filterTasks(status: string) {
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
    const statusElement = status as HTMLInputElement;
    checkedStatus = statusElement.value
    filterTasks(statusElement.value);
  });
});

const task = document.getElementById('add_task') as HTMLInputElement;
task.addEventListener('click', createTask);
