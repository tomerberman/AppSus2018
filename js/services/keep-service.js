import utilService from './util-service.js'
import storageService from './storage-service.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'

var notes = [
    { noteType: 'note-txt', isPinned: false, data: { title: 'note 2', txt: 'text for display 2' } },
    { noteType: 'note-img', isPinned: false, data: { title: 'note imf 1', src: '../../../img/1.jpg' } },
    { noteType: 'note-txt', isPinned: false, data: { title: 'note 1', txt: 'text for display 1' } },
    { noteType: 'note-audio', isPinned: false, data: { title: 'note audio 1', src: '../../../sound/Kalimba.mp3' } }
];
var NOTES_KEY = 'notesApp'
var notesFilter = 'All';


export default {
    query
}

function query() {
    return Promise.resolve(notes);
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

function addNote(noteTxt) {
    var newNote = createNote(noteTxt);
    notes.unshift(newNote);
    saveNotes();
    return Promise.resolve(newNote);
}

function deleteNote(id) {
    var noteIdx = getNoteIdxById(id)
    if (noteIdx === -1) return;
    notes.splice(noteIdx, 1);
    saveNotes();
    return Promise.resolve();

}

function toggleNote(id) {
    var note = getNoteById(id)
    if (!note) return;
    note.isDone = !note.isDone;
    saveNotes();
    return Promise.resolve(note);

}

function getNoteById(id) {
    var note = notes.find(note => note.id === id);
    return Promise.resolve(note)
}

function getNoteIdxById(id) {
    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];
        if (note.id === id) return i;
    }
    return -1;
}

function setFilter(strFilter) {
    notesFilter = strFilter;
}

function getNotesForDisplay() {
    var notes = [];
    notes.forEach(function (note) {
        if (notesFilter === 'All' ||
            (notesFilter === 'Active' && !note.isDone) ||
            (notesFilter === 'Done' && note.isDone)) {
            notes.push(note);
        }
    });
    return Promise.resolve(notes);
}

function getCount() {
    return notes.length;
}

function getActiveCount() {
    var activeCount = 0;
    notes.forEach(function (note) {
        if (!note.isDone) activeCount++;
    })
    return activeCount;
}

function saveNotes() {
    saveToStorage(NOTES_KEY, notes);
}
