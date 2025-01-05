import "./styles.css";
import tickIcon from './assets/tick.svg';
import editIcon from './assets/edit.svg';
import deleteIcon from './assets/delete.svg';
import { ro } from "date-fns/locale";

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
                        dueDate: '2025-01-31',
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
                        dueDate: '2025-01-31',
                        priority: 'Low',
                        completed: false
                    },
                    { 
                        id: 2,
                        title: 'Do laundry',
                        description: 'Wash clothes',
                        dueDate: '2025-01-22',
                        priority: 'Medium',
                        completed: false
                    },
                    {
                        id: 3,
                        title: 'Buy groceries',
                        description: 'Buy food',
                        dueDate: '2025-01-31',
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
                        dueDate: '2025-01-31',
                        priority: 'Low',
                        completed: false
                    },
                    {
                        id: 5,
                        title: 'Learn React',
                        description: 'Learn React',
                        dueDate: '2025-01-11',
                        priority: 'Medium',
                        completed: false
                    },
                    {
                        id: 6,
                        title: 'Learn Node.js',
                        description: 'Learn Node.js',
                        dueDate: '2025-01-24',
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

    addTodoNew = function (title, description, dueDate, priority) {
        const newToDo = new ToDo(title, description, dueDate, priority);
        this.currentProject.toDos.push(newToDo);
        return newToDo;
        }

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
                const taskTitle = event.target.closest('.task').querySelector('.task-title').textContent;
                event.target.classList.toggle('checkbox-ticked');
                event.target.classList.remove('checkbox');
                app.completeTodo(taskTitle);
            }
            else if (event.target.classList.contains('checkbox-ticked')) {
                const taskTitle = event.target.closest('.task').querySelector('.task-title').textContent;
                event.target.classList.toggle('checkbox');
                event.target.classList.remove('checkbox-ticked');
                app.uncompleteTodo(taskTitle);
            }
        });

        this.taskList.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete')) {
                const taskTitle = event.target.closest('.task').querySelector('.task-title').textContent;
                app.removeTodo(taskTitle);
                event.target.closest('.task').remove();
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
            const header = document.querySelector('.proj-name-header');
            header.textContent = title
            let currentProject = app.getProject(title);
            currentProject.toDos.forEach(toDo => {
                const task = document.createElement('li');
                task.classList.add('task');
                const info = document.createElement('div');
                info.classList.add('this-info');
                task.appendChild(info);
                const symbols = document.createElement('div');
                symbols.classList.add('symbols');
                task.appendChild(symbols);

                const roundCheck = document.createElement('div');
                roundCheck.classList.add('round');
                
                const checkbox = document.createElement('input');
                checkbox.classList.add('checkbox');
                checkbox.type = 'checkbox';
                const checkboxId = 'checkbox-' + Math.random().toString(36).substr(2, 9); 
                checkbox.id = checkboxId;
                
                const label = document.createElement('label');
                label.setAttribute('for', checkbox.id); 
                
                roundCheck.appendChild(checkbox);
                roundCheck.appendChild(label);
                
                info.appendChild(roundCheck);          

                const taskTitle = document.createElement('span');
                taskTitle.classList.add('task-title');
                taskTitle.textContent = toDo.title;
                info.appendChild(taskTitle);

                const priority = document.createElement('span');
                    priority.classList.add('priority');
                    priority.textContent = '•';

                if (toDo.priority === 'Low') {
                    priority.style.color = '#31C969';
                }
                else if (toDo.priority === 'Medium') {
                    priority.style.color = '#FACB52';
                }
                else if (toDo.priority === 'High') {
                    priority.style.color = '#EF4444';
                }

                info.appendChild(priority);

                const dueDate = document.createElement('span');
                dueDate.classList.add('dueDate');
                dueDate.textContent = toDo.dueDate;
                info.appendChild(dueDate);

                const del = document.createElement('img');
                del.classList.add('delete');
                del.src = deleteIcon;
                symbols.appendChild(del);

                this.taskList.appendChild(task);
            });
    };

    addProject = function (name) {
        const newProject = app.addProject(name);
        const newButton = document.createElement('button');
        newButton.classList.add('project');
        newButton.textContent = newProject.title;
        newButton.addEventListener('click', () => {
            ui.getProject(newButton.textContent);
        })
        this.projectButtons.appendChild(newButton);
    };

    addTaskNew = function () {
        const header = document.querySelector('.info-head');
        header.textContent = 'New Task';
        
        const svg = document.querySelector('.info-svg');
        svg.src = tickIcon;
        
        const infoDiv = document.querySelector('.info-div');
        infoDiv.innerHTML = '';  // Clear existing task inputs
        
        const titleWrapper = document.createElement('div');
        titleWrapper.classList.add('title-wrapper');
        infoDiv.appendChild(titleWrapper);
        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title:';
        titleWrapper.appendChild(titleLabel);
        const title = document.createElement('textarea');
        title.classList.add('title-entry');
        title.placeholder = 'Title';
        titleWrapper.appendChild(title);
        
        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('description-wrapper');
        infoDiv.appendChild(descriptionWrapper);
        const descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'Description:';
        descriptionWrapper.appendChild(descriptionLabel);
        const description = document.createElement('textarea');
        description.classList.add('desc-entry');
        description.placeholder = 'Add a description';
        descriptionWrapper.appendChild(description);
        
        const dueDateWrapper = document.createElement('div');
        dueDateWrapper.classList.add('dueDate-wrapper');
        infoDiv.appendChild(dueDateWrapper);
        const dueDateLabel = document.createElement('label');
        dueDateLabel.textContent = 'Due By:';
        const dueDate = document.createElement('input');
        dueDate.classList.add('dueDate-entry');
        dueDate.type = 'date';
        dueDateWrapper.appendChild(dueDateLabel);
        dueDateWrapper.appendChild(dueDate);
        
        const priorityWrapper = document.createElement('fieldset');
        priorityWrapper.classList.add('priority-wrapper');
        infoDiv.appendChild(priorityWrapper);
        const priorityLabel = document.createElement('legend');
        priorityLabel.textContent = 'Priority:';
        priorityWrapper.appendChild(priorityLabel);
        const p_ul = document.createElement('ul');
        p_ul.classList.add('priority-ul');
        priorityWrapper.appendChild(p_ul);
        const ratings = [
            {
                rank: 'Low',
                color: '#31C969'
            },
            {
                rank: 'Medium',
                color: '#FACB52'
            },
            {
                rank: 'High',
                color: '#EF4444'
            }
        ]
        ratings.forEach(rating => {
            const priority = document.createElement('li');
            priority.classList.add(rating.rank);
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'priority';
            input.value = rating.rank;
            const label = document.createElement('label');
            label.textContent = rating.rank;
            label.style.backgroundColor = rating.color;
            priority.appendChild(input);
            priority.appendChild(label);
            p_ul.appendChild(priority);
    });
    
        svg.removeEventListener('click', handleTaskSubmit); 
        svg.addEventListener('click', handleTaskSubmit);
    
        function handleTaskSubmit() {
            const priorityInput = document.querySelector('input[name="priority"]:checked');
            if (title.value && description.value && dueDate.value && priorityInput) {
                console.log("Task Info: ", title.value, description.value, dueDate.value, priorityInput.value);
    
                ui.submitTaskInfoNew(title.value, description.value, dueDate.value, priorityInput.value);
    
                title.value = '';
                description.value = '';
                dueDate.value = '';
            }
        }
    };
    
    submitTaskInfoNew = function (title, description, dueDate, priority) {
        const header = document.querySelector('.info-head');
        header.textContent = 'Task Info';
        
        const svg = document.querySelector('.info-svg');
        svg.src = editIcon;
    
        const newTask = app.addTodoNew(title, description, dueDate, priority);
        
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        
        const info = document.createElement('div');
        info.classList.add('this-info');
        taskElement.appendChild(info);
        
        const symbols = document.createElement('div');
        symbols.classList.add('symbols');
        taskElement.appendChild(symbols);
        
        const roundCheck = document.createElement('div');
        roundCheck.classList.add('round');
        const checkbox = document.createElement('input');
        checkbox.classList.add('checkbox');
        checkbox.type = 'checkbox';
        const checkboxId = 'checkbox-' + Math.random().toString(36).substr(2, 9); 
        checkbox.id = checkboxId;
        const label = document.createElement('label');
        label.setAttribute('for', checkbox.id);  
        
        roundCheck.appendChild(checkbox);
        roundCheck.appendChild(label);
        info.appendChild(roundCheck);
    
        const taskTitle = document.createElement('span');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = newTask.title;
        info.appendChild(taskTitle);
    
        const del = document.createElement('img');
        del.classList.add('delete');
        del.src = deleteIcon;
    
        const apriority = document.createElement('span');
        apriority.classList.add('priority');
        apriority.textContent = '•';
    
        if (newTask.priority === 'Low') {
            apriority.style.color = '#31C969';
        }
        else if (newTask.priority === 'Medium') {
            apriority.style.color = '#FACB52';
        }
        else if (newTask.priority === 'High') {
            apriority.style.color = '#EF4444';
        }
        info.appendChild(apriority);

        const TdueDate = document.createElement('span');
        TdueDate.classList.add('dueDate');
        TdueDate.textContent = newTask.dueDate;
        info.appendChild(TdueDate);
    
        this.taskList.appendChild(taskElement);
        symbols.appendChild(del);
    
        app.showTaskInfo(newTask.title);
    }    

    showTaskInfo = function (task) {
        const svg = document.querySelector('.info-svg');
        svg.src = editIcon;

        const infoDiv = document.querySelector('.info-div');
        infoDiv.innerHTML = '';
        infoDiv.dataset.id = task.id;
        const title = document.querySelector('.info-head');
        title.textContent = task.title;

        const descriptionHeading = document.createElement('h4');
        descriptionHeading.textContent = 'Description:';
        const description = document.createElement('p');
        description.classList.add('task-info-description');
        description.textContent = task.description;
        infoDiv.appendChild(descriptionHeading);
        infoDiv.appendChild(description);

        const dueDateHeading = document.createElement('h4');
        dueDateHeading.textContent = 'Due Date:';
        const dueDate = document.createElement('p');
        dueDate.classList.add('task-info-dueDate');
        dueDate.textContent = task.dueDate;
        infoDiv.appendChild(dueDateHeading);
        infoDiv.appendChild(dueDate);

        const priorityHeading = document.createElement('h4');
        priorityHeading.textContent = 'Priority:';
        const priority = document.createElement('p');
        priority.classList.add('task-info-priority');
        priority.textContent = task.priority;
        infoDiv.appendChild(priorityHeading);
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

// TODO: Add modal here instead of pop-up prompt
const addButton = document.querySelector('.add-beta');
addButton.addEventListener('click', () => {
    const projectName = prompt("Enter the new project name:");
    console.log(projectName);
    if (projectName) {
        ui.addProject(projectName);
        ui.getProject(projectName);
    }
});

// TODO: Add functionality here
const addTask = document.querySelector('.add-task-beta');
addTask.addEventListener('click', () => {
    console.log("working");
    ui.addTaskNew();
});
