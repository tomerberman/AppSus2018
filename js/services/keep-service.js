import utilService from './util.service.js'
import storageService from './storage.service.js'
import eventBus, {USR_MSG_DISPLAY} from './event-bus.service.js'

var todos = [];
var TODOS_KEY = 'todosApp'
var todosFilter = 'All';


export default {
    
}


function createTodos() {
    todos = loadFromStorage(TODOS_KEY);
    if (!todos || todos.length === 0) {
        todos = [];
        todos.push(createTodo('Learn Javascript'))
        todos.push(createTodo('Play with HTML5'))
        todos.push(createTodo('Master CSS'))
    } 
}

function createTodo(txt) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
    }
}

function addTodo(todoTxt) {
    var newTodo = createTodo(todoTxt);
    todos.unshift(newTodo);
    saveTodos();
    return Promise.resolve(newTodo);
}

function deleteTodo(id) {
    var todoIdx = getTodoIdxById(id)
    if (todoIdx === -1) return;
    todos.splice(todoIdx, 1);
    saveTodos();
    return Promise.resolve();

}

function toggleTodo(id) {
    var todo = getTodoById(id)
    if (!todo) return;
    todo.isDone = !todo.isDone;
    saveTodos();
    return Promise.resolve(todo);

}

function getTodoById(id) {
    var todo = todos.find(todo => todo.id === id);
    return Promise.resolve(todo)
}

function getTodoIdxById(id) {
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        if (todo.id === id) return i;
    }
    return -1;
}

function setFilter(strFilter) {
    todosFilter = strFilter;
}

function getTodosForDisplay() {
    var todos = [];
    todos.forEach(function (todo) {
        if (todosFilter === 'All' ||
            (todosFilter === 'Active' && !todo.isDone) ||
            (todosFilter === 'Done' && todo.isDone)) {
            todos.push(todo);
        }
    });
    return Promise.resolve(todos);
}

function getCount() {
    return todos.length;
}

function getActiveCount() {
    var activeCount = 0;
    todos.forEach(function (todo) {
        if (!todo.isDone) activeCount++;
    })
    return activeCount;
}

function saveTodos() {
    saveToStorage(TODOS_KEY, todos);
}
