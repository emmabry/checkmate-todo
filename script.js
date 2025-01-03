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

    removeTodo = function (title) {
        this.currentProject.toDos = this.currentProject.toDos.filter(todo => todo.title !== title);
        this.allProjects = this.allProjects.map(project => 
            project.title === this.currentProject.title ? this.currentProject : project
        );
        console.log(this.currentProject.toDos);
        };

    completeTodo = function () {
        };
    changePriority = function () {
        };
};

class UIEditor {
    constructor() {
        this.projectButtons = document.querySelector('.project-buttons');
        this.taskList = document.querySelector('.todo-list');
        this.projects = document.querySelectorAll('.project');
        this.tasks = document.querySelectorAll('.task');
    }

    getProject = function (title) {
            this.taskList.innerHTML = '';
            let currentProject = app.getProject(title);
            currentProject.toDos.forEach(toDo => {
                const task = document.createElement('li');
                task.classList.add('task');
                task.textContent = toDo.title;
                const del = document.createElement('button');
                del.classList.add('delete');
                del.textContent = 'Delete';

                del.addEventListener('click', () => {
                    app.removeTodo(toDo.title);
                    task.remove();
                });

                task.appendChild(del);
                this.taskList.appendChild(task);
            });
    };

    addProject = function (name) {
        const newProject = app.addProject(name.value);
        const newButton = document.createElement('button');
        newButton.classList.add('project');
        newButton.textContent = newProject.title;
        this.projectButtons.appendChild(newButton);
        name.value = '';
    };

    addTask = function (name) {
        const newTask = app.addTodo(taskName.value);
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.textContent = newTask.title;
        const del = document.createElement('button');
        del.classList.add('delete');
        del.textContent = 'Delete';
        taskElement.appendChild(del);

        del.addEventListener('click', () => {
            app.removeTodo(newTask.title);
            taskElement.remove();
        });

        this.taskList.appendChild(taskElement);
        taskName.value = '';
    };
};

const app = new Application();
const ui = new UIEditor();

let projects = document.querySelectorAll('.project');

projects.forEach(project => {
    project.addEventListener('click', () => {
        ui.getProject(project.textContent);
    })
});

const addButton = document.querySelector('.add-project');
addButton.addEventListener('click', () => {
    const name = document.querySelector('.project-name');
    ui.addProject(name);
});

const addTask = document.querySelector('.add-task');
const taskName = document.querySelector('.task-name');
addTask.addEventListener('click', () => {
    ui.addTask(taskName.value);
});