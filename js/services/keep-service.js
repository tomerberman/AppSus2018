import utilService from './util-service.js'
import storageService from './storage-service.js'
// import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'

var notes = [
    { noteType: 'note-txt', id: utilService.makeId(6), isPinned: false, data: { title: 'note 2', txt: 'text for display 2' } },
    { noteType: 'note-img', id: utilService.makeId(6), isPinned: false, data: { title: 'note imf 1', src: '../../../img/1.jpg' } },
    { noteType: 'note-txt', id: utilService.makeId(6), isPinned: false, data: { title: 'note 1', txt: 'text for display 1' } },
    { noteType: 'note-audio', id: utilService.makeId(6), isPinned: false, data: { title: 'note audio 1', src: '../../../sound/Kalimba.mp3' } }
];

var NOTES_KEY = 'keepApp'
var notesFilter = 'All';

var noteTxt = {
    noteType: '',
    id: utilService.makeId(6),
    isPinned: false,
    data: {
        title: '',
        txt: ''
    }
}

var noteVidAudImg = {
    noteType: '',
    id: utilService.makeId(6),
    isPinned: false,
    data: {
        title: '',
        src: ''
    }
}

var noteList = {
    noteType: '',
    id: utilService.makeId(6),
    isPinned: false,
    data: {
        title: ''
    }
}

export default {
    query,
    deleteNote,
    getNoteById,
    store,
    getNoteType,
    addNote
}

function getNoteType(noteType) {
    var note = null;

    switch (noteType) {
        case 'note-img':
            note = noteVidAudImg;
            break;
        case 'note-audio':
            note = noteVidAudImg;
            break;
        case 'note-list':
            note = 'note-list';
            break;
        default:
            note = noteTxt;
    }

    return Promise.resolve(note);
}

function query() {
    notes = storageService.load(NOTES_KEY);
    if (!notes || notes.length === 0) {
        notes = [
            { noteType: 'note-txt', id: utilService.makeId(6), isPinned: false, data: { title: 'note 2', txt: 'text for display 2' } },
            { noteType: 'note-img', id: utilService.makeId(6), isPinned: false, data: { title: 'note imf 1', src: '../../../img/1.jpg' } },
            { noteType: 'note-txt', id: utilService.makeId(6), isPinned: false, data: { title: 'note 1', txt: 'text for display 1' } },
            { noteType: 'note-audio', id: utilService.makeId(6), isPinned: false, data: { title: 'note audio 1', src: '../../../sound/Kalimba.mp3' } }
        ];
    }
    return Promise.resolve(notes);

  
}

// function createNote(txt) {
//     return {
//         id: makeId(),
//         txt: txt,
//         isDone: false,
//     }
// }

function addNote(note) {
    var newNote = note;
    notes.unshift(newNote);
    storageService.store(NOTES_KEY, notes);
    return Promise.resolve(newNote);
}

function deleteNote(id) {
    var noteIdx = getNoteIdxById(id)
    if (noteIdx === -1) return;
    notes.splice(noteIdx, 1);
    storageService.store(NOTES_KEY, notes);
    return Promise.resolve();

}

function toggleNote(id) {
    var note = getNoteById(id)
    if (!note) return;
    note.isDone = !note.isDone;
    storageService.store(NOTES_KEY, notes);
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

function store() {
    storageService.store(NOTES_KEY, notes);
}
