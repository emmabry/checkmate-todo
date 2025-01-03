class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
    completeItem = function () {
        this.completed = true;
    };
}; 

class Projects {
    constructor(title) {
        this.title = title;
        this.toDos = [];
    }

    addToDo = function (title, description, dueDate, priority) {
        this.toDos.push(new ToDo(title, description, dueDate, priority));
    }
};

class Application {
    constructor() {
        this.allProjects = [
            {
                title: 'Default',
                toDos: [
                    {
                        title: 'Default',
                        description: 'Default',
                        dueDate: 'Default',
                        priority: 'Default',
                        completed: false
                    }
                ]   
            },
            {
                title: 'Project 1',
                toDos: [
                    {
                        title: 'Task 1',
                        description: 'Description 1',
                        dueDate: 'Due Date 1',
                        priority: 'Priority 1',
                        completed: false
                    },
                    {
                        title: 'Task 2',
                        description: 'Description 2',
                        dueDate: 'Due Date 2',
                        priority: 'Priority 2',
                        completed: false
                    }
                ]
            }
        ];
        this.currentProject = this.allProjects[0];
    }

    getProject = function (project) {
        this.currentProject = this.allProjects.find(proj => proj.title === project);
        return this.currentProject;
    }
    
    addProject = function (name) {
        const newProject = new Projects(name);
        this.allProjects.push(newProject);
        return newProject;
        };

    addTodo = function (name) {
        const newToDo = new ToDo(name, "desc", "date", "priority");
        this.currentProject.toDos.push(newToDo);
        return newToDo;
        };

    removeTodo = function () {
        };
    completeTodo = function () {
        };
    changePriority = function () {
        };
};

function appFunctionality() {
    const projectButtons = document.querySelector('.project-buttons');
    const taskList = document.querySelector('.todo-list');
    const projects = document.querySelectorAll('.project');
    const tasks = document.querySelectorAll('.task');


    // Select Project Board
    projects.forEach(project => {
        project.addEventListener('click', () => {
            taskList.innerHTML = '';
            let currentProject = app.getProject(project.textContent);
            currentProject.toDos.forEach(toDo => {
                const task = document.createElement('li');
                task.classList.add('task');
                task.textContent = toDo.title;
                const del = document.createElement('button');
                del.classList.add('delete');
                del.textContent = 'Delete';
                task.appendChild(del);
                taskList.appendChild(task);
            });
        });
    });

    // Add Project
    const addButton = document.querySelector('.add-project');
    const name = document.querySelector('.project-name');
    addButton.addEventListener('click', () => {
        const newProject = app.addProject(name.value);
        const newButton = document.createElement('button');
        newButton.classList.add('project');
        newButton.textContent = newProject.title;
        projectButtons.appendChild(newButton);
        name.value = '';
    });

    // Add task
    const addTask = document.querySelector('.add-task');
    const taskName = document.querySelector('.task-name');
    addTask.addEventListener('click', () => {
        const newTask = app.addTodo(taskName.value);
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.textContent = newTask.title;
        const del = document.createElement('button');
        del.classList.add('delete');
        del.textContent = 'Delete';
        taskElement.appendChild(del);
        taskList.appendChild(taskElement);
        taskName.value = '';
    });

    // Delete task
    const delButtons = document.querySelectorAll('.delete');
    console.log(delButtons);
    delButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('clicked');
            button.parentElement.remove();
        });
    });

};

const app = new Application();
appFunctionality();