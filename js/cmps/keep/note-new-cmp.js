'use strict';
import bus from '../../services/event-bus.service.js'
import keepService from '../../services/keep-service.js';
import noteTxt from './note-txt-cmp.js'
import noteImg from './note-img-cmp.js'
import noteAudio from './note-audio-cmp.js'

export default {    
    template: `
            <section class="notes-filter">
            <div>
            <button  @click="getNote('note-txt')">text</button>
            <button @click="getNote('note-img')">img</button>
            <button @click="getNote('note-audio')">audio</button>
            <button v-if="note" @click="addNote()">close</button>
        </div>
                <component v-if="note" :is="note.noteType" :note="note" :curr-mode="'new'">
                </component> 

               

                <pre>
                    note {{note}}
                </pre>
            </section>
    `,

    data() {
        return {
            title:'',
            note: null
        }
    },

    methods: {
        getNote(noteType) {
            keepService.getNoteType(noteType).then(note => {  
                note.noteType = noteType;
                this.note = JSON.parse(JSON.stringify(note));
            });
            // this.addNew = true;
            // this.$router.push(`/keep/edit/`);
            // console.log('filterNotes', this.filter);
            // this.$emit('filtered', this.filter);
        },
        addNote() {
            bus.$emit('addNote', this.note);
            
            // console.log('delete', noteId);
        }
    },
    computed: {

    },
    components: {
        noteTxt,
        noteImg,
        noteAudio
    }
}

// @input="addNote1()"

// <button @click="addNote('note-list')">todo list</button>