// whenever the page refreshes or gets loaded 
document.addEventListener('DOMContentLoaded', () => {
    // Grab all the elements

    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    // We have to store the tasks -> array (use empty array if there is nothing in local storage)
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // display the tasks - by iterating over the array tasks
    tasks.forEach(task => renderTasks(task));

    // Handle adding tasks 
    // We have to add an event listener to the add task button

    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        // properties of new task added
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        tasks.push(newTask); // store the new task in array 'tasks'
        saveTask(); // add in local storage
        todoInput.value = ""; // clear the placeholder area
        console.log(tasks);
        renderTasks(newTask);
    });

    // function for rendering tasks 
    function renderTasks(task) {
        const li = document.createElement('li');

        /**
         * setting a unique id for every tasks 
         * 
         * <li data-id="123">
           <span>Task text</span>
           <button>delete</button>
           </li>
         */
        li.setAttribute('data-id', task.id);

        // check if class is completed or not -> if yes then add the css property of completed to the task 
        // after loading display 
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;

        // task completed status
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;

            // if text is click then reverse it (if its striked off then unkstrike it and vice versa )
            task.completed = !(task.completed);
            // toggle the status of class completed
            li.classList.toggle('completed');

            // save the changes in the local storage
            saveTask();
        })


        // task delete clicking
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();  // prevents from triggering any other 'click' actions in parent <li>
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveTask();
        })

        // add task 
        todoList.appendChild(li);
    }

    // function to add the array to the local storage
    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});