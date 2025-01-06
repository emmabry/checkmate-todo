import "./styles.css";
import tickIcon from './assets/tick.svg';
import editIcon from './assets/edit.svg';
import deleteIcon from './assets/delete.svg';
import { format, isToday, differenceInDays, parseISO } from 'date-fns';
import { se } from "date-fns/locale";

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
                title: 'Daily Life',
                toDos: [
                    {
                        id: 1,
                        title: 'Wash dishes',
                        description: 'Wash the dishes in the sink',
                        dueDate: '2025-01-02',
                        priority: 'Low',
                        completed: false
                    },
                    { 
                        id: 2,
                        title: 'Do laundry',
                        description: 'Wash clothes',
                        dueDate: '2025-01-05',
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
                        dueDate: '2025-01-06',
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

    checkDate = function (dateString) {
        const date = parseISO(dateString);
        
        if (isToday(date)) {
            return "Today";
        }

        const dateAtMidnight = new Date(date.setHours(0, 0, 0, 0));
        const todayAtMidnight = new Date(new Date().setHours(0, 0, 0, 0));
        const daysDifference = differenceInDays(dateAtMidnight, todayAtMidnight);
        if (daysDifference === 1) {
            return "In 1 day";
        }
        if (daysDifference === -1) {
            return "Overdue 1 day";
        }
        if (daysDifference > 1 && daysDifference <= 7) {
            return `In ${daysDifference} days`;
        }
        if (daysDifference < -1 && daysDifference >= -7) {
            return `Overdue ${Math.abs(daysDifference)} days`;
        }
        if (daysDifference === 0) {
            return "Today";
        }
        if (daysDifference > 7) {
            return format(date, 'dd-MM-yyyy');
        }
    };
    
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
            todo.completed = !todo.completed;
        }
        };

    showTaskInfo = function (title) {
        const task = this.currentProject.toDos.find(todo => todo.title === title);
        ui.showTaskInfo(task);
        }

    editTaskInfo = function (id, title, description, dueDate, priority) {
        const task = this.currentProject.toDos.find(todo => todo.id === id);
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        app.showTaskInfo(task.title);
        ui.getProject(this.currentProject.title);
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
        this.addTask = document.querySelector('.add-task-beta');
        this.addButton = document.querySelector('.add-beta');

        this.addButton.addEventListener('click', () => {
            const addDivElement = document.querySelector('.add-div');
            if (addDivElement) {
                return;
            } else {
            const parentDiv = document.querySelector('.addNew');
            const addDiv = document.createElement('div');
            addDiv.classList.add('add-div');
            addDiv.innerHTML = '';
            const projectName = document.createElement('input');
            const projectButton = document.createElement('button');
            projectButton.classList.add('project-button');
            projectButton.textContent = '+';
            projectName.classList.add('project-name');
            projectName.type = 'text';
            projectName.placeholder = 'Enter your project...';
            addDiv.appendChild(projectName);
            addDiv.appendChild(projectButton);
            parentDiv.appendChild(addDiv);
            console.log(projectName);

            projectButton.addEventListener('click', () => {
                if (projectName.value) {
                    ui.addProject(projectName.value);
                    ui.getProject(projectName.value);
                    addDiv.remove();
                }
            }
        )};
        });
        
        this.addTask.addEventListener('click', () => {
            ui.addTaskNew();
        });

        this.taskList.addEventListener('click', (event) => {
            if (event.target.classList.contains('checkbox')) {
                const taskTitle = event.target.closest('.task').querySelector('.task-title').textContent;
                for (const a of document.querySelectorAll("span")) {
                            if (a.textContent.includes(taskTitle)) {
                                a.classList.toggle('completed');
                            }};
                app.completeTodo(taskTitle);
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
                dueDate.textContent = app.checkDate(toDo.dueDate);
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
        infoDiv.innerHTML = '';  
        
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
        svg.removeEventListener('click', handleTaskSubmit); 
        svg.addEventListener('click', handleTaskSubmit);
    
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
        TdueDate.textContent = app.checkDate(newTask.dueDate);
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
        dueDate.textContent = app.checkDate(task.dueDate);
        infoDiv.appendChild(dueDateHeading);
        infoDiv.appendChild(dueDate);

        const priorityHeading = document.createElement('h4');
        priorityHeading.textContent = 'Priority:';
        const priority = document.createElement('p');
        priority.classList.add('task-info-priority');
        priority.textContent = task.priority;
        infoDiv.appendChild(priorityHeading);
        infoDiv.appendChild(priority);

        const editButton = document.querySelector('.info-svg');

        editButton.addEventListener('click', () => {
            ui.editTaskInfo();
        });
    };

    editTaskInfo = function () {
        const infoDiv = document.querySelector('.info-div');
        console.log(infoDiv.dataset.id);
        const task = app.currentProject.toDos.find(todo => todo.id === parseInt(infoDiv.dataset.id));
        infoDiv.innerHTML = '';  
        const svg = document.querySelector('.info-svg');
        svg.src = tickIcon;
        
        const titleWrapper = document.createElement('div');
        titleWrapper.classList.add('title-wrapper');
        infoDiv.appendChild(titleWrapper);
        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title:';
        titleWrapper.appendChild(titleLabel);
        const title = document.createElement('textarea');
        title.classList.add('title-entry');
        title.value = task.title;
        titleWrapper.appendChild(title);
        
        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('description-wrapper');
        infoDiv.appendChild(descriptionWrapper);
        const descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'Description:';
        descriptionWrapper.appendChild(descriptionLabel);
        const description = document.createElement('textarea');
        description.classList.add('desc-entry');
        description.value = task.description;
        descriptionWrapper.appendChild(description);
        
        const dueDateWrapper = document.createElement('div');
        dueDateWrapper.classList.add('dueDate-wrapper');
        infoDiv.appendChild(dueDateWrapper);
        const dueDateLabel = document.createElement('label');
        dueDateLabel.textContent = 'Due By:';
        const dueDate = document.createElement('input');
        dueDate.classList.add('dueDate-entry');
        dueDate.type = 'date';
        dueDate.value = task.dueDate;
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
        let selectedPriority = null;
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
            input.addEventListener('click', () => {
                selectedPriority = input.value;
            });
            priority.appendChild(label);
            p_ul.appendChild(priority);
            if (rating.rank === task.priority) {
                input.checked = true;
            }
    });

    svg.removeEventListener('click', handleTaskEditSubmit); 
    svg.addEventListener('click', handleTaskEditSubmit);
    
        function handleTaskEditSubmit() {
            if (title.value && description.value && dueDate.value && selectedPriority) {
                app.editTaskInfo(task.id, title.value, description.value, dueDate.value, selectedPriority);
                title.value = '';
                description.value = '';
                dueDate.value = '';
            }
        }
        };
};

// Main
const app = new Application();
const ui = new UIEditor();

ui.getProject('Daily Life');
