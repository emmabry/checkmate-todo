function toDo(title, description, dueDate, priority) {
    this.title = title,
    this.description =  description
    this.dueDate = dueDate,
    this.priority = priority
    this.completed = false

    this.completeItem = function() {
        this.completed = true
    }
}; 

function projects(title) {
    this.title = title,
    this.toDos = []

    this.addToDo = function(title, description, dueDate, priority) {
        this.toDos.push(new toDo(title, description, dueDate, priority))
    }
};

allProjects = [];