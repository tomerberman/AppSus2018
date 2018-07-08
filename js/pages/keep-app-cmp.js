
import bus from '../services/event-bus.service.js'
import keepService from '../services/keep-service.js';
import noteList from '../cmps/keep/note-list-cmp.js';
import noteFilter from '../cmps/keep/note-filter-cmp.js';
import noteNew from '../cmps/keep/note-new-cmp.js';

export default {
    template: `
    <section class="home">
        <h1>Keep</h1>
        
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
            .then(notes => {
                this.notes = notes;
                //  console.log(notes);
            }),

            bus.$on('deleteNote', noteId => {
                console.log('book app delete note!', noteId);
                this.$router.push('/keep');
                keepService.deleteNote(noteId);
            }),
            bus.$on('editNote', noteId => {
                console.log('book app edit note!', noteId);
                this.$router.push(`/keep/edit/${noteId}`);
            }),
            bus.$on('previewNote', noteId => {
                console.log('book app preview note!', noteId);
                this.$router.push(`/keep/${noteId}`);
            }),
            bus.$on('pinNote', noteId => {
                console.log('book app pin note!', noteId);
            }),
            bus.$on('saveNotes', () => {
                keepService.store();
            }),
            bus.$on('addNote', note => {
                console.log('addNote', note);
                keepService.addNote(note).then( () => {  
                    // notesToShow();
                    //this.$router.push(`/keep/`);
                });
            })
    },
    computed: {
        notesToShow() {
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
            // console.log(filter);

            this.filter = filter;
        },


    },
    components: {
        noteList,
        noteFilter,
        noteNew
    }
}


// 'note-txt': {
//     template: `<section>GREET {{data.txt}}</section>`,
//     props: ['data']
// }

// <input type="text" id="search" 
// 					v-model="filterBy.by" 
// 					@input="updateFilter"/>

// <!-- <button @click="cmps.push({cmpType: 'say-hello', data: {greet : 'Hi'}})">+</button>-->

// <!-- <button @click="changeCmp">Change Cmp</button> -->

//  <!-- <component :is="currView" :data="{user: {email: 'x@x.com'}}"></component>-->


// watch: {
//     'filter.txt':function() {
//          console.log(this.filter.txt);

//         // let notesToShow = this.notes;
//         if (this.filter) {
//             // Search by search
//             this.notes = this.notes.filter(note => {
//                 return note.data.title.includes(this.filter.txt);
//             });
//         }

//         if(this.filter.txt === ''){
//             keepService.query()
//             .then(notes => {
//                 this.notes = notes;
//                 // console.log(notes);
//             })
//         }
//     }
// },