import "./styles.css";

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

    completeTodo = function (title) {
        const todo = this.currentProject.toDos.find(todo => todo.title === title);
        if (todo) {
            todo.completed = true;
        }
        ui.completeTask(title);
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

        this.taskList.addEventListener('click', (event) => {
            if (event.target.classList.contains('checkbox')) {
                const taskTitle = event.target.parentElement.querySelector('.task-title').textContent;
                app.completeTodo(taskTitle);
            }
        });

        this.taskList.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete')) {
                const taskTitle = event.target.parentElement.querySelector('.task-title').textContent;
                app.removeTodo(taskTitle);
                event.target.parentElement.remove();
            }
        });

        this.projectButtons.addEventListener('click', (event) => {
            if (event.target.classList.contains('project')) {
                const projectTitle = event.target.textContent;
                ui.getProject(projectTitle);
            }
        });
    }
    
    getProject = function (title) {
            this.taskList.innerHTML = '';
            let currentProject = app.getProject(title);
            currentProject.toDos.forEach(toDo => {
                const task = document.createElement('li');
                task.classList.add('task');

                const taskTitle = document.createElement('span');
                taskTitle.classList.add('task-title');
                taskTitle.textContent = toDo.title;
                task.appendChild(taskTitle);

                const del = document.createElement('button');
                del.classList.add('delete');
                del.textContent = 'Delete';

                const checkbox = document.createElement('input');
                checkbox.classList.add('checkbox');
                checkbox.type = 'checkbox';
                task.appendChild(checkbox);

                task.appendChild(del);
                this.taskList.appendChild(task);
            });
    };

    addProject = function (name) {
        const newProject = app.addProject(name.value);
        const newButton = document.createElement('button');
        newButton.classList.add('project');
        newButton.textContent = newProject.title;
        newButton.addEventListener('click', () => {
            ui.getProject(newButton.textContent);
        })
        this.projectButtons.appendChild(newButton);
        name.value = '';
    };

    addTask = function (name) {
        const newTask = app.addTodo(taskName.value);

        const taskElement = document.createElement('li');
        taskElement.classList.add('task');

        const taskTitle = document.createElement('span');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = newTask.title;
        taskElement.appendChild(taskTitle);

        const del = document.createElement('button');
        del.classList.add('delete');
        del.textContent = 'Delete';

        const checkbox = document.createElement('input');
        checkbox.classList.add('checkbox');
        checkbox.type = 'checkbox';
        taskElement.appendChild(checkbox);

        this.taskList.appendChild(taskElement);
        taskElement.appendChild(del);
        taskName.value = '';
    };

    completeTask = function (title) {
        console.log(title);
        for (const a of document.querySelectorAll("span")) {
            if (a.textContent.includes(title)) {
                a.style.textDecoration = 'line-through';
            }
        }
        };
};

// Main
const app = new Application();
const ui = new UIEditor();

ui.getProject('Default');

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
