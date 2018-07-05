import utilService from './util-service.js'
import storageService from './storage-service.js'
import eventBus, {USR_MSG_DISPLAY} from './event-bus.service.js'

var notes = [];
var NOTES_KEY = 'todosApp'
var notesFilter = 'All';


export default {
    
}


function createNotes() {
    notes = loadFromStorage(NOTES_KEY);
    if (!notes || notes.length === 0) {
        notes = [];
        notes.push(createNote('Learn Javascript'))
        notes.push(createNote('Play with HTML5'))
        notes.push(createNote('Master CSS'))
    } 
}

function createNote(txt) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
    }
}

function addNote(todoTxt) {
    var newTodo = createNote(todoTxt);
    notes.unshift(newTodo);
    saveTodos();
    return Promise.resolve(newTodo);
}

function deleteNote(id) {
    var todoIdx = getNoteIdxById(id)
    if (todoIdx === -1) return;
    notes.splice(todoIdx, 1);
    saveTodos();
    return Promise.resolve();

}

function toggleNote(id) {
    var todo = getNoteById(id)
    if (!todo) return;
    todo.isDone = !todo.isDone;
    saveTodos();
    return Promise.resolve(todo);

}

function getNoteById(id) {
    var todo = notes.find(todo => todo.id === id);
    return Promise.resolve(todo)
}

function getNoteIdxById(id) {
    for (var i = 0; i < notes.length; i++) {
        var todo = notes[i];
        if (todo.id === id) return i;
    }
    return -1;
}

function setFilter(strFilter) {
    notesFilter = strFilter;
}

function getNotesForDisplay() {
    var todos = [];
    todos.forEach(function (todo) {
        if (notesFilter === 'All' ||
            (notesFilter === 'Active' && !todo.isDone) ||
            (notesFilter === 'Done' && todo.isDone)) {
            todos.push(todo);
        }
    });
    return Promise.resolve(todos);
}

function getCount() {
    return notes.length;
}

function getActiveCount() {
    var activeCount = 0;
    notes.forEach(function (todo) {
        if (!todo.isDone) activeCount++;
    })
    return activeCount;
}

function saveTodos() {
    saveToStorage(NOTES_KEY, notes);
}
