import "./styles.css";

class ToDo {
    static idCounter = 4;

    constructor(title, description, dueDate, priority) {
        this.id = ToDo.idCounter++;
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
};

class Application {
    constructor() {
        this.allProjects = [
            {
                title: 'Default',
                toDos: [
                    {
                        id: 0,
                        title: 'Default',
                        description: 'This is a default task',
                        dueDate: '31-01-2025',
                        priority: 'Medium',
                        completed: false
                    }
                ]   
            },
            {
                title: 'Daily Life',
                toDos: [
                    {
                        id: 1,
                        title: 'Wash dishes',
                        description: 'Wash the dishes in the sink',
                        dueDate: '31-01-2025',
                        priority: 'Low',
                        completed: false
                    },
                    { 
                        id: 2,
                        title: 'Do laundry',
                        description: 'Wash clothes',
                        dueDate: '31-01-2025',
                        priority: 'Medium',
                        completed: false
                    },
                    {
                        id: 3,
                        title: 'Buy groceries',
                        description: 'Buy food',
                        dueDate: '31-01-2025',
                        priority: 'High',
                        completed: false
                    }
                ]
            },
            {
                title: 'Coding',
                toDos: [
                    {
                        id: 4,
                        title: 'Learn JavaScript',
                        description: 'Learn JavaScript',
                        dueDate: '31-01-2025',
                        priority: 'Low',
                        completed: false
                    },
                    {
                        id: 5,
                        title: 'Learn React',
                        description: 'Learn React',
                        dueDate: '31-01-2025',
                        priority: 'Medium',
                        completed: false
                    },
                    {
                        id: 6,
                        title: 'Learn Node.js',
                        description: 'Learn Node.js',
                        dueDate: '31-01-2025',
                        priority: 'High',
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
        const newToDo = new ToDo(name, "Add description...", "Add date...", "Add priority...");
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

    uncompleteTodo = function (title) {
        const todo = this.currentProject.toDos.find(todo => todo.title === title);
        console.log('uncompleting')
        if (todo) {
            todo.completed = false;
        }
        ui.uncompleteTask(title);
        };

    showTaskInfo = function (title) {
        const task = this.currentProject.toDos.find(todo => todo.title === title);
        console.log(task);
        ui.showTaskInfo(task);
        }

    editTaskInfo = function () {
        }
    
    changePriority = function () {
        };
};

class UIEditor {
    constructor() {
        this.projectButtons = document.querySelector('.project-buttons');
        this.taskList = document.querySelector('.todo-list');
        this.projects = document.querySelectorAll('.project');
        this.tasks = document.querySelectorAll('.task');
        this.infoDiv = document.querySelector('.taskInfo');

        this.taskList.addEventListener('click', (event) => {
            if (event.target.classList.contains('checkbox')) {
                const taskTitle = event.target.parentElement.querySelector('.task-title').textContent;
                event.target.classList.toggle('checkbox-ticked');
                event.target.classList.remove('checkbox');
                app.completeTodo(taskTitle);
            }
            else if (event.target.classList.contains('checkbox-ticked')) {
                const taskTitle = event.target.parentElement.querySelector('.task-title').textContent;
                event.target.classList.toggle('checkbox');
                event.target.classList.remove('checkbox-ticked');
                app.uncompleteTodo(taskTitle);
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

        this.taskList.addEventListener('click', (event) => {
            if (event.target.classList.contains('task') || event.target.classList.contains('task-title')) {
                const taskTitle = event.target.closest('.task').querySelector('.task-title').textContent;
                console.log(taskTitle);
                app.showTaskInfo(taskTitle);
            }
        });

        this.infoDiv.addEventListener('click', (event) => {
            if (event.target.classList.contains('task-info-title')) {
                ui.editTaskInfo('title');
            }
            else if (event.target.classList.contains('task-info-description')) {
                ui.editTaskInfo('description');
            }
            else if (event.target.classList.contains('task-info-dueDate')) {
                ui.editTaskInfo('dueDate');
            }
            else if (event.target.classList.contains('task-info-priority')) {
                ui.editTaskInfo('priority');
            }

            if (this.infoDiv && this.infoDiv.querySelector('.submit-div')) {
                return;
            }
            else {
                const submitDiv = document.createElement('div');
                submitDiv.classList.add('submit-div');
                this.infoDiv.appendChild(submitDiv);
                const submit = document.createElement('button');
                submit.classList.add('submit');
                submit.textContent = 'Update';
                submit.addEventListener('click', () => {
                    ui.submitTaskInfo();
                });
                submitDiv.appendChild(submit);
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

        app.showTaskInfo(newTask.title);
    };

    showTaskInfo = function (task) {
        const infoDiv = document.querySelector('.taskInfo');
        infoDiv.innerHTML = '';
        infoDiv.dataset.id = task.id;
        const title = document.createElement('h2');
        title.classList.add('task-info-title');
        title.textContent = task.title;
        infoDiv.appendChild(title);
        const description = document.createElement('p');
        description.classList.add('task-info-description');
        description.textContent = task.description;
        infoDiv.appendChild(description);
        const dueDate = document.createElement('p');
        dueDate.classList.add('task-info-dueDate');
        dueDate.textContent = task.dueDate;
        infoDiv.appendChild(dueDate);
        const priority = document.createElement('p');
        priority.classList.add('task-info-priority');
        priority.textContent = task.priority;
        infoDiv.appendChild(priority);
    };

    editTaskInfo = function (type) {
        if (type === 'title') {
            const title = document.querySelector('.task-info-title');
            const titleEntry = document.createElement('input');
            titleEntry.classList.add('title-entry');
            this.infoDiv.replaceChild(titleEntry, title);
            console.log('editing title');
        }
        else if (type === 'description') {
            const description = document.querySelector('.task-info-description');
            const descEntry = document.createElement('input');
            descEntry.classList.add('desc-entry');
            this.infoDiv.replaceChild(descEntry, description);
        }
        else if (type === 'dueDate') {
            const dueDate = document.querySelector('.task-info-dueDate');
            const dueDateEntry = document.createElement('input');
            dueDateEntry.type = 'date';
            dueDateEntry.classList.add('dueDate-entry');
            this.infoDiv.replaceChild(dueDateEntry, dueDate);
        }
        else if (type === 'priority') {
            const priority = document.querySelector('.task-info-priority');
            const priorityEntry = document.createElement('select');
            priorityEntry.classList.add('priority-entry');
            const options = ['Low', 'Medium', 'High'];
            options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                priorityEntry.appendChild(opt);
            });
            this.infoDiv.replaceChild(priorityEntry, priority);
        }
        };
    
    submitTaskInfo = function () {
        const taskID = this.infoDiv.dataset.id;
        const task = app.currentProject.toDos.find(todo => todo.id == taskID);

        if (this.infoDiv.querySelector('.title-entry')) {
            task.title = this.infoDiv.querySelector('.title-entry').value;
            const listTitle = document.querySelector('.task-title');
            listTitle.textContent = task.title;
        }
        if (this.infoDiv.querySelector('.desc-entry')) {
            task.description = this.infoDiv.querySelector('.desc-entry').value;
        }
        if (this.infoDiv.querySelector('.dueDate-entry')) {
            task.dueDate = this.infoDiv.querySelector('.dueDate-entry').value;
        }
        if (this.infoDiv.querySelector('.priority-entry')) {
            task.priority = this.infoDiv.querySelector('.priority-entry').value;
        }

        ui.showTaskInfo(task);

        }

    // TODO: Handle this in CSS instead
    completeTask = function (title) {
        console.log(title);
        for (const a of document.querySelectorAll("span")) {
            if (a.textContent.includes(title)) {
                a.style.textDecoration = 'line-through';
            }
        }
        };

    uncompleteTask = function (title) {
        for (const a of document.querySelectorAll("span")) {
            if (a.textContent.includes(title)) {
                a.style.textDecoration = 'none';
            }
        }
        }
};

// Main
const app = new Application();
const ui = new UIEditor();

ui.getProject('Default');

const addButton = document.querySelector('.add-project');
addButton.addEventListener('click', () => {
    const name = document.querySelector('.project-name');
    const newProject = name.value;
    ui.addProject(name);
    ui.getProject(newProject);
});

const addTask = document.querySelector('.add-task');
const taskName = document.querySelector('.task-name');
addTask.addEventListener('click', () => {
    ui.addTask(taskName.value);
});
