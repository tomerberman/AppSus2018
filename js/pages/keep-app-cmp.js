
import bus from '../services/event-bus.service.js'
import keepService from '../services/keep-service.js';
import noteList from '../cmps/keep/note-list-cmp.js';
import noteFilter from '../cmps/keep/note-filter-cmp.js';
import noteNew from '../cmps/keep/note-new-cmp.js';

export default {
    template: `
    <section class="keep-home">
        <h1>Keep</h1>
        <h3>Keeping it real for you!</h3>
        
        <note-filter @filtered="setFilter"></note-filter>
        <note-new ></note-new>
        
        <note-list :notes="notesToShow" @selected="selectNote"></note-list>
        
    </section>  
    `,
    data() {
        return {
            notes: [],
            selectedtNote: null,
            currView: null,
            filter: null
        }
    },
    created() {
        keepService.query()
            .then(notes => this.notes = notes),

            bus.$on('deleteNote', noteId => {
                this.$router.push('/keep');
                keepService.deleteNote(noteId);
            }),
            bus.$on('editNote', noteId => {
                this.$router.push(`/keep/edit/${noteId}`);
            }),
            bus.$on('previewNote', noteId => {
                this.$router.push(`/keep/${noteId}`);
            }),
            bus.$on('pinNote', noteId => {
                keepService.pinNote(noteId);
            }),
            bus.$on('saveNotes', () => {
                keepService.store();
                this.$router.push('/keep');
            }),
            bus.$on('addNote', note => {
                console.log('addNote from main app cmp ', note);
                keepService.addNote(note);
            })
    },
    computed: {
        notesToShow() {
            console.log('notesToShow - ', this.notes);
            if (!this.filter) return this.notes;
            else return this.notes.filter(note =>
                note.data.title.includes(this.filter.title))
        }

    },
    methods: {
        selectNote(noteId) {
            if (!noteId) this.selectedNote = null;
            else {
                this.selectedNote = this.notes.find(currNote => currNote.id === noteId);
            }
        },

        setFilter(filter) {
            this.filter = filter;
        },


    },
    components: {
        noteList,
        noteFilter,
        noteNew
    }
}

