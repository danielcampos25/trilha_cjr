const localStorageKey = 'to-do-list-gn'

function validateIfExistsNewTask()
{
    let values     = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists     = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask()
{
    let input = document.getElementById('input-new-task')
    input.style.border = ''

    // validation
    if(!input.value)
    {
        input.style.border = '1px solid red'
        showMessageError2()
    }
    else if(validateIfExistsNewTask())
    {
        showMessageError1()
    }
    else
    {
        // increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
        showMessage()
    }
    input.value = ''
    updateProgressBar();
    
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
  
    for (let i = 0; i < values.length; i++) {
      let taskName = values[i]['name'];
      let doneClass = values[i]['done'] ? 'done' : ''; // Adiciona uma classe 'done' se a tarefa estiver concluída
  
      list.innerHTML += `
        <li>
          <span class="${doneClass}">${taskName}</span>
          <div class="buttons-container">
          <button  class = 'btn-ok' id='btn-ok' onclick='removeItem("${taskName}")' title="Clique para remover a tarefa"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg></button>
          <button class='btn-done' id='btn-done' onclick='taskDone("${taskName}")' title="Clique para marcar como feito"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
        </svg></button>
        </div>
        </li>
      `;
    }
  }

  function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name === data);
    
    if (index !== -1) {
      values.splice(index, 1);
      localStorage.setItem(localStorageKey, JSON.stringify(values));
      showValues();
      updateProgressBar(); // Atualiza a barra de progresso após remover a tarefa
    }
  }
function taskDone(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name === data);
    
    if (index !== -1) {
      values[index].done = true; // Adiciona uma propriedade "done" ao item
      localStorage.setItem(localStorageKey, JSON.stringify(values));
      showValues();
      updateProgressBar(); // Atualiza a barra de progresso após marcar a tarefa como concluída
    }
  }

showValues()

function updateProgressBar() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let totalTasks = values.length;
    let completedTasks = values.filter(task => task.done).length;
    let progressBar = document.querySelector('.filler');
  
    if (totalTasks === 0) {
      progressBar.style.width = '0';
    } else {
      let percentage = (completedTasks / totalTasks) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  }
  
  // Chame essa função sempre que houver uma alteração nas tarefas
  // Por exemplo, após marcar uma tarefa como concluída ou remover uma tarefa
  updateProgressBar();

  function showMessage() {
    var message = document.getElementById("message1");
    message.style.opacity = "1"; 
    
    setTimeout(function() {
      message.style.opacity = "0"; 
    }, 1500); 
  }

  function showMessageError1() {
    var message = document.getElementById("message2");
    message.style.opacity = "1"; 
    
    setTimeout(function() {
      message.style.opacity = "0"; 
    }, 1500); 
  }

  function showMessageError2() {
    var message = document.getElementById("message3");
    message.style.opacity = "1"; 
    
    setTimeout(function() {
      message.style.opacity = "0"; 
    }, 1500); 
  }